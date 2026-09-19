import { createI18n } from 'vue-i18n';
import type { LangMessages } from './locales/types.ts';
import esMessages from './locales/es/index.ts';

// Registro automático de idiomas mediante import.meta.glob
const loaders = import.meta.glob<{ default: LangMessages }>('./locales/*/index.ts');

export const supportedLocales: string[] = Object.keys(loaders).map((p) => p.split('/')[2]);

// Idioma base por defecto
export const defaultLocale = 'es';

/**
 * Determina el idioma inicial del usuario:
 * 1. localStorage('locale')
 * 2. navigator.language (primeros 2 caracteres si está en supportedLocales)
 * 3. 'es' (fallback)
 */
export function getInitialLocale(): string {
  if (typeof window === 'undefined') return defaultLocale;

  try {
    const saved = localStorage.getItem('locale');
    if (saved && supportedLocales.includes(saved)) {
      return saved;
    }

    const browserLang = (navigator.language || '').slice(0, 2).toLowerCase();
    if (browserLang && supportedLocales.includes(browserLang)) {
      return browserLang;
    }
  } catch {
    // Si localStorage está bloqueado por el navegador
  }

  return defaultLocale;
}

// Inyección de variables globales de interpolación para no tener que pasarlas a mano
const initialLocale = getInitialLocale();

export const i18n = createI18n({
  legacy: false,
  locale: initialLocale,
  fallbackLocale: defaultLocale,
  messages: {
    es: esMessages,
  },
  // Inyección global de {orgName} en todos los mensajes
  globalInjection: true,
});

// Cache para almacenar idiomas cargados perezosamente
const loadedLanguages: Set<string> = new Set(['es']);

/**
 * Carga un idioma de forma asíncrona si aún no ha sido cargado.
 */
export async function loadLocaleMessages(locale: string): Promise<void> {
  if (loadedLanguages.has(locale)) {
    (i18n.global.locale as any).value = locale;
    return;
  }

  const loaderKey = `./locales/${locale}/index.ts`;
  const loader = loaders[loaderKey];

  if (!loader) {
    console.warn(`[i18n] No loader found for locale: "${locale}"`);
    return;
  }

  try {
    const messages = await loader();
    i18n.global.setLocaleMessage(locale, messages.default as any);
    loadedLanguages.add(locale);
    (i18n.global.locale as any).value = locale;
  } catch (error) {
    console.error(`[i18n] Failed to load messages for locale: "${locale}"`, error);
  }
}

/**
 * Carga los nombres nativos de cada idioma soportado (campo common.languageName)
 */
export async function getLanguageNames(): Promise<Record<string, string>> {
  const names: Record<string, string> = {
    es: esMessages.common.languageName,
  };

  for (const loc of supportedLocales) {
    if (loc === 'es') continue;
    try {
      const loaderKey = `./locales/${loc}/index.ts`;
      const loader = loaders[loaderKey];
      if (loader) {
        const mod = await loader();
        names[loc] = mod.default.common.languageName;
      }
    } catch {
      names[loc] = loc.toUpperCase();
    }
  }

  return names;
}
