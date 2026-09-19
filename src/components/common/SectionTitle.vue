<script setup lang="ts">
/**
 * SectionTitle: Encabezado de sección con jerarquía accesible y subtítulo.
 * Slots: default
 * CSS vars: --section-title-color, --section-title-gap
 * Clases públicas: .section-title, .section-title--center, .section-title__heading, .section-title__subtitle
 * Expone: root
 */
import { ref } from 'vue';

export interface SectionTitleProps {
  /**
   * Título principal
   */
  title: string;
  /**
   * Subtítulo o texto introductorio opcional
   */
  subtitle?: string;
  /**
   * Nivel semántico de encabezado (1 para página, 2 para sección, 3 para subsección)
   */
  level?: 1 | 2 | 3;
  /**
   * Alineación visual
   */
  align?: 'left' | 'center';
}

withDefaults(defineProps<SectionTitleProps>(), {
  subtitle: undefined,
  level: 2,
  align: 'left',
});

const root = ref<HTMLElement | null>(null);

defineExpose({
  root,
});
</script>

<template>
  <header
    ref="root"
    :class="['section-title', `section-title--${align}`]"
  >
    <h1 v-if="level === 1" class="section-title__heading">
      {{ title }}
    </h1>
    <h2 v-else-if="level === 2" class="section-title__heading">
      {{ title }}
    </h2>
    <h3 v-else class="section-title__heading">
      {{ title }}
    </h3>

    <div class="section-title__bar" aria-hidden="true" />

    <p v-if="subtitle" class="section-title__subtitle">
      {{ subtitle }}
    </p>

    <slot />
  </header>
</template>

<style scoped>
.section-title {
  --_gap: var(--section-title-gap, var(--space-2));
  --_color: var(--section-title-color, var(--color-text));

  display: flex;
  flex-direction: column;
  gap: var(--_gap);
  margin-block-end: var(--space-6);
  color: var(--_color);
}

.section-title--center {
  align-items: center;
  text-align: center;
}

.section-title__heading {
  margin: 0;
  color: inherit;
}

.section-title__bar {
  width: 3.5rem;
  height: 4px;
  border-radius: var(--radius-full);
  background: linear-gradient(90deg, var(--color-primary) 0%, var(--color-accent) 100%);
  margin-block: 0.25rem 0.25rem;
}

.section-title--center .section-title__bar {
  margin-inline: auto;
}

.section-title__subtitle {
  margin: 0;
  font-size: 1.125rem;
  color: var(--color-text-muted);
  line-height: 1.5;
  max-width: 60ch;
}
</style>
