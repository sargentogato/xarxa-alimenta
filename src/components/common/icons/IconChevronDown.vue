<script setup lang="ts">
/**
 * IconChevronDown: Icono de flecha hacia abajo
 */
withDefaults(defineProps<{
  size?: string;
}>(), {
  size: '1rem',
});
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
</template>
