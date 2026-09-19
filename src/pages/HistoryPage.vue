<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import SectionTitle from '@/components/common/SectionTitle.vue';
import HistoryTimeline from '@/components/history/HistoryTimeline.vue';
import HistoryChapterCard from '@/components/history/HistoryChapterCard.vue';
import { historyMilestones, historyChapters } from '@/data/history.ts';
import { organization } from '@/data/organization.ts';

const { t } = useI18n();

const chapters = computed(() => {
  return historyChapters.map((ch, idx) => ({
    key: ch.key,
    image: ch.image,
    title: t(`history.sections.${ch.key}.title`),
    text: t(`history.sections.${ch.key}.text`, { orgName: organization.name }),
    reverse: idx % 2 !== 0,
  }));
});

const milestones = computed(() => {
  return historyMilestones.map((m) => ({
    key: m.key,
    year: m.year,
    title: t(`history.milestones.${m.key}.title`),
    description: t(`history.milestones.${m.key}.description`),
  }));
});
</script>

<template>
  <div class="history-page container">
    <!-- Encabezado principal -->
    <SectionTitle
      :title="t('history.title')"
      :subtitle="t('history.intro')"
      :level="1"
    />

    <!-- Capítulos narrativos de la historia -->
    <section class="history-page__chapters">
      <HistoryChapterCard
        v-for="chapter in chapters"
        :key="chapter.key"
        :title="chapter.title"
        :text="chapter.text"
        :image="chapter.image"
        :reverse="chapter.reverse"
      />
    </section>

    <!-- Línea de hitos cronológicos -->
    <HistoryTimeline
      :title="t('history.timelineTitle')"
      :milestones="milestones"
    />
  </div>
</template>

<style scoped>
.history-page {
  padding-block: var(--space-7);
}

.history-page__chapters {
  display: flex;
  flex-direction: column;
  margin-block-end: var(--space-8);
}
</style>
