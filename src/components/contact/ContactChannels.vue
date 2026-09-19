<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import BaseButton from '@/components/common/BaseButton.vue';
import IconMail from '@/components/common/icons/IconMail.vue';
import IconInstagram from '@/components/common/icons/IconInstagram.vue';
import IconTelegram from '@/components/common/icons/IconTelegram.vue';
import IconPhone from '@/components/common/icons/IconPhone.vue';
import IconExternalLink from '@/components/common/icons/IconExternalLink.vue';
import IconCopy from '@/components/common/icons/IconCopy.vue';
import IconCheck from '@/components/common/icons/IconCheck.vue';
import { organization } from '@/data/organization.ts';

const { t } = useI18n();

const copiedChannelId = ref<string | null>(null);
let copyTimeout: number | undefined;

const copyToClipboard = async (text: string, id: string) => {
  try {
    await navigator.clipboard.writeText(text);
    copiedChannelId.value = id;
    if (copyTimeout) clearTimeout(copyTimeout);
    copyTimeout = window.setTimeout(() => {
      copiedChannelId.value = null;
    }, 2500);
  } catch (e) {
    console.error('No se pudo copiar al portapapeles', e);
  }
};

const channels = [
  {
    id: 'email',
    icon: IconMail,
    titleKey: 'contact.cards.email.title',
    descKey: 'contact.cards.email.desc',
    actionKey: 'contact.cards.email.action',
    copyKey: 'contact.cards.email.copyAction',
    copiedKey: 'contact.cards.email.copiedText',
    href: `mailto:${organization.email}`,
    value: organization.email,
    copyValue: organization.email,
    external: false,
  },
  {
    id: 'instagram',
    icon: IconInstagram,
    titleKey: 'contact.cards.instagram.title',
    descKey: 'contact.cards.instagram.desc',
    actionKey: 'contact.cards.instagram.action',
    copyKey: null,
    copiedKey: null,
    href: organization.social.instagram,
    value: '@xarxa.alimenta',
    copyValue: null,
    external: true,
  },
  {
    id: 'telegram',
    icon: IconTelegram,
    titleKey: 'contact.cards.telegram.title',
    descKey: 'contact.cards.telegram.desc',
    actionKey: 'contact.cards.telegram.action',
    copyKey: null,
    copiedKey: null,
    href: organization.social.telegram || 'https://t.me/xarxaalimenta',
    value: 't.me/xarxaalimenta',
    copyValue: null,
    external: true,
  },
  {
    id: 'phone',
    icon: IconPhone,
    titleKey: 'contact.cards.phone.title',
    descKey: 'contact.cards.phone.desc',
    actionKey: 'contact.cards.phone.action',
    copyKey: 'contact.cards.phone.copyAction',
    copiedKey: 'contact.cards.phone.copiedText',
    href: `tel:${organization.phone.replace(/\s+/g, '')}`,
    value: organization.phone,
    copyValue: organization.phone,
    external: false,
  },
];
</script>

<template>
  <section class="contact-channels" aria-labelledby="channels-heading">
    <div class="channels-header">
      <h2 id="channels-heading" class="channels-title">
        {{ t('contact.channelsTitle') }}
      </h2>
      <p class="channels-subtitle">
        {{ t('contact.channelsSubtitle') }}
      </p>
    </div>

    <div class="channels-grid">
      <article
        v-for="ch in channels"
        :key="ch.id"
        class="channel-card"
      >
        <div class="channel-card__top">
          <div class="channel-card__icon-wrapper" aria-hidden="true">
            <component :is="ch.icon" class="channel-icon" />
          </div>

          <!-- Botón de copiar rápido para correo y teléfono -->
          <button
            v-if="ch.copyValue"
            type="button"
            class="copy-button"
            :title="copiedChannelId === ch.id ? t(ch.copiedKey!) : t(ch.copyKey!)"
            :aria-label="copiedChannelId === ch.id ? t(ch.copiedKey!) : t(ch.copyKey!)"
            @click="copyToClipboard(ch.copyValue, ch.id)"
          >
            <component :is="copiedChannelId === ch.id ? IconCheck : IconCopy" class="copy-icon" />
            <span class="copy-label">
              {{ copiedChannelId === ch.id ? t(ch.copiedKey!) : t(ch.copyKey!) }}
            </span>
          </button>
        </div>

        <div class="channel-card__body">
          <h3 class="channel-card__title">
            {{ t(ch.titleKey) }}
          </h3>
          <p class="channel-card__value">
            {{ ch.value }}
          </p>
          <p class="channel-card__desc">
            {{ t(ch.descKey) }}
          </p>
        </div>

        <div class="channel-card__action">
          <BaseButton
            :href="ch.href"
            :target="ch.external ? '_blank' : undefined"
            :rel="ch.external ? 'noopener noreferrer' : undefined"
            variant="outline"
            size="sm"
            class="channel-btn"
          >
            <span>{{ t(ch.actionKey) }}</span>
            <template v-if="ch.external" #icon>
              <IconExternalLink />
            </template>
          </BaseButton>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.contact-channels {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  margin-bottom: var(--space-8);
}

.channels-header {
  text-align: left;
}

.channels-title {
  margin: 0 0 var(--space-2) 0;
  font-size: 1.45rem;
  color: var(--color-text);
  font-weight: 700;
}

.channels-subtitle {
  margin: 0;
  font-size: 0.95rem;
  color: var(--color-text-muted);
  line-height: 1.55;
  max-width: 46rem;
}

.channels-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr));
  gap: var(--space-5);
}

.channel-card {
  display: flex;
  flex-direction: column;
  padding: var(--space-5);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  gap: var(--space-4);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-fast);
}

.channel-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 28px -4px var(--color-glow, rgba(21, 128, 61, 0.16)), 0 6px 12px -2px rgba(0, 0, 0, 0.04);
  border-color: var(--color-primary);
}

.channel-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
}

.channel-card__icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.25rem;
  height: 3.25rem;
  border-radius: var(--radius-md);
  background-color: var(--color-primary-soft);
  color: var(--color-primary);
  font-size: 1.45rem;
  transition: transform var(--transition-fast);
}

.channel-card:hover .channel-card__icon-wrapper {
  transform: scale(1.08);
}

.copy-button {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.6rem;
  font-size: 0.775rem;
  font-weight: 600;
  color: var(--color-text-muted);
  background-color: var(--color-surface-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.copy-button:hover,
.copy-button:focus-visible {
  color: var(--color-primary);
  border-color: var(--color-primary);
  background-color: var(--color-surface);
}

.copy-icon {
  font-size: 0.95rem;
}

.channel-card__body {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  flex-grow: 1;
}

.channel-card__title {
  margin: 0;
  font-size: 1.15rem;
  color: var(--color-text);
}

.channel-card__value {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-primary);
  word-break: break-all;
}

.channel-card__desc {
  margin: var(--space-1) 0 0 0;
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--color-text-muted);
}

.channel-card__action {
  margin-top: auto;
  padding-top: var(--space-2);
}

.channel-btn {
  width: 100%;
}
</style>
