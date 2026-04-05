# Arquitectura objetivo: migración a `Lit`

## Decisión recomendada

El paradigma recomendado para Darkglow UI es:

- `Web Components` como contrato público
- `LitElement` como base de implementación interna

Esto preserva la naturaleza framework-agnostic de la librería y elimina la mayor parte del código manual de render, atributos y lifecycle.

## Principios

### 1. API pública estable

Se mantienen:

- tags actuales
- `registerComponents(prefix?)`
- distribución `ESM` y `UMD`
- dependencia en CSS variables globales, al menos en la primera fase

### 2. Implementación interna homogénea

Todos los componentes de librería deben implementar:

- `LitElement`
- propiedades tipadas con `@property`
- render declarativo con `html`
- estilos encapsulados con `static styles`

### 3. Separación entre sistema visual y componentes

Mantener dos capas:

- tokens globales: colores, tipografías, sombras, spacing
- estilos por componente: estructura, estados y variantes

### 4. Convenciones explícitas

El proyecto debe tener contratos consistentes para:

- eventos
- nombres de propiedades
- atributos booleanos
- variantes
- tamaños
- accesibilidad

## Estructura propuesta

```text
src/
  components/
    base/
      DarkglowElement.ts
    atoms/
      button/
        index.ts
        styles.ts
      button-group/
      card/
      container/
      fader/
      grid/
      knob/
      pad/
      typography/
    molecules/
      apc40-clip-launch/
        index.ts
        styles.ts
    templates/
      layout/
        index.ts
        styles.ts
    registry.ts
    index.ts
  tokens/
    theme.css
  types/
    components.ts
    events.ts
```

Notas:

- `styles.ts` con `css` de `lit` evita el acoplamiento al import inline de CSS de Vite para cada componente.
- Si prefieres mantener `styles.css`, sigue siendo viable, pero `Lit` funciona mejor con `css`.

## Base común propuesta

Crear `DarkglowElement` sobre `LitElement` con utilidades compartidas:

- helper `emit(name, detail, options?)`
- utilidades de A11Y opcionales
- convención de `part` y clases de estado
- quizá `variant`, `disabled` y `size` sólo si realmente se reutilizan sin forzar herencia artificial

No recomiendo meter demasiada lógica común. La base debe ser pequeña.

## Convención de propiedades y atributos

### Reglas

- `camelCase` para propiedades JS
- `kebab-case` para atributos HTML
- defaults definidos en propiedades de clase
- reflejar a atributo sólo cuando aporte valor al contrato externo

### Ejemplos

```ts
@property({ type: String, reflect: true }) variant: ComponentVariant = 'primary';
@property({ type: Boolean, reflect: true }) disabled = false;
@property({ type: Number }) value = 50;
```

## Convención de eventos

Decisión:

- usar `input` para cambios continuos durante interacción
- usar `change` para valor confirmado o finalizado
- usar `click` nativo cuando el componente es conceptualmente un botón
- reservar eventos custom cuando el nativo no comunica suficiente contexto

### Norma por categoría

#### Acciones discretas

- usar `click`
- no inventar eventos como `button-click`
- el host debe ser el elemento interactivo principal o reenviar el `click` de forma transparente

#### Controles continuos

- emitir `input` en cada cambio durante drag, wheel o teclado
- emitir `change` al finalizar la interacción o confirmar el valor

#### Eventos custom

Sólo usar eventos custom cuando el dominio realmente requiera semántica adicional no cubierta por `click`, `input` o `change`.

### Mapeo decidido

- `darkglow-button`: `click`
- `darkglow-pad`: `click`
- `darkglow-knob`: `input` + `change`
- `darkglow-fader`: `input` + `change`
- `darkglow-button-group`, `darkglow-card`, `darkglow-container`, `darkglow-grid`, `darkglow-typography`, `darkglow-layout`: sin eventos propios salvo una necesidad clara futura

### Compatibilidad transitoria

Durante la migración:

- se pueden conservar eventos legacy por una versión interna corta
- deben documentarse como `deprecated`
- el objetivo final es eliminarlos del contrato público

## Convención visual

### Tokens

Decisión:

- mover el contrato visual a una capa explícita en `src/tokens/theme.css`
- mantener `public/style.css` sólo como capa de compatibilidad/demo durante la migración
- exportar el tema como asset distribuible en el build de librería

### Estructura de tokens

La fuente de verdad debe vivir en:

- `src/tokens/theme.css`

Y contener:

- colores
- glow
- sombras
- spacing
- radius
- tipografías

### Rol de `public/style.css`

`public/style.css` no debe seguir siendo la fuente primaria del sistema visual.

Uso permitido:

- demos locales
- Storybook mientras dura la migración
- capa de compatibilidad que importe o replique temporalmente `src/tokens/theme.css`

### Regla para componentes

Los componentes:

- pueden depender de CSS variables globales
- no deben depender de resets globales para funcionar estructuralmente
- sí pueden beneficiarse de theming global para look and feel

### Resultado esperado

Al final de la migración, el consumidor debería poder cargar un asset de tema claro y explícito, en vez de depender de un `public/style.css` acoplado al playground.

### Variantes

Definir un conjunto real y único:

- `primary`
- `secondary`
- `danger`
- `accent`
- `outlined`
- `default`

Evitar variantes documentadas pero no implementadas, como `ghost`, salvo que se añadan de verdad.

## Accesibilidad objetivo

### Requisitos mínimos

- foco visible
- soporte de teclado para controles interactivos
- `role`, `aria-*` y naming accesible donde aplique
- `disabled` semántico cuando corresponda

### Componentes que requieren más atención

- `knob`
- `fader`
- `pad`

## Registro de componentes

Mantener `registry.ts`, pero simplificarlo:

- fuente única de definiciones
- opción de prefijo
- prevención de doble `customElements.define`

No hace falta una capa compleja de DI o factories.

## Storybook objetivo

Cada componente debería tener:

- story base
- story por variantes
- story de estados
- story interactiva para eventos
- página docs con tabla de props/eventos

## Estrategia de migración

### Orden recomendado

1. `button`
2. `button-group`
3. `card`
4. `container`
5. `grid`
6. `typography`
7. `layout`
8. `pad`
9. `knob`
10. `fader`
11. `apc40-clip-launch`

Razón:

- primero componentes simples y base visual
- luego templates
- después controles complejos

## Criterios de terminado por componente

Un componente se considera migrado cuando:

- usa `LitElement`
- tiene props tipadas
- no usa `innerHTML` manual
- no depende de callbacks comentados o sincronización manual frágil
- tiene story dedicada
- tiene eventos y atributos documentados
- mantiene compatibilidad de tag público

## No recomendado

- mezclar `HTMLElement` puro y `LitElement` indefinidamente
- migrar a framework de app como React
- diseñar una base abstracta grande y rígida
- cambiar nombres de tags en la primera fase
- seguir añadiendo eventos custom para interacciones que ya cubre el DOM estándar
- mantener `public/style.css` como fuente de verdad del design system
