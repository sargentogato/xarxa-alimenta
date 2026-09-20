<script setup lang="ts">
/**
 * AppHeader: Cabecera común y fija para todas las páginas.
 * Slots: ninguno
 * CSS vars: --header-bg, --header-border, --header-blur
 * Clases públicas: .app-header, .app-header--scrolled, .app-header__logo, .app-header__nav, .app-header__actions, .app-header__menu-btn
 * Expone: root, isMobileMenuOpen, closeMobileMenu
 */
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { organization } from "@/data/organization.ts";
import { headerNavItems } from "@/data/navigation.ts";
import LanguageSwitcher from "./LanguageSwitcher.vue";
import AccessibilityPanel from "./AccessibilityPanel.vue";
import BaseButton from "./BaseButton.vue";
import IconMenu from "./icons/IconMenu.vue";
import IconClose from "./icons/IconClose.vue";

const { t } = useI18n();
const route = useRoute();

const root = ref<HTMLElement | null>(null);
const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);
const mobileDrawerRef = ref<HTMLElement | null>(null);
const mobileMenuBtnRef = ref<HTMLButtonElement | null>(null);

function handleScroll() {
  isScrolled.value = window.scrollY > 20;
}

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false;
}

// Cerrar menú móvil automáticamente al cambiar de ruta
watch(
  () => route.path,
  () => {
    closeMobileMenu();
  },
);

// Bloquear scroll de la página cuando el menú móvil está abierto
watch(isMobileMenuOpen, (open) => {
  if (typeof document === "undefined") return;
  if (open) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});

function handleKeydown(e: KeyboardEvent) {
  if (e.key === "Escape" && isMobileMenuOpen.value) {
    closeMobileMenu();
    mobileMenuBtnRef.value?.focus();
  }
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  document.addEventListener("keydown", handleKeydown);
  handleScroll();
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  document.removeEventListener("keydown", handleKeydown);
  if (typeof document !== "undefined") {
    document.body.style.overflow = "";
  }
});

defineExpose({
  root,
  isMobileMenuOpen,
  closeMobileMenu,
});
</script>

