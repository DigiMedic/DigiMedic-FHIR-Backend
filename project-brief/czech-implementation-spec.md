# Specifikace implementace Medplum pro české prostředí

## 1. Úvod
Tento dokument popisuje specifikace a požadavky pro přizpůsobení platformy Medplum pro použití v České republice v rámci projektu DigiMedic FHIR Backend. Cílem je vytvořit plně funkční systém, který splňuje všechny legislativní požadavky, standardy a specifika českého zdravotnictví.

## 2. Cíle projektu
- Přizpůsobit Medplum pro použití v České republice
- Implementovat české FHIR profily a rozšíření
- Zajistit interoperabilitu s českými zdravotnickými systémy
- Splnit požadavky na EHDS (European Health Data Space) a další české standardy
- Zajistit soulad s českou legislativou v oblasti zdravotnictví a ochrany osobních údajů

## 3. Klíčové oblasti implementace

### 3.1 Lokalizace a internacionalizace
- Překlad uživatelského rozhraní do češtiny
- Implementace českých formátů pro data, časy a měny
- Přizpůsobení pro české kulturní specifika ve zdravotnictví

### 3.2 FHIR profily a rozšíření
- Implementace českých FHIR profilů (CZ_Patient, CZ_Practitioner, CZ_Organization, CZ_Medication)
- Vytvoření nových FHIR rozšíření pro specifické české požadavky (např. rodné číslo, číslo pojištěnce)
- Zajištění kompatibility s HL7 Czech Core Resources IG v0.1.0

### 3.3 Integrace s českými systémy
- Implementace rozhraní pro NCPeH ČR (Národní kontaktní místo pro elektronické zdravotnictví)
- Integrace s eReceptem a eNeschopenkou
- Propojení s Národním registrem poskytovatelů zdravotních služeb (NRPZS)
- Zajištění kompatibility s DASTA (Datový standard Ministerstva zdravotnictví ČR)
- Integrace s ISIN (Informační systém infekčních nemocí)
- Napojení na NZIS (Národní zdravotnický informační systém)
- Implementace rozhraní pro DRG (Diagnosis Related Group)

### 3.4 Bezpečnost a ochrana osobních údajů
- Zajištění souladu s GDPR a českými zákony o ochraně osobních údajů
- Implementace mechanismů pro správu souhlasů pacientů
- Vytvoření modulu pro anonymizaci dat
- Implementace dodatečných bezpečnostních mechanismů (např. dvoufaktorová autentizace)
- Audit a optimalizace šifrování dat
- Implementace logování a auditních záznamů dle českých požadavků

### 3.5 Autentizace a autorizace
- Přizpůsobení pro použití s českými poskytovateli identity (např. NIA - Národní identitní autorita)
- Implementace specifických rolí a oprávnění pro české zdravotnické prostředí

## 4. Technické specifikace

### 4.1 Úpravy existujících balíčků Medplum
- @medplum/core: Implementace českých FHIR profilů a rozšíření validačních pravidel
- @medplum/react: Lokalizace komponent a přidání nových komponent pro české specifické funkce
- @medplum/server: Integrace s českými systémy a implementace API endpointů pro komunikaci s NCPeH

### 4.2 Nové balíčky
- @medplum/czech-profiles: Implementace českých FHIR profilů a rozšíření
- @medplum/czech-integration: Integrace s NCPeH a dalšími českými systémy

### 4.3 Specifické funkce
- Implementace českých zdravotnických workflow pomocí Medplum Bots
- Vytvoření specifických FHIR operací pro české prostředí
- Implementace rozhraní pro EHDS (European Health Data Space)

