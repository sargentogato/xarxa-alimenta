<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import IconSearch from '@/components/common/icons/IconSearch.vue';
import IconGrid from '@/components/common/icons/IconGrid.vue';
import IconList from '@/components/common/icons/IconList.vue';
import IconReset from '@/components/common/icons/IconReset.vue';
import type { ActivityType, ActivityAudience } from '@/data/agenda.ts';

export type ActivityPeriod = 'all' | 'upcoming' | 'month';

defineProps<{
  searchQuery: string;
  selectedType: ActivityType | 'all';
  selectedAudience: ActivityAudience | 'all';
  selectedPeriod: ActivityPeriod;
  viewMode: 'grid' | 'list';
  totalResults: number;
  hasActiveFilters: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:searchQuery', val: string): void;
  (e: 'update:selectedType', val: ActivityType | 'all'): void;
  (e: 'update:selectedAudience', val: ActivityAudience | 'all'): void;
  (e: 'update:selectedPeriod', val: ActivityPeriod): void;
  (e: 'update:viewMode', val: 'grid' | 'list'): void;
  (e: 'resetFilters'): void;
}>();

const { t } = useI18n();

const typeOptions: Array<{ value: ActivityType | 'all'; labelKey: string }> = [
  { value: 'all', labelKey: 'agenda.filters.typeAll' },
  { value: 'workshop', labelKey: 'agenda.filters.typeWorkshop' },
  { value: 'open-day', labelKey: 'agenda.filters.typeOpenDay' },
  { value: 'assembly', labelKey: 'agenda.filters.typeAssembly' },
  { value: 'ride', labelKey: 'agenda.filters.typeRide' },
];

const audienceOptions: Array<{ value: ActivityAudience | 'all'; labelKey: string }> = [
  { value: 'all', labelKey: 'agenda.filters.audienceAll' },
  { value: 'all', labelKey: 'agenda.filters.audienceGeneral' },
  { value: 'families', labelKey: 'agenda.filters.audienceFamilies' },
  { value: 'volunteers', labelKey: 'agenda.filters.audienceVolunteers' },
];

const periodOptions: Array<{ value: ActivityPeriod; labelKey: string }> = [
  { value: 'all', labelKey: 'agenda.filters.periodAll' },
  { value: 'upcoming', labelKey: 'agenda.filters.periodUpcoming' },
  { value: 'month', labelKey: 'agenda.filters.periodThisMonth' },
];
</script>

