import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router.ts';
import { i18n, getInitialLocale, loadLocaleMessages } from './i18n.ts';

// Fuentes autoalojadas para cumplimiento estricto de privacidad RGPD
import '@fontsource-variable/nunito';
import '@fontsource-variable/fraunces';
import '@fontsource/atkinson-hyperlegible';

// Sistema de estilos en cascada pura
import './styles/theme.css';
import './styles/palettes.css';
import './styles/accessibility.css';
import './styles/base.css';

async function bootstrap() {
  const app = createApp(App);

  // Cargar mensajes del idioma inicial si es distinto del base
  const initialLocale = getInitialLocale();
  if (initialLocale !== 'es') {
    await loadLocaleMessages(initialLocale);
  }

  app.use(i18n);
  app.use(router);

  app.mount('#app');
}

bootstrap();
