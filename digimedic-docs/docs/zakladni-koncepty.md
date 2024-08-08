---
sidebar_position: 3
---

# Základní koncepty

Tato sekce poskytuje přehled klíčových konceptů a technologií používaných v DigiMedic FHIR Backend.

## FHIR (Fast Healthcare Interoperability Resources)

FHIR je standard pro výměnu zdravotnických informací vyvinutý organizací HL7. DigiMedic FHIR Backend implementuje tento standard pro zajištění interoperability a snadné výměny dat mezi různými zdravotnickými systémy.

### Klíčové vlastnosti FHIR:

- Založen na moderních webových technologiích
- Používá RESTful API
- Podporuje různé formáty dat, včetně JSON a XML
- Definuje standardní sadu zdrojů pro reprezentaci zdravotnických dat

## České FHIR profily

DigiMedic FHIR Backend implementuje a rozšiřuje standardní FHIR profily pro specifické potřeby českého zdravotnictví. Tyto profily zajišťují, že data jsou strukturována způsobem, který je v souladu s českými zdravotnickými standardy a požadavky.

## Bezpečnost a ochrana osobních údajů

Bezpečnost a ochrana osobních údajů jsou klíčovými aspekty DigiMedic FHIR Backend:

- **Šifrování**: Veškerá data jsou šifrována pomocí AES-256 v klidu a TLS během přenosu.
- **Autentizace**: Využíváme Authentik a OAuth 2.0 pro bezpečnou autentizaci uživatelů a aplikací.
- **Autorizace**: Implementujeme detailní systém rolí a oprávnění pro kontrolu přístupu k datům.
- **Audit**: Veškeré přístupy a změny dat jsou logovány pro účely auditu.

## Integrace s českými zdravotnickými systémy

DigiMedic FHIR Backend poskytuje integrační rozhraní pro klíčové české zdravotnické systémy:

- eHealth
- eRecept
- ISIN (Informační systém infekčních nemocí)
- NZIS (Národní zdravotnický informační systém)
- DRG (Diagnosis Related Group)
- DASTA (Datový standard Ministerstva zdravotnictví ČR)

## Real-time komunikace

Pro zajištění okamžité aktualizace dat využíváme:

- **WebSockets**: Pro real-time aktualizace v webových aplikacích
- **MQTT**: Pro efektivní komunikaci s IoT zařízeními a mobilními aplikacemi

## Škálovatelnost a výkon

DigiMedic FHIR Backend je navržen s ohledem na vysokou škálovatelnost a výkon:

- Využívá PostgreSQL pro robustní a škálovatelné ukládání dat
- Implementuje efektivní caching mechanismy pro optimalizaci výkonu
- Podporuje horizontální škálování pro zvládnutí vysoké zátěže

## Rozšiřitelnost

Architektura DigiMedic FHIR Backend je navržena s důrazem na rozšiřitelnost:

- Modulární struktura umožňuje snadné přidávání nových funkcí
- Podporuje pluginy pro rozšíření funkcionality
- Umožňuje definici vlastních FHIR profilů a rozšíření

Pochopení těchto základních konceptů vám pomůže efektivně využívat DigiMedic FHIR Backend ve vašich projektech. Pro více informací o konkrétních funkcích a jejich implementaci se podívejte do naší [API reference](./api-reference.md) nebo prozkoumejte [příklady použití](./priklady-pouziti.md).