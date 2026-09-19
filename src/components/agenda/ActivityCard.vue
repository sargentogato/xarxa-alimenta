<script setup lang="ts">
/**
 * ActivityCard: Tarjeta accesible para eventos y actividades de la agenda.
 * Admite modo 'grid' y 'list', enlaces externos a más información y formulario Google Form opcional.
 */
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import AppImage from '@/components/common/AppImage.vue';
import IconCalendar from '@/components/common/icons/IconCalendar.vue';
import IconClock from '@/components/common/icons/IconClock.vue';
import IconMapPin from '@/components/common/icons/IconMapPin.vue';
import IconUsers from '@/components/common/icons/IconUsers.vue';
import IconExternalLink from '@/components/common/icons/IconExternalLink.vue';
import type { AgendaActivity } from '@/data/agenda.ts';
import { getGoogleCalendarUrl, downloadIcsFile } from '@/utils/calendar.ts';

const props = withDefaults(
  defineProps<{
    activity: AgendaActivity;
    viewMode?: 'grid' | 'list';
  }>(),
  {
    viewMode: 'grid',
  }
);

const { t, te, locale } = useI18n();
const showCalendarMenu = ref(false);
const menuRef = ref<HTMLElement | null>(null);

const dateObj = computed(() => new Date(props.activity.date));

const dayNumber = computed(() => dateObj.value.getDate().toString().padStart(2, '0'));

const monthName = computed(() => {
  return dateObj.value.toLocaleDateString(locale.value === 'en' ? 'en-US' : 'es-ES', {
    month: 'short',
  }).toUpperCase().replace('.', '');
});

const weekdayName = computed(() => {
  return dateObj.value.toLocaleDateString(locale.value === 'en' ? 'en-US' : 'es-ES', {
    weekday: 'short',
  });
});

const formattedTime = computed(() => {
  const start = dateObj.value.toLocaleTimeString(locale.value === 'en' ? 'en-US' : 'es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const end = new Date(props.activity.endDate).toLocaleTimeString(locale.value === 'en' ? 'en-US' : 'es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  });
  return `${start} - ${end}`;
});

const typeLabel = computed(() => {
  switch (props.activity.type) {
    case 'workshop':
      return t('agenda.filters.typeWorkshop');
    case 'open-day':
      return t('agenda.filters.typeOpenDay');
    case 'assembly':
      return t('agenda.filters.typeAssembly');
    case 'ride':
      return t('agenda.filters.typeRide');
    default:
      return '';
  }
});

const audienceLabel = computed(() => {
  switch (props.activity.audience) {
    case 'families':
      return t('agenda.filters.audienceFamilies');
    case 'volunteers':
      return t('agenda.filters.audienceVolunteers');
    default:
      return t('agenda.filters.audienceGeneral');
  }
});

// Comprueba si existe texto descriptivo para discriminar su renderizado condicionalmente
const hasDescription = computed(() => {
  if (!props.activity.descKey) return false;
  if (!te(props.activity.descKey)) return false;
  const text = t(props.activity.descKey);
  return typeof text === 'string' && text.trim().length > 0;
});

const calendarEventData = computed(() => ({
  title: t(props.activity.titleKey),
  description: hasDescription.value && props.activity.descKey ? t(props.activity.descKey) : '',
  location: `${props.activity.location}, ${props.activity.address}`,
  startDate: props.activity.date,
  endDate: props.activity.endDate,
}));

function handleAddGoogleCalendar() {
  showCalendarMenu.value = false;
  window.open(getGoogleCalendarUrl(calendarEventData.value), '_blank', 'noopener,noreferrer');
}

function handleDownloadIcs() {
  showCalendarMenu.value = false;
  downloadIcsFile(calendarEventData.value);
}

