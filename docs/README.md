# Darkglow UI: documentación reconstruida

Esta carpeta documenta el proyecto a partir de una ingeniería inversa del código fuente en `src/`, la configuración de build y los artefactos auxiliares del repositorio.

## Qué es este proyecto

Darkglow UI es una librería de componentes UI basada en Web Components con estética synthwave/neón. El paquete se distribuye como librería para navegador usando `Vite`, con salida `ESM` y `UMD`, y usa `Storybook` para desarrollo y demostración.

## Stack detectado

- `TypeScript`
- `Vite`
- `Web Components` nativos
- `Shadow DOM`
- `Lit` únicamente en el componente `apc40-clip-launch`
- `Storybook` con `@storybook/web-components-vite`

## Estructura de esta documentación

- `arquitectura.md`: arquitectura, organización del código y pipeline de build.
- `arquitectura-objetivo-lit.md`: propuesta de arquitectura objetivo para unificar el proyecto sobre `Lit`.
- `catalogo-componentes.md`: catálogo de componentes con atributos, slots, eventos y comportamiento.
- `specs-funcionales.md`: especificaciones funcionales y restricciones observadas en runtime.
- `hallazgos-y-riesgos.md`: diferencias entre intención de diseño y comportamiento real detectado en el código.
- `progreso-migracion-lit.md`: tablero de control para la migración y estandarización.

## Resumen ejecutivo

- La librería exporta un registrador central `registerComponents(prefix?)`.
- La mayoría de componentes extienden `HTMLElement`; `FaderComponent` reutiliza una base común y `Apc40ClipLaunch` usa `LitElement`.
- Los estilos globales viven en `public/style.css`; los estilos internos de cada componente viven en Shadow DOM.
- El catálogo efectivo incluye átomos, un template (`layout`) y una molécula (`apc40-clip-launch`).
- La documentación previa del repo existe, pero no refleja con precisión todo el comportamiento actual del código.
