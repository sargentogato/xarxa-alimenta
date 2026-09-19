<script setup lang="ts">
/**
 * DonationCallout: Sección destacada de llamada a la colaboración y apoyo mutuo.
 * Slots: ninguno
 * CSS vars: --callout-bg, --callout-radius, --callout-padding
 * Clases públicas: .donation-callout, .donation-callout__content, .donation-callout__title, .donation-callout__subtitle, .donation-callout__stats, .donation-callout__stat-item, .donation-callout__action
 * Expone: root
 */
import { ref } from 'vue';
import BaseButton from '@/components/common/BaseButton.vue';

export interface DonationCalloutProps {
  title: string;
  subtitle: string;
  ctaText: string;
  stats: string[];
}

defineProps<DonationCalloutProps>();

const root = ref<HTMLElement | null>(null);

defineExpose({
  root,
});
</script>

<template>
  <aside
    ref="root"
    class="donation-callout"
    :aria-label="title"
  >
    <div class="donation-callout__container container">
      <div class="donation-callout__content">
        <h2 class="donation-callout__title">
          {{ title }}
        </h2>
        <p class="donation-callout__subtitle">
          {{ subtitle }}
        </p>

        <!-- Estadísticas comunitarias -->
        <div class="donation-callout__stats">
          <div
            v-for="(stat, idx) in stats"
            :key="idx"
            class="donation-callout__stat-item"
          >
            <span class="donation-callout__stat-dot" aria-hidden="true" />
            <span class="donation-callout__stat-text">{{ stat.replace(/^TODO:\s*/i, '') }}</span>
          </div>
        </div>

        <div class="donation-callout__action">
          <BaseButton
            to="/donaciones"
            variant="accent"
            size="lg"
          >
            {{ ctaText }}
          </BaseButton>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.donation-callout {
  --_bg: var(--callout-bg, var(--color-primary-soft));
  --_radius: var(--callout-radius, var(--radius-xl));
  --_padding: var(--callout-padding, var(--space-7));

  container-type: inline-size;
  container-name: donation-callout;

  width: 100%;
  min-width: 0;
  margin-block: var(--space-8);
}

.donation-callout__content {
  padding: var(--_padding);
  background: linear-gradient(135deg, #fff3e5 0%, #fee4cc 50%, #fed7aa 100%);
  border: 2px solid rgba(234, 88, 12, 0.25);
  border-radius: var(--radius-xl);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-5);
  box-shadow: 0 16px 36px -8px var(--color-accent-glow, rgba(234, 88, 12, 0.22));
  position: relative;
  overflow: hidden;
}

[data-theme="dark"] .donation-callout__content {
  background: linear-gradient(135deg, #2a150a 0%, #3d1f0f 50%, #200f07 100%);
  border-color: rgba(251, 146, 60, 0.3);
  box-shadow: 0 16px 36px -8px rgba(0, 0, 0, 0.5);
}

.donation-callout__title {
  margin: 0;
  font-family: var(--font-heading);
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  color: var(--color-primary);
  line-height: 1.2;
  max-width: 32ch;
}

.donation-callout__subtitle {
  margin: 0;
  font-size: 1.125rem;
  color: var(--color-text);
  line-height: 1.5;
  max-width: 55ch;
}

.donation-callout__stats {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-3) var(--space-5);
  margin-block: var(--space-2);
}

.donation-callout__stat-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-weight: 700;
  font-size: 1rem;
  color: var(--color-text);
  background-color: rgba(255, 255, 255, 0.7);
  padding: 0.35rem 0.85rem;
  border-radius: var(--radius-full);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
}

[data-theme="dark"] .donation-callout__stat-item {
  background-color: rgba(255, 255, 255, 0.05);
}

.donation-callout__stat-dot {
  width: 0.7rem;
  height: 0.7rem;
  border-radius: var(--radius-full);
  background-color: var(--color-accent);
  box-shadow: 0 0 8px var(--color-accent-glow, rgba(234, 88, 12, 0.5));
}

.donation-callout__action {
  margin-block-start: var(--space-2);
}

@container donation-callout (max-width: 600px) {
  .donation-callout__content {
    padding: var(--space-5);
    text-align: left;
    align-items: flex-start;
  }

  .donation-callout__stats {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-2);
  }
}
</style>