<template>
  <div class="agenda-filters-panel" role="search" :aria-label="t('agenda.filters.title')">
    <!-- Top row: Search input & View switcher -->
    <div class="filters-row filters-row--primary">
      <!-- Search bar -->
      <div class="search-field">
        <label for="agenda-search" class="visually-hidden">
          {{ t('agenda.searchPlaceholder') }}
        </label>
        <div class="search-input-wrapper">
          <IconSearch class="search-icon" />
          <input
            id="agenda-search"
            :value="searchQuery"
            type="search"
            :placeholder="t('agenda.searchPlaceholder')"
            class="search-input"
            @input="emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
          />
        </div>
      </div>

      <!-- View switch buttons -->
      <div class="view-switch" role="group" :aria-label="t('agenda.viewMode.grid')">
        <button
          type="button"
          class="view-btn"
          :class="{ 'view-btn--active': viewMode === 'grid' }"
          :aria-pressed="viewMode === 'grid'"
          :aria-label="t('agenda.viewMode.grid')"
          :title="t('agenda.viewMode.grid')"
          @click="emit('update:viewMode', 'grid')"
        >
          <IconGrid />
        </button>
        <button
          type="button"
          class="view-btn"
          :class="{ 'view-btn--active': viewMode === 'list' }"
          :aria-pressed="viewMode === 'list'"
          :aria-label="t('agenda.viewMode.list')"
          :title="t('agenda.viewMode.list')"
          @click="emit('update:viewMode', 'list')"
        >
          <IconList />
        </button>
      </div>
    </div>

    <!-- Bottom row: Select filter pills -->
    <div class="filters-row filters-row--secondary">
      <div class="filter-controls">
        <!-- Type Filter -->
        <div class="filter-item">
          <label for="filter-type" class="filter-label">
            {{ t('agenda.filters.typeLabel') }}
          </label>
          <select
            id="filter-type"
            :value="selectedType"
            class="filter-select"
            @change="emit('update:selectedType', ($event.target as HTMLSelectElement).value as any)"
          >
            <option
              v-for="opt in typeOptions"
              :key="opt.value + opt.labelKey"
              :value="opt.value"
            >
              {{ t(opt.labelKey) }}
            </option>
          </select>
        </div>

        <!-- Audience Filter -->
        <div class="filter-item">
          <label for="filter-audience" class="filter-label">
            {{ t('agenda.filters.audienceLabel') }}
          </label>
          <select
            id="filter-audience"
            :value="selectedAudience"
            class="filter-select"
            @change="emit('update:selectedAudience', ($event.target as HTMLSelectElement).value as any)"
          >
            <option
              v-for="opt in audienceOptions"
              :key="opt.value + opt.labelKey"
              :value="opt.value"
            >
              {{ t(opt.labelKey) }}
            </option>
          </select>
        </div>

        <!-- Period Filter -->
        <div class="filter-item">
          <label for="filter-period" class="filter-label">
            {{ t('agenda.filters.periodLabel') }}
          </label>
          <select
            id="filter-period"
            :value="selectedPeriod"
            class="filter-select"
            @change="emit('update:selectedPeriod', ($event.target as HTMLSelectElement).value as any)"
          >
            <option
              v-for="opt in periodOptions"
              :key="opt.value"
              :value="opt.value"
            >
              {{ t(opt.labelKey) }}
            </option>
          </select>
        </div>
      </div>

      <!-- Live count and Reset button -->
      <div class="filter-status-area">
        <span class="results-counter" role="status" aria-live="polite">
          {{ t('agenda.filters.resultsCount', { count: totalResults }) }}
        </span>

        <button
          v-if="hasActiveFilters"
          type="button"
          class="reset-filters-btn"
          @click="emit('resetFilters')"
        >
          <IconReset class="reset-icon" />
          {{ t('agenda.filters.clear') }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.agenda-filters-panel {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding: var(--space-4) var(--space-5);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--space-6);
}

.filters-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.filters-row--primary {
  align-items: stretch;
}

.search-field {
  flex: 1;
  min-width: 16rem;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.search-icon {
  position: absolute;
  left: 0.9rem;
  color: var(--color-text-muted);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.6rem;
  font-family: inherit;
  font-size: 0.95rem;
  color: var(--color-text);
  background-color: var(--color-surface-alt);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.search-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-light, rgba(46, 125, 50, 0.18));
}

/* View switcher */
.view-switch {
  display: inline-flex;
  background-color: var(--color-surface-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 0.2rem;
  gap: 0.2rem;
}

.view-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.35rem;
  height: 2.35rem;
  border: none;
  background: none;
  color: var(--color-text-muted);
  border-radius: calc(var(--radius-md) - 2px);
  cursor: pointer;
  transition: background-color var(--transition-fast), color var(--transition-fast);
}

.view-btn:hover {
  color: var(--color-text);
}

.view-btn--active {
  background-color: var(--color-surface);
  color: var(--color-primary);
  box-shadow: var(--shadow-sm);
}

/* Secondary row */
.filter-controls {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  flex-wrap: wrap;
}

.filter-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.filter-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-text-muted);
}

.filter-select {
  padding: 0.45rem 2rem 0.45rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text);
  background-color: var(--color-surface-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: border-color var(--transition-fast);
}

.filter-select:focus {
  outline: none;
  border-color: var(--color-primary);
}

.filter-status-area {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-left: auto;
}

.results-counter {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text-muted);
}

.reset-filters-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.45rem 0.75rem;
  font-size: 0.825rem;
  font-weight: 600;
  color: var(--color-primary);
  background-color: var(--color-surface-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background-color var(--transition-fast), color var(--transition-fast);
}

.reset-filters-btn:hover {
  background-color: var(--color-surface-hover);
}

.reset-icon {
  font-size: 0.9em;
}

@media (max-width: 640px) {
  .filter-controls {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
  }
  .filter-select {
    width: 100%;
  }
  .filter-status-area {
    width: 100%;
    justify-content: space-between;
    margin-left: 0;
  }
}
</style>
