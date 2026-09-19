<script setup lang="ts">
/**
 * HomeHero: Carrusel accesible e interactivo para la portada.
 * Slots: ninguno
 * CSS vars: --hero-height, --hero-overlay-bg, --hero-radius
 * Clases públicas: .home-hero, .home-hero__slide, .home-hero__content, .home-hero__controls, .home-hero__btn-nav, .home-hero__dots
 * Expone: root, currentSlide, next, prev, toggleAutoplay
 */
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import AppImage from '@/components/common/AppImage.vue';
import BaseButton from '@/components/common/BaseButton.vue';
import { organization } from '@/data/organization.ts';

export interface HeroSlide {
  key: string;
  image: string;
  titleKey: string;
  subtitleKey: string;
  ctaKey: string;
  ctaTo: string;
}

const { t } = useI18n();

const slides: HeroSlide[] = [
  {
    key: 'huertos',
    image: 'home/hero-1.jpg',
    titleKey: 'home.hero.slides.huertos.title',
    subtitleKey: 'home.hero.slides.huertos.subtitle',
    ctaKey: 'home.hero.slides.huertos.cta',
    ctaTo: '/servicios',
  },
  {
    key: 'jardin',
    image: 'home/hero-2.jpg',
    titleKey: 'home.hero.slides.jardin.title',
    subtitleKey: 'home.hero.slides.jardin.subtitle',
    ctaKey: 'home.hero.slides.jardin.cta',
    ctaTo: '/agenda',
  },
  {
    key: 'comunidad',
    image: 'home/hero-3.jpg',
    titleKey: 'home.hero.slides.comunidad.title',
    subtitleKey: 'home.hero.slides.comunidad.subtitle',
    ctaKey: 'home.hero.slides.comunidad.cta',
    ctaTo: '/historia',
  },
  {
    key: 'apoyo',
    image: 'home/hero-4.jpg',
    titleKey: 'home.hero.slides.apoyo.title',
    subtitleKey: 'home.hero.slides.apoyo.subtitle',
    ctaKey: 'home.hero.slides.apoyo.cta',
    ctaTo: '/donaciones',
  },
];

const root = ref<HTMLElement | null>(null);
const currentSlide = ref(0);
const isPaused = ref(false);
let timer: ReturnType<typeof setInterval> | null = null;

function next() {
  currentSlide.value = (currentSlide.value + 1) % slides.length;
}

function prev() {
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length;
}

function goToSlide(index: number) {
  currentSlide.value = index;
}

function toggleAutoplay() {
  isPaused.value = !isPaused.value;
  if (isPaused.value) {
    stopTimer();
  } else {
    startTimer();
  }
}

function startTimer() {
  stopTimer();
  // Verificar si el usuario tiene activado reducción de movimiento
  const motionReduced =
    typeof document !== 'undefined' &&
    (document.documentElement.getAttribute('data-a11y-motion') === 'reduce' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  if (motionReduced || isPaused.value) return;

  timer = setInterval(() => {
    next();
  }, 6000);
}

function stopTimer() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

function onMouseEnter() {
  stopTimer();
}

function onMouseLeave() {
  if (!isPaused.value) {
    startTimer();
  }
}

onMounted(() => {
  startTimer();
});

onBeforeUnmount(() => {
  stopTimer();
});

defineExpose({
  root,
  currentSlide,
  next,
  prev,
  toggleAutoplay,
});
</script>

<template>
  <section
    ref="root"
    class="home-hero"
    role="region"
    aria-roledescription="carousel"
    :aria-label="t('home.hero.title')"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @focusin="stopTimer"
    @focusout="!isPaused && startTimer()"
  >
    <!-- Slides -->
    <div class="home-hero__slides-wrapper">
      <div
        v-for="(slide, index) in slides"
        :key="slide.key"
        :class="[
          'home-hero__slide',
          index === currentSlide ? 'home-hero__slide--active' : ''
        ]"
        :aria-hidden="index !== currentSlide ? 'true' : 'false'"
        role="group"
        aria-roledescription="slide"
        :aria-label="`${index + 1} de ${slides.length}: ${t(slide.titleKey)}`"
      >
        <div class="home-hero__image-bg">
          <AppImage
            :name="slide.image"
            :alt="t(slide.titleKey)"
            :eager="index === 0"
            sizes="(min-width: 1200px) 1200px, 100vw"
          />
        </div>
        <div class="home-hero__overlay" />

        <div class="home-hero__content-container container">
          <div class="home-hero__content">
            <span class="home-hero__badge">
              <span class="home-hero__badge-leaf" aria-hidden="true">🌱</span>
              {{ organization.name }}
            </span>
            <h1 class="home-hero__title">
              {{ t(slide.titleKey) }}
            </h1>
            <p class="home-hero__subtitle">
              {{ t(slide.subtitleKey) }}
            </p>
            <div class="home-hero__action">
              <BaseButton
                :to="slide.ctaTo"
                variant="accent"
                size="lg"
              >
                {{ t(slide.ctaKey) }}
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Controles accesibles: Anterior, Pausa/Reanudar, Siguiente e Indicadores -->
    <div class="home-hero__controls-bar container">
      <div class="home-hero__dots" role="tablist" :aria-label="t('home.hero.title')">
        <button
          v-for="(_, index) in slides"
          :key="index"
          type="button"
          role="tab"
          :aria-selected="index === currentSlide"
          :aria-label="t('home.hero.slideIndicator', { index: index + 1 })"
          :class="[
            'home-hero__dot',
            index === currentSlide ? 'home-hero__dot--active' : ''
          ]"
          @click="goToSlide(index)"
        />
      </div>

      <div class="home-hero__actions-nav">
        <!-- Pausa / Play -->
        <button
          type="button"
          class="home-hero__btn-control"
          :aria-label="isPaused ? t('home.hero.play') : t('home.hero.pause')"
          @click="toggleAutoplay"
        >
          <!-- SVG Play / Pause -->
          <svg
            v-if="isPaused"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          <svg
            v-else
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        </button>

        <!-- Anterior -->
        <button
          type="button"
          class="home-hero__btn-control"
          :aria-label="t('home.hero.prev')"
          @click="prev"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <!-- Siguiente -->
        <button
          type="button"
          class="home-hero__btn-control"
          :aria-label="t('home.hero.next')"
          @click="next"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-hero {
  --_height: var(--hero-height, clamp(28rem, 65vh, 42rem));
  --_radius: var(--hero-radius, var(--radius-lg));

  container-type: inline-size;
  container-name: home-hero;

  position: relative;
  width: 100%;
  min-width: 0;
  height: var(--_height);
  overflow: hidden;
  background-color: #081c15;
  color: #ffffff;
}