<template>
  <header
    ref="root"
    :class="['app-header', isScrolled ? 'app-header--scrolled' : '']"
  >
    <!-- Enlace de salto accesible -->
    <a href="#main-content" class="skip-link">
      {{ t("common.skipToContent") }}
    </a>

    <div class="app-header__container container">
      <!-- Identidad y Marca: Logotipo circular + Nombre -->
      <RouterLink
        to="/"
        class="app-header__brand"
        aria-label="Inicio - Xarxa Alimenta"
      >
        <span class="app-header__logo" aria-hidden="true">
          <svg
            viewBox="0 0 40 40"
            width="40"
            height="40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="20"
              cy="20"
              r="19"
              fill="#ffffff"
              stroke="#216928"
              stroke-width="2"
            />
            <!-- Campo de cultivo en perspectiva y sol naciente -->
            <path
              d="M20 10 A 5 5 0 0 1 25 15 L 15 15 A 5 5 0 0 1 20 10 Z"
              fill="#e8a838"
            />
            <path
              d="M7 26 C13 23, 20 28, 33 24 L35 34 C24 37, 14 32, 5 35 Z"
              fill="#2e9e3a"
            />
            <path
              d="M10 21 C15 19, 21 23, 30 20 L32 26 C23 29, 16 25, 8 27 Z"
              fill="#216928"
            />
            <path
              d="M20 15 L20 22 M16 18 L24 18"
              stroke="#164a1b"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </span>
        <span class="app-header__name">
          {{ organization.name }}
        </span>
        <!-- <span class="app-header__tag">Huerta Viva</span> -->
      </RouterLink>

      <!-- Navegación de escritorio (≥900px) -->
      <nav class="app-header__nav" :aria-label="t('nav.mainNavigation')">
        <ul class="app-header__nav-list">
          <li
            v-for="item in headerNavItems"
            :key="item.path"
            class="app-header__nav-item"
          >
            <BaseButton
              v-if="item.isCta"
              :to="item.path"
              variant="accent"
              size="sm"
              class="app-header__cta-btn"
            >
              {{ t(item.nameKey) }}
            </BaseButton>
            <RouterLink
              v-else
              :to="item.path"
              class="app-header__nav-link"
              :aria-current="route.path === item.path ? 'page' : undefined"
            >
              <span
                v-if="route.path === item.path"
                class="app-header__active-dot"
                aria-hidden="true"
              />
              {{ t(item.nameKey) }}
            </RouterLink>
          </li>
        </ul>
      </nav>

      <!-- Acciones a la derecha: Idioma + Accesibilidad + Hamburguesa en móvil -->
      <div class="app-header__actions">
        <LanguageSwitcher />
        <AccessibilityPanel />

        <!-- Botón de menú hamburguesa móvil (<900px) -->
        <button
          ref="mobileMenuBtnRef"
          type="button"
          class="app-header__menu-btn"
          :aria-expanded="isMobileMenuOpen ? 'true' : 'false'"
          aria-controls="mobile-navigation"
          :aria-label="
            isMobileMenuOpen ? t('nav.menuClose') : t('nav.menuOpen')
          "
          @click="toggleMobileMenu"
        >
          <IconClose v-if="isMobileMenuOpen" size="1.5rem" />
          <IconMenu v-else size="1.5rem" />
        </button>
      </div>
    </div>

    <!-- Menú móvil a pantalla completa con trampa de foco -->
    <Teleport to="body">
      <div
        v-if="isMobileMenuOpen"
        id="mobile-navigation"
        ref="mobileDrawerRef"
        class="app-header__drawer"
        role="dialog"
        aria-modal="true"
        :aria-label="t('nav.mainNavigation')"
      >
        <div class="app-header__drawer-backdrop" @click="closeMobileMenu" />
        <div class="app-header__drawer-content">
          <div class="app-header__drawer-header">
            <span class="app-header__name">{{ organization.name }}</span>
            <button
              type="button"
              class="app-header__menu-btn"
              :aria-label="t('nav.menuClose')"
              @click="closeMobileMenu"
            >
              <IconClose size="1.5rem" />
            </button>
          </div>

          <nav class="app-header__drawer-nav">
            <ul class="app-header__drawer-list">
              <li
                v-for="item in headerNavItems"
                :key="item.path"
                class="app-header__drawer-item"
              >
                <BaseButton
                  v-if="item.isCta"
                  :to="item.path"
                  variant="accent"
                  size="lg"
                  @click="closeMobileMenu"
                >
                  {{ t(item.nameKey) }}
                </BaseButton>
                <RouterLink
                  v-else
                  :to="item.path"
                  class="app-header__drawer-link"
                  :aria-current="route.path === item.path ? 'page' : undefined"
                  @click="closeMobileMenu"
                >
                  {{ t(item.nameKey) }}
                </RouterLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </Teleport>
  </header>
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 90;
  height: var(--header-height);
  background: color-mix(in srgb, var(--color-surface) 88%, transparent);
  backdrop-filter: blur(14px) saturate(160%);
  -webkit-backdrop-filter: blur(14px) saturate(160%);
  border-block-end: 1.5px solid
    color-mix(in srgb, var(--color-border) 60%, transparent);
  box-shadow: 0 4px 20px -6px var(--color-glow, rgba(0, 0, 0, 0.05));
  transition:
    background-color var(--transition-normal),
    box-shadow var(--transition-normal),
    border-color var(--transition-normal);
}

.app-header::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(
    90deg,
    var(--color-primary) 0%,
    var(--color-sun, #eab308) 50%,
    var(--color-accent) 100%
  );
  background-size: 200% 100%;
  animation: rainbowGlow 8s ease-in-out infinite alternate;
  z-index: 10;
}