## 5. Standardy a legislativa
Implementace musí být v souladu s následujícími standardy a legislativními požadavky:
- HL7 FHIR R4
- HL7 Czech Core Resources IG v0.1.0
- IHE profily relevantní pro české prostředí
- DASTA (Datový standard Ministerstva zdravotnictví ČR)
- Standardy NCPeH pro přeshraniční výměnu zdravotnických dat
- Zákon č. 372/2011 Sb., o zdravotních službách
- Zákon č. 181/2014 Sb., o kybernetické bezpečnosti
- Vyhláška č. 98/2012 Sb., o zdravotnické dokumentaci
- GDPR a související české zákony o ochraně osobních údajů

## 6. Testování a validace
- Rozšíření testovací sady o scénáře specifické pro české prostředí
- Implementace validačních pravidel pro české FHIR profily
- Testování integrace s českými systémy
- Vytvoření testovacího prostředí simulujícího české zdravotnické systémy
- Zajištění souladu s Testovacím rámcem ověření interoperability IS poskytovatele zdravotních služeb s infrastrukturou NCPeH ČR
- Provedení penetračních testů
- Uživatelské testování s českými zdravotníky
- Zátěžové testování

## 7. Dokumentace
- Vytvoření české dokumentace pro uživatele a vývojáře
- Aktualizace existující dokumentace o české specifika
- Vytvoření průvodce implementací pro české prostředí
- Vytvoření českých vzorových aplikací a příkladů použití

## 8. Metriky úspěchu
- Úspěšná certifikace pro použití v českém zdravotnictví
- 100% shoda s požadavky GDPR a českými zákony o ochraně osobních údajů
- Úspěšná integrace s hlavními českými zdravotnickými systémy (eRecept, eNeschopenka, NRPZS, ISIN, NZIS)
- Pozitivní zpětná vazba od pilotních uživatelů (lékaři, nemocnice)
- Dosažení vysoké úspěšnosti v interoperabilitních testech s NCPeH

## 9. Potenciální rizika a jejich zmírnění
- Změny v legislativě: Pravidelné konzultace s právními experty a flexibilní architektura
- Kompatibilita s existujícími systémy: Důkladné testování integrace a vytvoření přechodových strategií
- Bezpečnostní hrozby: Pravidelné bezpečnostní audity a implementace nejnovějších bezpečnostních praktik
- Nedostatek expertízy v českém zdravotnickém systému: Spolupráce s lokálními experty a institucemi

## 10. Plán implementace
1. Fáze přípravy a analýzy
2. Fáze vývoje základní infrastruktury
3. Fáze integrace s českými systémy
4. Fáze vývoje specifických funkcí
5. Fáze bezpečnosti a compliance
6. Fáze lokalizace a UI/UX
7. Fáze testování a validace
8. Fáze pilotního nasazení
9. Fáze certifikace a finalizace
10. Fáze produkčního nasazení a podpory (ongoing)

Celková doba implementace bude záviset na mnoha faktorech a bude průběžně upřesňována během projektu.

## 11. Další kroky
- Konzultace s českými odborníky na zdravotnickou informatiku
- Navázání spolupráce s relevantními českými institucemi (ÚZIS, SÚKL)
- Vytvoření detailního harmonogramu implementace
- Pravidelné revize a aktualizace specifikace na základě nových požadavků a změn v českém zdravotnictví
- Ustanovení týmu pro podporu a údržbu
- Plánování pravidelných aktualizací a vylepšení
- Kontinuální sledování změn v legislativě a standardech

## 12. Závěr
Tato specifikace poskytuje komplexní přehled požadavků a kroků potřebných pro úspěšné přizpůsobení Medplum pro české prostředí v rámci projektu DigiMedic FHIR Backend. Implementace by měla být prováděna v úzké spolupráci s českými zdravotnickými institucemi a odborníky, aby bylo zajištěno, že výsledný systém bude plně vyhovovat potřebám českého zdravotnictví a splňovat všechny legislativní a technické požadavky. Agilní přístup k vývoji umožní flexibilní reakce na změny požadavků, přičemž důraz na dokumentaci a školení uživatelů je zásadní pro úspěšnou adopci systému.
