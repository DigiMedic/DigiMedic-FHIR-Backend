/**
 * CZ_Patient - český profil pro FHIR Patient resource
 * Založeno na HL7 Czech Core IG v0.3.0
 * @see https://build.fhir.org/ig/HL7-cz/cz-core/
 */

import { StructureDefinition, ElementDefinition, Extension, Patient } from '@medplum/fhir-types';
import { createStructureDefinition, createElementDefinition } from '@medplum/core';
import { z } from 'zod';

/**
 * URL identifikátor pro český profil Patient
 */
export const CZ_PATIENT_PROFILE_URL = 'https://hl7.cz/fhir/core/StructureDefinition/CZ_Patient';

/**
 * URL identifikátor pro extension rodného čísla
 */
export const CZ_BIRTH_NUMBER_EXTENSION_URL = 'https://hl7.cz/fhir/core/StructureDefinition/birth-number';

/**
 * URL identifikátor pro extension čísla pojištěnce
 */
export const CZ_INSURANCE_NUMBER_EXTENSION_URL = 'https://hl7.cz/fhir/core/StructureDefinition/insurance-number';

/**
 * URL identifikátor pro extension českého PSČ
 */
export const CZ_ZIPCODE_EXTENSION_URL = 'https://hl7.cz/fhir/core/StructureDefinition/zipcode';

/**
 * Schéma pro validaci rodného čísla
 */
export const birthNumberSchema = z.string().refine(
  (value) => {
    // Validace formátu RRMMDD/XXXX nebo RRMMDDXXXX
    const withoutSlash = value.replace('/', '');
    if (!/^\d{9,10}$/.test(withoutSlash)) {
      return false;
    }

    // Extrakce částí rodného čísla
    const year = parseInt(withoutSlash.substring(0, 2));
    let month = parseInt(withoutSlash.substring(2, 4));
    const day = parseInt(withoutSlash.substring(4, 6));
    
    // Kontrola měsíce (u žen +50)
    const isFemale = month > 50;
    if (isFemale) {
      month -= 50;
    }
    
    if (month < 1 || month > 12) {
      return false;
    }
    
    // Kontrola dne
    if (day < 1 || day > 31) {
      return false;
    }
    
    // Kontrola modulo 11 pro RČ vydaná po 1.1.1954
    if (withoutSlash.length === 10) {
      const mod = parseInt(withoutSlash) % 11;
      return mod === 0;
    }
    
    return true;
  },
  {
    message: 'Neplatné rodné číslo. Očekávaný formát: RRMMDD/XXXX nebo RRMMDDXXXX.',
  }
);

/**
 * Vytvoří extension pro rodné číslo
 */
export function createBirthNumberExtension(birthNumber: string): Extension {
  return {
    url: CZ_BIRTH_NUMBER_EXTENSION_URL,
    valueString: birthNumber,
  };
}

/**
 * Vytvoří extension pro číslo pojištěnce
 */
export function createInsuranceNumberExtension(insuranceNumber: string): Extension {
  return {
    url: CZ_INSURANCE_NUMBER_EXTENSION_URL,
    valueString: insuranceNumber,
  };
}

/**
 * Vytvoří extension pro české PSČ
 */
export function createZipcodeExtension(zipcode: string): Extension {
  return {
    url: CZ_ZIPCODE_EXTENSION_URL,
    valueString: zipcode,
  };
}

/**
 * Vytvoří český profil pro Patient
 */