function handleClickOutside(e: MouseEvent) {
  if (menuRef.value && !menuRef.value.contains(e.target as Node)) {
    showCalendarMenu.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <article
    :id="`activity-${activity.id}`"
    class="activity-card"
    :class="`activity-card--${viewMode}`"
  >
    <!-- Imagen del evento -->
    <div class="activity-card__media">
      <AppImage
        :name="activity.image"
        :alt="t(activity.titleKey)"
        class="activity-card__img"
      />

      <!-- Placa de fecha superpuesta -->
      <div class="activity-card__date-badge" :aria-label="`${dayNumber} ${monthName}`">
        <span class="date-badge__month">{{ monthName }}</span>
        <span class="date-badge__day">{{ dayNumber }}</span>
        <span class="date-badge__weekday">{{ weekdayName }}</span>
      </div>
    </div>

    <!-- Contenido y detalles -->
    <div class="activity-card__body">
      <!-- Etiquetas -->
      <div class="activity-card__tags">
        <span class="tag tag--type">{{ typeLabel }}</span>
        <span class="tag tag--audience">
          <IconUsers class="tag__icon" />
          {{ audienceLabel }}
        </span>
        <span class="tag tag--free">{{ t('agenda.labels.free') }}</span>
      </div>

      <!-- Título de la actividad -->
      <h3 class="activity-card__title">
        {{ t(activity.titleKey) }}
      </h3>

      <!-- Horario y ubicación -->
      <div class="activity-card__meta">
        <div class="meta-item">
          <IconClock class="meta-icon" />
          <span>{{ formattedTime }}</span>
        </div>
        <div class="meta-item">
          <IconMapPin class="meta-icon" />
          <span>{{ activity.location }}</span>
        </div>
      </div>

      <!-- Texto descriptivo condicional (solo si existe y no está vacío) -->
      <p v-if="hasDescription" class="activity-card__desc">
        {{ t(activity.descKey!) }}
      </p>

      <!-- Pie de tarjeta abajo del todo -->
      <div class="activity-card__footer">
        <!-- Fila con "Toda la información aquí" y el menú de Calendario justo a su lado -->
        <div class="activity-card__info-row">
          <div class="activity-card__info-with-calendar">
            <a
              :href="activity.infoUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="activity-card__info-link"
            >
              <span>{{ t('agenda.labels.moreInfo') }}</span>
              <IconExternalLink class="info-link__icon" />
            </a>

            <!-- Menú de Calendario siempre al lado de 'Toda la información aquí' -->
            <div ref="menuRef" class="calendar-menu-wrapper">
              <button
                type="button"
                class="calendar-toggle-btn"
                :aria-label="t('agenda.labels.addToCalendar')"
                :title="t('agenda.labels.addToCalendar')"
                @click.stop="showCalendarMenu = !showCalendarMenu"
              >
                <IconCalendar class="calendar-icon" />
              </button>

              <div
                v-if="showCalendarMenu"
                class="calendar-dropdown"
                role="menu"
              >
                <button
                  type="button"
                  role="menuitem"
                  class="dropdown-item"
                  @click="handleAddGoogleCalendar"
                >
                  {{ t('agenda.labels.googleCalendar') }}
                </button>
                <button
                  type="button"
                  role="menuitem"
                  class="dropdown-item"
                  @click="handleDownloadIcs"
                >
                  {{ t('agenda.labels.downloadIcs') }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Botón de Formulario de inscripción a ancho completo (deshabilitado por el momento) -->
        <button
          type="button"
          disabled
          class="activity-card__register-btn-full"
          aria-disabled="true"
        >
          <span>{{ t('agenda.labels.registerForm') }}</span>
        </button>
      </div>
    </div>
  </article>
</template>

<style scoped>
.activity-card {
  position: relative;
  display: flex;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal);
}

.activity-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 28px -4px var(--color-glow, rgba(21, 128, 61, 0.16)), 0 6px 12px -2px rgba(0, 0, 0, 0.04);
  border-color: var(--color-primary);
}

/* Modo cuadrícula */
.activity-card--grid {
  flex-direction: column;
}

.activity-card--grid .activity-card__media {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
}

/* Modo lista */
.activity-card--list {
  flex-direction: row;
  align-items: stretch;
}

.activity-card--list .activity-card__media {
  position: relative;
  width: 18rem;
  flex-shrink: 0;
  overflow: hidden;
}

@media (max-width: 768px) {
  .activity-card--list {
    flex-direction: column;
  }
  .activity-card--list .activity-card__media {
    width: 100%;
  }
}

.activity-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 400ms ease;
}

