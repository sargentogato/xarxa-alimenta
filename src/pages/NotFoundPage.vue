<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import SectionTitle from '@/components/common/SectionTitle.vue';
import BaseButton from '@/components/common/BaseButton.vue';

const { t } = useI18n();
</script>

<template>
  <div class="page not-found-page container">
    <SectionTitle
      :title="t('common.pageNotFoundTitle')"
      :subtitle="t('common.pageNotFoundText')"
      align="center"
    />
    <div class="not-found-page__action">
      <BaseButton to="/" variant="primary">
        {{ t('common.backToHome') }}
      </BaseButton>
    </div>
  </div>
</template>

<style scoped>
.not-found-page {
  padding-block: var(--space-8);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.not-found-page__action {
  margin-block-start: var(--space-6);
}
</style>
