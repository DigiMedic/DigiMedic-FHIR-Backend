/**
 * eRecept SÚKL API Klient
 * 
 * Implementace klienta pro komunikaci s centrálním úložištěm elektronických receptů (CÚER)
 * Státního ústavu pro kontrolu léčiv (SÚKL).
 * 
 * @see https://epreskripce.gov.cz/
 */

import { createClientAsync, Client as SoapClient, ISoapError } from 'soap';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Agent as HttpsAgent } from 'https';
import { readFileSync } from 'fs';
import { join } from 'path';
import { MedicationRequest, Bundle, Patient, Practitioner, Organization, Medication } from '@medplum/fhir-types';
import { Logging } from '../common/logging';
import { z } from 'zod';

/**
 * Konfigurace eRecept klienta
 */
export interface EreceptClientConfig {
  /** Prostředí (produkce/test) */
  environment: 'production' | 'test';
  /** Cesta k HTTPS certifikátu pro mTLS */
  certPath: string;
  /** Heslo k HTTPS certifikátu */
  certPassword: string;
  /** Cesta k privátnímu klíči pro mTLS */
  keyPath: string;
  /** Heslo k privátnímu klíči */
  keyPassword: string;
  /** ID lékaře v systému SÚKL */
  doctorId: string;
  /** Heslo lékaře v systému SÚKL */
  doctorPassword: string;
  /** ID zdravotnického zařízení v systému SÚKL */
  facilityId: string;
  /** Cesta k CA certifikátu SÚKL (volitelné) */
  caCertPath?: string;
  /** Timeout pro API požadavky v ms (výchozí: 30000) */
  timeout?: number;
  /** Proxy URL (volitelné) */
  proxy?: string;
}

/**
 * Schéma pro validaci eReceptu
 */
export const EreceptSchema = z.object({
  prescriptionId: z.string().optional(),
  doctorId: z.string(),
  patientId: z.string(),
  patientInsuranceNumber: z.string(),
  patientInsuranceCompany: z.string(),
  medications: z.array(
    z.object({
      code: z.string(),
      name: z.string(),
      strength: z.string().optional(),
      form: z.string().optional(),
      packageSize: z.string().optional(),
      dosage: z.string(),
      quantity: z.number(),
      isChronicMedication: z.boolean().optional(),
    })
  ),
  validUntil: z.string().optional(),
  emergencyLevel: z.enum(['regular', 'acute', 'emergency']).optional(),
});

export type Erecept = z.infer<typeof EreceptSchema>;

/**
 * Status eReceptu
 */
export enum EreceptStatus {
  CREATED = 'CREATED',
  PRESCRIBED = 'PRESCRIBED',
  DISPENSED = 'DISPENSED',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
}

/**
 * Odpověď na vytvoření eReceptu
 */
export interface CreateEreceptResponse {
  /** ID eReceptu */
  prescriptionId: string;
  /** Identifikátor eReceptu (12místný kód) */
  identifier: string;
  /** QR kód v Base64 */
  qrCode: string;
  /** Status eReceptu */
  status: EreceptStatus;
  /** Datum a čas vytvoření */
  createdAt: string;
}

/**
 * Odpověď na stornování eReceptu
 */
export interface CancelEreceptResponse {
  /** ID eReceptu */
  prescriptionId: string;
  /** Status eReceptu */
  status: EreceptStatus;
  /** Datum a čas stornování */
  cancelledAt: string;
  /** Důvod stornování */
  cancelReason: string;
}

/**
 * Odpověď na dotaz na stav eReceptu
 */
export interface GetEreceptStatusResponse {
  /** ID eReceptu */
  prescriptionId: string;
  /** Status eReceptu */
  status: EreceptStatus;
  /** Datum a čas poslední změny */
  lastUpdated: string;
  /** Informace o výdeji (pokud byl vydán) */
  dispensingInfo?: {
    /** Datum a čas výdeje */
    dispensedAt: string;
    /** ID lékárny */
    pharmacyId: string;
    /** Název lékárny */
    pharmacyName: string;
    /** Vydané léky */
    medications: Array<{
      /** Kód léku */
      code: string;
      /** Název léku */
      name: string;
      /** Vydané množství */
      quantity: number;
    }>;
  };
}

/**
 * Chyba eRecept API
 */
export class EreceptApiError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = 'EreceptApiError';
  }
}

/**
 * Klient pro komunikaci s eRecept API SÚKL
 */
