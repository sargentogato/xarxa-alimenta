<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import BaseButton from '@/components/common/BaseButton.vue';
import IconUsers from '@/components/common/icons/IconUsers.vue';
import IconCalendar from '@/components/common/icons/IconCalendar.vue';
import IconMail from '@/components/common/icons/IconMail.vue';
import { organization } from '@/data/organization.ts';

const { t } = useI18n();
</script>

<template>
  <section class="participate-box" aria-labelledby="participate-heading">
    <div class="participate-box__icon-wrapper" aria-hidden="true">
      <IconUsers />
    </div>

    <div class="participate-box__content">
      <h2 id="participate-heading" class="participate-box__title">
        {{ t('contact.participateBox.title') }}
      </h2>
      <p class="participate-box__text">
        {{ t('contact.participateBox.text') }}
      </p>

      <div class="participate-box__actions">
        <BaseButton
          to="/agenda"
          variant="primary"
          size="md"
        >
          <span>{{ t('contact.participateBox.actionAgenda') }}</span>
          <template #icon>
            <IconCalendar />
          </template>
        </BaseButton>

        <BaseButton
          :href="`mailto:${organization.email}`"
          variant="outline"
          size="md"
        >
          <span>{{ t('contact.participateBox.actionEmail') }}</span>
          <template #icon>
            <IconMail />
          </template>
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<style scoped>
.participate-box {
  display: flex;
  align-items: flex-start;
  gap: var(--space-6);
  padding: var(--space-6) var(--space-6);
  background: linear-gradient(135deg, var(--color-primary-soft) 0%, #fff7ed 100%);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: 0 10px 25px -4px var(--color-glow, rgba(21, 128, 61, 0.12));
  margin-top: var(--space-2);
}

[data-theme="dark"] .participate-box {
  background: linear-gradient(135deg, var(--color-primary-soft) 0%, #201207 100%);
  box-shadow: 0 10px 25px -4px rgba(0, 0, 0, 0.4);
}

.participate-box__icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background-color: var(--color-primary);
  color: #ffffff;
  font-size: 1.75rem;
  flex-shrink: 0;
}

.participate-box__content {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.participate-box__title {
  margin: 0;
  font-size: 1.35rem;
  color: var(--color-text);
  font-weight: 700;
  line-height: 1.35;
}

.participate-box__text {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--color-text-muted);
  max-width: 46rem;
}

.participate-box__actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  flex-wrap: wrap;
  padding-top: var(--space-2);
}

@media (max-width: 640px) {
  .participate-box {
    flex-direction: column;
    align-items: stretch;
    gap: var(--space-4);
  }
}
</style>