.activity-card:hover .activity-card__img {
  transform: scale(1.03);
}

/* Placa de fecha */
.activity-card__date-badge {
  position: absolute;
  top: var(--space-3);
  left: var(--space-3);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 3.5rem;
  padding: 0.35rem 0.5rem;
  background-color: var(--color-surface);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-border);
  line-height: 1;
}

.date-badge__month {
  font-size: 0.7rem;
  font-weight: 800;
  color: var(--color-primary);
  letter-spacing: 0.05em;
}

.date-badge__day {
  font-size: 1.45rem;
  font-weight: 800;
  color: var(--color-text);
  margin-block: 0.15rem;
}

.date-badge__weekday {
  font-size: 0.65rem;
  text-transform: capitalize;
  color: var(--color-text-muted);
}

/* Cuerpo de la tarjeta */
.activity-card__body {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: var(--space-4) var(--space-5);
  gap: var(--space-3);
}

.activity-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.2rem 0.6rem;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.2;
}

.tag__icon {
  font-size: 0.85em;
}

.tag--type {
  background: var(--color-primary-soft);
  color: var(--color-primary-strong);
  border: 1px solid var(--color-border);
}

.tag--audience {
  background-color: var(--color-surface-alt);
  color: var(--color-text-muted);
  border: 1px solid var(--color-border);
}

.tag--free {
  background-color: #fef9c3;
  color: #854d0e;
  border: 1px solid #fde047;
  font-weight: 700;
}

.activity-card__title {
  margin: 0;
  font-size: 1.2rem;
  line-height: 1.35;
  color: var(--color-text);
}

.activity-card__meta {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
}

.meta-icon {
  color: var(--color-primary);
  flex-shrink: 0;
}

.activity-card__desc {
  margin: 0;
  font-size: 0.925rem;
  line-height: 1.55;
  color: var(--color-text-muted);
  flex-grow: 1;
}

/* Pie de tarjeta */
.activity-card__footer {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding-top: var(--space-3);
  border-top: 1px solid var(--color-border);
  margin-top: auto;
  width: 100%;
}

.activity-card__info-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.activity-card__info-with-calendar {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
}

.activity-card__info-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-primary);
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color var(--transition-fast);
}

.activity-card__info-link:hover {
  filter: brightness(0.8);
}

.info-link__icon {
  font-size: 0.9em;
}

/* Botón de inscripción a ancho completo (deshabilitado) */
.activity-card__register-btn-full {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.65rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: inherit;
  border-radius: var(--radius-md);
  border: 1px dashed var(--color-border);
  background-color: var(--color-surface-alt);
  color: var(--color-text-muted);
  cursor: not-allowed;
  opacity: 0.75;
  user-select: none;
  transition: all var(--transition-fast);
}

/* Menú de calendario */
.calendar-menu-wrapper {
  position: relative;
}

.calendar-toggle-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.35rem;
  height: 2.35rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background-color: var(--color-surface);
  color: var(--color-text-muted);
  cursor: pointer;
  transition: background-color var(--transition-fast), color var(--transition-fast), border-color var(--transition-fast);
}

.calendar-toggle-btn:hover {
  background-color: var(--color-surface-hover);
  color: var(--color-primary);
  border-color: var(--color-primary);
}

.calendar-dropdown {
  position: absolute;
  right: 0;
  bottom: calc(100% + 0.35rem);
  z-index: 10;
  min-width: 11.5rem;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  padding: 0.35rem 0;
  display: flex;
  flex-direction: column;
}

.dropdown-item {
  padding: 0.5rem 0.85rem;
  font-size: 0.825rem;
  text-align: left;
  background: none;
  border: none;
  color: var(--color-text);
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.dropdown-item:hover {
  background-color: var(--color-surface-hover);
  color: var(--color-primary);
}
</style>
