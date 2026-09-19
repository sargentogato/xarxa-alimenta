# Contrato de Componentes de Xarxa Alimenta

Este documento especifica las normas arquitectónicas y el contrato obligatorio para todos los componentes de la aplicación.

---

## 1. Reglas fundamentales

1. **Las Páginas solo orquestan (`src/pages/*.vue`)**:
   - Importan componentes, obtienen datos (de `data/` o `useI18n`) y se los pasan por **props**.
   - No contienen lógica de negocio ni estilos complejos propios.

2. **Flujo de datos hacia los componentes (`src/components/`)**:
   - Los componentes de página reciben datos por **props**.
   - Los componentes genéricos (`components/common/` y `components/agenda/`) **no usan i18n directamente**: reciben los textos y etiquetas por props o slots.

3. **Container Queries en lugar de Media Queries**:
   - Los componentes se adaptan al ancho de su contenedor (`@container <nombre> (min-width: ...)`).
   - No dependen de anchos fijos de ventana ni usan unidades como `vw`/`vh` dentro de componentes reutilizables.
   - La raíz ocupa `width: 100%` y `min-width: 0`.

4. **Los 5 mecanismos de personalización (en este orden)**:
   1. **Variables CSS propias**: Prefijadas y con fallback a tokens globales. Ejemplo: `--_radius: var(--project-card-radius, var(--radius-lg));`.
   2. **`class` y `style` en la raíz**: Un único elemento raíz que hereda atributos sin necesidad de configuración extra.
   3. **Slots específicos**: Solo donde se requiera modificar estructura o contenido (ej. `BaseModal`).
   4. **Clases BEM públicas + `:deep()`**: Elementos internos nombrados con BEM (`.project-card__title`) listados en la cabecera como API pública estable.
   5. **`defineExpose`**: Expone el elemento raíz (`root`) y métodos imperativos necesarios (`open()`, `close()`, etc.).

---

## 2. Formato de Cabecera de Documentación

Todo componente reutilizable debe incluir una cabecera en el `<script setup>` con este formato estricto:

```typescript
/**
 * NombreComponente: breve descripción de la función del componente.
 * Slots: default, header, footer (o ninguno)
 * CSS vars: --component-radius, --component-gap, --component-bg
 * Clases públicas: .componente, .componente__header, .componente__title, .componente__body
 * Expone: root, open, close
 */
```

---

## 3. Esqueleto de Componente SFC de Ejemplo

```vue
<script setup lang="ts">
/**
 * ExampleCard: Tarjeta de ejemplo representativa.
 * Slots: default, actions
 * CSS vars: --example-card-radius, --example-card-bg, --example-card-padding
 * Clases públicas: .example-card, .example-card__title, .example-card__body, .example-card__actions
 * Expone: root
 */
import { ref } from 'vue';

export interface ExampleCardProps {
  /**
   * Título principal de la tarjeta
   */
  title: string;
  /**
   * Variante opcional
   */
  variant?: 'default' | 'highlight';
}

withDefaults(defineProps<ExampleCardProps>(), {
  variant: 'default',
});

const root = ref<HTMLElement | null>(null);

defineExpose({
  root,
});
</script>

<template>
  <article
    ref="root"
    :class="['example-card', `example-card--${variant}`]"
  >
    <h3 class="example-card__title">
      {{ title }}
    </h3>
    <div class="example-card__body">
      <slot />
    </div>
    <div v-if="$slots.actions" class="example-card__actions">
      <slot name="actions" />
    </div>
  </article>
</template>

<style scoped>
.example-card {
  --_radius: var(--example-card-radius, var(--radius-md));
  --_bg: var(--example-card-bg, var(--color-surface));
  --_padding: var(--example-card-padding, var(--space-4));

  container-type: inline-size;
  container-name: example-card;

  width: 100%;
  min-width: 0;
  padding: var(--_padding);
  background-color: var(--_bg);
  border: 1px solid var(--color-border);
  border-radius: var(--_radius);
}

.example-card__title {
  margin: 0 0 var(--space-2) 0;
  font-size: 1.25rem;
}

@container example-card (min-width: 640px) {
  .example-card__title {
    font-size: 1.5rem;
  }
}
</style>
```
