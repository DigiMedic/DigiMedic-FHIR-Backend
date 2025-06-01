/**
 * @digimedic/cz-i18n
 * 
 * Hlavní entry point pro lokalizační balík DigiMedic FHIR Backend.
 * Poskytuje funkce pro překlad textů do češtiny a správu lokalizací.
 */

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

// Import lokálních překladů (bude generováno/načítáno)
import { resources } from './locales';

/**
 * Inicializace i18next instance.
 * Používá HttpBackend pro načítání překladů a LanguageDetector pro detekci jazyka.
 */
i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'cs', // Výchozí jazyk
    debug: process.env.NODE_ENV === 'development', // Debug mód ve vývoji
    interpolation: {
      escapeValue: false, // React již escapuje XSS
    },
    resources: resources, // Lokální zdroje překladů
    ns: ['translation', 'fhir', 'medical', 'errors'], // Namespaces
    defaultNS: 'translation',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // Cesta k souborům s překlady
    },
  });

/**
 * Získá překlad pro daný klíč.
 * @param key Klíč překladu (např. 'common.helloWorld')
 * @param lang Jazyk, ve kterém se má překlad získat (např. 'cs', 'en'). Pokud není zadán, použije se aktuální jazyk i18n.
 * @param options Volitelné parametry pro interpolaci nebo kontext.
 * @returns Přeložený text.
 */
export function getTranslation(key: string, lang?: string, options?: i18n.TFunctionOptions): string {
  if (lang) {
    return i18n.getFixedT(lang)(key, options);
  }
  return i18n.t(key, options);
}

/**
 * Změní aktuální jazyk aplikace.
 * @param lang Nový jazyk (např. 'cs', 'en').
 * @returns Promise, která se vyřeší po změně jazyka.
 */
export function changeLanguage(lang: string): Promise<i18n.TFunction> {
  return i18n.changeLanguage(lang);
}

/**
 * Přidá nové překlady do i18n instance.
 * @param lng Jazyk překladů (např. 'cs', 'en').
 * @param ns Namespace překladů (např. 'translation', 'fhir').
 * @param resources Objekt s překlady.
 */
export function addResources(lng: string, ns: string, resources: Record<string, any>): void {
  i18n.addResourceBundle(lng, ns, resources, true, true);
}

/**
 * Formátuje datum podle českých konvencí.
 * @param date Datum k formátování.
 * @param format Formát (short, medium, long, full).
 * @returns Formátované datum.
 */
export function formatDate(date: Date | string, format: 'short' | 'medium' | 'long' | 'full' = 'medium'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: format === 'short' ? '2-digit' : 'long',
    day: 'numeric',
  };
  
  return dateObj.toLocaleDateString('cs-CZ', options);
}

/**
 * Formátuje čas podle českých konvencí.
 * @param time Čas k formátování.
 * @param includeSeconds Zda zahrnout sekundy.
 * @returns Formátovaný čas.
 */
export function formatTime(time: Date | string, includeSeconds = false): string {
  const timeObj = typeof time === 'string' ? new Date(time) : time;
  
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: includeSeconds ? '2-digit' : undefined,
    hour12: false,
  };
  
  return timeObj.toLocaleTimeString('cs-CZ', options);
}

/**
 * Formátuje číslo podle českých konvencí.
 * @param num Číslo k formátování.
 * @param decimals Počet desetinných míst.
 * @returns Formátované číslo.
 */
export function formatNumber(num: number, decimals = 2): string {
  return num.toLocaleString('cs-CZ', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Formátuje měnu podle českých konvencí.
 * @param amount Částka.
 * @param currency Měna (výchozí: CZK).
 * @returns Formátovaná částka s měnou.
 */
export function formatCurrency(amount: number, currency = 'CZK'): string {
  return amount.toLocaleString('cs-CZ', {
    style: 'currency',
    currency,
  });
}

// Export i18n instance pro přímé použití v pokročilých scénářích
export { i18n };

// Export typů pro snadnější použití
export type { TFunction } from 'i18next';

// Export resources pro přímý přístup k překladům
export { resources };

// Výchozí export
export default i18n;
