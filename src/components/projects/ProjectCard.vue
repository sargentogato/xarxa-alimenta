<script setup lang="ts">
/**
 * ProjectCard: Tarjeta de proyecto o colaboración comunitaria con badge y Container Queries.
 * Slots: ninguno
 * CSS vars: --project-card-radius, --project-card-bg, --project-card-padding
 * Clases públicas: .project-card, .project-card__media, .project-card__badge, .project-card__content, .project-card__title, .project-card__summary, .project-card__btn
 * Expone: root
 */
import { ref } from 'vue';
import AppImage from '@/components/common/AppImage.vue';
import BaseButton from '@/components/common/BaseButton.vue';

export interface ProjectCardProps {
  id: string;
  name: string;
  type: 'project' | 'collaboration';
  typeLabel: string;
  summary: string;
  image: string;
  actionText?: string;
}

withDefaults(defineProps<ProjectCardProps>(), {
  actionText: 'Saber más',
});

const emit = defineEmits<{
  (e: 'select', id: string): void;
}>();

const root = ref<HTMLElement | null>(null);

function handleSelect(id: string) {
  emit('select', id);
}

defineExpose({
  root,
});
</script>

<template>
  <article
    ref="root"
    class="project-card"
  >
    <div class="project-card__media">
      <AppImage
        :name="image"
        :alt="name"
        sizes="(min-width: 900px) 380px, 100vw"
      />
      <span
        :class="[
          'project-card__badge',
          type === 'collaboration' ? 'project-card__badge--collab' : 'project-card__badge--proj'
        ]"
      >
        {{ typeLabel }}
      </span>
    </div>

    <div class="project-card__content">
      <h3 class="project-card__title">
        {{ name }}
      </h3>
      <p class="project-card__summary">
        {{ summary }}
      </p>

      <div class="project-card__action">
        <BaseButton
          variant="outline"
          size="sm"
          :aria-label="`${actionText}: ${name}`"
          @click="handleSelect(id)"
        >
          {{ actionText }}
        </BaseButton>
      </div>
    </div>
  </article>
</template>

<style scoped>
.project-card {
  --_radius: var(--project-card-radius, var(--radius-xl));
  --_bg: var(--project-card-bg, var(--color-surface));
  --_padding: var(--project-card-padding, var(--space-4));

  container-type: inline-size;
  container-name: project-card;

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

.project-card:hover {
  transform: translateY(-8px) scale(1.015);
  box-shadow: 0 20px 40px -8px var(--color-glow, rgba(0, 0, 0, 0.2)), 0 6px 16px -2px var(--color-accent-glow, rgba(0, 0, 0, 0.1));
  border-color: var(--color-primary);
}

.project-card__media {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background-color: var(--color-surface-alt);
}

.project-card__media :deep(img) {
  transition: transform 400ms ease;
}

.project-card:hover .project-card__media :deep(img) {
  transform: scale(1.06);
}

.project-card__badge {
  position: absolute;
  top: var(--space-3);
  left: var(--space-3);
  z-index: 2;
  padding: 0.3rem 0.75rem;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(4px);
}

.project-card__badge--proj {
  background: linear-gradient(135deg, var(--color-primary) 0%, #16a34a 100%);
  color: var(--color-on-primary);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.project-card__badge--collab {
  background: linear-gradient(135deg, var(--color-accent) 0%, #f97316 100%);
  color: var(--color-accent-contrast);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.project-card__content {
  padding: var(--_padding);
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: var(--space-2);
}

.project-card__title {
  margin: 0;
  font-family: var(--font-heading);
  font-size: 1.25rem;
  color: var(--color-text);
  line-height: 1.3;
}

.project-card__summary {
  margin: 0;
  font-size: 0.9375rem;
  color: var(--color-text-muted);
  line-height: 1.5;
  flex: 1;
}

.project-card__action {
  margin-block-start: var(--space-2);
}
</style>
