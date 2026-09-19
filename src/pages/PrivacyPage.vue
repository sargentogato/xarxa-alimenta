<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import SectionTitle from '@/components/common/SectionTitle.vue';

const { t } = useI18n();
</script>

<template>
  <div class="page privacy-page container">
    <SectionTitle
      :title="t('privacy.title')"
      :subtitle="t('privacy.lastUpdated')"
    />
  </div>
</template>

<style scoped>
.privacy-page {
  padding-block: var(--space-6);
}
</style>
