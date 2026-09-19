<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import AppImage from '@/components/common/AppImage.vue';
import IconMapPin from '@/components/common/icons/IconMapPin.vue';
import IconClock from '@/components/common/icons/IconClock.vue';
import IconExternalLink from '@/components/common/icons/IconExternalLink.vue';
import { communityLocations } from '@/data/locations.ts';

const { t } = useI18n();

function getMapsUrl(query: string): string {
  return `https://www.openstreetmap.org/search?query=${encodeURIComponent(query)}`;
}
</script>

<template>
  <section class="locations-section" aria-labelledby="locations-heading">
    <div class="locations-header">
      <h2 id="locations-heading" class="locations-title">
        {{ t('contact.locationsTitle') }}
      </h2>
      <p class="locations-subtitle">
        {{ t('contact.locationsSubtitle') }}
      </p>
    </div>

    <div class="locations-grid">
      <article
        v-for="loc in communityLocations"
        :key="loc.id"
        class="location-card"
        :class="{ 'location-card--main': loc.isMain }"
      >
        <!-- Imagen representativa del espacio -->
        <div class="location-card__image-box">
          <AppImage
            :name="loc.image"
            :alt="t(loc.nameKey)"
            class="location-card__image"
          />
          <div v-if="loc.isMain" class="main-badge">
            {{ t('contact.labels.mainBadge') }}
          </div>
        </div>

        <!-- Contenido descriptivo -->
        <div class="location-card__content">
          <div class="location-card__header">
            <span class="location-type">{{ t(loc.typeKey) }}</span>
            <h3 class="location-name">{{ t(loc.nameKey) }}</h3>
          </div>

          <p class="location-desc">
            {{ t(loc.descKey) }}
          </p>

          <div class="location-meta-list">
            <!-- Dirección física -->
            <div class="meta-item">
              <IconMapPin class="meta-item__icon" />
              <div class="meta-item__text">
                <span class="meta-item__label">{{ t('contact.labels.addressLabel') }}</span>
                <span class="meta-item__val">{{ loc.address }}, {{ loc.city }}</span>
              </div>
            </div>

            <!-- Horarios y encuentros -->
            <div class="meta-item">
              <IconClock class="meta-item__icon" />
              <div class="meta-item__text">
                <span class="meta-item__label">{{ t('contact.labels.scheduleLabel') }}</span>
                <span class="meta-item__val">{{ t(loc.scheduleKey) }}</span>
              </div>
            </div>

            <!-- Cómo llegar / accesibilidad -->
            <div class="meta-item">
              <span class="meta-item__icon-placeholder" aria-hidden="true">🌱</span>
              <div class="meta-item__text">
                <span class="meta-item__label">{{ t('contact.labels.accessLabel') }}</span>
                <span class="meta-item__val">{{ t(loc.accessInfoKey) }}</span>
              </div>
            </div>
          </div>

          <!-- Enlace externo a mapa OpenStreetMap -->
          <div class="location-card__footer">
            <a
              :href="getMapsUrl(loc.mapsQuery)"
              target="_blank"
              rel="noopener noreferrer"
              class="maps-link"
            >
              <span>{{ t('contact.labels.openInMaps') }}</span>
              <IconExternalLink class="maps-link__icon" />
            </a>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.locations-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  margin-bottom: var(--space-8);
}

.locations-header {
  text-align: left;
}

.locations-title {
  margin: 0 0 var(--space-2) 0;
  font-size: 1.45rem;
  color: var(--color-text);
  font-weight: 700;
}

.locations-subtitle {
  margin: 0;
  font-size: 0.95rem;
  color: var(--color-text-muted);
  line-height: 1.55;
  max-width: 44rem;
}

.locations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: var(--space-6);
}

.location-card {
  display: flex;
  flex-direction: column;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-fast), border-color var(--transition-fast);
}

.location-card:hover {
  transform: translateY(-2px);
  border-color: var(--color-primary);
}

.location-card--main {
  border-color: var(--color-primary);
}

.location-card__image-box {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background-color: var(--color-surface-alt);
}

.main-badge {
  position: absolute;
  top: var(--space-3);
  right: var(--space-3);
  background-color: var(--color-primary);
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.65rem;
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-sm);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.location-card__content {
  display: flex;
  flex-direction: column;
  padding: var(--space-5);
  gap: var(--space-4);
  flex-grow: 1;
}

.location-card__header {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.location-type {
  font-size: 0.775rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-primary);
}

.location-name {
  margin: 0;
  font-size: 1.25rem;
  color: var(--color-text);
  line-height: 1.35;
}

.location-desc {
  margin: 0;
  font-size: 0.925rem;
  line-height: 1.55;
  color: var(--color-text-muted);
}

.location-meta-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-3);
  background-color: var(--color-surface-alt);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
}

.meta-item {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
}

.meta-item__icon {
  color: var(--color-primary);
  font-size: 1.15em;
  flex-shrink: 0;
  margin-top: 0.15rem;
}

.meta-item__icon-placeholder {
  font-size: 1em;
  flex-shrink: 0;
  margin-top: 0.15rem;
}

.meta-item__text {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.meta-item__label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-text-muted);
}

.meta-item__val {
  font-size: 0.875rem;
  line-height: 1.45;
  color: var(--color-text);
}

.location-card__footer {
  margin-top: auto;
  padding-top: var(--space-2);
}

.maps-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-primary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.maps-link:hover {
  text-decoration: underline;
}

.maps-link__icon {
  font-size: 0.9em;
}
</style>