export const CZ_Patient: StructureDefinition = createStructureDefinition({
  url: CZ_PATIENT_PROFILE_URL,
  name: 'CZ_Patient',
  title: 'Český profil pro pacienta',
  status: 'active',
  description: 'Český profil pro FHIR Patient resource založený na HL7 Czech Core IG v0.3.0',
  fhirVersion: '4.0.1',
  kind: 'resource',
  abstract: false,
  type: 'Patient',
  baseDefinition: 'http://hl7.org/fhir/StructureDefinition/Patient',
  derivation: 'constraint',
  publisher: 'DigiMedic',
  differential: {
    element: [
      // Root element
      createElementDefinition({
        id: 'Patient',
        path: 'Patient',
        short: 'Český profil pro pacienta',
        definition: 'Profil pro pacienta s českými rozšířeními jako rodné číslo a číslo pojištěnce',
      }),
      
      // Extension pro rodné číslo
      createElementDefinition({
        id: 'Patient.extension:birthNumber',
        path: 'Patient.extension',
        sliceName: 'birthNumber',
        short: 'Rodné číslo pacienta',
        definition: 'Rodné číslo pacienta ve formátu RRMMDD/XXXX',
        min: 0,
        max: '1',
        type: [{ code: 'Extension', profile: [CZ_BIRTH_NUMBER_EXTENSION_URL] }],
      }),
      
      // Extension pro číslo pojištěnce
      createElementDefinition({
        id: 'Patient.extension:insuranceNumber',
        path: 'Patient.extension',
        sliceName: 'insuranceNumber',
        short: 'Číslo pojištěnce',
        definition: 'Číslo pojištěnce zdravotní pojišťovny',
        min: 0,
        max: '1',
        type: [{ code: 'Extension', profile: [CZ_INSURANCE_NUMBER_EXTENSION_URL] }],
      }),
      
      // Identifier - přidání českých identifikátorů
      createElementDefinition({
        id: 'Patient.identifier',
        path: 'Patient.identifier',
        slicing: {
          discriminator: [{ type: 'value', path: 'system' }],
          ordered: false,
          rules: 'open',
        },
        min: 0,
      }),
      
      // Slice pro rodné číslo jako identifikátor
      createElementDefinition({
        id: 'Patient.identifier:birthNumber',
        path: 'Patient.identifier',
        sliceName: 'birthNumber',
        short: 'Rodné číslo jako identifikátor',
        definition: 'Rodné číslo pacienta použité jako identifikátor',
        min: 0,
        max: '1',
      }),
      
      // Systém pro rodné číslo
      createElementDefinition({
        id: 'Patient.identifier:birthNumber.system',
        path: 'Patient.identifier.system',
        min: 1,
        fixedUri: 'https://hl7.cz/fhir/sid/cz/rcis',
      }),
      
      // Slice pro číslo pojištěnce
      createElementDefinition({
        id: 'Patient.identifier:insuranceNumber',
        path: 'Patient.identifier',
        sliceName: 'insuranceNumber',
        short: 'Číslo pojištěnce jako identifikátor',
        definition: 'Číslo pojištěnce zdravotní pojišťovny jako identifikátor',
        min: 0,
        max: '1',
      }),
      
      // Systém pro číslo pojištěnce
      createElementDefinition({
        id: 'Patient.identifier:insuranceNumber.system',
        path: 'Patient.identifier.system',
        min: 1,
        fixedUri: 'https://hl7.cz/fhir/sid/cz/cip',
      }),
      
      // Adresa - přizpůsobení pro české adresy
      createElementDefinition({
        id: 'Patient.address',
        path: 'Patient.address',
        short: 'Adresa pacienta',
        definition: 'Adresa pacienta podle českých standardů',
      }),
      
      // PSČ - extension pro české PSČ
      createElementDefinition({
        id: 'Patient.address.extension:zipcode',
        path: 'Patient.address.extension',
        sliceName: 'zipcode',
        short: 'České PSČ',
        definition: 'České poštovní směrovací číslo ve formátu XXX XX',
        min: 0,
        max: '1',
        type: [{ code: 'Extension', profile: [CZ_ZIPCODE_EXTENSION_URL] }],
      }),
      
      // Město/obec
      createElementDefinition({
        id: 'Patient.address.city',
        path: 'Patient.address.city',
        short: 'Město/obec',
        definition: 'Město nebo obec v adrese',
        min: 0,
        max: '1',
      }),
      
      // Kraj
      createElementDefinition({
        id: 'Patient.address.state',
        path: 'Patient.address.state',
        short: 'Kraj',
        definition: 'Kraj v adrese',
        min: 0,
        max: '1',
      }),
    ],
  },
});

/**
 * Validuje, zda Patient resource odpovídá českému profilu
 */
export function validateCzPatient(patient: Patient): boolean {
  // Kontrola rodného čísla v extension
  const birthNumberExt = patient.extension?.find(e => e.url === CZ_BIRTH_NUMBER_EXTENSION_URL);
  if (birthNumberExt?.valueString) {
    try {
      birthNumberSchema.parse(birthNumberExt.valueString);
    } catch (error) {
      return false;
    }
  }
  
  // Kontrola rodného čísla v identifier
  const birthNumberId = patient.identifier?.find(
    id => id.system === 'https://hl7.cz/fhir/sid/cz/rcis'
  );
  if (birthNumberId?.value) {
    try {
      birthNumberSchema.parse(birthNumberId.value);
    } catch (error) {
      return false;
    }
  }
  
  return true;
}

/**
 * Vytvoří nový Patient resource odpovídající českému profilu
 */
export function createCzPatient(params: {
  birthNumber?: string;
  insuranceNumber?: string;
  givenName: string;
  familyName: string;
  gender?: 'male' | 'female' | 'other' | 'unknown';
  birthDate?: string;
}): Patient {
  const { birthNumber, insuranceNumber, givenName, familyName, gender, birthDate } = params;
  
  const patient: Patient = {
    resourceType: 'Patient',
    meta: {
      profile: [CZ_PATIENT_PROFILE_URL],
    },
    name: [
      {
        given: [givenName],
        family: familyName,
        use: 'official',
      },
    ],
    extension: [],
  };
  
  if (gender) {
    patient.gender = gender;
  }
  
  if (birthDate) {
    patient.birthDate = birthDate;
  }
  
  // Přidání rodného čísla jako extension
  if (birthNumber) {
    patient.extension?.push(createBirthNumberExtension(birthNumber));
    
    // Přidání rodného čísla také jako identifikátor
    if (!patient.identifier) {
      patient.identifier = [];
    }
    
    patient.identifier.push({
      system: 'https://hl7.cz/fhir/sid/cz/rcis',
      value: birthNumber,
      type: {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/v2-0203',
            code: 'NI',
            display: 'National unique individual identifier',
          },
        ],
      },
    });
  }
  
  // Přidání čísla pojištěnce jako extension
  if (insuranceNumber) {
    patient.extension?.push(createInsuranceNumberExtension(insuranceNumber));
    
    // Přidání čísla pojištěnce také jako identifikátor
    if (!patient.identifier) {
      patient.identifier = [];
    }
    
    patient.identifier.push({
      system: 'https://hl7.cz/fhir/sid/cz/cip',
      value: insuranceNumber,
      type: {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/v2-0203',
            code: 'PI',
            display: 'Patient internal identifier',
          },
        ],
      },
    });
  }
  
  return patient;
}

export default CZ_Patient;