export class EreceptClient {
  private readonly logger = Logging.getLogger('EreceptClient');
  private readonly baseUrl: string;
  private readonly wsdlUrl: string;
  private readonly restClient: AxiosInstance;
  private soapClient: SoapClient | null = null;
  private readonly config: EreceptClientConfig;

  /**
   * Vytvoří novou instanci eRecept klienta
   */
  constructor(config: EreceptClientConfig) {
    this.config = config;
    
    // Nastavení URL podle prostředí
    if (config.environment === 'production') {
      this.baseUrl = 'https://api.erecept.sukl.cz/v1';
      this.wsdlUrl = 'https://soap.erecept.sukl.cz/v1/erp.wsdl';
    } else {
      this.baseUrl = 'https://testapi.erecept.sukl.cz/v1';
      this.wsdlUrl = 'https://testsoap.erecept.sukl.cz/v1/erp.wsdl';
    }

    // Vytvoření HTTPS agenta s mTLS certifikáty
    const httpsAgent = new HttpsAgent({
      cert: readFileSync(config.certPath),
      key: readFileSync(config.keyPath),
      passphrase: config.keyPassword,
      ca: config.caCertPath ? readFileSync(config.caCertPath) : undefined,
    });

    // Vytvoření REST klienta
    this.restClient = axios.create({
      baseURL: this.baseUrl,
      httpsAgent,
      timeout: config.timeout || 30000,
      proxy: config.proxy ? { 
        host: new URL(config.proxy).hostname, 
        port: parseInt(new URL(config.proxy).port) 
      } : undefined,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    // Přidání interceptoru pro logování
    this.restClient.interceptors.request.use((request) => {
      this.logger.debug(`REST Request: ${request.method?.toUpperCase()} ${request.url}`);
      return request;
    });

    this.restClient.interceptors.response.use(
      (response) => {
        this.logger.debug(`REST Response: ${response.status} ${response.statusText}`);
        return response;
      },
      (error) => {
        if (error.response) {
          this.logger.error(
            `REST Error: ${error.response.status} ${error.response.statusText}`,
            { data: error.response.data }
          );
        } else {
          this.logger.error(`REST Error: ${error.message}`);
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Inicializuje SOAP klienta
   */
  private async initSoapClient(): Promise<SoapClient> {
    if (this.soapClient) {
      return this.soapClient;
    }

    try {
      const clientOptions = {
        wsdl_options: {
          cert: readFileSync(this.config.certPath),
          key: readFileSync(this.config.keyPath),
          passphrase: this.config.keyPassword,
          ca: this.config.caCertPath ? readFileSync(this.config.caCertPath) : undefined,
        },
        disableCache: true,
        endpoint: this.wsdlUrl.replace('.wsdl', ''),
      };

      this.logger.debug(`Initializing SOAP client with WSDL: ${this.wsdlUrl}`);
      this.soapClient = await createClientAsync(this.wsdlUrl, clientOptions);
      
      // Přidání HTTP hlaviček pro autentizaci
      this.soapClient.addHttpHeader('X-Doctor-Id', this.config.doctorId);
      this.soapClient.addHttpHeader('X-Doctor-Password', this.config.doctorPassword);
      this.soapClient.addHttpHeader('X-Facility-Id', this.config.facilityId);
      
      return this.soapClient;
    } catch (error) {
      this.logger.error('Failed to initialize SOAP client', { error });
      throw new EreceptApiError(
        'Nepodařilo se inicializovat SOAP klienta',
        'SOAP_INIT_ERROR',
        error
      );
    }
  }

  /**
   * Vytvoří nový eRecept
   */
  public async createErecept(erecept: Erecept): Promise<CreateEreceptResponse> {
    try {
      // Validace eReceptu
      EreceptSchema.parse(erecept);

      // Převod na formát LEK13
      const lek13Data = this.mapToLek13Format(erecept);
      
      // Inicializace SOAP klienta
      const client = await this.initSoapClient();
      
      this.logger.info(`Creating eRecept for patient: ${erecept.patientId}`);
      
      // Volání SOAP metody pro vytvoření eReceptu
      const result = await client.CreatePrescriptionAsync({
        prescription: lek13Data,
      });
      
      const response = result[0];
      
      if (!response.prescriptionId) {
        throw new EreceptApiError(
          'Vytvoření eReceptu selhalo - chybí ID receptu v odpovědi',
          'MISSING_PRESCRIPTION_ID'
        );
      }
      
      return {
        prescriptionId: response.prescriptionId,
        identifier: response.identifier,
        qrCode: response.qrCode,
        status: EreceptStatus.PRESCRIBED,
        createdAt: new Date().toISOString(),
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new EreceptApiError(
          'Neplatný formát eReceptu',
          'INVALID_ERECEPT_FORMAT',
          error.format()
        );
      }
      
      if ((error as ISoapError).root?.Envelope?.Body?.Fault) {
        const fault = (error as ISoapError).root.Envelope.Body.Fault;
        throw new EreceptApiError(
          `SOAP chyba: ${fault.faultstring}`,
          fault.faultcode,
          fault.detail
        );
      }
      
      throw new EreceptApiError(
        `Nepodařilo se vytvořit eRecept: ${(error as Error).message}`,
        'CREATE_ERECEPT_ERROR',
        error
      );
    }
  }

  /**
   * Stornuje eRecept
   */
  public async cancelErecept(
    prescriptionId: string,
    reason: string
  ): Promise<CancelEreceptResponse> {
    try {
      const client = await this.initSoapClient();
      
      this.logger.info(`Cancelling eRecept: ${prescriptionId}`);
      
      const result = await client.CancelPrescriptionAsync({
        prescriptionId,
        cancelReason: reason,
      });
      
      const response = result[0];
      
      return {
        prescriptionId,
        status: EreceptStatus.CANCELLED,
        cancelledAt: new Date().toISOString(),
        cancelReason: reason,
      };
    } catch (error) {
      if ((error as ISoapError).root?.Envelope?.Body?.Fault) {
        const fault = (error as ISoapError).root.Envelope.Body.Fault;
        throw new EreceptApiError(
          `SOAP chyba: ${fault.faultstring}`,
          fault.faultcode,
          fault.detail
        );
      }
      
      throw new EreceptApiError(
        `Nepodařilo se stornovat eRecept: ${(error as Error).message}`,
        'CANCEL_ERECEPT_ERROR',
        error
      );
    }
  }

  /**
   * Získá stav eReceptu
   */
  public async getEreceptStatus(
    prescriptionId: string
  ): Promise<GetEreceptStatusResponse> {
    try {
      const client = await this.initSoapClient();
      
      this.logger.info(`Getting status for eRecept: ${prescriptionId}`);
      
      const result = await client.GetPrescriptionStatusAsync({
        prescriptionId,
      });
      
      const response = result[0];
      
      return {
        prescriptionId,
        status: response.status as EreceptStatus,
        lastUpdated: response.lastUpdated,
        dispensingInfo: response.dispensingInfo ? {
          dispensedAt: response.dispensingInfo.dispensedAt,
          pharmacyId: response.dispensingInfo.pharmacyId,
          pharmacyName: response.dispensingInfo.pharmacyName,
          medications: response.dispensingInfo.medications.map((med: any) => ({
            code: med.code,
            name: med.name,
            quantity: med.quantity,
          })),
        } : undefined,
      };
    } catch (error) {
      if ((error as ISoapError).root?.Envelope?.Body?.Fault) {
        const fault = (error as ISoapError).root.Envelope.Body.Fault;
        throw new EreceptApiError(
          `SOAP chyba: ${fault.faultstring}`,
          fault.faultcode,
          fault.detail
        );
      }
      
      throw new EreceptApiError(
        `Nepodařilo se získat stav eReceptu: ${(error as Error).message}`,
        'GET_ERECEPT_STATUS_ERROR',
        error
      );
    }
  }

  /**
   * Získá seznam eReceptů pacienta
   */
  public async getPatientErecepts(
    patientId: string,
    options?: {
      status?: EreceptStatus;
      from?: string;
      to?: string;
      limit?: number;
      offset?: number;
    }
  ): Promise<Array<GetEreceptStatusResponse>> {
    try {
      const params: Record<string, string | number> = {
        patientId,
      };
      
      if (options?.status) {
        params.status = options.status;
      }
      
      if (options?.from) {
        params.from = options.from;
      }
      
      if (options?.to) {
        params.to = options.to;
      }
      
      if (options?.limit) {
        params.limit = options.limit;
      }
      
      if (options?.offset) {
        params.offset = options.offset;
      }
      
      this.logger.info(`Getting eRecepts for patient: ${patientId}`);
      
      const response = await this.restClient.get('/prescriptions', { params });
      
      return response.data.map((item: any) => ({
        prescriptionId: item.prescriptionId,
        status: item.status as EreceptStatus,
        lastUpdated: item.lastUpdated,
        dispensingInfo: item.dispensingInfo ? {
          dispensedAt: item.dispensingInfo.dispensedAt,
          pharmacyId: item.dispensingInfo.pharmacyId,
          pharmacyName: item.dispensingInfo.pharmacyName,
          medications: item.dispensingInfo.medications.map((med: any) => ({
            code: med.code,
            name: med.name,
            quantity: med.quantity,
          })),
        } : undefined,
      }));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new EreceptApiError(
          `REST chyba: ${error.response?.data?.message || error.message}`,
          `${error.response?.status || 'UNKNOWN_ERROR'}`,
          error.response?.data
        );
      }
      
      throw new EreceptApiError(
        `Nepodařilo se získat seznam eReceptů pacienta: ${(error as Error).message}`,
        'GET_PATIENT_ERECEPTS_ERROR',
        error
      );
    }
  }

  /**
   * Odešle hlášení LEK13
   */
  public async sendLek13Report(
    reportData: any,
    options?: {
      reportDate?: string;
      reportType?: 'REGULAR' | 'CORRECTION';
    }
  ): Promise<{ reportId: string; status: string }> {
    try {
      const client = await this.initSoapClient();
      
      this.logger.info('Sending LEK13 report');
      
      const result = await client.SendLek13ReportAsync({
        report: {
          data: reportData,
          reportDate: options?.reportDate || new Date().toISOString().split('T')[0],
          reportType: options?.reportType || 'REGULAR',
        },
      });
      
      const response = result[0];
      
      return {
        reportId: response.reportId,
        status: response.status,
      };
    } catch (error) {
      if ((error as ISoapError).root?.Envelope?.Body?.Fault) {
        const fault = (error as ISoapError).root.Envelope.Body.Fault;
        throw new EreceptApiError(
          `SOAP chyba: ${fault.faultstring}`,
          fault.faultcode,
          fault.detail
        );
      }
      
      throw new EreceptApiError(
        `Nepodařilo se odeslat hlášení LEK13: ${(error as Error).message}`,
        'SEND_LEK13_REPORT_ERROR',
        error
      );
    }
  }

  /**
   * Převede FHIR MedicationRequest na eRecept
   */
  public mapFromFhir(
    medicationRequest: MedicationRequest,
    patient: Patient,
    practitioner: Practitioner,
    organization: Organization,
    medication: Medication
  ): Erecept {
    // Získání rodného čísla pacienta
    const birthNumberExt = patient.extension?.find(
      e => e.url === 'https://hl7.cz/fhir/core/StructureDefinition/birth-number'
    );
    const birthNumber = birthNumberExt?.valueString || '';
    
    // Získání čísla pojištěnce
    const insuranceNumberExt = patient.extension?.find(
      e => e.url === 'https://hl7.cz/fhir/core/StructureDefinition/insurance-number'
    );
    const insuranceNumber = insuranceNumberExt?.valueString || '';
    
    // Získání kódu pojišťovny
    const insuranceCompanyExt = patient.extension?.find(
      e => e.url === 'https://hl7.cz/fhir/core/StructureDefinition/insurance-company-code'
    );
    const insuranceCompany = insuranceCompanyExt?.valueString || '111'; // VZP jako výchozí
    
    // Získání léků
    const medications = [];
    
    if (medication) {
      const dosage = medicationRequest.dosageInstruction?.[0]?.text || '';
      const quantity = medicationRequest.dispenseRequest?.quantity?.value || 1;
      
      const med = {
        code: medication.code?.coding?.[0]?.code || '',
        name: medication.code?.text || medication.code?.coding?.[0]?.display || '',
        strength: medication.form?.text || '',
        form: medication.form?.coding?.[0]?.display || '',
        packageSize: '',
        dosage,
        quantity,
        isChronicMedication: medicationRequest.category?.some(
          c => c.coding?.some(coding => coding.code === 'chronic')
        ) || false,
      };
      
      medications.push(med);
    }
    
    // Vytvoření eReceptu
    const erecept: Erecept = {
      doctorId: this.config.doctorId,
      patientId: birthNumber,
      patientInsuranceNumber: insuranceNumber,
      patientInsuranceCompany: insuranceCompany,
      medications,
      validUntil: medicationRequest.dispenseRequest?.validityPeriod?.end,
      emergencyLevel: medicationRequest.priority === 'stat' 
        ? 'emergency' 
        : medicationRequest.priority === 'urgent' 
          ? 'acute' 
          : 'regular',
    };
    
    return erecept;
  }

  /**
   * Převede eRecept na FHIR Bundle
   */
  public mapToFhir(
    erecept: Erecept,
    patient: Patient,
    practitioner: Practitioner,
    organization: Organization
  ): Bundle {
    const now = new Date().toISOString();
    const bundle: Bundle = {
      resourceType: 'Bundle',
      type: 'transaction',
      entry: [],
    };
    
    // Přidání pacienta
    bundle.entry?.push({
      resource: patient,
      request: {
        method: 'PUT',
        url: `Patient/${patient.id}`,
      },
    });
    
    // Přidání lékaře
    bundle.entry?.push({
      resource: practitioner,
      request: {
        method: 'PUT',
        url: `Practitioner/${practitioner.id}`,
      },
    });
    
    // Přidání organizace
    bundle.entry?.push({
      resource: organization,
      request: {
        method: 'PUT',
        url: `Organization/${organization.id}`,
      },
    });
    
    // Přidání léků a receptů
    for (const med of erecept.medications) {
      // Vytvoření Medication
      const medication: Medication = {
        resourceType: 'Medication',
        id: `med-${med.code}`,
        code: {
          coding: [
            {
              system: 'http://www.sukl.cz/sukl-list-of-medicinal-products',
              code: med.code,
              display: med.name,
            },
          ],
          text: med.name,
        },
        form: {
          coding: [
            {
              system: 'http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm',
              code: med.form || 'TAB',
              display: med.form || 'Tableta',
            },
          ],
          text: med.form || 'Tableta',
        },
        status: 'active',
      };
      
      bundle.entry?.push({
        resource: medication,
        request: {
          method: 'PUT',
          url: `Medication/${medication.id}`,
        },
      });
      
      // Vytvoření MedicationRequest
      const medicationRequest: MedicationRequest = {
        resourceType: 'MedicationRequest',
        id: `erecept-${erecept.prescriptionId || 'new'}`,
        status: 'active',
        intent: 'order',
        medicationReference: {
          reference: `Medication/${medication.id}`,
        },
        subject: {
          reference: `Patient/${patient.id}`,
        },
        requester: {
          reference: `Practitioner/${practitioner.id}`,
        },
        recorder: {
          reference: `Practitioner/${practitioner.id}`,
        },
        performer: {
          reference: `Organization/${organization.id}`,
        },
        dosageInstruction: [
          {
            text: med.dosage,
          },
        ],
        dispenseRequest: {
          quantity: {
            value: med.quantity,
            system: 'http://unitsofmeasure.org',
            code: '{package}',
          },
          validityPeriod: {
            start: now,
            end: erecept.validUntil || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
          },
        },
        priority: erecept.emergencyLevel === 'emergency' 
          ? 'stat' 
          : erecept.emergencyLevel === 'acute' 
            ? 'urgent' 
            : 'routine',
        category: med.isChronicMedication 
          ? [
              {
                coding: [
                  {
                    system: 'http://terminology.hl7.org/CodeSystem/medicationrequest-category',
                    code: 'chronic',
                    display: 'Chronic',
                  },
                ],
              },
            ] 
          : undefined,
        authoredOn: now,
        extension: [
          {
            url: 'https://hl7.cz/fhir/core/StructureDefinition/erecept-id',
            valueIdentifier: {
              system: 'https://hl7.cz/fhir/sid/cz/erecept',
              value: erecept.prescriptionId || '',
            },
          },
        ],
      };
      
      bundle.entry?.push({
        resource: medicationRequest,
        request: {
          method: 'PUT',
          url: `MedicationRequest/${medicationRequest.id}`,
        },
      });
    }
    
    return bundle;
  }

  /**
   * Převede eRecept na formát LEK13
   * @private
   */
  private mapToLek13Format(erecept: Erecept): any {
    // Implementace mapování na formát LEK13
    // Toto je zjednodušená verze, reálná implementace by byla komplexnější
    return {
      header: {
        doctorId: erecept.doctorId,
        facilityId: this.config.facilityId,
        timestamp: new Date().toISOString(),
      },
      patient: {
        birthNumber: erecept.patientId,
        insuranceNumber: erecept.patientInsuranceNumber,
        insuranceCompany: erecept.patientInsuranceCompany,
      },
      medications: erecept.medications.map(med => ({
        code: med.code,
        name: med.name,
        strength: med.strength,
        form: med.form,
        packageSize: med.packageSize,
        dosage: med.dosage,
        quantity: med.quantity,
        isChronicMedication: med.isChronicMedication,
      })),
      validUntil: erecept.validUntil || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      emergencyLevel: erecept.emergencyLevel || 'regular',
    };
  }
}

export default EreceptClient;
