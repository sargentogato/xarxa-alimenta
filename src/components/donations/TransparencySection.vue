<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import IconUsers from '@/components/common/icons/IconUsers.vue';

const { t } = useI18n();

const allocationItems = [
  {
    key: 'food',
    percentNum: 40,
    colorClass: 'bar--green',
  },
  {
    key: 'infrastructure',
    percentNum: 30,
    colorClass: 'bar--teal',
  },
  {
    key: 'education',
    percentNum: 20,
    colorClass: 'bar--amber',
  },
  {
    key: 'logistics',
    percentNum: 10,
    colorClass: 'bar--sage',
  },
];
</script>

<template>
  <section class="transparency-section" aria-labelledby="transparency-heading">
    <div class="transparency-header">
      <h2 id="transparency-heading" class="transparency-title">
        {{ t('donations.transparency.title') }}
      </h2>
      <p class="transparency-subtitle">
        {{ t('donations.transparency.subtitle') }}
      </p>
    </div>

    <!-- Multi-segmented Progress Bar -->
    <div class="allocation-bar-wrapper" aria-hidden="true">
      <div class="allocation-bar">
        <div
          v-for="item in allocationItems"
          :key="item.key"
          :class="['bar-segment', item.colorClass]"
          :style="{ width: `${item.percentNum}%` }"
          :title="`${item.percentNum}%`"
        />
      </div>
    </div>

    <!-- Cards breakdown -->
    <div class="allocation-grid">
      <div
        v-for="item in allocationItems"
        :key="item.key"
        class="allocation-card"
      >
        <div class="allocation-card__top">
          <span :class="['percent-indicator', `percent-indicator--${item.key}`]">
            {{ t(`donations.transparency.items.${item.key}.percent`) }}
          </span>
          <h3 class="allocation-card__title">
            {{ t(`donations.transparency.items.${item.key}.title`) }}
          </h3>
        </div>
        <p class="allocation-card__desc">
          {{ t(`donations.transparency.items.${item.key}.desc`) }}
        </p>
      </div>
    </div>

    <!-- Assembly & Democracy Callout -->
    <div class="assembly-notice-box">
      <div class="assembly-notice-icon-box" aria-hidden="true">
        <IconUsers />
      </div>
      <p class="assembly-notice-text">
        {{ t('donations.transparency.assemblyNotice') }}
      </p>
    </div>
  </section>
</template>

<style scoped>
.transparency-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  padding: var(--space-6);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--space-8);
}

.transparency-header {
  text-align: left;
}

.transparency-title {
  margin: 0 0 var(--space-2) 0;
  font-size: 1.45rem;
  color: var(--color-text);
  font-weight: 700;
}

.transparency-subtitle {
  margin: 0;
  font-size: 0.95rem;
  color: var(--color-text-muted);
  line-height: 1.5;
  max-width: 44rem;
}

/* Allocation Bar */
.allocation-bar-wrapper {
  width: 100%;
}

.allocation-bar {
  display: flex;
  height: 1rem;
  width: 100%;
  border-radius: var(--radius-full, 9999px);
  overflow: hidden;
  background-color: var(--color-surface-alt);
}

.bar-segment {
  height: 100%;
  transition: width var(--transition-normal);
}

.bar--green {
  background-color: var(--color-primary);
}

.bar--teal {
  background-color: #0d9488;
}

.bar--amber {
  background-color: #d97706;
}

.bar--sage {
  background-color: #65a30d;
}

/* Allocation Grid */
.allocation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  gap: var(--space-4);
}

.allocation-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-4);
  background-color: var(--color-surface-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.allocation-card__top {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.percent-indicator {
  display: inline-block;
  align-self: flex-start;
  font-size: 1.35rem;
  font-weight: 800;
  line-height: 1;
}

.percent-indicator--food {
  color: var(--color-primary);
}

.percent-indicator--infrastructure {
  color: #0d9488;
}

.percent-indicator--education {
  color: #d97706;
}

.percent-indicator--logistics {
  color: #65a30d;
}

.allocation-card__title {
  margin: 0;
  font-size: 1rem;
  color: var(--color-text);
  line-height: 1.35;
}

.allocation-card__desc {
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--color-text-muted);
}

/* Assembly notice */
.assembly-notice-box {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-4) var(--space-5);
  background-color: var(--color-surface-alt);
  border: 1px dashed var(--color-border);
  border-radius: var(--radius-md);
  margin-top: var(--space-2);
}

.assembly-notice-icon-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  background-color: rgba(46, 125, 50, 0.12);
  color: var(--color-primary);
  font-size: 1.35rem;
  flex-shrink: 0;
}

.assembly-notice-text {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--color-text);
}
</style>
