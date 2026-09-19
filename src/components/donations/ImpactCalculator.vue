<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import IconHeart from '@/components/common/icons/IconHeart.vue';
import IconCheck from '@/components/common/icons/IconCheck.vue';

const { t } = useI18n();

const presetAmounts = [5, 15, 30, 50] as const;
type PresetAmount = typeof presetAmounts[number];

const selectedPreset = ref<PresetAmount | 'custom'>(15);
const customAmount = ref<number | null>(null);

function selectPreset(amount: PresetAmount) {
  selectedPreset.value = amount;
  customAmount.value = null;
}

function handleCustomInput(e: Event) {
  const val = parseFloat((e.target as HTMLInputElement).value);
  if (!isNaN(val) && val > 0) {
    customAmount.value = val;
    selectedPreset.value = 'custom';
  } else {
    customAmount.value = null;
    selectedPreset.value = 15;
  }
}

const currentInfo = computed(() => {
  if (selectedPreset.value === 'custom' && customAmount.value) {
    return {
      title: `${customAmount.value} €`,
      description: t('donations.calculator.customMetric', { amount: customAmount.value }),
      metric: `${customAmount.value} € para el fondo común de apoyo mutuo`,
    };
  }

  const amount = typeof selectedPreset.value === 'number' ? selectedPreset.value : 15;
  return {
    title: t(`donations.calculator.amounts.${amount}.title`),
    description: t(`donations.calculator.amounts.${amount}.description`),
    metric: t(`donations.calculator.amounts.${amount}.metric`),
  };
});
</script>

<template>
  <section class="impact-calculator" aria-labelledby="calc-heading">
    <div class="calc-header">
      <h2 id="calc-heading" class="calc-title">
        {{ t('donations.calculator.title') }}
      </h2>
      <p class="calc-subtitle">
        {{ t('donations.calculator.subtitle') }}
      </p>
    </div>

    <!-- Amount selection buttons -->
    <div class="calc-controls">
      <div class="preset-buttons" role="group" aria-label="Cantidades de aportación sugeridas">
        <button
          v-for="amt in presetAmounts"
          :key="amt"
          type="button"
          class="preset-btn"
          :class="{ 'preset-btn--active': selectedPreset === amt }"
          :aria-pressed="selectedPreset === amt"
          @click="selectPreset(amt)"
        >
          <span class="preset-btn__val">{{ amt }} €</span>
        </button>
      </div>

      <!-- Custom amount input -->
      <div class="custom-amount-field">
        <label for="custom-donation-input" class="custom-amount-label">
          {{ t('donations.calculator.customAmountLabel') }}
        </label>
        <div class="custom-amount-wrapper">
          <input
            id="custom-donation-input"
            type="number"
            min="1"
            max="1000"
            step="1"
            :placeholder="selectedPreset === 'custom' && customAmount ? String(customAmount) : '20'"
            class="custom-amount-input"
            @input="handleCustomInput"
          />
          <span class="custom-amount-currency" aria-hidden="true">€</span>
        </div>
      </div>
    </div>

    <!-- Impact Result Display Card -->
    <div class="impact-display-card" role="region" aria-live="polite">
      <div class="impact-display-card__badge">
        <IconCheck class="badge-check-icon" />
        <span>{{ currentInfo.metric }}</span>
      </div>

      <h3 class="impact-display-card__heading">
        {{ currentInfo.title }}
      </h3>

      <p class="impact-display-card__text">
        {{ currentInfo.description }}
      </p>

      <div class="impact-display-card__footer">
        <IconHeart class="footer-heart-icon" />
        <span>Cada aportación se destina íntegramente al proyecto colectivo</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.impact-calculator {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  padding: var(--space-6) var(--space-6);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--space-8);
}

.calc-header {
  text-align: left;
}

.calc-title {
  margin: 0 0 var(--space-2) 0;
  font-size: 1.45rem;
  color: var(--color-text);
  font-weight: 700;
}

.calc-subtitle {
  margin: 0;
  font-size: 0.95rem;
  color: var(--color-text-muted);
  line-height: 1.5;
  max-width: 42rem;
}

.calc-controls {
  display: flex;
  align-items: center;
  gap: var(--space-5);
  flex-wrap: wrap;
}

.preset-buttons {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.preset-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 4.75rem;
  padding: 0.65rem 1.25rem;
  font-size: 1.1rem;
  font-weight: 700;
  font-family: inherit;
  color: var(--color-text);
  background-color: var(--color-surface-alt);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.preset-btn:hover {
  border-color: var(--color-primary);
  background-color: var(--color-surface-hover);
}

.preset-btn--active {
  background-color: var(--color-primary);
  color: var(--color-on-primary);
  border-color: var(--color-primary);
  box-shadow: 0 4px 14px -2px var(--color-glow, rgba(21, 128, 61, 0.35));
}

.custom-amount-field {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-left: auto;
}

.custom-amount-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text-muted);
}

.custom-amount-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.custom-amount-input {
  width: 5.5rem;
  padding: 0.55rem 1.5rem 0.55rem 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  font-family: inherit;
  color: var(--color-text);
  background-color: var(--color-surface-alt);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md);
  text-align: right;
  transition: border-color var(--transition-fast);
}

.custom-amount-input:focus {
  outline: none;
  border-color: var(--color-primary);
}

.custom-amount-currency {
  position: absolute;
  right: 0.6rem;
  font-weight: 700;
  color: var(--color-text-muted);
  pointer-events: none;
}

/* Impact Display Card */
.impact-display-card {
  padding: var(--space-5);
  background: linear-gradient(135deg, var(--color-primary-soft) 0%, #fff7ed 100%);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: 0 8px 24px -4px var(--color-glow, rgba(21, 128, 61, 0.12));
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

[data-theme="dark"] .impact-display-card {
  background: linear-gradient(135deg, var(--color-primary-soft) 0%, #221208 100%);
  box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.4);
}

.impact-display-card__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  align-self: flex-start;
  padding: 0.3rem 0.75rem;
  font-size: 0.825rem;
  font-weight: 700;
  color: var(--color-primary);
  background-color: rgba(46, 125, 50, 0.12);
  border-radius: var(--radius-sm);
}

.badge-check-icon {
  font-size: 1.1em;
}

.impact-display-card__heading {
  margin: var(--space-1) 0 0 0;
  font-size: 1.25rem;
  color: var(--color-text);
  line-height: 1.35;
}

.impact-display-card__text {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.55;
  color: var(--color-text-muted);
}

.impact-display-card__footer {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: var(--space-2);
  font-size: 0.825rem;
  color: var(--color-text-muted);
}

.footer-heart-icon {
  color: #e11d48;
  font-size: 1.1em;
}

@media (max-width: 640px) {
  .calc-controls {
    flex-direction: column;
    align-items: stretch;
  }
  .custom-amount-field {
    margin-left: 0;
    justify-content: space-between;
  }
}
</style>
