<script setup lang="ts">
/**
 * ServiceDetail: Bloque detallado de servicio con ancla accesible y lista de aspectos incluidos.
 * Slots: ninguno
 * CSS vars: --service-detail-radius, --service-detail-bg
 * Clases públicas: .service-detail, .service-detail__header, .service-detail__grid, .service-detail__media, .service-detail__content, .service-detail__includes, .service-detail__audience
 * Expone: root
 */
import { ref } from 'vue';
import AppImage from '@/components/common/AppImage.vue';
import BaseButton from '@/components/common/BaseButton.vue';
import IconCheck from '@/components/common/icons/IconCheck.vue';

export interface ServiceDetailProps {
  id: string;
  title: string;
  summary: string;
  description: string;
  includes: string[];
  audience: string;
  image: string;
  ctaAgendaText?: string;
  ctaContactText?: string;
}

withDefaults(defineProps<ServiceDetailProps>(), {
  ctaAgendaText: 'Ver actividades en agenda',
  ctaContactText: 'Contactar sobre este servicio',
});

const root = ref<HTMLElement | null>(null);

defineExpose({
  root,
});
</script>

<template>
  <article
    :id="id"
    ref="root"
    class="service-detail"
  >
    <div class="service-detail__grid">
      <div class="service-detail__media">
        <AppImage
          :name="image"
          :alt="title"
          sizes="(min-width: 900px) 500px, 100vw"
        />
      </div>

      <div class="service-detail__content">
        <header class="service-detail__header">
          <h2 class="service-detail__title">
            {{ title }}
          </h2>
          <p class="service-detail__summary">
            {{ summary }}
          </p>
        </header>

        <p class="service-detail__description">
          {{ description }}
        </p>

        <!-- Aspectos que incluye el servicio -->
        <div class="service-detail__section">
          <h3 class="service-detail__subtitle">¿Qué incluye?</h3>
          <ul class="service-detail__includes">
            <li
              v-for="(item, index) in includes"
              :key="index"
              class="service-detail__include-item"
            >
              <span class="service-detail__check-icon" aria-hidden="true">
                <IconCheck size="1rem" />
              </span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>

        <!-- A quién va dirigido -->
        <div class="service-detail__audience">
          <strong>A quién va dirigido:</strong>
          <span>{{ audience }}</span>
        </div>

        <!-- Acciones -->
        <div class="service-detail__actions">
          <BaseButton
            to="/agenda"
            variant="primary"
            size="md"
          >
            {{ ctaAgendaText }}
          </BaseButton>
          <BaseButton
            to="/contacto"
            variant="outline"
            size="md"
          >
            {{ ctaContactText }}
          </BaseButton>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.service-detail {
  --_radius: var(--service-detail-radius, var(--radius-xl));
  --_bg: var(--service-detail-bg, var(--color-surface));

  container-type: inline-size;
  container-name: service-detail;

  width: 100%;
  min-width: 0;
  scroll-margin-top: calc(var(--header-height) + 1.5rem);
  background-color: var(--_bg);
  border: 1px solid var(--color-border);
  border-radius: var(--_radius);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  margin-block-end: var(--space-7);
}

.service-detail__grid {
  display: flex;
  flex-direction: column;
}

.service-detail__media {
  width: 100%;
  aspect-ratio: 16 / 9;
  background-color: var(--color-surface-alt);
}

.service-detail__content {
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.service-detail__header {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.service-detail__title {
  margin: 0;
  font-family: var(--font-heading);
  font-size: 1.75rem;
  color: var(--color-primary);
  line-height: 1.25;
}

.service-detail__summary {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text);
  line-height: 1.4;
}

.service-detail__description {
  margin: 0;
  font-size: 1rem;
  color: var(--color-text-muted);
  line-height: 1.6;
}

.service-detail__subtitle {
  margin: 0 0 var(--space-2) 0;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-text);
}

.service-detail__includes {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.service-detail__include-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  font-size: 0.9375rem;
  color: var(--color-text);
  line-height: 1.5;
}

.service-detail__check-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.35rem;
  height: 1.35rem;
  border-radius: var(--radius-full);
  background-color: var(--color-primary-soft);
  color: var(--color-primary);
  flex-shrink: 0;
  margin-block-start: 0.15rem;
}

.service-detail__audience {
  padding: var(--space-3) var(--space-4);
  background-color: var(--color-surface-alt);
  border-radius: var(--radius-md);
  border-inline-start: 3px solid var(--color-accent);
  font-size: 0.9375rem;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.service-detail__audience strong {
  color: var(--color-text);
}

.service-detail__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-block-start: var(--space-2);
}

@container service-detail (min-width: 768px) {
  .service-detail__grid {
    display: grid;
    grid-template-columns: 5fr 7fr;
  }

  .service-detail__media {
    height: 100%;
    aspect-ratio: auto;
  }

  .service-detail__content {
    padding: var(--space-6);
  }

  .service-detail__title {
    font-size: 2rem;
  }
}
</style>
