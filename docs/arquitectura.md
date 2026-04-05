# Arquitectura del proyecto

## Objetivo

El proyecto implementa una librería de componentes visuales reutilizables para interfaces oscuras con acentos neón. Está pensada para consumirse desde HTML o JavaScript sin depender de frameworks externos en el host.

## Estructura detectada

```text
src/
  components/
    atoms/
      button/
      button-group/
      card/
      container/
      fader/
      grid/
      knob/
      pad/
      typography/
    base/
      BaseComponent.ts
      DarkglowElement.ts
    molecules/
      apc40-clip-launch.ts
    templates/
      layout/
    index.ts
    registry.ts
  stories/
  types/
public/
  style.css
.storybook/
dist/
```

## Capas

### 1. Catálogo de componentes

Cada componente vive en un subdirectorio con:

- `index.ts`: clase del custom element.
- `styles.css`: estilos encapsulados vía Shadow DOM.

### 2. Tipos compartidos

`src/types/index.ts` define tipos base reutilizables:

- `ComponentVariant`
- `ComponentSize`
- `ComponentOrientation`
- `ComponentAlignment`
- `BaseComponentProps`

### 3. Base común

La base efectiva actual es `src/components/base/DarkglowElement.ts`:

- extiende `LitElement`
- centraliza la utilidad `emit()`
- sirve como punto de estandarización para los componentes migrados

`src/components/base/BaseComponent.ts` sigue en el repo como remanente de la implementación anterior, pero ya no es la base recomendada.

### 4. Registro de componentes

`src/components/registry.ts` introduce un `ComponentRegistry` singleton con:

- registro unitario y masivo
- prefijo configurable
- prevención de doble registro por tag final

`src/components/index.ts` arma el mapa de componentes y expone:

```ts
registerComponents(prefix = 'darkglow')
```

Comportamiento:

- la mayoría de tags usan prefijo: `darkglow-button`, `darkglow-card`, etc.
- `apc40-clip-launch` se registra sin prefijo.

## Modelo de render

Patrón dominante actual:

- implementación sobre `LitElement`
- propiedades tipadas con decorators legacy de `Lit`
- render declarativo con `html`
- estilos encapsulados vía `static styles`
- uso puntual de listeners globales en controles con drag

La excepción principal es `apc40-clip-launch`, que ya era `LitElement` antes de la migración y aún debe alinearse con las convenciones actuales del resto del catálogo.

## Sistema visual

La fuente de verdad del tema ahora vive en `src/tokens/theme.css`:

- tipografías: `Orbitron`, `Raleway`
- paleta synthwave: `--color-primary`, `--color-secondary`, `--color-danger`, `--color-accent`
- sombras: `--shadow-sm` a `--shadow-xl`
- spacing y radius

El tema define:

- tokens globales y tipografías para componentes

`public/style.css` queda como capa de compatibilidad/demo y contiene además:

- fondo global con grid animada
- estilos base de `html`, `body` y `:root`
- efectos globales de demo para headings y layout general

Importante: los componentes usan variables CSS globales como `--color-primary`, por lo que el host debe cargar `style.css` o proveer esos tokens.

## Build y distribución

### Scripts detectados

- `npm run dev`: Vite app local
- `npm run build`: `tsc && vite build`
- `npm run preview`: preview de Vite
- `npm run build-components`: build de librería con `vite.components.config.js`
- `npm run storybook`
- `npm run build-storybook`

### Salida de librería

`vite.components.config.js` genera:

- `dist/darkglow/darkglow.js`
- `dist/darkglow/darkglow.umd.cjs`
- `dist/darkglow/style.css`
- sourcemaps

Configuración observada:

- formato `es` y `umd`
- `cssCodeSplit: false`
- entrypoint de librería: `src/components/index.ts`

## Storybook

Configuración en `.storybook/`:

- framework: `@storybook/web-components-vite`
- addons: docs + essentials
- `preview.ts` registra componentes e importa `../src/tokens/theme.css`

Cobertura detectada:

- existe al menos una story para `darkglow-button`
- no hay cobertura equivalente para todo el catálogo

## Integración esperada

Para uso externo, el contrato real es:

1. importar la librería o el bundle compilado
2. ejecutar `registerComponents()`
3. cargar el tema global
4. usar los custom elements en el DOM

Hoy eso se puede resolver cargando `src/tokens/theme.css` en desarrollo o distribuyendo el asset de tema correspondiente junto al bundle.
