<script setup lang="ts">
import { ref } from 'vue';
import { useAppearance } from '@/composables/useAppearance.ts';
import { paletteList, type PaletteId } from '@/data/config.ts';
import IconSun from '@/components/common/icons/IconSun.vue';
import IconMoon from '@/components/common/icons/IconMoon.vue';

const { palette, setPalette, effectiveTheme, setTheme } = useAppearance();

const isExpanded = ref(false);

function toggleExpanded() {
  isExpanded.value = !isExpanded.value;
}

function handleSelectPalette(id: PaletteId) {
  setPalette(id);
}

function toggleTheme() {
  setTheme(effectiveTheme.value === 'dark' ? 'light' : 'dark');
}
</script>

<template>
  <aside
    class="quick-palette"
    :class="{ 'quick-palette--expanded': isExpanded }"
    aria-label="Selector rápido de estilos y colores"
  >
    <!-- Botón flotante para abrir/cerrar -->
    <button
      type="button"
      class="quick-palette__toggle-btn"
      :aria-expanded="isExpanded ? 'true' : 'false'"
      :title="isExpanded ? 'Ocultar selector de estilos' : 'Probar estilos de color'"
      @click="toggleExpanded"
    >
      <span class="quick-palette__icon" aria-hidden="true">🎨</span>
      <span class="quick-palette__btn-label">Estilos</span>
      <span class="quick-palette__indicator" :style="{ backgroundColor: 'var(--color-primary)' }" />
    </button>

    <!-- Barra desplegable con las 5 paletas y conmutador claro/oscuro -->
    <div v-if="isExpanded" class="quick-palette__panel">
      <div class="quick-palette__header">
        <span class="quick-palette__title">✨ Probar Paletas</span>
        <button
          type="button"
          class="quick-palette__theme-toggle"
          :title="effectiveTheme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
          @click="toggleTheme"
        >
          <IconSun v-if="effectiveTheme === 'dark'" size="1rem" />
          <IconMoon v-else size="1rem" />
          <span>{{ effectiveTheme === 'dark' ? 'Claro' : 'Oscuro' }}</span>
        </button>
      </div>

      <div class="quick-palette__list">
        <button
          v-for="p in paletteList"
          :key="p.id"
          type="button"
          class="quick-palette__item"
          :class="{ 'quick-palette__item--active': palette === p.id }"
          @click="handleSelectPalette(p.id)"
        >
          <span class="quick-palette__swatches">
            <span class="quick-palette__dot" :style="{ backgroundColor: p.preview.primary }" />
            <span class="quick-palette__dot" :style="{ backgroundColor: p.preview.accent }" />
          </span>
          <span class="quick-palette__name">
            {{ p.id === 'blanco-verde' ? '🌿 Huerta Viva' : p.id === 'amarillo-tomate' ? '🍅 Tomate Fuego' : p.id === 'neon-botanico' ? '⚡ Cyber Huerto' : p.id === 'citrico-pop' ? '🍊 Mandarina Pop' : '🫐 Mora Silvestre' }}
          </span>
          <span v-if="p.badge" class="quick-palette__tag">{{ p.badge }}</span>
        </button>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.quick-palette {
  position: fixed;
  bottom: var(--space-4);
  right: var(--space-4);
  z-index: 90;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--space-2);
  font-family: var(--font-body);
}

.quick-palette__toggle-btn {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0.5rem 0.9rem;
  background-color: var(--color-surface);
  color: var(--color-text);
  border: 2px solid var(--color-primary);
  border-radius: var(--radius-full);
  box-shadow: 0 8px 24px -4px var(--color-glow, rgba(0, 0, 0, 0.2)), 0 2px 6px rgba(0, 0, 0, 0.08);
  font-weight: 700;
  font-size: 0.875rem;
  cursor: pointer;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast), border-color var(--transition-fast);
}

.quick-palette__toggle-btn:hover {
  transform: translateY(-2px) scale(1.03);
  box-shadow: 0 12px 28px -4px var(--color-glow, rgba(0, 0, 0, 0.28));
}

.quick-palette__icon {
  font-size: 1.125rem;
}

.quick-palette__indicator {
  width: 0.65rem;
  height: 0.65rem;
  border-radius: var(--radius-full);
  display: inline-block;
  box-shadow: 0 0 6px var(--color-primary);
}

.quick-palette__panel {
  width: 17rem;
  background-color: var(--color-surface);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-3);
  box-shadow: var(--shadow-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  animation: popIn 200ms cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes popIn {
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.quick-palette__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-block-end: var(--space-2);
  border-block-end: 1px solid var(--color-border);
}

.quick-palette__title {
  font-size: 0.8125rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
}

.quick-palette__theme-toggle {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.55rem;
  font-size: 0.75rem;
  font-weight: 700;
  background-color: var(--color-surface-alt);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.quick-palette__theme-toggle:hover {
  background-color: var(--color-surface-hover);
}

.quick-palette__list {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.quick-palette__item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0.45rem 0.6rem;
  background-color: var(--color-surface-alt);
  color: var(--color-text);
  border: 1.5px solid transparent;
  border-radius: var(--radius-lg);
  font-size: 0.8125rem;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  transition: background-color var(--transition-fast), border-color var(--transition-fast), transform var(--transition-fast);
}

.quick-palette__item:hover {
  background-color: var(--color-surface-hover);
  transform: translateX(-2px);
}

.quick-palette__item--active {
  border-color: var(--color-primary);
  background-color: var(--color-surface);
  box-shadow: 0 2px 8px -2px var(--color-glow, rgba(0, 0, 0, 0.15));
  font-weight: 800;
}

.quick-palette__swatches {
  display: flex;
  align-items: center;
  gap: 0.2rem;
  flex-shrink: 0;
}

.quick-palette__dot {
  width: 0.875rem;
  height: 0.875rem;
  border-radius: var(--radius-full);
  border: 1px solid rgba(0, 0, 0, 0.15);
}

.quick-palette__name {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.quick-palette__tag {
  font-size: 0.6875rem;
  font-weight: 800;
  padding: 0.1rem 0.4rem;
  border-radius: var(--radius-full);
  background-color: var(--color-primary);
  color: var(--color-on-primary);
}

@media (max-width: 640px) {
  .quick-palette {
    bottom: var(--space-3);
    right: var(--space-3);
  }
}
</style>