.home-hero__slides-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.home-hero__slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  visibility: hidden;
  transition: opacity var(--transition-slow), visibility var(--transition-slow);
  display: flex;
  align-items: center;
}

.home-hero__slide--active {
  opacity: 1;
  visibility: visible;
  z-index: 1;
}

.home-hero__image-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.home-hero__overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    105deg,
    color-mix(in srgb, var(--color-primary-strong, #124d22) 88%, #000 12%) 0%,
    color-mix(in srgb, var(--color-primary, #1e7033) 68%, transparent) 50%,
    color-mix(in srgb, var(--color-accent, #ea580c) 38%, transparent) 100%
  );
  transition: background var(--transition-normal);
}

.home-hero__content-container {
  position: relative;
  z-index: 2;
  width: 100%;
}

.home-hero__content {
  max-width: 44rem;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.home-hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  align-self: flex-start;
  padding: 0.35rem 0.9rem;
  border-radius: var(--radius-full);
  background-color: rgba(254, 240, 138, 0.22);
  color: #fef08a;
  font-size: 0.875rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border: 1px solid rgba(250, 204, 21, 0.55);
  backdrop-filter: blur(8px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
}

.home-hero__badge-leaf {
  font-size: 1rem;
}

.home-hero__title {
  margin: 0;
  font-family: var(--font-heading);
  font-size: clamp(2rem, 5vw, 3.25rem);
  font-weight: 700;
  line-height: 1.15;
  color: #ffffff;
  text-wrap: balance;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
}

.home-hero__subtitle {
  margin: 0;
  font-size: clamp(1.05rem, 2vw, 1.35rem);
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.95);
  max-width: 52ch;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
}

.home-hero__action {
  margin-block-start: var(--space-3);
}

/* Barra inferior de controles */
.home-hero__controls-bar {
  position: absolute;
  bottom: var(--space-4);
  left: 0;
  right: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.home-hero__dots {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.home-hero__dot {
  width: 2.25rem;
  height: 0.55rem;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: var(--radius-full);
  border: none;
  cursor: pointer;
  padding: 0;
  transition: all var(--transition-fast);
}

.home-hero__dot--active {
  background-color: var(--color-accent);
  width: 3.5rem;
  box-shadow: 0 0 14px var(--color-accent-glow, rgba(234, 88, 12, 0.7));
}

.home-hero__actions-nav {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.home-hero__btn-control {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  background-color: rgba(0, 0, 0, 0.4);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: var(--radius-full);
  cursor: pointer;
  backdrop-filter: blur(4px);
  transition: background-color var(--transition-fast), transform var(--transition-fast);
}

.home-hero__btn-control:hover {
  background-color: rgba(0, 0, 0, 0.7);
  transform: scale(1.05);
}

/* Ajustes responsivos con Container Queries */
@container home-hero (max-width: 600px) {
  .home-hero {
    --_height: clamp(26rem, 75vh, 34rem);
  }

  .home-hero__controls-bar {
    bottom: var(--space-3);
  }

  .home-hero__dot {
    width: 1.5rem;
  }

  .home-hero__dot--active {
    width: 2.25rem;
  }
}
</style>
