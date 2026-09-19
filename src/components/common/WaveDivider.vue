<script setup lang="ts">
interface Props {
  /** Color de relleno de la onda (generalmente una variable CSS o hex) */
  color?: string;
  /** Dirección de la curva: 'top' (mira hacia arriba) o 'bottom' (mira hacia abajo) */
  direction?: 'top' | 'bottom';
  /** Altura máxima en píxeles o rem */
  height?: string;
  /** Invertir horizontalmente */
  flipX?: boolean;
}

withDefaults(defineProps<Props>(), {
  color: 'currentColor',
  direction: 'top',
  height: '56px',
  flipX: false,
});
</script>

<template>
  <div
    class="wave-divider"
    :class="[
      `wave-divider--${direction}`,
      { 'wave-divider--flipped': flipX }
    ]"
    :style="{ height }"
    aria-hidden="true"
  >
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      class="wave-divider__svg"
    >
      <path
        :fill="color"
        d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,48C840,43,960,53,1080,64C1200,75,1320,85,1380,90.7L1440,96L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
      />
    </svg>
  </div>
</template>

<style scoped>
.wave-divider {
  width: 100%;
  overflow: hidden;
  line-height: 0;
  display: block;
  pointer-events: none;
  position: relative;
  z-index: 2;
}

.wave-divider--bottom {
  transform: rotate(180deg);
}

.wave-divider--flipped {
  transform: scaleX(-1);
}

.wave-divider--bottom.wave-divider--flipped {
  transform: rotate(180deg) scaleX(-1);
}

.wave-divider__svg {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}
</style>
