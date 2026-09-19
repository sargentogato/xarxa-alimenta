export interface OrganizationData {
  /**
   * Nombre oficial de la entidad.
   * Fuente única de verdad: nunca escribir a mano en componentes ni en locales.
   * Se interpola como {orgName} en vue-i18n.
   */
  name: string;
  shortName: string;
  // TODO: confirmar si es "Xarxa Alimenta" o "Xarxa Alimentaria"
  legalName: string;
  cif: string; // TODO: CIF/NIF real
  email: string; // TODO: email de contacto real
  phone: string; // TODO: teléfono de contacto real
  address: {
    street: string; // TODO: dirección física real
    city: string;
    postalCode: string;
    province: string;
    country: string;
    mapsUrl: string; // TODO: enlace a Google Maps / OpenStreetMap
  };
  social: {
    instagram: string;
    // TODO: añadir otras redes si aplica (Twitter, YouTube, etc.)
    telegram?: string;
  };
}

export const organization: OrganizationData = {
  name: 'Xarxa Alimenta',
  shortName: 'Alimenta',
  legalName: 'Asociación Xarxa Alimenta',
  cif: 'G-XXXXXXXX', // TODO: CIF definitivo
  email: 'hola@xarxaalimenta.org', // TODO: confirmar email real
  phone: '+34 600 000 000', // TODO: confirmar teléfono real
  address: {
    street: 'Jardín Forestal Comunitario s/n', // TODO: dirección exacta
    city: 'Valencia', // TODO: confirmar municipio
    postalCode: '46000', // TODO: código postal
    province: 'Valencia',
    country: 'España',
    mapsUrl: 'https://maps.google.com/?q=Valencia', // TODO: URL exacta
  },
  social: {
    instagram: 'https://www.instagram.com/xarxa.alimenta/',
    telegram: 'https://t.me/xarxaalimenta',
  },
};
