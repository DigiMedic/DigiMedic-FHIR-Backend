/**
 * Utility funkce pro práci s českými FHIR profily
 * 
 * Obsahuje validátory, formátovací funkce a helper funkce
 * pro běžné operace s českými zdravotnickými daty.
 */

import { z } from 'zod';
import { Patient, Practitioner, Organization, Extension } from '@medplum/fhir-types';

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
 * Schéma pro validaci českého PSČ
 */
export const zipcodeSchema = z.string().refine(
  (value) => {
    // Validace formátu XXX XX nebo XXXXX
    const withoutSpace = value.replace(/\s/g, '');
    if (!/^\d{5}$/.test(withoutSpace)) {
      return false;
    }
    
    return true;
  },
  {
    message: 'Neplatné PSČ. Očekávaný formát: XXX XX nebo XXXXX.',
  }
);

/**
 * Schéma pro validaci IČO
 */
export const icoSchema = z.string().refine(
  (value) => {
    // Validace formátu 8 číslic
    if (!/^\d{8}$/.test(value)) {
      return false;
    }
    
    // Kontrola modulo 11
    let sum = 0;
    for (let i = 0; i < 7; i++) {
      sum += parseInt(value[i]) * (8 - i);
    }
    
    const checkDigit = 11 - (sum % 11);
    const lastDigit = parseInt(value[7]);
    
    return checkDigit === 11 ? lastDigit === 0 : checkDigit === 10 ? lastDigit === 1 : checkDigit === lastDigit;
  },
  {
    message: 'Neplatné IČO. Očekávaný formát: 8 číslic s platným kontrolním součtem.',
  }
);

/**
 * Schéma pro validaci čísla pojištěnce
 */
export const insuranceNumberSchema = z.string().refine(
  (value) => {
    // Číslo pojištěnce může být rodné číslo nebo jiný formát
    try {
      birthNumberSchema.parse(value);
      return true;
    } catch (e) {
      // Alternativní formáty čísla pojištěnce (např. cizinci)
      return /^\d{9,10}$/.test(value.replace('/', ''));
    }
  },
  {
    message: 'Neplatné číslo pojištěnce.',
  }
);

/**
 * Schéma pro validaci českého telefonního čísla
 */
export const czechPhoneSchema = z.string().refine(
  (value) => {
    // Odstranění mezer, závorek a pomlček
    const cleaned = value.replace(/[\s()\-+]/g, '');
    
    // Validace formátu
    if (cleaned.startsWith('00420')) {
      return /^00420\d{9}$/.test(cleaned);
    } else if (cleaned.startsWith('+420')) {
      return /^\+420\d{9}$/.test(cleaned);
    } else if (cleaned.startsWith('420')) {
      return /^420\d{9}$/.test(cleaned);
    } else {
      return /^\d{9}$/.test(cleaned);
    }
  },
  {
    message: 'Neplatné české telefonní číslo. Očekávaný formát: +420 XXX XXX XXX nebo 9 číslic.',
  }
);

/**
 * Kódy českých zdravotních pojišťoven
 */
export enum CzechInsuranceCompanyCodes {
  VZP = '111',
  VOZP = '201',
  CPZP = '205',
  OZP = '207',
  ZPS = '209',
  ZPMV = '211',
  RBP = '213',
}

/**
 * Informace o českých zdravotních pojišťovnách
 */
export const czechInsuranceCompanies = {
  '111': {
    code: '111',
    name: 'Všeobecná zdravotní pojišťovna ČR',
    shortName: 'VZP',
    website: 'https://www.vzp.cz/',
  },
  '201': {
    code: '201',
    name: 'Vojenská zdravotní pojišťovna ČR',
    shortName: 'VOZP',
    website: 'https://www.vozp.cz/',
  },
  '205': {
    code: '205',
    name: 'Česká průmyslová zdravotní pojišťovna',
    shortName: 'ČPZP',
    website: 'https://www.cpzp.cz/',
  },
  '207': {
    code: '207',
    name: 'Oborová zdravotní pojišťovna zaměstnanců bank, pojišťoven a stavebnictví',
    shortName: 'OZP',
    website: 'https://www.ozp.cz/',
  },
  '209': {
    code: '209',
    name: 'Zaměstnanecká pojišťovna Škoda',
    shortName: 'ZPŠ',
    website: 'https://www.zpskoda.cz/',
  },
  '211': {
    code: '211',
    name: 'Zdravotní pojišťovna ministerstva vnitra ČR',
    shortName: 'ZPMV',
    website: 'https://www.zpmvcr.cz/',
  },
  '213': {
    code: '213',
    name: 'Revírní bratrská pokladna, zdravotní pojišťovna',
    shortName: 'RBP',
    website: 'https://www.rbp213.cz/',
  },
};

