<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import SectionTitle from '@/components/common/SectionTitle.vue';
import ImpactCalculator from '@/components/donations/ImpactCalculator.vue';
import DonationMethods from '@/components/donations/DonationMethods.vue';
import TransparencySection from '@/components/donations/TransparencySection.vue';
import OtherWaysToHelp from '@/components/donations/OtherWaysToHelp.vue';
import DonationsFaq from '@/components/donations/DonationsFaq.vue';
import { organization } from '@/data/organization.ts';

const { t } = useI18n();
</script>

<template>
  <div class="page donations-page container">
    <!-- Header Section -->
    <header class="donations-header">
      <SectionTitle
        :title="t('donations.title')"
        :subtitle="t('donations.intro', { orgName: organization.name })"
      />
    </header>

    <!-- 1. Calculadora de Impacto Comunitario -->
    <ImpactCalculator />

    <!-- 2. Canales Directos de Aportación (IBAN copiable, Bizum, Teaming) -->
    <DonationMethods />

    <!-- 3. Transparencia y Destino de los Recursos -->
    <TransparencySection />

    <!-- 4. Otras Formas de Apoyo Mutuo (Sin dinero) -->
    <OtherWaysToHelp />

    <!-- 5. Preguntas Frecuentes -->
    <DonationsFaq />
  </div>
</template>

<style scoped>
.donations-page {
  padding-block: var(--space-6) var(--space-8);
  display: flex;
  flex-direction: column;
}

.donations-header {
  margin-bottom: var(--space-6);
}
</style>
