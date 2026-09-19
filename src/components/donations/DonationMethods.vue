<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import BaseButton from '@/components/common/BaseButton.vue';
import IconCopy from '@/components/common/icons/IconCopy.vue';
import IconCheck from '@/components/common/icons/IconCheck.vue';
import IconExternalLink from '@/components/common/icons/IconExternalLink.vue';
import { organization } from '@/data/organization.ts';
import { config } from '@/data/config.ts';

const { t } = useI18n();

const ibanValue = 'ES76 1491 0001 2345 6789 0123';
const bicValue = 'TRIOESMMXXX';
const bizumValue = '04892';

const copiedField = ref<string | null>(null);

async function copyToClipboard(text: string, fieldKey: string) {
  try {
    const clean = text.replace(/\s+/g, '');
    await navigator.clipboard.writeText(clean);
    copiedField.value = fieldKey;
    setTimeout(() => {
      if (copiedField.value === fieldKey) {
        copiedField.value = null;
      }
    }, 2500);
  } catch {
    // Fallback if clipboard API is restricted
    const input = document.createElement('input');
    input.value = text.replace(/\s+/g, '');
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    copiedField.value = fieldKey;
    setTimeout(() => {
      if (copiedField.value === fieldKey) {
        copiedField.value = null;
      }
    }, 2500);
  }
}
</script>

<template>
  <section class="donation-methods" aria-labelledby="methods-heading">
    <div class="methods-header">
      <h2 id="methods-heading" class="methods-title">
        {{ t('donations.methods.title') }}
      </h2>
      <p class="methods-subtitle">
        {{ t('donations.methods.subtitle') }}
      </p>
    </div>

    <div class="methods-grid">
      <!-- 1. Transferencia Bancaria -->
      <article class="method-card">
        <div class="method-card__header">
          <div class="method-badge">Banca Ética</div>
          <h3 class="method-card__title">
            {{ t('donations.methods.bankTitle') }}
          </h3>
          <p class="method-card__desc">
            {{ t('donations.methods.bankDesc') }}
          </p>
        </div>

        <div class="bank-details-list">
          <!-- Entidad -->
          <div class="bank-detail-item">
            <span class="detail-label">Entidad bancaria</span>
            <span class="detail-value">Triodos Bank (Banca Ética)</span>
          </div>

          <!-- Titular -->
          <div class="bank-detail-item">
            <span class="detail-label">{{ t('donations.methods.holderLabel') }}</span>
            <span class="detail-value">{{ organization.legalName }}</span>
          </div>

          <!-- IBAN -->
          <div class="bank-detail-item bank-detail-item--highlight">
            <div class="detail-header-row">
              <span class="detail-label">{{ t('donations.methods.ibanLabel') }}</span>
              <button
                type="button"
                class="copy-btn"
                :class="{ 'copy-btn--success': copiedField === 'iban' }"
                :aria-label="copiedField === 'iban' ? t('donations.methods.copiedText') : `Copiar ${t('donations.methods.ibanLabel')}`"
                @click="copyToClipboard(ibanValue, 'iban')"
              >
                <IconCheck v-if="copiedField === 'iban'" class="copy-btn__icon" />
                <IconCopy v-else class="copy-btn__icon" />
                <span>{{ copiedField === 'iban' ? t('donations.methods.copiedText') : t('donations.methods.copyBtn') }}</span>
              </button>
            </div>
            <div class="detail-code">
              <code>{{ ibanValue }}</code>
            </div>
          </div>

          <!-- BIC / SWIFT -->
          <div class="bank-detail-item">
            <div class="detail-header-row">
              <span class="detail-label">{{ t('donations.methods.bicLabel') }}</span>
              <button
                type="button"
                class="copy-btn"
                :class="{ 'copy-btn--success': copiedField === 'bic' }"
                :aria-label="copiedField === 'bic' ? t('donations.methods.copiedText') : `Copiar ${t('donations.methods.bicLabel')}`"
                @click="copyToClipboard(bicValue, 'bic')"
              >
                <IconCheck v-if="copiedField === 'bic'" class="copy-btn__icon" />
                <IconCopy v-else class="copy-btn__icon" />
                <span>{{ copiedField === 'bic' ? t('donations.methods.copiedText') : t('donations.methods.copyBtn') }}</span>
              </button>
            </div>
            <div class="detail-code">
              <code>{{ bicValue }}</code>
            </div>
          </div>

          <!-- Concepto -->
          <div class="bank-detail-item">
            <span class="detail-label">{{ t('donations.methods.conceptLabel') }}</span>
            <span class="detail-value detail-value--muted">{{ t('donations.methods.conceptValue') }}</span>
          </div>
        </div>
      </article>

      <!-- 2. Bizum Solidario -->
      <article class="method-card">
        <div class="method-card__header">
          <div class="method-badge method-badge--bizum">Bizum</div>
          <h3 class="method-card__title">
            {{ t('donations.methods.bizumTitle') }}
          </h3>
          <p class="method-card__desc">
            {{ t('donations.methods.bizumDesc') }}
          </p>
        </div>

        <div class="bizum-details-box">
          <span class="detail-label">{{ t('donations.methods.bizumCodeLabel') }}</span>
          <div class="bizum-code-row">
            <span class="bizum-code-number">{{ bizumValue }}</span>
            <button
              type="button"
              class="copy-btn copy-btn--lg"
              :class="{ 'copy-btn--success': copiedField === 'bizum' }"
              :aria-label="copiedField === 'bizum' ? t('donations.methods.copiedText') : `Copiar código Bizum`"
              @click="copyToClipboard(bizumValue, 'bizum')"
            >
              <IconCheck v-if="copiedField === 'bizum'" class="copy-btn__icon" />
              <IconCopy v-else class="copy-btn__icon" />
              <span>{{ copiedField === 'bizum' ? t('donations.methods.copiedText') : t('donations.methods.copyBtn') }}</span>
            </button>
          </div>
          <p class="bizum-concept-hint">
            {{ t('donations.methods.bizumConcept') }}
          </p>
        </div>

        <!-- 3. Teaming Grupo Solidario (Configurable mediante config.showTeaming) -->
        <div v-if="config.showTeaming" class="teaming-subcard">
          <div class="teaming-subcard__header">
            <h4 class="teaming-subcard__title">
              {{ t('donations.methods.teamingTitle') }}
            </h4>
            <p class="teaming-subcard__desc">
              {{ t('donations.methods.teamingDesc') }}
            </p>
          </div>

          <BaseButton
            href="https://www.teaming.net/xarxaalimenta"
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            size="md"
            class="teaming-action-btn"
          >
            <span>{{ t('donations.methods.teamingBtn') }}</span>
            <template #icon>
              <IconExternalLink />
            </template>
          </BaseButton>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.donation-methods {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  margin-bottom: var(--space-8);
}

