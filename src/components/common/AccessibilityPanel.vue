<script setup lang="ts">
/**
 * AccessibilityPanel: Panel de ajustes de accesibilidad con 9 controles en vivo.
 * Slots: ninguno
 * CSS vars: --a11y-panel-width, --a11y-panel-bg, --a11y-panel-radius
 * Clases públicas: .a11y-panel, .a11y-panel__trigger, .a11y-panel__dialog, .a11y-panel__header, .a11y-panel__title, .a11y-panel__section, .a11y-panel__control, .a11y-panel__swatch
 * Expone: root, isOpen, open, close, toggle
 */
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAccessibility } from '@/composables/useAccessibility.ts';
import { useAppearance } from '@/composables/useAppearance.ts';
import { paletteList } from '@/data/config.ts';
import IconAccessibility from './icons/IconAccessibility.vue';
import IconClose from './icons/IconClose.vue';
import IconSun from './icons/IconSun.vue';
import IconMoon from './icons/IconMoon.vue';
import IconAuto from './icons/IconAuto.vue';
import IconReset from './icons/IconReset.vue';
import IconCheck from './icons/IconCheck.vue';

const { t } = useI18n();
const {
  settings,
  increaseTextSize,
  decreaseTextSize,
  toggleHighContrast,
  toggleLegibleFont,
  toggleWideSpacing,
  toggleUnderlineLinks,
  toggleReduceMotion,
  resetToDefaults: resetA11y,
} = useAccessibility();

const {
  theme,
  palette,
  showPaletteSelector,
  setTheme,
  setPalette,
} = useAppearance();

const root = ref<HTMLElement | null>(null);
const triggerRef = ref<HTMLButtonElement | null>(null);
const dialogRef = ref<HTMLElement | null>(null);
const closeBtnRef = ref<HTMLButtonElement | null>(null);
const isOpen = ref(false);

function toggle() {
  isOpen.value = !isOpen.value;
}

function open() {
  isOpen.value = true;
}

function close() {
  isOpen.value = false;
}

function resetAll() {
  resetA11y();
  setTheme('auto');
  setPalette('blanco-verde');
}

// Trap focus inside dialog when open
function handleKeydown(e: KeyboardEvent) {
  if (!isOpen.value) return;

  if (e.key === 'Escape') {
    e.preventDefault();
    close();
    return;
  }

  if (e.key === 'Tab' && dialogRef.value) {
    const focusable = dialogRef.value.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }
}

function handleDocumentClick(e: MouseEvent) {
  if (
    isOpen.value &&
    root.value &&
    !root.value.contains(e.target as Node)
  ) {
    close();
  }
}

watch(isOpen, (opened) => {
  if (opened) {
    nextTick(() => {
      if (closeBtnRef.value) {
        closeBtnRef.value.focus();
      }
    });
  } else {
    if (triggerRef.value) {
      triggerRef.value.focus();
    }
  }
});

onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
  document.addEventListener('click', handleDocumentClick);
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown);
  document.removeEventListener('click', handleDocumentClick);
});

defineExpose({
  root,
  isOpen,
  open,
  close,
  toggle,
});
</script>