@keyframes rainbowGlow {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

.app-header--scrolled {
  background: color-mix(in srgb, var(--color-surface) 95%, transparent);
  box-shadow:
    0 8px 30px -4px var(--color-glow, rgba(0, 0, 0, 0.12)),
    0 2px 6px rgba(0, 0, 0, 0.04);
}

[data-theme="dark"] .app-header {
  background: color-mix(in srgb, var(--color-surface) 85%, transparent);
  border-block-end-color: color-mix(
    in srgb,
    var(--color-border) 80%,
    transparent
  );
}

[data-theme="dark"] .app-header--scrolled {
  background: color-mix(in srgb, var(--color-surface) 94%, transparent);
  box-shadow: 0 8px 32px -4px rgba(0, 0, 0, 0.5);
}

.app-header__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.app-header__brand {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  text-decoration: none;
  min-height: 2.75rem;
}

.app-header__logo {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
}

.app-header__brand:hover .app-header__logo {
  transform: scale(1.08) rotate(5deg);
}

.app-header__name {
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 1.35rem;
  letter-spacing: -0.01em;
  color: var(--color-primary);
  white-space: nowrap;
  transition:
    color var(--transition-fast),
    text-shadow var(--transition-fast);
  display: none;
}

@media (min-width: 1024px) {
  .app-header__name {
    display: block;
  }
}

.app-header__brand:hover .app-header__name {
  text-shadow: 0 2px 10px var(--color-glow);
}

.app-header__tag {
  display: inline-block;
  font-size: 0.6875rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.15rem 0.55rem;
  border-radius: var(--radius-full);
  background-color: var(--color-primary-soft);
  color: var(--color-primary);
  border: 1px solid var(--color-border);
}

@media (max-width: 1024px) {
  .app-header__tag {
    display: none;
  }
}

/* Navegación escritorio */
.app-header__nav {
  display: none;
}

@media (min-width: 900px) {
  .app-header__nav {
    display: block;
  }
}

.app-header__nav-list {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.app-header__nav-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  min-height: 2.35rem;
  padding: 0.4rem 0.85rem;
  font-weight: 600;
  font-size: 0.9375rem;
  color: var(--color-text);
  border-radius: var(--radius-full);
  border: 1.5px solid transparent;
  transition:
    color var(--transition-fast),
    background-color var(--transition-fast),
    border-color var(--transition-fast),
    transform var(--transition-fast),
    box-shadow var(--transition-fast);
}

.app-header__nav-link:hover {
  color: var(--color-primary);
  background-color: var(--color-surface-hover);
  border-color: var(--color-border);
  transform: translateY(-1px);
}

.app-header__nav-link[aria-current="page"] {
  color: var(--color-primary);
  font-weight: 800;
  background-color: var(--color-primary-soft);
  border-color: var(--color-primary);
  box-shadow: 0 2px 8px -2px var(--color-glow);
}

.app-header__active-dot {
  width: 0.45rem;
  height: 0.45rem;
  border-radius: var(--radius-full);
  background-color: var(--color-primary);
  box-shadow: 0 0 6px var(--color-primary);
  flex-shrink: 0;
}

.app-header__cta-btn {
  box-shadow: 0 4px 14px -2px var(--color-accent-glow, rgba(0, 0, 0, 0.2));
  transition:
    transform var(--transition-fast),
    box-shadow var(--transition-fast) !important;
}

.app-header__cta-btn:hover {
  transform: translateY(-2px) scale(1.04) !important;
  box-shadow: 0 8px 20px -2px var(--color-accent-glow, rgba(0, 0, 0, 0.35)) !important;
}

/* Acciones a la derecha */
.app-header__actions {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.app-header__menu-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  color: var(--color-text);
  background-color: var(--color-surface);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-full);
  cursor: pointer;
  transition:
    background-color var(--transition-fast),
    transform var(--transition-fast),
    border-color var(--transition-fast);
}

.app-header__menu-btn:hover {
  background-color: var(--color-surface-hover);
  border-color: var(--color-primary);
  transform: scale(1.05);
}

@media (min-width: 900px) {
  .app-header__menu-btn {
    display: none;
  }
}

/* Menú móvil deslizante */
.app-header__drawer {
  position: fixed;
  inset: 0;
  z-index: 999;
  display: flex;
}

.app-header__drawer-backdrop {
  position: absolute;
  inset: 0;
  background-color: var(--color-scrim);
  backdrop-filter: blur(4px);
}

.app-header__drawer-content {
  position: relative;
  width: min(85vw, 24rem);
  height: 100%;
  margin-left: auto;
  background-color: var(--color-surface);
  border-inline-start: 1px solid var(--color-border);
  box-shadow: var(--shadow-xl);
  display: flex;
  flex-direction: column;
  padding: var(--space-4);
  overflow-y: auto;
}

.app-header__drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-block-end: var(--space-4);
  border-block-end: 1px solid var(--color-border);
  margin-block-end: var(--space-4);
}

.app-header__drawer-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.app-header__drawer-link {
  display: flex;
  align-items: center;
  min-height: 3rem;
  padding: var(--space-3) var(--space-4);
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text);
  border-radius: var(--radius-md);
  transition:
    background-color var(--transition-fast),
    color var(--transition-fast);
}

.app-header__drawer-link:hover {
  background-color: var(--color-surface-hover);
  color: var(--color-primary);
}

.app-header__drawer-link[aria-current="page"] {
  background-color: var(--color-primary-soft);
  color: var(--color-primary);
  font-weight: 700;
}
</style>
