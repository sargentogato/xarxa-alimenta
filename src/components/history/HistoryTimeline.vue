<script setup lang="ts">
/**
 * HistoryTimeline: Línea temporal accesible de hitos históricos de la entidad.
 * Slots: ninguno
 * CSS vars: --timeline-border-color, --timeline-dot-bg
 * Clases públicas: .history-timeline, .history-timeline__title, .history-timeline__list, .history-timeline__item, .history-timeline__marker, .history-timeline__year, .history-timeline__content, .history-timeline__heading, .history-timeline__text
 * Expone: root
 */
import { ref } from 'vue';

export interface MilestoneData {
  key: string;
  year: string;
  title: string;
  description: string;
}

export interface HistoryTimelineProps {
  title?: string;
  milestones: MilestoneData[];
}

withDefaults(defineProps<HistoryTimelineProps>(), {
  title: 'Hitos principales',
});

const root = ref<HTMLElement | null>(null);

defineExpose({
  root,
});
</script>

<template>
  <section
    ref="root"
    class="history-timeline"
    :aria-label="title"
  >
    <h2 v-if="title" class="history-timeline__title">
      {{ title }}
    </h2>

    <ol class="history-timeline__list">
      <li
        v-for="item in milestones"
        :key="item.key"
        class="history-timeline__item"
      >
        <div class="history-timeline__marker" aria-hidden="true">
          <span class="history-timeline__dot" />
          <span class="history-timeline__line" />
        </div>

        <div class="history-timeline__content">
          <time class="history-timeline__year">{{ item.year }}</time>
          <h3 class="history-timeline__heading">{{ item.title }}</h3>
          <p class="history-timeline__text">{{ item.description.replace(/^TODO:\s*/i, '') }}</p>
        </div>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.history-timeline {
  --_border: var(--timeline-border-color, var(--color-primary-soft));
  --_dot: var(--timeline-dot-bg, var(--color-primary));

  container-type: inline-size;
  container-name: history-timeline;

  width: 100%;
  min-width: 0;
  margin-block: var(--space-7);
}

.history-timeline__title {
  margin: 0 0 var(--space-5) 0;
  font-family: var(--font-heading);
  font-size: 1.75rem;
  color: var(--color-primary);
}

.history-timeline__list {
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  list-style: none;
}

.history-timeline__item {
  display: grid;
  grid-template-columns: 2.5rem 1fr;
  gap: var(--space-4);
  position: relative;
}

.history-timeline__marker {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.history-timeline__dot {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: var(--radius-full);
  background-color: var(--_dot);
  border: 3px solid var(--color-surface);
  box-shadow: 0 0 0 2px var(--color-primary);
  z-index: 1;
  flex-shrink: 0;
}

.history-timeline__line {
  flex: 1;
  width: 2px;
  background-color: var(--color-border);
  min-height: 3.5rem;
}

.history-timeline__item:last-child .history-timeline__line {
  display: none;
}

.history-timeline__content {
  padding-block-end: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.history-timeline__year {
  display: inline-block;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--color-accent);
}

.history-timeline__heading {
  margin: 0;
  font-size: 1.2rem;
  color: var(--color-text);
  line-height: 1.3;
}

.history-timeline__text {
  margin: var(--space-1) 0 0 0;
  font-size: 0.9375rem;
  color: var(--color-text-muted);
  line-height: 1.6;
  max-width: 65ch;
}

@container history-timeline (min-width: 680px) {
  .history-timeline__item {
    grid-template-columns: 3rem 1fr;
  }

  .history-timeline__year {
    font-size: 1.5rem;
  }

  .history-timeline__heading {
    font-size: 1.35rem;
  }
}
</style>
