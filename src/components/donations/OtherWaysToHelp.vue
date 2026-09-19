<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import BaseButton from '@/components/common/BaseButton.vue';
import IconUsers from '@/components/common/icons/IconUsers.vue';
import IconHeart from '@/components/common/icons/IconHeart.vue';
import IconExternalLink from '@/components/common/icons/IconExternalLink.vue';
import { organization } from '@/data/organization.ts';

const { t } = useI18n();
</script>

<template>
  <section class="other-ways-section" aria-labelledby="other-ways-heading">
    <div class="other-ways-header">
      <h2 id="other-ways-heading" class="other-ways-title">
        {{ t('donations.otherWays.title') }}
      </h2>
      <p class="other-ways-subtitle">
        {{ t('donations.otherWays.subtitle') }}
      </p>
    </div>

    <div class="other-ways-grid">
      <!-- 1. Voluntariado -->
      <article class="way-card">
        <div class="way-card__icon-box" aria-hidden="true">
          <IconUsers />
        </div>
        <h3 class="way-card__title">
          {{ t('donations.otherWays.gardeningTitle') }}
        </h3>
        <p class="way-card__desc">
          {{ t('donations.otherWays.gardeningDesc') }}
        </p>
        <div class="way-card__action">
          <BaseButton
            to="/servicios"
            variant="outline"
            size="sm"
          >
            {{ t('donations.otherWays.gardeningCta') }}
          </BaseButton>
        </div>
      </article>

      <!-- 2. Donación de herramientas y materiales -->
      <article class="way-card">
        <div class="way-card__icon-box" aria-hidden="true">
          <IconHeart />
        </div>
        <h3 class="way-card__title">
          {{ t('donations.otherWays.toolsTitle') }}
        </h3>
        <p class="way-card__desc">
          {{ t('donations.otherWays.toolsDesc') }}
        </p>
        <div class="way-card__action">
          <BaseButton
            to="/contacto"
            variant="outline"
            size="sm"
          >
            {{ t('donations.otherWays.toolsCta') }}
          </BaseButton>
        </div>
      </article>

      <!-- 3. Difusión y redes -->
      <article class="way-card">
        <div class="way-card__icon-box" aria-hidden="true">
          <IconExternalLink />
        </div>
        <h3 class="way-card__title">
          {{ t('donations.otherWays.spreadTitle') }}
        </h3>
        <p class="way-card__desc">
          {{ t('donations.otherWays.spreadDesc') }}
        </p>
        <div class="way-card__action">
          <BaseButton
            :href="`https://instagram.com/${organization.social.instagram.replace('@', '')}`"
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            size="sm"
          >
            {{ t('donations.otherWays.spreadCta') }}
          </BaseButton>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.other-ways-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  margin-bottom: var(--space-8);
}

.other-ways-header {
  text-align: left;
}

.other-ways-title {
  margin: 0 0 var(--space-2) 0;
  font-size: 1.45rem;
  color: var(--color-text);
  font-weight: 700;
}

.other-ways-subtitle {
  margin: 0;
  font-size: 0.95rem;
  color: var(--color-text-muted);
  line-height: 1.5;
  max-width: 44rem;
}

.other-ways-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  gap: var(--space-5);
}

.way-card {
  display: flex;
  flex-direction: column;
  padding: var(--space-5);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  gap: var(--space-3);
  transition: transform var(--transition-fast), border-color var(--transition-fast);
}

.way-card:hover {
  transform: translateY(-2px);
  border-color: var(--color-primary);
}

.way-card__icon-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: var(--radius-md);
  background-color: var(--color-surface-alt);
  color: var(--color-primary);
  font-size: 1.35rem;
}

.way-card__title {
  margin: 0;
  font-size: 1.15rem;
  color: var(--color-text);
  line-height: 1.35;
}

.way-card__desc {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.55;
  color: var(--color-text-muted);
  flex-grow: 1;
}

.way-card__action {
  margin-top: auto;
  padding-top: var(--space-2);
}
</style>
