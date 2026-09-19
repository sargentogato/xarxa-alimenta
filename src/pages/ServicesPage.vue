<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import SectionTitle from '@/components/common/SectionTitle.vue';
import ServiceDetail from '@/components/services/ServiceDetail.vue';
import BaseButton from '@/components/common/BaseButton.vue';
import { servicesList } from '@/data/services.ts';
import { organization } from '@/data/organization.ts';

const { t, tm } = useI18n();

const services = computed(() => {
  return servicesList.map((item) => {
    const rawIncludes = tm(`services.items.${item.id}.includes`) as string[] || [];
    return {
      id: item.id,
      image: item.image,
      title: t(`services.items.${item.id}.title`),
      summary: t(`services.items.${item.id}.summary`),
      description: t(`services.items.${item.id}.description`, { orgName: organization.name }),
      includes: Array.isArray(rawIncludes) ? rawIncludes : [],
      audience: t(`services.items.${item.id}.audience`),
    };
  });
});
</script>

<template>
  <div class="services-page container">
    <!-- Encabezado de página -->
    <SectionTitle
      :title="t('services.title')"
      :subtitle="t('services.intro', { orgName: organization.name })"
      :level="1"
    />

    <!-- Barra de navegación rápida a cada servicio -->
    <nav class="services-page__quick-nav" :aria-label="t('services.quickNav')">
      <span class="services-page__quick-nav-label">{{ t('services.quickNav') }}</span>
      <ul class="services-page__quick-nav-list">
        <li v-for="s in services" :key="s.id">
          <a :href="`#${s.id}`" class="services-page__quick-nav-link">
            {{ s.title }}
          </a>
        </li>
      </ul>
    </nav>

    <!-- Lista completa de servicios detallados -->
    <div class="services-page__list">
      <ServiceDetail
        v-for="s in services"
        :key="s.id"
        :id="s.id"
        :title="s.title"
        :summary="s.summary"
        :description="s.description"
        :includes="s.includes"
        :audience="s.audience"
        :image="s.image"
        :cta-agenda-text="t('services.viewAgenda')"
        :cta-contact-text="t('common.contactUs')"
      />
    </div>

    <!-- Sección final de contacto y participación -->
    <aside class="services-page__footer-cta">
      <h2 class="services-page__cta-title">
        {{ t('services.contactSectionTitle') }}
      </h2>
      <p class="services-page__cta-text">
        {{ t('services.contactSectionText') }}
      </p>
      <div class="services-page__cta-action">
        <BaseButton to="/contacto" variant="primary" size="lg">
          {{ t('common.contactUs') }}
        </BaseButton>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.services-page {
  padding-block: var(--space-7);
}

.services-page__quick-nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2) var(--space-3);
  padding: var(--space-3) var(--space-4);
  background-color: var(--color-surface-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  margin-block-end: var(--space-7);
}

.services-page__quick-nav-label {
  font-weight: 700;
  font-size: 0.9375rem;
  color: var(--color-text-muted);
}

.services-page__quick-nav-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin: 0;
  padding: 0;
  list-style: none;
}

.services-page__quick-nav-link {
  display: inline-flex;
  align-items: center;
  min-height: 2.5rem;
  padding: var(--space-1) var(--space-3);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  color: var(--color-text);
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  transition: color var(--transition-fast), border-color var(--transition-fast), background-color var(--transition-fast);
}

.services-page__quick-nav-link:hover {
  color: var(--color-primary);
  border-color: var(--color-primary);
  background-color: var(--color-primary-soft);
}

.services-page__list {
  display: flex;
  flex-direction: column;
}

.services-page__footer-cta {
  margin-block-start: var(--space-8);
  padding: var(--space-6);
  background-color: var(--color-primary-soft);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
}

.services-page__cta-title {
  margin: 0;
  font-family: var(--font-heading);
  font-size: 1.75rem;
  color: var(--color-primary);
}

.services-page__cta-text {
  margin: 0;
  font-size: 1.1rem;
  color: var(--color-text);
  max-width: 50ch;
}

.services-page__cta-action {
  margin-block-start: var(--space-2);
}
</style>
