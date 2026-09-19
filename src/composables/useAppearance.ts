import { ref, computed, watch, onMounted } from 'vue';
import { config, paletteList, type PaletteId, type ThemeId } from '../data/config.ts';

const savedTheme = ref<ThemeId>('auto');
const savedPalette = ref<PaletteId>(config.defaultPalette);
const systemPrefersDark = ref(false);

let initialized = false;

export function useAppearance() {
  function init() {
    if (initialized || typeof window === 'undefined') return;
    initialized = true;

    // 1. Cargar tema de localStorage
    try {
      const storedTheme = localStorage.getItem('theme') as ThemeId;
      if (storedTheme && ['auto', 'light', 'dark'].includes(storedTheme)) {
        savedTheme.value = storedTheme;
      }
    } catch {
      // Ignorar bloqueo de storage
    }

    // 2. Cargar paleta de localStorage
    try {
      const storedPalette = localStorage.getItem('palette') as PaletteId;
      if (storedPalette && paletteList.some((p) => p.id === storedPalette)) {
        savedPalette.value = storedPalette;
      }
    } catch {
      // Ignorar bloqueo de storage
    }

    // 3. Listener del sistema para modo oscuro
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    systemPrefersDark.value = mediaQuery.matches;

    const handler = (e: MediaQueryListEvent) => {
      systemPrefersDark.value = e.matches;
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
    } else {
      mediaQuery.addListener(handler);
    }

    applyToDom();
  }

  // Tema efectivo resuelto (light o dark)
  const effectiveTheme = computed<'light' | 'dark'>(() => {
    if (savedTheme.value === 'auto') {
      return systemPrefersDark.value ? 'dark' : 'light';
    }
    return savedTheme.value;
  });

  function applyToDom() {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;

    // Aplicar tema
    root.setAttribute('data-theme', effectiveTheme.value);

    // Aplicar paleta
    root.setAttribute('data-palette', savedPalette.value);
  }

  function setTheme(theme: ThemeId) {
    savedTheme.value = theme;
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // ignore
    }
    applyToDom();
  }

  function setPalette(palette: PaletteId) {
    savedPalette.value = palette;
    try {
      localStorage.setItem('palette', palette);
    } catch {
      // ignore
    }
    applyToDom();
  }

  // Reactividad automática
  watch([effectiveTheme, savedPalette], () => {
    applyToDom();
  });

  onMounted(() => {
    init();
  });

  return {
    theme: savedTheme,
    effectiveTheme,
    palette: savedPalette,
    showPaletteSelector: config.showPaletteSelector,
    setTheme,
    setPalette,
    init,
  };
}
