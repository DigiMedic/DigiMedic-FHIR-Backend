---
sidebar_position: 5
---

# Příklady použití

Tato sekce obsahuje praktické příklady použití DigiMedic FHIR Backend v různých scénářích. Tyto příklady vám pomohou lépe pochopit, jak integrovat naše řešení do vašich aplikací a systémů.

## 1. Registrace nového pacienta

Tento příklad ukazuje, jak zaregistrovat nového pacienta pomocí DigiMedic FHIR Backend API.

```javascript
const axios = require('axios');

async function registerPatient(patientData) {
  try {
    const response = await axios.post('https://api.digimedic.cz/Patient', patientData, {
      headers: {
        'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
        'Content-Type': 'application/fhir+json'
      }
    });
    console.log('Pacient úspěšně zaregistrován:', response.data);
    return response.data;
  } catch (error) {
    console.error('Chyba při registraci pacienta:', error.response.data);
  }
}

const newPatient = {
  resourceType: 'Patient',
  name: [{ 
    use: 'official',
    family: 'Novák',
    given: ['Jan']
  }],
  gender: 'male',
  birthDate: '1980-01-01'
};

registerPatient(newPatient);
```

## 2. Vytvoření záznamu o vyšetření

Tento příklad demonstruje, jak vytvořit nový záznam o vyšetření pro existujícího pacienta.

```javascript
const axios = require('axios');

async function createEncounter(patientId, encounterData) {
  try {
    const response = await axios.post('https://api.digimedic.cz/Encounter', encounterData, {
      headers: {
        'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
        'Content-Type': 'application/fhir+json'
      }
    });
    console.log('Záznam o vyšetření úspěšně vytvořen:', response.data);
    return response.data;
  } catch (error) {
    console.error('Chyba při vytváření záznamu o vyšetření:', error.response.data);
  }
}

const newEncounter = {
  resourceType: 'Encounter',
  status: 'finished',
  class: {
    system: 'http://terminology.hl7.org/CodeSystem/v3-ActCode',
    code: 'AMB',
    display: 'ambulatory'
  },
  subject: {
    reference: `Patient/${patientId}`
  },
  period: {
    start: '2023-06-15T09:00:00+02:00',
    end: '2023-06-15T09:30:00+02:00'
  },
  reasonCode: [{
    coding: [{
      system: 'http://snomed.info/sct',
      code: '386661006',
      display: 'Fever'
    }]
  }]
};

createEncounter('patient123', newEncounter);
```

## 3. Vyhledávání pacientů

Tento příklad ukazuje, jak vyhledávat pacienty podle různých kritérií.

```javascript
const axios = require('axios');

async function searchPatients(searchParams) {
  try {
    const response = await axios.get('https://api.digimedic.cz/Patient', {
      params: searchParams,
      headers: {
        'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
      }
    });
    console.log('Nalezení pacienti:', response.data);
    return response.data;
  } catch (error) {
    console.error('Chyba při vyhledávání pacientů:', error.response.data);
  }
}

// Vyhledání pacientů s příjmením Novák
searchPatients({ family: 'Novák' });

// Vyhledání pacientů narozených po 1.1.1980
searchPatients({ birthdate: 'gt1980-01-01' });

// Vyhledání pacientů s konkrétním identifikátorem
searchPatients({ identifier: 'https://nrpzs.cz/patient-identifier|12345' });
```

## 4. Odeslání eReceptu

Tento příklad demonstruje, jak vytvořit a odeslat eRecept pomocí DigiMedic FHIR Backend.

```javascript
const axios = require('axios');

async function createEPrescription(prescriptionData) {
  try {
    const response = await axios.post('https://api.digimedic.cz/eRecept', prescriptionData, {
      headers: {
        'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
        'Content-Type': 'application/fhir+json'
      }
    });
    console.log('eRecept úspěšně vytvořen:', response.data);
    return response.data;
  } catch (error) {
    console.error('Chyba při vytváření eReceptu:', error.response.data);
  }
}

const newPrescription = {
  resourceType: 'MedicationRequest',
  status: 'active',
  intent: 'order',
  medicationCodeableConcept: {
    coding: [{
      system: 'http://www.sukl.cz/sukl-list-of-medicinal-products',
      code: '0000000',
      display: 'Paralen 500mg tablety'
    }]
  },
  subject: {
    reference: 'Patient/patient123'
  },
  authoredOn: '2023-06-15',
  requester: {
    reference: 'Practitioner/doctor456'
  },
  dosageInstruction: [{
    text: '1 tableta 3krát denně',
    timing: {
      repeat: {
        frequency: 3,
        period: 1,
        periodUnit: 'd'
      }
    },
    doseAndRate: [{
      doseQuantity: {
        value: 1,
        unit: 'tableta',
        system: 'http://unitsofmeasure.org',
        code: '{tbl}'
      }
    }]
  }]
};

createEPrescription(newPrescription);
```

Tyto příklady poskytují základní představu o tom, jak pracovat s DigiMedic FHIR Backend API. Pro více informací o dostupných endpointech a jejich parametrech se podívejte do naší [API reference](./api-reference.md). Pokud potřebujete pomoc s implementací nebo máte další otázky, neváhejte kontaktovat náš tým podpory.