<script setup lang="ts">
/**
 * IconCheck: Icono de marca de verificación
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
    stroke-width="2.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
</template>
