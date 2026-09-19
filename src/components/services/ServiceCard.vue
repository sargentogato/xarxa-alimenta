<script setup lang="ts">
/**
 * ServiceCard: Tarjeta de servicio con adaptación responsiva mediante Container Queries.
 * Slots: ninguno
 * CSS vars: --service-card-radius, --service-card-bg, --service-card-padding
 * Clases públicas: .service-card, .service-card__media, .service-card__body, .service-card__title, .service-card__summary, .service-card__link
 * Expone: root
 */
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import AppImage from '@/components/common/AppImage.vue';
import IconArrowRight from '@/components/common/icons/IconArrowRight.vue';

export interface ServiceCardProps {
  id: string;
  title: string;
  summary: string;
  image: string;
  to?: string;
  actionText?: string;
}

withDefaults(defineProps<ServiceCardProps>(), {
  to: '',
  actionText: 'Saber más',
});

const root = ref<HTMLElement | null>(null);

defineExpose({
  root,
});
</script>

<template>
  <article
    ref="root"
    class="service-card"
  >
    <div class="service-card__media">
      <AppImage
        :name="image"
        :alt="title"
        sizes="(min-width: 900px) 380px, 100vw"
      />
    </div>

    <div class="service-card__body">
      <h3 class="service-card__title">
        {{ title }}
      </h3>
      <p class="service-card__summary">
        {{ summary }}
      </p>

      <div class="service-card__action">
        <RouterLink
          :to="to || `/servicios#${id}`"
          class="service-card__link"
          :aria-label="`${actionText}: ${title}`"
        >
          <span>{{ actionText }}</span>
          <IconArrowRight size="1.1rem" class="service-card__link-icon" />
        </RouterLink>
      </div>
    </div>
  </article>
</template>

<style scoped>
.service-card {
  --_radius: var(--service-card-radius, var(--radius-xl));
  --_bg: var(--service-card-bg, var(--color-surface));
  --_padding: var(--service-card-padding, var(--space-4));

  container-type: inline-size;
  container-name: service-card;

  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  background-color: var(--_bg);
  border: 2px solid var(--color-border);
  border-radius: var(--_radius);
  overflow: hidden;
  box-shadow: 0 4px 16px -2px rgba(0, 0, 0, 0.05);
  transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 300ms cubic-bezier(0.16, 1, 0.3, 1), border-color 200ms ease;
}

.service-card:hover {
  transform: translateY(-8px) scale(1.015);
  box-shadow: 0 20px 40px -8px var(--color-glow, rgba(0, 0, 0, 0.2)), 0 6px 16px -2px var(--color-accent-glow, rgba(0, 0, 0, 0.1));
  border-color: var(--color-primary);
}

.service-card__media {
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background-color: var(--color-surface-alt);
}

.service-card__media :deep(img) {
  transition: transform 400ms ease;
}

.service-card:hover .service-card__media :deep(img) {
  transform: scale(1.06);
}

.service-card__body {
  padding: var(--_padding);
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: var(--space-2);
}

.service-card__title {
  margin: 0;
  font-family: var(--font-heading);
  font-size: 1.25rem;
  color: var(--color-text);
  line-height: 1.3;
}

.service-card__summary {
  margin: 0;
  font-size: 0.9375rem;
  color: var(--color-text-muted);
  line-height: 1.5;
  flex: 1;
}

.service-card__action {
  margin-block-start: var(--space-3);
}

.service-card__link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-weight: 700;
  font-size: 0.9375rem;
  color: var(--color-primary);
  text-decoration: none;
  min-height: 2.75rem;
  transition: gap var(--transition-fast);
}

.service-card:hover .service-card__link {
  gap: var(--space-2);
}

.service-card__link-icon {
  transition: transform var(--transition-fast);
}

.service-card:hover .service-card__link-icon {
  transform: translateX(3px);
}

/* Adaptación cuando el contenedor es amplio (≥520px) */
@container service-card (min-width: 520px) {
  .service-card {
    flex-direction: row;
  }

  .service-card__media {
    width: 42%;
    aspect-ratio: auto;
  }

  .service-card__body {
    padding: var(--space-5);
  }

  .service-card__title {
    font-size: 1.4rem;
  }
}
</style>