<template>
  <div ref="root" class="a11y-panel">
    <!-- Botón disparador en el header -->
    <button
      ref="triggerRef"
      type="button"
      class="a11y-panel__trigger"
      :aria-expanded="isOpen ? 'true' : 'false'"
      aria-haspopup="dialog"
      :aria-label="t('accessibility.buttonLabel')"
      @click="toggle"
    >
      <IconAccessibility size="1.35rem" />
      <span class="a11y-panel__trigger-text">{{ t('accessibility.buttonLabel') }}</span>
    </button>

    <!-- Diálogo accesible / Popover en escritorio / Bottom sheet en móvil -->
    <div
      v-if="isOpen"
      ref="dialogRef"
      class="a11y-panel__dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby="a11y-title"
      tabindex="-1"
    >
      <header class="a11y-panel__header">
        <div class="a11y-panel__header-title">
          <IconAccessibility size="1.25rem" />
          <h2 id="a11y-title" class="a11y-panel__title">
            {{ t('accessibility.panelTitle') }}
          </h2>
        </div>
        <button
          ref="closeBtnRef"
          type="button"
          class="a11y-panel__close"
          :aria-label="t('common.close')"
          @click="close"
        >
          <IconClose size="1.25rem" />
        </button>
      </header>

      <div class="a11y-panel__body">
        <!-- 1. Tamaño del texto -->
        <section class="a11y-panel__section">
          <h3 class="a11y-panel__section-title">
            {{ t('accessibility.textSize.title') }}
          </h3>
          <div class="a11y-panel__text-size-controls">
            <button
              type="button"
              class="a11y-panel__btn-action"
              :disabled="settings.textSizeStep <= 1"
              :aria-label="t('accessibility.textSize.decrease')"
              @click="decreaseTextSize"
            >
              A−
            </button>
            <div
              class="a11y-panel__text-size-indicator"
              role="status"
              aria-live="polite"
            >
              {{ 100 + (settings.textSizeStep - 1) * 25 }}%
            </div>
            <button
              type="button"
              class="a11y-panel__btn-action"
              :disabled="settings.textSizeStep >= 4"
              :aria-label="t('accessibility.textSize.increase')"
              @click="increaseTextSize"
            >
              A+
            </button>
          </div>
        </section>

        <!-- 2. Tema visual -->
        <section class="a11y-panel__section">
          <h3 class="a11y-panel__section-title">
            {{ t('accessibility.theme.title') }}
          </h3>
          <div class="a11y-panel__segmented-control" role="radiogroup" :aria-label="t('accessibility.theme.title')">
            <button
              type="button"
              role="radio"
              :aria-checked="theme === 'auto'"
              :class="['a11y-panel__segment', theme === 'auto' ? 'a11y-panel__segment--active' : '']"
              @click="setTheme('auto')"
            >
              <IconAuto size="1rem" />
              <span>{{ t('accessibility.theme.auto') }}</span>
            </button>
            <button
              type="button"
              role="radio"
              :aria-checked="theme === 'light'"
              :class="['a11y-panel__segment', theme === 'light' ? 'a11y-panel__segment--active' : '']"
              @click="setTheme('light')"
            >
              <IconSun size="1rem" />
              <span>{{ t('accessibility.theme.light') }}</span>
            </button>
            <button
              type="button"
              role="radio"
              :aria-checked="theme === 'dark'"
              :class="['a11y-panel__segment', theme === 'dark' ? 'a11y-panel__segment--active' : '']"
              @click="setTheme('dark')"
            >
              <IconMoon size="1rem" />
              <span>{{ t('accessibility.theme.dark') }}</span>
            </button>
          </div>
        </section>

        <!-- 3. Paleta de color cerrada (si está habilitada en config) -->
        <section v-if="showPaletteSelector" class="a11y-panel__section">
          <h3 class="a11y-panel__section-title">
            {{ t('accessibility.palette.title') }}
          </h3>
          <div class="a11y-panel__palettes" role="radiogroup" :aria-label="t('accessibility.palette.title')">
            <button
              v-for="p in paletteList"
              :key="p.id"
              type="button"
              role="radio"
              :aria-checked="palette === p.id"
              :class="['a11y-panel__palette-card', palette === p.id ? 'a11y-panel__palette-card--selected' : '']"
              @click="setPalette(p.id)"
            >
              <div class="a11y-panel__palette-swatches">
                <span class="a11y-panel__swatch" :style="{ backgroundColor: p.preview.primary }" />
                <span class="a11y-panel__swatch" :style="{ backgroundColor: p.preview.accent }" />
                <span class="a11y-panel__swatch" :style="{ backgroundColor: p.preview.bg, border: '1px solid #ccc' }" />
              </div>
              <span class="a11y-panel__palette-name">{{ t(p.nameKey) }}</span>
              <span v-if="p.badge" class="a11y-panel__palette-badge">{{ p.badge }}</span>
              <IconCheck v-if="palette === p.id" size="1rem" class="a11y-panel__palette-check" />
            </button>
          </div>
        </section>

        <!-- 4-8. Interruptores de accesibilidad -->
        <section class="a11y-panel__section a11y-panel__toggles">
          <!-- Alto contraste -->
          <button
            type="button"
            role="switch"
            :aria-checked="settings.highContrast"
            :class="['a11y-panel__toggle', settings.highContrast ? 'a11y-panel__toggle--on' : '']"
            @click="toggleHighContrast"
          >
            <div class="a11y-panel__toggle-label">
              <strong>{{ t('accessibility.contrast.title') }}</strong>
              <small>{{ t('accessibility.contrast.description') }}</small>
            </div>
            <span class="a11y-panel__switch" aria-hidden="true" />
          </button>

          <!-- Fuente legible -->
          <button
            type="button"
            role="switch"
            :aria-checked="settings.legibleFont"
            :class="['a11y-panel__toggle', settings.legibleFont ? 'a11y-panel__toggle--on' : '']"
            @click="toggleLegibleFont"
          >
            <div class="a11y-panel__toggle-label">
              <strong>{{ t('accessibility.font.title') }}</strong>
              <small>{{ t('accessibility.font.description') }}</small>
            </div>
            <span class="a11y-panel__switch" aria-hidden="true" />
          </button>

          <!-- Mayor espaciado -->
          <button
            type="button"
            role="switch"
            :aria-checked="settings.wideSpacing"
            :class="['a11y-panel__toggle', settings.wideSpacing ? 'a11y-panel__toggle--on' : '']"
            @click="toggleWideSpacing"
          >
            <div class="a11y-panel__toggle-label">
              <strong>{{ t('accessibility.spacing.title') }}</strong>
              <small>{{ t('accessibility.spacing.description') }}</small>
            </div>
            <span class="a11y-panel__switch" aria-hidden="true" />
          </button>

          <!-- Subrayar enlaces -->
          <button
            type="button"
            role="switch"
            :aria-checked="settings.underlineLinks"
            :class="['a11y-panel__toggle', settings.underlineLinks ? 'a11y-panel__toggle--on' : '']"
            @click="toggleUnderlineLinks"
          >
            <div class="a11y-panel__toggle-label">
              <strong>{{ t('accessibility.links.title') }}</strong>
              <small>{{ t('accessibility.links.description') }}</small>
            </div>
            <span class="a11y-panel__switch" aria-hidden="true" />
          </button>

          <!-- Reducir animaciones -->
          <button
            type="button"
            role="switch"
            :aria-checked="settings.reduceMotion"
            :class="['a11y-panel__toggle', settings.reduceMotion ? 'a11y-panel__toggle--on' : '']"
            @click="toggleReduceMotion"
          >
            <div class="a11y-panel__toggle-label">
              <strong>{{ t('accessibility.motion.title') }}</strong>
              <small>{{ t('accessibility.motion.description') }}</small>
            </div>
            <span class="a11y-panel__switch" aria-hidden="true" />
          </button>
        </section>

        <!-- 9. Botón Restablecer -->
        <div class="a11y-panel__footer">
          <button
            type="button"
            class="a11y-panel__reset-btn"
            @click="resetAll"
          >
            <IconReset size="1.1rem" />
            <span>{{ t('accessibility.reset') }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.a11y-panel {
  position: relative;
  display: inline-block;
}

.a11y-panel__trigger {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-height: 2.75rem;
  padding: var(--space-2) var(--space-3);
  background-color: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-weight: 700;
  font-size: 0.9375rem;
  cursor: pointer;
  transition: background-color var(--transition-fast), border-color var(--transition-fast);
}

.a11y-panel__trigger:hover {
  background-color: var(--color-surface-hover);
}

@media (max-width: 640px) {
  .a11y-panel__trigger-text {
    display: none;
  }
}

/* Panel Popover (Escritorio) / Bottom sheet (Móvil) */
.a11y-panel__dialog {
  --_w: var(--a11y-panel-width, 24rem);
  --_bg: var(--a11y-panel-bg, var(--color-surface));
  --_radius: var(--a11y-panel-radius, var(--radius-lg));

  position: absolute;
  top: calc(100% + var(--space-2));
  right: 0;
  z-index: 100;
  width: var(--_w);
  max-width: 90vw;
  max-height: 82vh;
  display: flex;
  flex-direction: column;
  background-color: var(--_bg);
  border: 1px solid var(--color-border);
  border-radius: var(--_radius);
  box-shadow: var(--shadow-xl);
  outline: none;
  overflow: hidden;
}

@media (max-width: 640px) {
  .a11y-panel__dialog {
    position: fixed;
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    max-width: 100%;
    max-height: 85vh;
    border-radius: var(--radius-xl) var(--radius-xl) 0 0;
    border-inline: none;
    border-block-end: none;
  }
}

.a11y-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3) var(--space-4);
  border-block-end: 1px solid var(--color-border);
  background-color: var(--color-surface-alt);
}

