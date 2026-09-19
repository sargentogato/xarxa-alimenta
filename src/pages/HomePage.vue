<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import HomeHero from '@/components/home/HomeHero.vue';
import SectionTitle from '@/components/common/SectionTitle.vue';
import BaseButton from '@/components/common/BaseButton.vue';
import ServiceCard from '@/components/services/ServiceCard.vue';
import ProjectCard from '@/components/projects/ProjectCard.vue';
import ProjectModal, { type ProjectModalData } from '@/components/projects/ProjectModal.vue';
import DonationCallout from '@/components/home/DonationCallout.vue';
import WaveDivider from '@/components/common/WaveDivider.vue';
import { servicesList } from '@/data/services.ts';
import { projectsList } from '@/data/projects.ts';

const { t } = useI18n();

// Servicios destacados para la portada (primeros 3)
const featuredServices = computed(() => {
  return servicesList.slice(0, 3).map((item) => ({
    id: item.id,
    image: item.image,
    title: t(`services.items.${item.id}.title`),
    summary: t(`services.items.${item.id}.summary`),
  }));
});

// Proyectos para la portada
const projects = computed(() => {
  return projectsList.map((item) => ({
    id: item.id,
    type: item.type,
    typeLabel:
      item.type === 'collaboration'
        ? t('home.projects.collaborationLabel')
        : t('home.projects.projectLabel'),
    image: item.images[0],
    title: t(`projects.items.${item.id}.name`),
    summary: t(`projects.items.${item.id}.summary`),
  }));
});

// Modal de proyecto
const selectedProjectId = ref<string | null>(null);
const isProjectModalOpen = ref(false);

function openProjectModal(id: string) {
  selectedProjectId.value = id;
  isProjectModalOpen.value = true;
}

function closeProjectModal() {
  isProjectModalOpen.value = false;
  selectedProjectId.value = null;
}

const selectedProjectData = computed<ProjectModalData | null>(() => {
  if (!selectedProjectId.value) return null;
  const raw = projectsList.find((p) => p.id === selectedProjectId.value);
  if (!raw) return null;

  return {
    id: raw.id,
    name: t(`projects.items.${raw.id}.name`),
    type: raw.type,
    typeLabel:
      raw.type === 'collaboration'
        ? t('home.projects.collaborationLabel')
        : t('home.projects.projectLabel'),
    summary: t(`projects.items.${raw.id}.summary`),
    description: t(`projects.items.${raw.id}.description`),
    where: t(`projects.items.${raw.id}.where`),
    when: t(`projects.items.${raw.id}.when`),
    howToParticipate: t(`projects.items.${raw.id}.howToParticipate`),
    externalUrl: raw.externalUrl,
    images: raw.images,
  };
});

const modalLabels = computed(() => ({
  whereLabel: t('projects.modal.whereLabel'),
  whenLabel: t('projects.modal.whenLabel'),
  howLabel: t('projects.modal.howLabel'),
  externalLinkLabel: t('projects.modal.externalLinkLabel'),
  galleryLabel: t('projects.modal.galleryLabel'),
}));

const donationStats = computed(() => [
  t('home.donationCallout.stat1'),
  t('home.donationCallout.stat2'),
  t('home.donationCallout.stat3'),
]);
</script>

