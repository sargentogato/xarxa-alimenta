<script setup lang="ts">
/**
 * HistoryChapterCard: Capítulo narrativo con imagen y texto alternable.
 * Slots: ninguno
 * CSS vars: --chapter-radius, --chapter-bg
 * Clases públicas: .history-chapter, .history-chapter--reverse, .history-chapter__media, .history-chapter__body, .history-chapter__title, .history-chapter__text
 * Expone: root
 */
import { ref } from 'vue';
import AppImage from '@/components/common/AppImage.vue';

export interface HistoryChapterCardProps {
  title: string;
  text: string;
  image: string;
  reverse?: boolean;
}

withDefaults(defineProps<HistoryChapterCardProps>(), {
  reverse: false,
});

const root = ref<HTMLElement | null>(null);

defineExpose({
  root,
});
</script>

<template>
  <article
    ref="root"
    :class="['history-chapter', reverse ? 'history-chapter--reverse' : '']"
  >
    <div class="history-chapter__media">
      <AppImage
        :name="image"
        :alt="title"
        sizes="(min-width: 900px) 500px, 100vw"
      />
    </div>

    <div class="history-chapter__body">
      <h2 class="history-chapter__title">
        {{ title }}
      </h2>
      <p class="history-chapter__text">
        {{ text.replace(/^TODO:\s*/i, '') }}
      </p>
    </div>
  </article>
</template>

<style scoped>
.history-chapter {
  --_radius: var(--chapter-radius, var(--radius-xl));
  --_bg: var(--chapter-bg, var(--color-surface));

  container-type: inline-size;
  container-name: history-chapter;

  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  background-color: var(--_bg);
  border: 1px solid var(--color-border);
  border-radius: var(--_radius);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  margin-block-end: var(--space-6);
}

.history-chapter__media {
  width: 100%;
  aspect-ratio: 16 / 10;
  background-color: var(--color-surface-alt);
}

.history-chapter__body {
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--space-3);
}

.history-chapter__title {
  margin: 0;
  font-family: var(--font-heading);
  font-size: 1.5rem;
  color: var(--color-primary);
  line-height: 1.3;
}

.history-chapter__text {
  margin: 0;
  font-size: 1rem;
  color: var(--color-text-muted);
  line-height: 1.6;
}

@container history-chapter (min-width: 720px) {
  .history-chapter {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .history-chapter--reverse .history-chapter__media {
    order: 2;
  }

  .history-chapter--reverse .history-chapter__body {
    order: 1;
  }

  .history-chapter__media {
    aspect-ratio: auto;
    height: 100%;
  }

  .history-chapter__body {
    padding: var(--space-6);
  }

  .history-chapter__title {
    font-size: 1.75rem;
  }
}
</style>
