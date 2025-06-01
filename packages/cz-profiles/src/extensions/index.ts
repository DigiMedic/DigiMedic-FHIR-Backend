/**
 * České FHIR Extensions
 * Implementace českých rozšíření dle HL7 Czech Core IG v0.3.0
 * @see https://build.fhir.org/ig/HL7-cz/cz-core/
 */

import { Extension, StructureDefinition } from '@medplum/fhir-types';
import { createStructureDefinition, createElementDefinition } from '@medplum/core';

// URL identifikátory pro české extensions
export const CZ_BIRTH_NUMBER_EXTENSION_URL = 'https://hl7.cz/fhir/core/StructureDefinition/birth-number';
export const CZ_INSURANCE_NUMBER_EXTENSION_URL = 'https://hl7.cz/fhir/core/StructureDefinition/insurance-number';
export const CZ_ZIPCODE_EXTENSION_URL = 'https://hl7.cz/fhir/core/StructureDefinition/zipcode';
export const CZ_ID_CARD_NUMBER_EXTENSION_URL = 'https://hl7.cz/fhir/core/StructureDefinition/id-card-number';
export const CZ_INSURANCE_COMPANY_CODE_EXTENSION_URL = 'https://hl7.cz/fhir/core/StructureDefinition/insurance-company-code';
export const CZ_ORGANIZATION_ID_EXTENSION_URL = 'https://hl7.cz/fhir/core/StructureDefinition/organization-id';
export const CZ_UZIS_PROVIDER_CODE_EXTENSION_URL = 'https://hl7.cz/fhir/core/StructureDefinition/uzis-provider-code';

/**
 * StructureDefinition pro rodné číslo
 */
export const BirthNumberExtension: StructureDefinition = createStructureDefinition({
  url: CZ_BIRTH_NUMBER_EXTENSION_URL,
  name: 'BirthNumber',
  title: 'Rodné číslo',
  status: 'active',
  description: 'Rodné číslo ve formátu RRMMDD/XXXX nebo RRMMDDXXXX',
  fhirVersion: '4.0.1',
  kind: 'complex-type',
  abstract: false,
  type: 'Extension',
  baseDefinition: 'http://hl7.org/fhir/StructureDefinition/Extension',
  derivation: 'constraint',
  publisher: 'DigiMedic',
  differential: {
    element: [
      createElementDefinition({
        id: 'Extension',
        path: 'Extension',
        short: 'Rodné číslo',
        definition: 'Rodné číslo ve formátu RRMMDD/XXXX nebo RRMMDDXXXX',
        min: 0,
        max: '1',
      }),
      createElementDefinition({
        id: 'Extension.url',
        path: 'Extension.url',
        fixedUri: CZ_BIRTH_NUMBER_EXTENSION_URL,
      }),
      createElementDefinition({
        id: 'Extension.value[x]',
        path: 'Extension.value[x]',
        min: 1,
        type: [{ code: 'string' }],
      }),
    ],
  },
});

/**
 * StructureDefinition pro číslo pojištěnce
 */
export const InsuranceNumberExtension: StructureDefinition = createStructureDefinition({
  url: CZ_INSURANCE_NUMBER_EXTENSION_URL,
  name: 'InsuranceNumber',
  title: 'Číslo pojištěnce',
  status: 'active',
  description: 'Číslo pojištěnce zdravotní pojišťovny',
  fhirVersion: '4.0.1',
  kind: 'complex-type',
  abstract: false,
  type: 'Extension',
  baseDefinition: 'http://hl7.org/fhir/StructureDefinition/Extension',
  derivation: 'constraint',
  publisher: 'DigiMedic',
  differential: {
    element: [
      createElementDefinition({
        id: 'Extension',
        path: 'Extension',
        short: 'Číslo pojištěnce',
        definition: 'Číslo pojištěnce zdravotní pojišťovny',
        min: 0,
        max: '1',
      }),
      createElementDefinition({
        id: 'Extension.url',
        path: 'Extension.url',
        fixedUri: CZ_INSURANCE_NUMBER_EXTENSION_URL,
      }),
      createElementDefinition({
        id: 'Extension.value[x]',
        path: 'Extension.value[x]',
        min: 1,
        type: [{ code: 'string' }],
      }),
    ],
  },
});

