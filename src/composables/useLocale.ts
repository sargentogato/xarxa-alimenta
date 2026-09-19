import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { supportedLocales, loadLocaleMessages, getLanguageNames } from '../i18n.ts';

const languageNames = ref<Record<string, string>>({
  es: 'Español',
  en: 'English',
});

let namesLoaded = false;

export function useLocale() {
  const { locale } = useI18n();

  async function loadNames() {
    if (namesLoaded) return;
    namesLoaded = true;
    try {
      const names = await getLanguageNames();
      languageNames.value = names;
    } catch (err) {
      console.error('[useLocale] Error loading language names', err);
    }
  }

  async function setLocale(newLocale: string) {
    if (!supportedLocales.includes(newLocale)) {
      console.warn(`[useLocale] Unsupported locale: ${newLocale}`);
      return;
    }

    await loadLocaleMessages(newLocale);
    locale.value = newLocale;

    try {
      localStorage.setItem('locale', newLocale);
    } catch {
      // ignore
    }

    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLocale;
    }
  }

  function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    const defaultOptions: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    return new Intl.DateTimeFormat(locale.value, options || defaultOptions).format(d);
  }

  onMounted(() => {
    loadNames();
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale.value;
    }
  });

  return {
    locale,
    supportedLocales,
    languageNames,
    setLocale,
    formatDate,
  };
}
