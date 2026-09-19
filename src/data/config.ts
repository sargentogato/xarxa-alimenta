export type PaletteId =
  | 'blanco-verde'
  | 'amarillo-tomate'
  | 'neon-botanico'
  | 'citrico-pop'
  | 'azul-naranja';
export type ThemeId = 'auto' | 'light' | 'dark';

export interface AppConfig {
  defaultPalette: PaletteId;
  showPaletteSelector: boolean;
  autoplayHero: boolean;
  heroSlideDurationMs: number;
  /**
   * Controla la visibilidad del bloque de microdonaciones Teaming (1€/mes).
   * Por defecto true para previsualizarlo; puede ponerse en false cuando no se desee mostrar.
   */
  showTeaming: boolean;
}

export const config: AppConfig = {
  defaultPalette: 'blanco-verde',
  showPaletteSelector: true,
  autoplayHero: true,
  heroSlideDurationMs: 6000,
  showTeaming: true,
};

export const paletteList: Array<{
  id: PaletteId;
  nameKey: string;
  badge?: string;
  preview: {
    primary: string;
    accent: string;
    bg: string;
  };
}> = [
  {
    id: 'blanco-verde',
    nameKey: 'accessibility.paletteOptions.blancoVerde',
    preview: {
      primary: '#1e7033',
      accent: '#ea580c',
      bg: '#fcf8f2',
    },
  },
  {
    id: 'amarillo-tomate',
    nameKey: 'accessibility.paletteOptions.amarilloTomate',
    badge: '🍅 Fuego',
    preview: {
      primary: '#e11d48',
      accent: '#eab308',
      bg: '#fffdf5',
    },
  },
  {
    id: 'neon-botanico',
    nameKey: 'accessibility.paletteOptions.neonBotanico',
    badge: '⚡ Loca',
    preview: {
      primary: '#e1147a',
      accent: '#84cc16',
      bg: '#fdf5fc',
    },
  },
  {
    id: 'citrico-pop',
    nameKey: 'accessibility.paletteOptions.citricoPop',
    badge: '🍊 Pop',
    preview: {
      primary: '#ea580c',
      accent: '#0284c7',
      bg: '#fff9f2',
    },
  },
  {
    id: 'azul-naranja',
    nameKey: 'accessibility.paletteOptions.azulNaranja',
    badge: '🫐 Mora',
    preview: {
      primary: '#7c3aed',
      accent: '#059669',
      bg: '#fbfaff',
    },
  },
];
