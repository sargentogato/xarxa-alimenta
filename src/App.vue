<script setup lang="ts">
import { onMounted, onErrorCaptured, ref } from 'vue';
import { RouterView } from 'vue-router';
import AppHeader from '@/components/common/AppHeader.vue';
import AppFooter from '@/components/common/AppFooter.vue';
import QuickPaletteBar from '@/components/common/QuickPaletteBar.vue';
import { useAppearance } from '@/composables/useAppearance.ts';
import { useAccessibility } from '@/composables/useAccessibility.ts';

const { init: initAppearance } = useAppearance();
const { init: initAccessibility } = useAccessibility();

const renderError = ref<string | null>(null);

onErrorCaptured((err, _instance, info) => {
  console.error('[App error captured]:', err, info);
  renderError.value = err instanceof Error ? err.message : String(err);
  return false;
});

onMounted(() => {
  initAppearance();
  initAccessibility();
});
</script>

<template>
  <div class="app-layout">
    <AppHeader />
    <main id="main-content" class="app-main" tabindex="-1">
      <div
        v-if="renderError"
        class="container"
        style="padding: 2rem; color: #b71c1c; background: #ffebee; border-radius: 8px; margin-block: 2rem;"
        role="alert"
      >
        <p style="font-weight: 700; margin-bottom: 0.5rem;">Se ha producido un aviso en la carga del contenido:</p>
        <p style="margin-bottom: 1rem; font-family: monospace;">{{ renderError }}</p>
        <button
          type="button"
          style="padding: 0.5rem 1rem; background: #2e7d32; color: #fff; border: none; border-radius: 4px; cursor: pointer;"
          @click="renderError = null"
        >
          Reintentar
        </button>
      </div>
      <RouterView v-else />
    </main>
    <AppFooter />
    <QuickPaletteBar />
  </div>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-main {
  flex: 1;
  outline: none;
}
</style>
