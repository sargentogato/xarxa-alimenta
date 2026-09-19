<script setup lang="ts">
/**
 * AppImage: Componente responsivo optimizado con vite-imagetools.
 * Slots: ninguno
 * CSS vars: --image-ratio, --image-fit, --image-radius
 * Clases públicas: .app-image, .app-image__picture, .app-image__img
 * Expone: root
 */
import { computed, ref } from 'vue';

export interface AppImageProps {
  /**
   * Ruta relativa dentro de src/assets/images/ (ej. 'home/hero-1.jpg', 'services/reparto.jpg')
   */
  name: string;
  /**
   * Texto alternativo para accesibilidad (cadena vacía para decorativas)
   */
  alt?: string;
  /**
   * Atributo sizes para el navegador
   */
  sizes?: string;
  /**
   * Si debe cargarse de forma anticipada (eager) o diferida (lazy)
   */
  eager?: boolean;
}

const props = withDefaults(defineProps<AppImageProps>(), {
  alt: '',
  sizes: '100vw',
  eager: false,
});

const root = ref<HTMLElement | null>(null);

// Importar todas las imágenes procesadas por vite-imagetools
const pictures = import.meta.glob<any>(
  '/src/assets/images/**/*.{jpg,jpeg,png,webp}',
  {
    query: '?w=480;768;1024;1440;1920;2560&format=webp;jpg&as=picture',
    import: 'default',
    eager: true,
  }
);

// Búsqueda del picture optimizado correspondiente a props.name
const pictureData = computed(() => {
  const cleanName = props.name.replace(/^\/+/, '');
  const targetKey = `/src/assets/images/${cleanName}`;
  return pictures[targetKey] || null;
});

defineExpose({
  root,
});
</script>

<template>
  <div ref="root" class="app-image">
    <picture v-if="pictureData" class="app-image__picture">
      <source
        v-for="(source, index) in pictureData.sources"
        :key="index"
        :srcset="source.srcset"
        :type="source.type"
        :sizes="sizes"
      />
      <img
        :src="pictureData.img.src"
        :alt="alt"
        :width="pictureData.img.w"
        :height="pictureData.img.h"
        :loading="eager ? 'eager' : 'lazy'"
        :decoding="eager ? 'sync' : 'async'"
        referrerpolicy="no-referrer"
        class="app-image__img"
      />
    </picture>

    <!-- Fallback si la imagen aún no existe en disco o es un placeholder generado -->
    <div v-else class="app-image__placeholder" role="img" :aria-label="alt || 'Imagen provisional'">
      <svg viewBox="0 0 400 300" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <rect width="400" height="300" fill="var(--color-surface-alt)" />
        <path d="M0 250 Q100 200 200 240 T400 220 L400 300 L0 300 Z" fill="var(--color-primary-soft)" />
        <circle cx="200" cy="120" r="36" fill="var(--color-primary)" opacity="0.3" />
        <path d="M190 120 L200 100 L210 120 Z" fill="var(--color-primary)" />
      </svg>
      <span class="app-image__placeholder-text">{{ alt || name }}</span>
    </div>
  </div>
</template>

<style scoped>
.app-image {
  --_ratio: var(--image-ratio, auto);
  --_fit: var(--image-fit, cover);
  --_radius: var(--image-radius, 0);

  width: 100%;
  height: 100%;
  aspect-ratio: var(--_ratio);
  border-radius: var(--_radius);
  overflow: hidden;
  position: relative;
}

.app-image__picture {
  display: block;
  width: 100%;
  height: 100%;
}

.app-image__img {
  width: 100%;
  height: 100%;
  object-fit: var(--_fit);
  display: block;
  border-radius: inherit;
}

.app-image__placeholder {
  width: 100%;
  height: 100%;
  min-height: 12rem;
  background-color: var(--color-surface-alt);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--color-text-muted);
  position: relative;
  border-radius: inherit;
}

.app-image__placeholder-text {
  position: absolute;
  bottom: var(--space-3);
  left: var(--space-3);
  right: var(--space-3);
  font-size: 0.8125rem;
  font-weight: 600;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.8);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-sm);
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