/**
 * Získá informace o zdravotní pojišťovně podle kódu
 */
export function getInsuranceCompanyInfo(code: string) {
  return czechInsuranceCompanies[code as keyof typeof czechInsuranceCompanies] || null;
}

/**
 * Formátuje rodné číslo do standardního formátu RRMMDD/XXXX
 */
export function formatBirthNumber(birthNumber: string): string {
  const withoutSlash = birthNumber.replace('/', '');
  
  if (withoutSlash.length === 9 || withoutSlash.length === 10) {
    return `${withoutSlash.substring(0, 6)}/${withoutSlash.substring(6)}`;
  }
  
  return birthNumber;
}

/**
 * Formátuje české PSČ do standardního formátu XXX XX
 */
export function formatZipcode(zipcode: string): string {
  const withoutSpace = zipcode.replace(/\s/g, '');
  
  if (withoutSpace.length === 5) {
    return `${withoutSpace.substring(0, 3)} ${withoutSpace.substring(3)}`;
  }
  
  return zipcode;
}

/**
 * Formátuje české telefonní číslo do standardního formátu +420 XXX XXX XXX
 */
export function formatCzechPhone(phone: string): string {
  // Odstranění mezer, závorek a pomlček
  const cleaned = phone.replace(/[\s()\-]/g, '');
  
  // Odstranění předvolby a přidání +420
  let nationalNumber;
  if (cleaned.startsWith('00420')) {
    nationalNumber = cleaned.substring(5);
  } else if (cleaned.startsWith('+420')) {
    nationalNumber = cleaned.substring(4);
  } else if (cleaned.startsWith('420')) {
    nationalNumber = cleaned.substring(3);
  } else {
    nationalNumber = cleaned;
  }
  
  // Formátování
  if (nationalNumber.length === 9) {
    return `+420 ${nationalNumber.substring(0, 3)} ${nationalNumber.substring(3, 6)} ${nationalNumber.substring(6)}`;
  }
  
  return phone;
}

/**
 * Převede české datum ve formátu DD.MM.YYYY na ISO formát YYYY-MM-DD
 */
export function czechDateToIso(czechDate: string): string {
  const parts = czechDate.split('.');
  if (parts.length === 3) {
    const day = parts[0].trim().padStart(2, '0');
    const month = parts[1].trim().padStart(2, '0');
    const year = parts[2].trim();
    
    return `${year}-${month}-${day}`;
  }
  
  return czechDate;
}

/**
 * Převede ISO datum YYYY-MM-DD na české datum DD.MM.YYYY
 */
export function isoToCzechDate(isoDate: string): string {
  const date = new Date(isoDate);
  
  if (isNaN(date.getTime())) {
    return isoDate;
  }
  
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  
  return `${day}.${month}.${year}`;
}

/**
 * Získá rodné číslo z FHIR Patient resource
 */
export function getBirthNumberFromPatient(patient: Patient): string | null {
  // Zkusit najít v extension
  const birthNumberExt = patient.extension?.find(
    e => e.url === 'https://hl7.cz/fhir/core/StructureDefinition/birth-number'
  );
  
  if (birthNumberExt?.valueString) {
    return birthNumberExt.valueString;
  }
  
  // Zkusit najít v identifier
  const birthNumberId = patient.identifier?.find(
    id => id.system === 'https://hl7.cz/fhir/sid/cz/rcis'
  );
  
  if (birthNumberId?.value) {
    return birthNumberId.value;
  }
  
  return null;
}

/**
 * Získá číslo pojištěnce z FHIR Patient resource
 */
export function getInsuranceNumberFromPatient(patient: Patient): string | null {
  // Zkusit najít v extension
  const insuranceNumberExt = patient.extension?.find(
    e => e.url === 'https://hl7.cz/fhir/core/StructureDefinition/insurance-number'
  );
  
  if (insuranceNumberExt?.valueString) {
    return insuranceNumberExt.valueString;
  }
  
  // Zkusit najít v identifier
  const insuranceNumberId = patient.identifier?.find(
    id => id.system === 'https://hl7.cz/fhir/sid/cz/cip'
  );
  
  if (insuranceNumberId?.value) {
    return insuranceNumberId.value;
  }
  
  return null;
}

/**
 * Získá kód zdravotní pojišťovny z FHIR Patient resource
 */
export function getInsuranceCompanyFromPatient(patient: Patient): string | null {
  // Zkusit najít v extension
  const insuranceCompanyExt = patient.extension?.find(
    e => e.url === 'https://hl7.cz/fhir/core/StructureDefinition/insurance-company-code'
  );
  
  if (insuranceCompanyExt?.valueString) {
    return insuranceCompanyExt.valueString;
  }
  
  // Zkusit najít v coverage
  // Toto by vyžadovalo načtení Coverage resource, což není možné v této utility funkci
  
  return null;
}

