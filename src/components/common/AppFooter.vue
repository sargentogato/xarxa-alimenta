<script setup lang="ts">
/**
 * AppFooter: Pie de página común a toda la web.
 * Slots: ninguno
 * CSS vars: --footer-bg, --footer-border
 * Clases públicas: .app-footer, .app-footer__grid, .app-footer__col, .app-footer__bottom
 * Expone: root
 */
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { organization } from '@/data/organization.ts';
import { footerMainItems, footerLegalItems } from '@/data/navigation.ts';
import IconExternalLink from './icons/IconExternalLink.vue';

const { t } = useI18n();
const root = ref<HTMLElement | null>(null);

const currentYear = computed(() => new Date().getFullYear());

defineExpose({
  root,
});
</script>

<template>
  <footer ref="root" class="app-footer">
    <div class="app-footer__container container">
      <div class="app-footer__grid">
        <!-- Bloque 1: Logo + Lema breve -->
        <div class="app-footer__col app-footer__col--brand">
          <RouterLink to="/" class="app-footer__brand" aria-label="Inicio">
            <span class="app-footer__name">{{ organization.name }}</span>
          </RouterLink>
          <p class="app-footer__tagline">
            {{ t('footer.tagline') }}
          </p>
        </div>

        <!-- Bloque 2: Navegación completa -->
        <div class="app-footer__col">
          <h2 class="app-footer__heading">
            {{ t('footer.sectionsTitle') }}
          </h2>
          <ul class="app-footer__list">
            <li v-for="item in footerMainItems" :key="item.path">
              <RouterLink :to="item.path" class="app-footer__link">
                {{ t(item.nameKey) }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Bloque 3: Contacto y redes -->
        <div class="app-footer__col">
          <h2 class="app-footer__heading">
            {{ t('footer.contactTitle') }}
          </h2>
          <ul class="app-footer__list">
            <li>
              <a :href="`mailto:${organization.email}`" class="app-footer__link">
                {{ organization.email }}
              </a>
            </li>
            <li>
              <a :href="`tel:${organization.phone.replace(/\s+/g, '')}`" class="app-footer__link">
                {{ organization.phone }}
              </a>
            </li>
            <li>
              <a
                :href="organization.social.instagram"
                target="_blank"
                rel="noopener noreferrer"
                class="app-footer__link app-footer__link--external"
              >
                <span>Instagram @xarxa.alimenta</span>
                <IconExternalLink size="0.9rem" />
              </a>
            </li>
          </ul>
        </div>

        <!-- Bloque 4: Legal -->
        <div class="app-footer__col">
          <h2 class="app-footer__heading">
            {{ t('footer.legalTitle') }}
          </h2>
          <ul class="app-footer__list">
            <li v-for="item in footerLegalItems" :key="item.path">
              <RouterLink :to="item.path" class="app-footer__link">
                {{ t(item.nameKey) }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Barra inferior -->
      <div class="app-footer__bottom">
        <p class="app-footer__copyright">
          {{ t('footer.copyright', { year: currentYear, orgName: organization.name }) }}
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  margin-block-start: var(--space-8);
  background-color: var(--footer-bg, var(--color-surface-alt));
  border-block-start: 1px solid var(--footer-border, var(--color-border));
  padding-block: var(--space-7) var(--space-5);
  color: var(--color-text);
  position: relative;
}

.app-footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--color-primary) 0%, #eab308 50%, var(--color-accent) 100%);
}

.app-footer__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
  margin-block-end: var(--space-6);
}

@media (min-width: 640px) {
  .app-footer__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 900px) {
  .app-footer__grid {
    grid-template-columns: 2fr 1fr 1.5fr 1.2fr;
  }
}

.app-footer__col {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.app-footer__brand {
  text-decoration: none;
}

.app-footer__name {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1.4rem;
  color: var(--color-primary);
}

.app-footer__tagline {
  font-size: 0.9375rem;
  color: var(--color-text-muted);
  line-height: 1.6;
  max-width: 32ch;
  margin: 0;
}

.app-footer__heading {
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-text);
  margin: 0;
}

.app-footer__list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.app-footer__link {
  font-size: 0.9375rem;
  color: var(--color-text-muted);
  text-decoration: none;
  transition: color var(--transition-fast);
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
}

.app-footer__link:hover {
  color: var(--color-primary);
}

.app-footer__link--external {
  gap: 0.35rem;
}

.app-footer__bottom {
  padding-block-start: var(--space-5);
  border-block-start: 1px solid var(--color-border);
  text-align: center;
}

.app-footer__copyright {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  margin: 0;
}
</style>
