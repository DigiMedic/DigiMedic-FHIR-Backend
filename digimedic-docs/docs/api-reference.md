---
sidebar_position: 4
---

# API Reference

Tato sekce poskytuje přehled API endpointů dostupných v DigiMedic FHIR Backend. Pro každý endpoint uvádíme základní informace o jeho účelu, požadovaných parametrech a příkladech použití.

## Autentizace

Všechny API endpointy vyžadují autentizaci. DigiMedic FHIR Backend používá OAuth 2.0 pro autentizaci. Pro přístup k API potřebujete získat přístupový token.

### Získání přístupového tokenu

```
POST /auth/token
```

#### Parametry požadavku

| Název | Typ | Popis |
|-------|-----|-------|
| grant_type | string | Typ grantu (např. "client_credentials") |
| client_id | string | ID klienta |
| client_secret | string | Tajný klíč klienta |

#### Příklad odpovědi

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

## FHIR Endpointy

DigiMedic FHIR Backend implementuje standardní FHIR endpointy pro práci se zdravotnickými daty.

### Pacienti

#### Získání seznamu pacientů

```
GET /Patient
```

#### Vytvoření nového pacienta

```
POST /Patient
```

#### Získání konkrétního pacienta

```
GET /Patient/{id}
```

#### Aktualizace pacienta

```
PUT /Patient/{id}
```

#### Smazání pacienta

```
DELETE /Patient/{id}
```

### Vyšetření

#### Získání seznamu vyšetření

```
GET /Encounter
```

#### Vytvoření nového vyšetření

```
POST /Encounter
```

#### Získání konkrétního vyšetření

```
GET /Encounter/{id}
```

#### Aktualizace vyšetření

```
PUT /Encounter/{id}
```

#### Smazání vyšetření

```
DELETE /Encounter/{id}
```

## České rozšíření

DigiMedic FHIR Backend poskytuje dodatečné endpointy specifické pro české zdravotnictví.

### eRecept

#### Vytvoření eReceptu

```
POST /eRecept
```

#### Získání eReceptu

```
GET /eRecept/{id}
```

### ISIN

#### Hlášení infekční nemoci

```
POST /ISIN/report
```

### NZIS

#### Odeslání dat do NZIS

```
POST /NZIS/submit
```

## Chybové kódy

DigiMedic FHIR Backend používá standardní HTTP stavové kódy pro indikaci úspěchu či neúspěchu API požadavků. Zde jsou některé nejčastější kódy:

- 200 OK - Požadavek byl úspěšný
- 201 Created - Zdroj byl úspěšně vytvořen
- 400 Bad Request - Požadavek byl neplatný nebo nemůže být obsloužen
- 401 Unauthorized - Autentizace selhala nebo uživatel nemá potřebná oprávnění
- 403 Forbidden - Přístup je zakázán
- 404 Not Found - Požadovaný zdroj nebyl nalezen
- 500 Internal Server Error - Server narazil na neočekávanou podmínku, která mu zabránila splnit požadavek

Pro podrobnější informace o konkrétních endpointech, jejich parametrech a příkladech použití se obraťte na naši kompletní API dokumentaci nebo kontaktujte náš tým podpory.