/**
 * Získá IČO z FHIR Organization resource
 */
export function getIcoFromOrganization(organization: Organization): string | null {
  // Zkusit najít v extension
  const icoExt = organization.extension?.find(
    e => e.url === 'https://hl7.cz/fhir/core/StructureDefinition/organization-id'
  );
  
  if (icoExt?.valueString) {
    return icoExt.valueString;
  }
  
  // Zkusit najít v identifier
  const icoId = organization.identifier?.find(
    id => id.system === 'https://hl7.cz/fhir/sid/cz/ico'
  );
  
  if (icoId?.value) {
    return icoId.value;
  }
  
  return null;
}

/**
 * Získá ÚZIS kód poskytovatele z FHIR Organization resource
 */
export function getUzisCodeFromOrganization(organization: Organization): string | null {
  // Zkusit najít v extension
  const uzisExt = organization.extension?.find(
    e => e.url === 'https://hl7.cz/fhir/core/StructureDefinition/uzis-provider-code'
  );
  
  if (uzisExt?.valueString) {
    return uzisExt.valueString;
  }
  
  // Zkusit najít v identifier
  const uzisId = organization.identifier?.find(
    id => id.system === 'https://hl7.cz/fhir/sid/cz/uzis'
  );
  
  if (uzisId?.value) {
    return uzisId.value;
  }
  
  return null;
}

/**
 * Získá číslo pojištěnce z rodného čísla
 * (v mnoha případech je to stejné, ale ne vždy)
 */
export function getInsuranceNumberFromBirthNumber(birthNumber: string): string {
  return formatBirthNumber(birthNumber);
}

/**
 * Určí pohlaví podle rodného čísla
 */
export function getGenderFromBirthNumber(birthNumber: string): 'male' | 'female' | 'unknown' {
  try {
    const withoutSlash = birthNumber.replace('/', '');
    
    if (!/^\d{9,10}$/.test(withoutSlash)) {
      return 'unknown';
    }
    
    const month = parseInt(withoutSlash.substring(2, 4));
    
    return month > 50 ? 'female' : 'male';
  } catch (e) {
    return 'unknown';
  }
}

/**
 * Určí datum narození z rodného čísla
 */
export function getBirthDateFromBirthNumber(birthNumber: string): string | null {
  try {
    const withoutSlash = birthNumber.replace('/', '');
    
    if (!/^\d{9,10}$/.test(withoutSlash)) {
      return null;
    }
    
    let year = parseInt(withoutSlash.substring(0, 2));
    let month = parseInt(withoutSlash.substring(2, 4));
    const day = parseInt(withoutSlash.substring(4, 6));
    
    // Určení století
    if (withoutSlash.length === 10) {
      // RČ s kontrolní číslicí (po roce 1954)
      if (year < 54) {
        year += 2000;
      } else {
        year += 1900;
      }
    } else {
      // RČ bez kontrolní číslice (před rokem 1954)
      year += 1900;
    }
    
    // Úprava měsíce (u žen +50)
    if (month > 50) {
      month -= 50;
    }
    
    // Formátování data
    const monthStr = month.toString().padStart(2, '0');
    const dayStr = day.toString().padStart(2, '0');
    
    return `${year}-${monthStr}-${dayStr}`;
  } catch (e) {
    return null;
  }
}

/**
 * Validátory pro české formáty
 */
export const validators = {
  birthNumber: birthNumberSchema,
  zipcode: zipcodeSchema,
  ico: icoSchema,
  insuranceNumber: insuranceNumberSchema,
  czechPhone: czechPhoneSchema,
};

/**
 * Formátovací funkce pro české formáty
 */
export const formatters = {
  birthNumber: formatBirthNumber,
  zipcode: formatZipcode,
  czechPhone: formatCzechPhone,
  czechDateToIso,
  isoToCzechDate,
};

/**
 * Helper funkce pro práci s českými FHIR profily
 */
export const helpers = {
  getBirthNumberFromPatient,
  getInsuranceNumberFromPatient,
  getInsuranceCompanyFromPatient,
  getIcoFromOrganization,
  getUzisCodeFromOrganization,
  getInsuranceNumberFromBirthNumber,
  getGenderFromBirthNumber,
  getBirthDateFromBirthNumber,
  getInsuranceCompanyInfo,
};

export default {
  validators,
  formatters,
  helpers,
  czechInsuranceCompanies,
  CzechInsuranceCompanyCodes,
};