<template>
  <div class="home-page">
    <!-- Hero Carrusel accesible -->
    <HomeHero />

    <!-- Cinta de Insignias y Sellos de Huerta (estilo Kinder Ground) -->
    <div class="home-stickers-bar container" aria-label="Valores y sellos de la huerta">
      <div class="home-stickers-bar__track">
        <span class="home-sticker home-sticker--leaf">🌱 100% Autogestión Vecinal</span>
        <span class="home-sticker home-sticker--tomato">🍅 Variedades Tradicionales</span>
        <span class="home-sticker home-sticker--bee">🐝 Polinizadores y Biodiversidad</span>
        <span class="home-sticker home-sticker--water">💧 Riego por Acequia Viva</span>
        <span class="home-sticker home-sticker--heart">💚 Comunidad Abierta</span>
      </div>
    </div>

    <!-- Wave hacia la sección de servicios -->
    <WaveDivider
      color="var(--color-surface-tint)"
      direction="top"
      height="64px"
    />

    <!-- Sección de Servicios Comunitarios (Bloque Huerta Suave) -->
    <section class="home-page__section home-page__section--tint">
      <div class="container">
        <SectionTitle
          :title="t('home.servicesPreview.title')"
          :subtitle="t('home.servicesPreview.subtitle')"
        />

        <div class="home-page__services-grid">
          <ServiceCard
            v-for="svc in featuredServices"
            :key="svc.id"
            :id="svc.id"
            :title="svc.title"
            :summary="svc.summary"
            :image="svc.image"
            :action-text="t('home.projects.learnMore')"
          />
        </div>

        <div class="home-page__section-action">
          <BaseButton
            to="/servicios"
            variant="primary"
            size="lg"
          >
            {{ t('home.servicesPreview.viewAll') }}
          </BaseButton>
        </div>
      </div>
    </section>

    <!-- Wave transición hacia sección de proyectos -->
    <WaveDivider
      color="var(--color-surface-tint)"
      direction="bottom"
      height="54px"
      flip-x
    />

    <!-- Sección de Proyectos y Colaboraciones (Bloque Cálido Arena Tostada) -->
    <section class="home-page__section home-page__section--alt">
      <div class="container">
        <SectionTitle
          :title="t('home.projects.title')"
          :subtitle="t('home.projects.subtitle')"
        />

        <div class="home-page__projects-grid">
          <ProjectCard
            v-for="p in projects"
            :key="p.id"
            :id="p.id"
            :name="p.title"
            :type="p.type"
            :type-label="p.typeLabel"
            :summary="p.summary"
            :image="p.image"
            :action-text="t('home.projects.learnMore')"
            @select="openProjectModal"
          />
        </div>
      </div>
    </section>

    <!-- Wave antes de donaciones -->
    <WaveDivider
      color="var(--color-surface-alt)"
      direction="bottom"
      height="48px"
    />

    <!-- Llamada a la Donación y Apoyo Mutuo -->
    <DonationCallout
      :title="t('home.donationCallout.title')"
      :subtitle="t('home.donationCallout.subtitle')"
      :cta-text="t('home.donationCallout.cta')"
      :stats="donationStats"
    />

    <!-- Modal de detalle de proyecto -->
    <ProjectModal
      :is-open="isProjectModalOpen"
      :project="selectedProjectData"
      :labels="modalLabels"
      @close="closeProjectModal"
    />
  </div>
</template>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
}

.home-page__section {
  padding-block: var(--space-8);
  position: relative;
  overflow: hidden;
}

.home-page__section--tint {
  background-color: var(--color-surface-tint);
  background-image: 
    radial-gradient(circle at 12% 20%, var(--color-glow, rgba(0, 0, 0, 0.05)) 0%, transparent 45%),
    radial-gradient(circle at 88% 80%, var(--color-accent-glow, rgba(0, 0, 0, 0.05)) 0%, transparent 45%);
}

.home-page__section--alt {
  background-color: var(--color-surface-alt);
  background-image: 
    radial-gradient(circle at 85% 15%, var(--color-glow, rgba(0, 0, 0, 0.05)) 0%, transparent 45%),
    radial-gradient(circle at 15% 85%, var(--color-accent-glow, rgba(0, 0, 0, 0.05)) 0%, transparent 45%);
}

/* Cinta de Stickers Orgánicos */
.home-stickers-bar {
  margin-block: var(--space-4);
  padding-block: var(--space-2);
}

.home-stickers-bar__track {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  flex-wrap: wrap;
}

.home-sticker {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.45rem 1rem;
  background-color: var(--color-surface);
  color: var(--color-text);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-full);
  font-size: 0.875rem;
  font-weight: 700;
  box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.08);
  white-space: nowrap;
  transition: transform 250ms ease, box-shadow 250ms ease, border-color 250ms ease;
  cursor: default;
}

.home-sticker--leaf { transform: rotate(-1.5deg); }
.home-sticker--tomato { transform: rotate(1deg); }
.home-sticker--bee { transform: rotate(-1deg); }
.home-sticker--water { transform: rotate(1.5deg); }
.home-sticker--heart { transform: rotate(-0.5deg); }

.home-sticker:hover {
  transform: translateY(-4px) rotate(0deg) scale(1.06) !important;
  box-shadow: 0 10px 24px -4px var(--color-glow, rgba(0, 0, 0, 0.2));
  border-color: var(--color-primary);
}

.home-page__services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  gap: var(--space-5);
  margin-block-end: var(--space-6);
}

.home-page__projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: var(--space-5);
}

.home-page__section-action {
  display: flex;
  justify-content: center;
  margin-block-start: var(--space-4);
}
</style>
