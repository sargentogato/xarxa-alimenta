<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import SectionTitle from '@/components/common/SectionTitle.vue';

const { t } = useI18n();
</script>

<template>
  <div class="page cookies-page container">
    <SectionTitle
      :title="t('cookies.title')"
      :subtitle="t('cookies.lastUpdated')"
    />
  </div>
</template>

<style scoped>
.cookies-page {
  padding-block: var(--space-6);
}
</style>