.a11y-panel__header-title {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-primary);
}

.a11y-panel__title {
  font-size: 1.125rem;
  margin: 0;
  color: var(--color-text);
}

.a11y-panel__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  margin: calc(-1 * var(--space-1));
  color: var(--color-text-muted);
  border-radius: var(--radius-md);
  transition: color var(--transition-fast), background-color var(--transition-fast);
}

.a11y-panel__close:hover {
  color: var(--color-text);
  background-color: var(--color-surface-hover);
}

.a11y-panel__body {
  padding: var(--space-4);
  overflow-y: auto;
  overscroll-behavior: contain;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.a11y-panel__section {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.a11y-panel__section-title {
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin: 0;
}

/* Control de tamaño de texto */
.a11y-panel__text-size-controls {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.a11y-panel__btn-action {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.75rem;
  padding: var(--space-2) var(--space-3);
  background-color: var(--color-surface-alt);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-weight: 700;
  font-size: 1.125rem;
  transition: background-color var(--transition-fast);
}

.a11y-panel__btn-action:hover:not(:disabled) {
  background-color: var(--color-surface-hover);
}

.a11y-panel__text-size-indicator {
  min-width: 4.5rem;
  text-align: center;
  font-weight: 700;
  font-size: 1rem;
}

/* Segmented control (Tema) */
.a11y-panel__segmented-control {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-1);
  padding: var(--space-1);
  background-color: var(--color-surface-alt);
  border-radius: var(--radius-md);
}

.a11y-panel__segment {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-1);
  min-height: 2.75rem;
  padding: var(--space-2);
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text);
  transition: background-color var(--transition-fast), color var(--transition-fast);
}

