<script setup lang="ts">
/**
 * ProjectModal: Modal accesible para ver el detalle completo y galería de un proyecto o colaboración.
 * Slots: ninguno
 * CSS vars: --project-modal-max-w
 * Clases públicas: .project-modal, .project-modal__gallery, .project-modal__meta, .project-modal__field
 * Expone: root
 */
import { ref } from 'vue';
import BaseModal from '@/components/common/BaseModal.vue';
import BaseButton from '@/components/common/BaseButton.vue';
import AppImage from '@/components/common/AppImage.vue';
import IconExternalLink from '@/components/common/icons/IconExternalLink.vue';

export interface ProjectModalData {
  id: string;
  name: string;
  type: 'project' | 'collaboration';
  typeLabel: string;
  summary: string;
  description: string;
  where: string;
  when: string;
  howToParticipate: string;
  externalUrl?: string;
  images: string[];
}

export interface ModalLabels {
  whereLabel: string;
  whenLabel: string;
  howLabel: string;
  externalLinkLabel: string;
  galleryLabel: string;
}

export interface ProjectModalProps {
  isOpen: boolean;
  project: ProjectModalData | null;
  labels: ModalLabels;
}

defineProps<ProjectModalProps>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const root = ref<HTMLElement | null>(null);

function handleClose() {
  emit('close');
}

defineExpose({
  root,
});
</script>

<template>
  <BaseModal
    ref="root"
    :is-open="isOpen"
    :title="project?.name || ''"
    max-width="48rem"
    @close="handleClose"
  >
    <div v-if="project" class="project-modal">
      <!-- Galería de imágenes -->
      <div v-if="project.images.length" class="project-modal__gallery-wrapper">
        <h3 class="sr-only">{{ labels.galleryLabel }}</h3>
        <div class="project-modal__gallery">
          <div
            v-for="(img, idx) in project.images"
            :key="idx"
            class="project-modal__gallery-item"
          >
            <AppImage
              :name="img"
              :alt="`${project.name} - Imagen ${idx + 1}`"
              sizes="(min-width: 768px) 400px, 100vw"
            />
          </div>
        </div>
      </div>

      <!-- Descripción -->
      <div class="project-modal__body">
        <p class="project-modal__description">
          {{ project.description }}
        </p>

        <!-- Metadatos estructurados: Dónde, Cuándo, Cómo participar -->
        <dl class="project-modal__meta">
          <div class="project-modal__field">
            <dt class="project-modal__label">{{ labels.whereLabel }}</dt>
            <dd class="project-modal__value">{{ project.where }}</dd>
          </div>

          <div class="project-modal__field">
            <dt class="project-modal__label">{{ labels.whenLabel }}</dt>
            <dd class="project-modal__value">{{ project.when }}</dd>
          </div>

          <div class="project-modal__field">
            <dt class="project-modal__label">{{ labels.howLabel }}</dt>
            <dd class="project-modal__value">{{ project.howToParticipate }}</dd>
          </div>
        </dl>
      </div>
    </div>

    <template #footer>
      <BaseButton
        v-if="project?.externalUrl"
        :href="project.externalUrl"
        target="_blank"
        rel="noopener noreferrer"
        variant="primary"
        size="md"
      >
        <template #icon>
          <IconExternalLink size="1.1rem" />
        </template>
        {{ labels.externalLinkLabel }}
      </BaseButton>

      <BaseButton
        variant="secondary"
        size="md"
        @click="handleClose"
      >
        Cerrar
      </BaseButton>
    </template>
  </BaseModal>
</template>

<style scoped>
.project-modal {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.project-modal__gallery-wrapper {
  margin-block-end: var(--space-2);
}

.project-modal__gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  gap: var(--space-3);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.project-modal__gallery-item {
  aspect-ratio: 16 / 10;
  border-radius: var(--radius-md);
  overflow: hidden;
  background-color: var(--color-surface-alt);
}

.project-modal__body {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.project-modal__description {
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.6;
  color: var(--color-text);
}

.project-modal__meta {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-4);
  background-color: var(--color-surface-alt);
  border-radius: var(--radius-md);
  border-inline-start: 3px solid var(--color-primary);
  margin: 0;
}

.project-modal__field {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.project-modal__label {
  font-weight: 700;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-primary);
}

.project-modal__value {
  margin: 0;
  font-size: 0.9375rem;
  color: var(--color-text);
  line-height: 1.5;
}
</style>