/**
 * StructureDefinition pro české PSČ
 */
export const ZipcodeExtension: StructureDefinition = createStructureDefinition({
  url: CZ_ZIPCODE_EXTENSION_URL,
  name: 'Zipcode',
  title: 'České PSČ',
  status: 'active',
  description: 'České poštovní směrovací číslo ve formátu XXX XX',
  fhirVersion: '4.0.1',
  kind: 'complex-type',
  abstract: false,
  type: 'Extension',
  baseDefinition: 'http://hl7.org/fhir/StructureDefinition/Extension',
  derivation: 'constraint',
  publisher: 'DigiMedic',
  differential: {
    element: [
      createElementDefinition({
        id: 'Extension',
        path: 'Extension',
        short: 'České PSČ',
        definition: 'České poštovní směrovací číslo ve formátu XXX XX',
        min: 0,
        max: '1',
      }),
      createElementDefinition({
        id: 'Extension.url',
        path: 'Extension.url',
        fixedUri: CZ_ZIPCODE_EXTENSION_URL,
      }),
      createElementDefinition({
        id: 'Extension.value[x]',
        path: 'Extension.value[x]',
        min: 1,
        type: [{ code: 'string' }],
      }),
    ],
  },
});

/**
 * StructureDefinition pro číslo občanského průkazu
 */
export const IdCardNumberExtension: StructureDefinition = createStructureDefinition({
  url: CZ_ID_CARD_NUMBER_EXTENSION_URL,
  name: 'IdCardNumber',
  title: 'Číslo občanského průkazu',
  status: 'active',
  description: 'Číslo občanského průkazu',
  fhirVersion: '4.0.1',
  kind: 'complex-type',
  abstract: false,
  type: 'Extension',
  baseDefinition: 'http://hl7.org/fhir/StructureDefinition/Extension',
  derivation: 'constraint',
  publisher: 'DigiMedic',
  differential: {
    element: [
      createElementDefinition({
        id: 'Extension',
        path: 'Extension',
        short: 'Číslo občanského průkazu',
        definition: 'Číslo občanského průkazu',
        min: 0,
        max: '1',
      }),
      createElementDefinition({
        id: 'Extension.url',
        path: 'Extension.url',
        fixedUri: CZ_ID_CARD_NUMBER_EXTENSION_URL,
      }),
      createElementDefinition({
        id: 'Extension.value[x]',
        path: 'Extension.value[x]',
        min: 1,
        type: [{ code: 'string' }],
      }),
    ],
  },
});

/**
 * StructureDefinition pro kód zdravotní pojišťovny
 */
export const InsuranceCompanyCodeExtension: StructureDefinition = createStructureDefinition({
  url: CZ_INSURANCE_COMPANY_CODE_EXTENSION_URL,
  name: 'InsuranceCompanyCode',
  title: 'Kód zdravotní pojišťovny',
  status: 'active',
  description: 'Kód zdravotní pojišťovny v ČR (např. 111, 201, 207, 211)',
  fhirVersion: '4.0.1',
  kind: 'complex-type',
  abstract: false,
  type: 'Extension',
  baseDefinition: 'http://hl7.org/fhir/StructureDefinition/Extension',
  derivation: 'constraint',
  publisher: 'DigiMedic',
  differential: {
    element: [
      createElementDefinition({
        id: 'Extension',
        path: 'Extension',
        short: 'Kód zdravotní pojišťovny',
        definition: 'Kód zdravotní pojišťovny v ČR (např. 111, 201, 207, 211)',
        min: 0,
        max: '1',
      }),
      createElementDefinition({
        id: 'Extension.url',
        path: 'Extension.url',
        fixedUri: CZ_INSURANCE_COMPANY_CODE_EXTENSION_URL,
      }),
      createElementDefinition({
        id: 'Extension.value[x]',
        path: 'Extension.value[x]',
        min: 1,
        type: [{ code: 'string' }],
      }),
    ],
  },
});

