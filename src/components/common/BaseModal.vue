<script setup lang="ts">
/**
 * BaseModal: Ventana modal accesible con trampa de foco y bloqueo de scroll.
 * Slots: default, header, footer
 * CSS vars: --modal-max-width, --modal-radius, --modal-bg
 * Clases públicas: .base-modal, .base-modal__backdrop, .base-modal__dialog, .base-modal__header, .base-modal__title, .base-modal__close, .base-modal__body, .base-modal__footer
 * Expone: root, open, close
 */
import { ref, watch, nextTick, onBeforeUnmount } from 'vue';
import IconClose from './icons/IconClose.vue';

export interface BaseModalProps {
  /**
   * Control de apertura
   */
  isOpen: boolean;
  /**
   * Título accesible para aria-labelledby
   */
  title?: string;
  /**
   * Ancho máximo del modal
   */
  maxWidth?: string;
}

const props = withDefaults(defineProps<BaseModalProps>(), {
  title: '',
  maxWidth: '42rem',
});

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const root = ref<HTMLElement | null>(null);
const dialogRef = ref<HTMLElement | null>(null);
const closeButtonRef = ref<HTMLButtonElement | null>(null);
let previouslyFocusedElement: HTMLElement | null = null;

function handleClose() {
  emit('close');
}

function handleKeydown(event: KeyboardEvent) {
  if (!props.isOpen) return;

  if (event.key === 'Escape') {
    event.preventDefault();
    handleClose();
    return;
  }

  // Trampa de foco (Focus Trap)
  if (event.key === 'Tab' && dialogRef.value) {
    const focusable = dialogRef.value.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey) {
      if (document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }
}

watch(
  () => props.isOpen,
  (open) => {
    if (typeof document === 'undefined') return;

    if (open) {
      previouslyFocusedElement = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeydown);

      nextTick(() => {
        if (closeButtonRef.value) {
          closeButtonRef.value.focus();
        } else if (dialogRef.value) {
          dialogRef.value.focus();
        }
      });
    } else {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeydown);

      if (previouslyFocusedElement) {
        previouslyFocusedElement.focus();
        previouslyFocusedElement = null;
      }
    }
  }
);

onBeforeUnmount(() => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = '';
    window.removeEventListener('keydown', handleKeydown);
  }
});

defineExpose({
  root,
  dialog: dialogRef,
});
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      ref="root"
      class="base-modal"
      role="presentation"
    >
      <!-- Telón de fondo con clic para cerrar -->
      <div
        class="base-modal__backdrop"
        aria-hidden="true"
        @click="handleClose"
      />

      <!-- Diálogo modal accesible -->
      <div
        ref="dialogRef"
        class="base-modal__dialog"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="title ? 'modal-title' : undefined"
        tabindex="-1"
        :style="{ '--modal-max-width': maxWidth }"
      >
        <header class="base-modal__header">
          <slot name="header">
            <h2 v-if="title" id="modal-title" class="base-modal__title">
              {{ title }}
            </h2>
          </slot>

          <button
            ref="closeButtonRef"
            type="button"
            class="base-modal__close"
            aria-label="Cerrar modal"
            @click="handleClose"
          >
            <IconClose />
          </button>
        </header>

        <div class="base-modal__body">
          <slot />
        </div>

        <footer v-if="$slots.footer" class="base-modal__footer">
          <slot name="footer" />
        </footer>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.base-modal {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.base-modal__backdrop {
  position: absolute;
  inset: 0;
  background-color: var(--color-scrim);
  backdrop-filter: blur(4px);
  animation: fadeIn 200ms ease forwards;
}

.base-modal__dialog {
  --_max-w: var(--modal-max-width, 42rem);
  --_radius: var(--modal-radius, var(--radius-lg));
  --_bg: var(--modal-bg, var(--color-surface));

  position: relative;
  z-index: 1;
  width: 100%;
  max-width: var(--_max-w);
  max-height: calc(100vh - 2rem);
  display: flex;
  flex-direction: column;
  background-color: var(--_bg);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: var(--_radius);
  box-shadow: var(--shadow-xl);
  outline: none;
  animation: scaleUp 220ms ease forwards;
}

.base-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4) var(--space-5);
  border-block-end: 1px solid var(--color-border);
}

.base-modal__title {
  margin: 0;
  font-size: 1.35rem;
}

.base-modal__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  margin: calc(-1 * var(--space-2));
  color: var(--color-text-muted);
  border-radius: var(--radius-md);
  transition: color var(--transition-fast), background-color var(--transition-fast);
}

.base-modal__close:hover {
  color: var(--color-text);
  background-color: var(--color-surface-hover);
}

.base-modal__body {
  padding: var(--space-5);
  overflow-y: auto;
  overscroll-behavior: contain;
}

.base-modal__footer {
  padding: var(--space-4) var(--space-5);
  border-block-start: 1px solid var(--color-border);
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleUp {
  from {
    opacity: 0;
    transform: scale(0.96) translateY(8px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>
