/**
 * @digimedic/cz-profiles
 * 
 * České FHIR profily, validátory, extensions a utility funkce
 * pro DigiMedic FHIR Backend založený na Medplum.
 * 
 * Implementace českých rozšíření dle HL7 Czech Core IG v0.3.0
 * @see https://build.fhir.org/ig/HL7-cz/cz-core/
 */

// Import českých FHIR profilů
import CZ_Patient, {
  CZ_PATIENT_PROFILE_URL,
  CZ_BIRTH_NUMBER_EXTENSION_URL,
  CZ_INSURANCE_NUMBER_EXTENSION_URL,
  CZ_ZIPCODE_EXTENSION_URL,
  createCzPatient,
  validateCzPatient,
  birthNumberSchema,
} from './profiles/CZ_Patient';

// Import českých extensions
import CzExtensions, {
  BirthNumberExtension,
  InsuranceNumberExtension,
  ZipcodeExtension,
  IdCardNumberExtension,
  InsuranceCompanyCodeExtension,
  OrganizationIdExtension,
  UzisProviderCodeExtension,
  createBirthNumberExtension,
  createInsuranceNumberExtension,
  createZipcodeExtension,
  createIdCardNumberExtension,
  createInsuranceCompanyCodeExtension,
  createOrganizationIdExtension,
  createUzisProviderCodeExtension,
} from './extensions';

// Konstanty pro URL identifikátory
export const PROFILE_URLS = {
  CZ_PATIENT: CZ_PATIENT_PROFILE_URL,
};

export const EXTENSION_URLS = {
  BIRTH_NUMBER: CZ_BIRTH_NUMBER_EXTENSION_URL,
  INSURANCE_NUMBER: CZ_INSURANCE_NUMBER_EXTENSION_URL,
  ZIPCODE: CZ_ZIPCODE_EXTENSION_URL,
  ID_CARD_NUMBER: 'https://hl7.cz/fhir/core/StructureDefinition/id-card-number',
  INSURANCE_COMPANY_CODE: 'https://hl7.cz/fhir/core/StructureDefinition/insurance-company-code',
  ORGANIZATION_ID: 'https://hl7.cz/fhir/core/StructureDefinition/organization-id',
  UZIS_PROVIDER_CODE: 'https://hl7.cz/fhir/core/StructureDefinition/uzis-provider-code',
};

// Export českých FHIR profilů
export {
  CZ_Patient,
  createCzPatient,
  validateCzPatient,
  birthNumberSchema,
};

// Export českých extensions
export {
  CzExtensions,
  BirthNumberExtension,
  InsuranceNumberExtension,
  ZipcodeExtension,
  IdCardNumberExtension,
  InsuranceCompanyCodeExtension,
  OrganizationIdExtension,
  UzisProviderCodeExtension,
  createBirthNumberExtension,
  createInsuranceNumberExtension,
  createZipcodeExtension,
  createIdCardNumberExtension,
  createInsuranceCompanyCodeExtension,
  createOrganizationIdExtension,
  createUzisProviderCodeExtension,
};

// Export validátorů
export const validators = {
  validateCzPatient,
  birthNumberSchema,
};

// Export všech profilů jako kolekce
export const profiles = {
  CZ_Patient,
};

// Export všech extensions jako kolekce
export const extensions = CzExtensions;

// Export utility funkcí
export * from './utils';

// Výchozí export
export default {
  profiles,
  extensions,
  validators,
  PROFILE_URLS,
  EXTENSION_URLS,
};
