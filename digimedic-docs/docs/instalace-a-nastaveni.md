---
sidebar_position: 2
---

# Instalace a nastavení

Tato sekce vás provede procesem instalace a nastavení DigiMedic FHIR Backend.

## Systémové požadavky

Před instalací se ujistěte, že váš systém splňuje následující požadavky:

- Node.js (verze 18+ požadována, verze 20+ doporučena)
- Docker
- Git

## Krok 1: Klonování repozitáře

Nejprve naklonujte repozitář DigiMedic FHIR Backend:

```bash
git clone https://github.com/DigiMedic/digimedic-fhir-backend.git
cd digimedic-fhir-backend
```

## Krok 2: Instalace závislostí

Nainstalujte potřebné závislosti pomocí npm:

```bash
npm ci
```

## Krok 3: Konfigurace

Vytvořte soubor `.env` v kořenovém adresáři projektu a nastavte potřebné proměnné prostředí:

```
DATABASE_URL=postgresql://user:password@localhost:5432/digimedic
JWT_SECRET=vasetajneklic
```

## Krok 4: Spuštění databáze

Použijte Docker Compose pro spuštění PostgreSQL a Redis:

```bash
docker-compose up -d
```

## Krok 5: Spuštění aplikace

Nyní můžete spustit DigiMedic FHIR Backend:

```bash
npm run dev
```

Aplikace by měla být nyní dostupná na `http://localhost:3000`.

## Další kroky

- Prozkoumejte [základní koncepty](./zakladni-koncepty.md) DigiMedic FHIR Backend
- Podívejte se na [API referenci](./api-reference.md) pro detailní informace o dostupných endpointech
- Vyzkoušejte si některé [příklady použití](./priklady-pouziti.md)

Pokud narazíte na jakékoli problémy během instalace nebo nastavení, neváhejte se obrátit na naši [podporu](mailto:podpora@digimedic.cz).