/**
 * StructureDefinition pro IČO organizace
 */
export const OrganizationIdExtension: StructureDefinition = createStructureDefinition({
  url: CZ_ORGANIZATION_ID_EXTENSION_URL,
  name: 'OrganizationId',
  title: 'IČO organizace',
  status: 'active',
  description: 'Identifikační číslo organizace (IČO)',
  fhirVersion: '4.0.1',
  kind: 'complex-type',
  abstract: false,
  type: 'Extension',
  baseDefinition: 'http://hl7.org/fhir/StructureDefinition/Extension',
  derivation: 'constraint',
  publisher: 'DigiMedic',
  differential: {
    element: [
      createElementDefinition({
        id: 'Extension',
        path: 'Extension',
        short: 'IČO organizace',
        definition: 'Identifikační číslo organizace (IČO)',
        min: 0,
        max: '1',
      }),
      createElementDefinition({
        id: 'Extension.url',
        path: 'Extension.url',
        fixedUri: CZ_ORGANIZATION_ID_EXTENSION_URL,
      }),
      createElementDefinition({
        id: 'Extension.value[x]',
        path: 'Extension.value[x]',
        min: 1,
        type: [{ code: 'string' }],
      }),
    ],
  },
});

/**
 * StructureDefinition pro kód poskytovatele ÚZIS
 */
export const UzisProviderCodeExtension: StructureDefinition = createStructureDefinition({
  url: CZ_UZIS_PROVIDER_CODE_EXTENSION_URL,
  name: 'UzisProviderCode',
  title: 'Kód poskytovatele ÚZIS',
  status: 'active',
  description: 'Kód poskytovatele zdravotních služeb dle ÚZIS',
  fhirVersion: '4.0.1',
  kind: 'complex-type',
  abstract: false,
  type: 'Extension',
  baseDefinition: 'http://hl7.org/fhir/StructureDefinition/Extension',
  derivation: 'constraint',
  publisher: 'DigiMedic',
  differential: {
    element: [
      createElementDefinition({
        id: 'Extension',
        path: 'Extension',
        short: 'Kód poskytovatele ÚZIS',
        definition: 'Kód poskytovatele zdravotních služeb dle ÚZIS',
        min: 0,
        max: '1',
      }),
      createElementDefinition({
        id: 'Extension.url',
        path: 'Extension.url',
        fixedUri: CZ_UZIS_PROVIDER_CODE_EXTENSION_URL,
      }),
      createElementDefinition({
        id: 'Extension.value[x]',
        path: 'Extension.value[x]',
        min: 1,
        type: [{ code: 'string' }],
      }),
    ],
  },
});

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
 * Vytvoří extension pro číslo občanského průkazu
 */
export function createIdCardNumberExtension(idCardNumber: string): Extension {
  return {
    url: CZ_ID_CARD_NUMBER_EXTENSION_URL,
    valueString: idCardNumber,
  };
}

/**
 * Vytvoří extension pro kód zdravotní pojišťovny
 */
export function createInsuranceCompanyCodeExtension(insuranceCompanyCode: string): Extension {
  return {
    url: CZ_INSURANCE_COMPANY_CODE_EXTENSION_URL,
    valueString: insuranceCompanyCode,
  };
}

/**
 * Vytvoří extension pro IČO organizace
 */
export function createOrganizationIdExtension(organizationId: string): Extension {
  return {
    url: CZ_ORGANIZATION_ID_EXTENSION_URL,
    valueString: organizationId,
  };
}

/**
 * Vytvoří extension pro kód poskytovatele ÚZIS
 */
export function createUzisProviderCodeExtension(uzisProviderCode: string): Extension {
  return {
    url: CZ_UZIS_PROVIDER_CODE_EXTENSION_URL,
    valueString: uzisProviderCode,
  };
}

// Export všech extensions
export const CzExtensions = {
  BirthNumberExtension,
  InsuranceNumberExtension,
  ZipcodeExtension,
  IdCardNumberExtension,
  InsuranceCompanyCodeExtension,
  OrganizationIdExtension,
  UzisProviderCodeExtension,
};

export default CzExtensions;
