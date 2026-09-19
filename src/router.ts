import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { i18n } from './i18n.ts';
import { organization } from './data/organization.ts';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
    meta: { pageKey: 'home' },
  },
  {
    path: '/servicios',
    name: 'services',
    component: () => import('@/pages/ServicesPage.vue'),
    meta: { pageKey: 'services' },
  },
  {
    path: '/agenda',
    name: 'agenda',
    component: () => import('@/pages/AgendaPage.vue'),
    meta: { pageKey: 'agenda' },
  },
  {
    path: '/historia',
    name: 'history',
    component: () => import('@/pages/HistoryPage.vue'),
    meta: { pageKey: 'history' },
  },
  {
    path: '/donaciones',
    name: 'donations',
    component: () => import('@/pages/DonationsPage.vue'),
    meta: { pageKey: 'donations' },
  },
  {
    path: '/contacto',
    alias: ['/contact'],
    name: 'contact',
    component: () => import('@/pages/ContactPage.vue'),
    meta: { pageKey: 'contact' },
  },
  {
    path: '/cookies',
    name: 'cookies',
    component: () => import('@/pages/CookiesPage.vue'),
    meta: { pageKey: 'cookies' },
  },
  {
    path: '/privacidad',
    name: 'privacy',
    component: () => import('@/pages/PrivacyPage.vue'),
    meta: { pageKey: 'privacy' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/NotFoundPage.vue'),
    meta: { pageKey: 'notFound' },
  },
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 80, // margen superior para compensar el header sticky
      };
    }
    return { top: 0, left: 0 };
  },
});

// Actualizar títulos, meta description y mover el foco al cambiar de ruta
router.afterEach((to) => {
  const pageKey = (to.meta.pageKey as string) || 'home';
  const t = i18n.global.t;

  try {
    const title = t(`meta.${pageKey}.title`, { orgName: organization.name });
    const description = t(`meta.${pageKey}.description`, { orgName: organization.name });

    if (title && typeof document !== 'undefined') {
      document.title = title;

      // Meta description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);

      // OpenGraph
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', title);
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', description);
    }
  } catch (err) {
    console.error('[router] Error setting meta tags', err);
  }

  // Mover el foco accesible al elemento <main id="main-content">
  if (typeof document !== 'undefined') {
    window.setTimeout(() => {
      const main = document.getElementById('main-content');
      if (main) {
        main.setAttribute('tabindex', '-1');
        main.focus({ preventScroll: true });
      }
    }, 50);
  }
});

router.onError((err) => {
  console.error('[router] Navigation error:', err);
});