.a11y-panel__segment--active {
  background-color: var(--color-surface);
  color: var(--color-primary);
  font-weight: 700;
  box-shadow: var(--shadow-sm);
}

/* Selector de Paletas */
.a11y-panel__palettes {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.a11y-panel__palette-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 2.75rem;
  padding: var(--space-2) var(--space-3);
  background-color: var(--color-surface-alt);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text);
  cursor: pointer;
  transition: border-color var(--transition-fast), background-color var(--transition-fast);
}

.a11y-panel__palette-card:hover {
  background-color: var(--color-surface-hover);
}

.a11y-panel__palette-card--selected {
  border-color: var(--color-primary);
  background-color: var(--color-surface);
  font-weight: 700;
}

.a11y-panel__palette-swatches {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.a11y-panel__swatch {
  width: 1.125rem;
  height: 1.125rem;
  border-radius: var(--radius-full);
}

.a11y-panel__palette-name {
  flex: 1;
  margin-inline-start: var(--space-2);
  text-align: left;
  font-size: 0.875rem;
}

.a11y-panel__palette-badge {
  font-size: 0.6875rem;
  font-weight: 800;
  text-transform: uppercase;
  padding: 0.15rem 0.5rem;
  border-radius: var(--radius-full);
  background: var(--color-primary);
  color: var(--color-on-primary);
  letter-spacing: 0.04em;
  margin-inline-end: var(--space-2);
}

.a11y-panel__palette-check {
  color: var(--color-primary);
}

/* Interruptores de accesibilidad */
.a11y-panel__toggles {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.a11y-panel__toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 2.75rem;
  padding: var(--space-2) var(--space-3);
  background-color: var(--color-surface-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  text-align: left;
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.a11y-panel__toggle:hover {
  background-color: var(--color-surface-hover);
}

.a11y-panel__toggle--on {
  border-color: var(--color-primary);
}

.a11y-panel__toggle-label {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.a11y-panel__toggle-label strong {
  font-size: 0.9375rem;
  color: var(--color-text);
}

.a11y-panel__toggle-label small {
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}

/* Visual switch control */
.a11y-panel__switch {
  position: relative;
  width: 2.5rem;
  height: 1.5rem;
  background-color: var(--color-border);
  border-radius: var(--radius-full);
  transition: background-color var(--transition-fast);
  flex-shrink: 0;
  margin-inline-start: var(--space-2);
}

.a11y-panel__switch::after {
  content: '';
  position: absolute;
  top: 0.1875rem;
  left: 0.1875rem;
  width: 1.125rem;
  height: 1.125rem;
  background-color: #ffffff;
  border-radius: var(--radius-full);
  transition: transform var(--transition-fast);
  box-shadow: var(--shadow-sm);
}

.a11y-panel__toggle--on .a11y-panel__switch {
  background-color: var(--color-primary);
}

.a11y-panel__toggle--on .a11y-panel__switch::after {
  transform: translateX(1rem);
}

/* Pie de panel */
.a11y-panel__footer {
  padding-block-start: var(--space-2);
  border-block-start: 1px solid var(--color-border);
}

.a11y-panel__reset-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  width: 100%;
  min-height: 2.75rem;
  padding: var(--space-2) var(--space-4);
  background-color: transparent;
  color: var(--color-text-muted);
  border: 1px dashed var(--color-border);
  border-radius: var(--radius-md);
  font-weight: 700;
  font-size: 0.9375rem;
  transition: color var(--transition-fast), border-color var(--transition-fast), background-color var(--transition-fast);
}

.a11y-panel__reset-btn:hover {
  color: var(--color-text);
  border-color: var(--color-text);
  background-color: var(--color-surface-hover);
}
</style>
