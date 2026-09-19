<script setup lang="ts">
/**
 * LanguageSwitcher: Selector de idioma accesible con menú desplegable.
 * Slots: ninguno
 * CSS vars: --lang-switcher-bg, --lang-switcher-border
 * Clases públicas: .language-switcher, .language-switcher__toggle, .language-switcher__menu, .language-switcher__item, .language-switcher__item--active
 * Expone: root, isOpen, toggle, close
 */
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useLocale } from '@/composables/useLocale.ts';
import IconGlobe from './icons/IconGlobe.vue';
import IconChevronDown from './icons/IconChevronDown.vue';
import IconCheck from './icons/IconCheck.vue';

const { locale, supportedLocales, languageNames, setLocale } = useLocale();

const root = ref<HTMLElement | null>(null);
const isOpen = ref(false);

function toggle() {
  isOpen.value = !isOpen.value;
}

function close() {
  isOpen.value = false;
}

async function selectLocale(loc: string) {
  await setLocale(loc);
  close();
}

function handleDocumentClick(e: MouseEvent) {
  if (root.value && !root.value.contains(e.target as Node)) {
    close();
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && isOpen.value) {
    close();
  }
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick);
  document.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick);
  document.removeEventListener('keydown', handleKeydown);
});

defineExpose({
  root,
  isOpen,
  toggle,
  close,
});
</script>

<template>
  <div ref="root" class="language-switcher">
    <button
      type="button"
      class="language-switcher__toggle"
      :aria-expanded="isOpen ? 'true' : 'false'"
      aria-haspopup="true"
      aria-label="Seleccionar idioma / Select language"
      @click="toggle"
    >
      <IconGlobe size="1.2rem" />
      <span class="language-switcher__current">
        {{ (languageNames[locale] || locale).toUpperCase().slice(0, 2) }}
      </span>
      <IconChevronDown size="0.9rem" class="language-switcher__chevron" />
    </button>

    <ul
      v-show="isOpen"
      class="language-switcher__menu"
      role="menu"
      aria-label="Idiomas disponibles"
    >
      <li
        v-for="loc in supportedLocales"
        :key="loc"
        role="none"
      >
        <button
          type="button"
          role="menuitem"
          :class="[
            'language-switcher__item',
            loc === locale ? 'language-switcher__item--active' : ''
          ]"
          :aria-current="loc === locale ? 'true' : undefined"
          @click="selectLocale(loc)"
        >
          <span>{{ languageNames[loc] || loc.toUpperCase() }}</span>
          <IconCheck v-if="loc === locale" size="1rem" class="language-switcher__check" />
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.language-switcher {
  position: relative;
  display: inline-block;
}

.language-switcher__toggle {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-height: 2.75rem;
  padding: var(--space-2) var(--space-3);
  background-color: var(--lang-switcher-bg, transparent);
  color: var(--color-text);
  border: 1px solid var(--lang-switcher-border, var(--color-border));
  border-radius: var(--radius-md);
  font-weight: 700;
  font-size: 0.9375rem;
  cursor: pointer;
  transition: background-color var(--transition-fast), border-color var(--transition-fast);
}

.language-switcher__toggle:hover {
  background-color: var(--color-surface-hover);
}

.language-switcher__chevron {
  transition: transform var(--transition-fast);
}

.language-switcher__toggle[aria-expanded="true"] .language-switcher__chevron {
  transform: rotate(180deg);
}

.language-switcher__menu {
  position: absolute;
  top: calc(100% + var(--space-1));
  right: 0;
  z-index: 50;
  min-width: 10rem;
  padding: var(--space-1);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
}

.language-switcher__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 2.75rem;
  padding: var(--space-2) var(--space-3);
  text-align: left;
  border-radius: var(--radius-sm);
  color: var(--color-text);
  font-size: 0.9375rem;
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.language-switcher__item:hover {
  background-color: var(--color-surface-hover);
}

.language-switcher__item--active {
  font-weight: 700;
  color: var(--color-primary);
}

.language-switcher__check {
  color: var(--color-primary);
}
</style>
