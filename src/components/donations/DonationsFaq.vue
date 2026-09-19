<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import IconChevronDown from '@/components/common/icons/IconChevronDown.vue';

const { t } = useI18n();

const faqItems = [
  { qKey: 'donations.faq.q1', aKey: 'donations.faq.a1' },
  { qKey: 'donations.faq.q2', aKey: 'donations.faq.a2' },
  { qKey: 'donations.faq.q3', aKey: 'donations.faq.a3' },
  { qKey: 'donations.faq.q4', aKey: 'donations.faq.a4' },
];
</script>

<template>
  <section class="donations-faq" aria-labelledby="faq-heading">
    <div class="faq-header">
      <h2 id="faq-heading" class="faq-title">
        {{ t('donations.faq.title') }}
      </h2>
    </div>

    <div class="faq-list">
      <details
        v-for="(item, idx) in faqItems"
        :key="idx"
        class="faq-item"
      >
        <summary class="faq-question">
          <span class="faq-question__text">{{ t(item.qKey) }}</span>
          <IconChevronDown class="faq-question__icon" />
        </summary>
        <div class="faq-answer">
          <p>{{ t(item.aKey) }}</p>
        </div>
      </details>
    </div>
  </section>
</template>

<style scoped>
.donations-faq {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding: var(--space-6);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.faq-header {
  text-align: left;
}

.faq-title {
  margin: 0;
  font-size: 1.35rem;
  color: var(--color-text);
  font-weight: 700;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.faq-item {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-surface-alt);
  overflow: hidden;
  transition: border-color var(--transition-fast);
}

.faq-item[open] {
  border-color: var(--color-primary);
  background-color: var(--color-surface);
}

.faq-question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-4);
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--color-text);
  cursor: pointer;
  user-select: none;
  list-style: none;
}

.faq-question::-webkit-details-marker {
  display: none;
}

.faq-question:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: -2px;
}

.faq-question__icon {
  color: var(--color-primary);
  transition: transform var(--transition-fast);
  flex-shrink: 0;
}

.faq-item[open] .faq-question__icon {
  transform: rotate(180deg);
}

.faq-answer {
  padding: 0 var(--space-4) var(--space-4) var(--space-4);
  border-top: 1px solid var(--color-border);
  padding-top: var(--space-3);
}

.faq-answer p {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--color-text-muted);
}
</style>
