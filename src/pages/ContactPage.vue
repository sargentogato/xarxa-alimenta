<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import SectionTitle from '@/components/common/SectionTitle.vue';
import ContactChannels from '@/components/contact/ContactChannels.vue';
import LocationsDirectory from '@/components/contact/LocationsDirectory.vue';
import ParticipateCallout from '@/components/contact/ParticipateCallout.vue';

const { t } = useI18n();
</script>

<template>
  <div class="page contact-page container">
    <!-- Encabezado accesible de la página (Nivel H1) -->
    <div class="contact-header">
      <SectionTitle
        :title="t('contact.title')"
        :subtitle="t('contact.intro')"
        :level="1"
      />
    </div>

    <!-- 1. Canales Directos de Comunicación (Correo, Instagram, Telegram, Teléfono) -->
    <ContactChannels />

    <!-- 2. Directorio de Espacios Comunitarios y Huertos (Ikigai, Valldares, La Red) -->
    <LocationsDirectory />

    <!-- 3. Llamada a la Participación Vecinal y Voluntariado -->
    <ParticipateCallout />
  </div>
</template>

<style scoped>
.contact-page {
  padding-block: var(--space-6) var(--space-8);
  display: flex;
  flex-direction: column;
}

.contact-header {
  margin-bottom: var(--space-6);
}
</style>