.methods-header {
  text-align: left;
}

.methods-title {
  margin: 0 0 var(--space-2) 0;
  font-size: 1.5rem;
  color: var(--color-text);
  font-weight: 700;
}

.methods-subtitle {
  margin: 0;
  font-size: 0.95rem;
  color: var(--color-text-muted);
  line-height: 1.5;
  max-width: 44rem;
}

.methods-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: var(--space-5);
}

.method-card {
  display: flex;
  flex-direction: column;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-5) var(--space-6);
  gap: var(--space-4);
  box-shadow: var(--shadow-sm);
}

.method-card__header {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.method-badge {
  display: inline-block;
  align-self: flex-start;
  padding: 0.2rem 0.6rem;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background-color: rgba(46, 125, 50, 0.12);
  color: var(--color-primary);
  border-radius: var(--radius-sm);
}

.method-badge--bizum {
  background-color: rgba(0, 169, 143, 0.12);
  color: #008774;
}

.method-card__title {
  margin: 0;
  font-size: 1.25rem;
  color: var(--color-text);
}

.method-card__desc {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--color-text-muted);
}

/* Bank Details List */
.bank-details-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding-top: var(--space-2);
}

.bank-detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.bank-detail-item--highlight {
  padding: var(--space-3);
  background-color: var(--color-surface-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.detail-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.detail-label {
  font-size: 0.775rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-text-muted);
}

.detail-value {
  font-size: 0.925rem;
  font-weight: 600;
  color: var(--color-text);
}

.detail-value--muted {
  font-weight: 500;
  color: var(--color-text-muted);
}

.detail-code {
  margin-top: 0.2rem;
}

.detail-code code {
  font-family: var(--font-mono, monospace);
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--color-text);
}

/* Copy button */
.copy-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.65rem;
  font-size: 0.8rem;
  font-weight: 700;
  font-family: inherit;
  color: var(--color-primary);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.copy-btn:hover {
  background-color: var(--color-surface-hover);
  border-color: var(--color-primary);
}

.copy-btn--success {
  background-color: rgba(46, 125, 50, 0.15);
  color: var(--color-primary);
  border-color: var(--color-primary);
}

.copy-btn--lg {
  padding: 0.5rem 0.95rem;
  font-size: 0.9rem;
}

.copy-btn__icon {
  font-size: 1em;
}

/* Bizum Section */
.bizum-details-box {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-4);
  background-color: var(--color-surface-alt);
  border: 1.5px dashed var(--color-border);
  border-radius: var(--radius-md);
}

.bizum-code-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
}

.bizum-code-number {
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: var(--color-text);
}

.bizum-concept-hint {
  margin: 0;
  font-size: 0.825rem;
  color: var(--color-text-muted);
}

/* Teaming Subcard */
.teaming-subcard {
  margin-top: auto;
  padding: var(--space-4);
  background: linear-gradient(135deg, rgba(46, 125, 50, 0.05), transparent);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.teaming-subcard__header {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.teaming-subcard__title {
  margin: 0;
  font-size: 1.05rem;
  color: var(--color-text);
}

.teaming-subcard__desc {
  margin: 0;
  font-size: 0.875rem;
  color: var(--color-text-muted);
  line-height: 1.45;
}

.teaming-action-btn {
  width: 100%;
}
</style>
