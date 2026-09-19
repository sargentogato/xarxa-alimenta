<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import SectionTitle from '@/components/common/SectionTitle.vue';
import BaseButton from '@/components/common/BaseButton.vue';
import IconCalendar from '@/components/common/icons/IconCalendar.vue';
import IconExternalLink from '@/components/common/icons/IconExternalLink.vue';
import AgendaFilters, { type ActivityPeriod } from '@/components/agenda/AgendaFilters.vue';
import ActivityCard from '@/components/agenda/ActivityCard.vue';
import { agendaActivities, type ActivityType, type ActivityAudience } from '@/data/agenda.ts';
import { organization } from '@/data/organization.ts';

const { t } = useI18n();

// Filter states
const searchQuery = ref('');
const selectedType = ref<ActivityType | 'all'>('all');
const selectedAudience = ref<ActivityAudience | 'all'>('all');
const selectedPeriod = ref<ActivityPeriod>('all');
const viewMode = ref<'grid' | 'list'>('grid');

// Filter evaluation
const filteredActivities = computed(() => {
  return agendaActivities.filter((item) => {
    // Type filter
    if (selectedType.value !== 'all' && item.type !== selectedType.value) {
      return false;
    }

    // Audience filter
    if (selectedAudience.value !== 'all' && item.audience !== selectedAudience.value) {
      return false;
    }

    // Period filter
    if (selectedPeriod.value !== 'all') {
      const eventDate = new Date(item.date).getTime();
      const now = new Date('2026-09-18T00:00:00').getTime(); // Reference current date

      if (selectedPeriod.value === 'upcoming') {
        const fourWeeksMs = 28 * 24 * 60 * 60 * 1000;
        if (eventDate < now || eventDate > now + fourWeeksMs) {
          return false;
        }
      } else if (selectedPeriod.value === 'month') {
        const itemDate = new Date(item.date);
        if (itemDate.getMonth() !== 9) { // October 2026
          return false;
        }
      }
    }

    // Text search filter
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase().trim();
      const title = t(item.titleKey).toLowerCase();
      const desc = item.descKey ? t(item.descKey).toLowerCase() : '';
      const loc = item.location.toLowerCase();
      const addr = item.address.toLowerCase();

      if (!title.includes(q) && !desc.includes(q) && !loc.includes(q) && !addr.includes(q)) {
        return false;
      }
    }

    return true;
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
});

const hasActiveFilters = computed(() => {
  return (
    searchQuery.value.trim() !== '' ||
    selectedType.value !== 'all' ||
    selectedAudience.value !== 'all' ||
    selectedPeriod.value !== 'all'
  );
});

function handleResetFilters() {
  searchQuery.value = '';
  selectedType.value = 'all';
  selectedAudience.value = 'all';
  selectedPeriod.value = 'all';
}
</script>

<template>
  <div class="page agenda-page container">
    <!-- Header Section -->
    <header class="agenda-header">
      <SectionTitle
        :title="t('agenda.title')"
        :subtitle="t('agenda.intro', { orgName: organization.name })"
      />

      <!-- Social Notice banner -->
      <aside class="agenda-notice" aria-label="Aviso de última hora">
        <IconCalendar class="agenda-notice__icon" />
        <span class="agenda-notice__text">
          {{ t('agenda.instagramNotice') }}
        </span>
        <a
          :href="`https://instagram.com/${organization.social.instagram.replace('@', '')}`"
          target="_blank"
          rel="noopener noreferrer"
          class="agenda-notice__link"
        >
          Instagram ({{ organization.social.instagram }})
          <IconExternalLink class="agenda-notice__link-icon" />
        </a>
      </aside>
    </header>

    <!-- Interactive Filters Component -->
    <AgendaFilters
      v-model:search-query="searchQuery"
      v-model:selected-type="selectedType"
      v-model:selected-audience="selectedAudience"
      v-model:selected-period="selectedPeriod"
      v-model:view-mode="viewMode"
      :total-results="filteredActivities.length"
      :has-active-filters="hasActiveFilters"
      @reset-filters="handleResetFilters"
    />

    <!-- Activities Display: Grid or List -->
    <main id="agenda-results" class="agenda-results">
      <div
        v-if="filteredActivities.length > 0"
        :class="['activities-container', `activities-container--${viewMode}`]"
      >
        <ActivityCard
          v-for="activity in filteredActivities"
          :key="activity.id"
          :activity="activity"
          :view-mode="viewMode"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="agenda-empty" role="status" aria-live="polite">
        <div class="agenda-empty__icon-box" aria-hidden="true">
          <IconCalendar />
        </div>
        <h3 class="agenda-empty__title">
          {{ hasActiveFilters ? t('agenda.filters.noResults') : t('agenda.labels.empty') }}
        </h3>
        <p class="agenda-empty__desc">
          Prueba a cambiar los criterios de búsqueda o restablecer los filtros para ver todas las actividades programadas.
        </p>
        <BaseButton
          v-if="hasActiveFilters"
          variant="secondary"
          @click="handleResetFilters"
        >
          {{ t('agenda.filters.clear') }}
        </BaseButton>
      </div>
    </main>
  </div>
</template>

<style scoped>
.agenda-page {
  padding-block: var(--space-6) var(--space-8);
}

.agenda-header {
  margin-bottom: var(--space-5);
}

.agenda-notice {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  flex-wrap: wrap;
  padding: var(--space-3) var(--space-5);
  margin-top: var(--space-4);
  background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
  border: 1.5px solid #fde047;
  border-radius: var(--radius-full);
  box-shadow: 0 2px 8px rgba(202, 138, 4, 0.12);
  font-size: 0.95rem;
  color: #78350f;
}

[data-theme="dark"] .agenda-notice {
  background: linear-gradient(135deg, #282006 0%, #3a2e0a 100%);
  border-color: #854d0e;
  color: #fef08a;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.agenda-notice__icon {
  color: #d97706;
  flex-shrink: 0;
}

.agenda-notice__text {
  color: var(--color-text-muted);
}

.agenda-notice__link {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: 700;
  color: var(--color-primary);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.agenda-notice__link:hover {
  filter: brightness(0.85);
}

.agenda-notice__link-icon {
  font-size: 0.9em;
}

/* Containers */
.activities-container--grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  gap: var(--space-5);
}

.activities-container--list {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

/* Empty State */
.agenda-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--space-8) var(--space-4);
  background-color: var(--color-surface);
  border: 1.5px dashed var(--color-border);
  border-radius: var(--radius-lg);
  gap: var(--space-3);
}

.agenda-empty__icon-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: var(--color-surface-alt);
  color: var(--color-text-muted);
  font-size: 2rem;
}

.agenda-empty__title {
  margin: 0;
  font-size: 1.25rem;
  color: var(--color-text);
  max-width: 32rem;
}

.agenda-empty__desc {
  margin: 0;
  font-size: 0.95rem;
  color: var(--color-text-muted);
  max-width: 28rem;
}
</style>
