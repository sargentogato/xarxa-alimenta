<script setup lang="ts">
/**
 * BaseButton: Botón reutilizable interactivo (button, RouterLink o enlace externo a).
 * Slots: default, icon
 * CSS vars: --button-bg, --button-color, --button-border, --button-radius, --button-padding-y, --button-padding-x
 * Clases públicas: .base-button, .base-button--primary, .base-button--secondary, .base-button--accent, .base-button--outline, .base-button--ghost, .base-button__content, .base-button__icon
 * Expone: root
 */
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

export interface BaseButtonProps {
  /**
   * Ruta interna para RouterLink
   */
  to?: string;
  /**
   * Enlace externo
   */
  href?: string;
  /**
   * Variante visual
   */
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  /**
   * Tamaño del botón
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Tipo HTML del botón si es elemento button
   */
  type?: 'button' | 'submit' | 'reset';
  /**
   * Si está deshabilitado
   */
  disabled?: boolean;
}

withDefaults(defineProps<BaseButtonProps>(), {
  to: undefined,
  href: undefined,
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
});

const root = ref<HTMLElement | null>(null);

defineExpose({
  root,
});
</script>

<template>
  <RouterLink
    v-if="to"
    ref="root"
    :to="to"
    :class="['base-button', `base-button--${variant}`, `base-button--${size}`]"
    :aria-disabled="disabled ? 'true' : undefined"
  >
    <span v-if="$slots.icon" class="base-button__icon">
      <slot name="icon" />
    </span>
    <span class="base-button__content">
      <slot />
    </span>
  </RouterLink>

  <a
    v-else-if="href"
    ref="root"
    :href="href"
    :class="['base-button', `base-button--${variant}`, `base-button--${size}`]"
    :aria-disabled="disabled ? 'true' : undefined"
  >
    <span v-if="$slots.icon" class="base-button__icon">
      <slot name="icon" />
    </span>
    <span class="base-button__content">
      <slot />
    </span>
  </a>

  <button
    v-else
    ref="root"
    :type="type"
    :disabled="disabled"
    :class="['base-button', `base-button--${variant}`, `base-button--${size}`]"
  >
    <span v-if="$slots.icon" class="base-button__icon">
      <slot name="icon" />
    </span>
    <span class="base-button__content">
      <slot />
    </span>
  </button>
</template>

<style scoped>
.base-button {
  --_bg: var(--button-bg, var(--color-primary));
  --_color: var(--button-color, var(--color-on-primary));
  --_border: var(--button-border, transparent);
  --_radius: var(--button-radius, var(--radius-full));
  --_py: var(--button-padding-y, 0.625rem);
  --_px: var(--button-padding-x, calc(var(--_py) * 2));

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  min-height: 2.75rem; /* 44px objetivo táctil accesible */
  min-width: 2.75rem;
  padding: var(--_py) var(--_px);
  background-color: var(--_bg);
  color: var(--_color);
  border: 1.5px solid var(--_border);
  border-radius: var(--_radius);
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.25;
  white-space: nowrap;
  text-decoration: none;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.base-button:hover:not(:disabled) {
  transform: translateY(-2px);
}

.base-button:active:not(:disabled) {
  transform: translateY(0);
}

/* Variantes */
.base-button--primary {
  --_bg: var(--button-bg, var(--color-primary));
  --_color: var(--button-color, var(--color-on-primary));
  --_border: var(--button-border, transparent);
  box-shadow: 0 3px 10px -2px var(--color-glow, rgba(21, 128, 61, 0.25));
}

.base-button--primary:hover:not(:disabled) {
  filter: brightness(1.05);
  box-shadow: 0 6px 18px -2px var(--color-glow, rgba(21, 128, 61, 0.38));
}

.base-button--secondary {
  --_bg: var(--button-bg, var(--color-surface-alt));
  --_color: var(--button-color, var(--color-text));
  --_border: var(--button-border, var(--color-border));
}

.base-button--secondary:hover:not(:disabled) {
  background-color: var(--color-surface-hover);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.base-button--accent {
  --_bg: var(--button-bg, var(--color-accent));
  --_color: var(--button-color, var(--color-accent-contrast));
  --_border: var(--button-border, transparent);
  box-shadow: 0 4px 12px -2px var(--color-accent-glow, rgba(234, 88, 12, 0.32));
}

.base-button--accent:hover:not(:disabled) {
  filter: brightness(1.06);
  box-shadow: 0 8px 22px -3px var(--color-accent-glow, rgba(234, 88, 12, 0.45));
}

.base-button--outline {
  --_bg: var(--button-bg, var(--color-surface));
  --_color: var(--button-color, var(--color-primary));
  --_border: var(--button-border, var(--color-primary));
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.04);
}

.base-button--outline:hover:not(:disabled) {
  background-color: var(--color-primary);
  color: var(--color-on-primary);
  box-shadow: 0 6px 16px -2px var(--color-glow, rgba(21, 128, 61, 0.3));
}

.base-button--ghost {
  --_bg: var(--button-bg, transparent);
  --_color: var(--button-color, var(--color-text));
  --_border: var(--button-border, transparent);
}

.base-button--ghost:hover:not(:disabled) {
  --_bg: var(--color-surface-hover);
}

/* Tamaños */
.base-button--sm {
  --_py: var(--button-padding-y, 0.4rem);
  --_px: var(--button-padding-x, 0.8rem);
  font-size: 0.875rem;
}

.base-button--lg {
  --_py: var(--button-padding-y, 0.875rem);
  --_px: var(--button-padding-x, 1.75rem);
  font-size: 1.125rem;
}

.base-button__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
