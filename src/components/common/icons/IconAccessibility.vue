<script setup lang="ts">
/**
 * IconAccessibility: Icono universal de accesibilidad
 */
withDefaults(defineProps<{
  size?: string;
}>(), {
  size: '1.25rem',
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
    <circle cx="12" cy="4" r="2" />
    <path d="M12 6v6" />
    <path d="m5 9 7 2 7-2" />
    <path d="m8 18 4-6 4 6" />
  </svg>
</template>
