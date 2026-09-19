export interface NavItem {
  path: string;
  nameKey: string;
  isCta?: boolean;
}

export const headerNavItems: NavItem[] = [
  { path: '/', nameKey: 'nav.home' },
  { path: '/servicios', nameKey: 'nav.services' },
  { path: '/agenda', nameKey: 'nav.agenda' },
  { path: '/historia', nameKey: 'nav.history' },
  { path: '/contacto', nameKey: 'nav.contact' },
  { path: '/donaciones', nameKey: 'nav.donations', isCta: true },
];

export const footerMainItems: NavItem[] = [
  { path: '/', nameKey: 'nav.home' },
  { path: '/servicios', nameKey: 'nav.services' },
  { path: '/agenda', nameKey: 'nav.agenda' },
  { path: '/historia', nameKey: 'nav.history' },
  { path: '/contacto', nameKey: 'nav.contact' },
  { path: '/donaciones', nameKey: 'nav.donations' },
];

export const footerLegalItems: NavItem[] = [
  { path: '/cookies', nameKey: 'nav.cookies' },
  { path: '/privacidad', nameKey: 'nav.privacy' },
];
