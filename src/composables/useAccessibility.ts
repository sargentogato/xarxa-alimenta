import { ref, watch, onMounted } from 'vue';

export interface AccessibilitySettings {
  textSizeStep: 1 | 2 | 3 | 4;
  highContrast: boolean;
  legibleFont: boolean;
  wideSpacing: boolean;
  underlineLinks: boolean;
  reduceMotion: boolean;
}

const defaultSettings: AccessibilitySettings = {
  textSizeStep: 1,
  highContrast: false,
  legibleFont: false,
  wideSpacing: false,
  underlineLinks: false,
  reduceMotion: false,
};

const settings = ref<AccessibilitySettings>({ ...defaultSettings });
let initialized = false;

export function useAccessibility() {
  function init() {
    if (initialized || typeof window === 'undefined') return;
    initialized = true;

    // 1. Cargar preferencias guardadas
    try {
      const stored = localStorage.getItem('a11y');
      if (stored) {
        const parsed = JSON.parse(stored);
        settings.value = {
          textSizeStep: [1, 2, 3, 4].includes(parsed.textSizeStep) ? parsed.textSizeStep : 1,
          highContrast: Boolean(parsed.highContrast),
          legibleFont: Boolean(parsed.legibleFont),
          wideSpacing: Boolean(parsed.wideSpacing),
          underlineLinks: Boolean(parsed.underlineLinks),
          reduceMotion: Boolean(parsed.reduceMotion),
        };
      }
    } catch {
      // ignore
    }

    // 2. Si el sistema prefiere movimiento reducido y no hay valor explícito, activarlo
    try {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches && !localStorage.getItem('a11y')) {
        settings.value.reduceMotion = true;
      }
    } catch {
      // ignore
    }

    applyToDom();
  }

  function applyToDom() {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;

    // 1. Tamaño del texto
    root.setAttribute('data-a11y-text', String(settings.value.textSizeStep));

    // 2. Alto contraste
    if (settings.value.highContrast) {
      root.setAttribute('data-a11y-contrast', 'high');
    } else {
      root.removeAttribute('data-a11y-contrast');
    }

    // 3. Fuente legible
    if (settings.value.legibleFont) {
      root.setAttribute('data-a11y-font', 'legible');
    } else {
      root.removeAttribute('data-a11y-font');
    }

    // 4. Espaciado aumentado
    if (settings.value.wideSpacing) {
      root.setAttribute('data-a11y-spacing', 'wide');
    } else {
      root.removeAttribute('data-a11y-spacing');
    }

    // 5. Subrayar enlaces
    if (settings.value.underlineLinks) {
      root.setAttribute('data-a11y-links', 'underline');
    } else {
      root.removeAttribute('data-a11y-links');
    }

    // 6. Reducir movimiento
    if (settings.value.reduceMotion) {
      root.setAttribute('data-a11y-motion', 'reduce');
    } else {
      root.removeAttribute('data-a11y-motion');
    }
  }

  function persist() {
    try {
      localStorage.setItem('a11y', JSON.stringify(settings.value));
    } catch {
      // ignore
    }
    applyToDom();
  }

  function increaseTextSize() {
    if (settings.value.textSizeStep < 4) {
      settings.value.textSizeStep = (settings.value.textSizeStep + 1) as 1 | 2 | 3 | 4;
      persist();
    }
  }

  function decreaseTextSize() {
    if (settings.value.textSizeStep > 1) {
      settings.value.textSizeStep = (settings.value.textSizeStep - 1) as 1 | 2 | 3 | 4;
      persist();
    }
  }

  function toggleHighContrast() {
    settings.value.highContrast = !settings.value.highContrast;
    persist();
  }

  function toggleLegibleFont() {
    settings.value.legibleFont = !settings.value.legibleFont;
    persist();
  }

  function toggleWideSpacing() {
    settings.value.wideSpacing = !settings.value.wideSpacing;
    persist();
  }

  function toggleUnderlineLinks() {
    settings.value.underlineLinks = !settings.value.underlineLinks;
    persist();
  }

  function toggleReduceMotion() {
    settings.value.reduceMotion = !settings.value.reduceMotion;
    persist();
  }

  function resetToDefaults() {
    settings.value = { ...defaultSettings };
    persist();
  }

  // Sincronizar en cada cambio
  watch(
    settings,
    () => {
      persist();
    },
    { deep: true }
  );

  onMounted(() => {
    init();
  });

  return {
    settings,
    increaseTextSize,
    decreaseTextSize,
    toggleHighContrast,
    toggleLegibleFont,
    toggleWideSpacing,
    toggleUnderlineLinks,
    toggleReduceMotion,
    resetToDefaults,
    init,
  };
}
