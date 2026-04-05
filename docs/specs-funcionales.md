# Especificaciones funcionales reconstruidas

## Contrato de consumo

### Inicialización mínima

El consumidor debe:

1. cargar el tema global
2. importar el bundle o `src/components`
3. ejecutar `registerComponents()`

### Uso esperado

```html
<script type="module">
  import { registerComponents } from './darkglow/darkglow.js';
  registerComponents();
</script>

<link rel="stylesheet" href="./darkglow/theme.css">
```

## Contrato de naming

- Prefijo por defecto: `darkglow`
- Convención: `${prefix}-${tagName}`
- Excepción explícita: `apc40-clip-launch`

## Contrato visual

Los componentes dependen de tokens CSS globales. Sin ellos, varios estilos quedan incompletos.

Fuente de verdad actual:

- `src/tokens/theme.css`

Variables críticas:

- `--color-primary`
- `--color-secondary`
- `--color-danger`
- `--color-accent`
- `--color-darker`
- `--shadow-sm`
- `--shadow-md`
- `--shadow-lg`
- `--shadow-xl`

## Contrato de eventos

Convención actual:

- acciones discretas: `click`
- controles continuos: `input` durante interacción
- confirmación de valor: `change`

Aplicación actual:

- `darkglow-button`: `click`
- `darkglow-pad`: `click`
- `darkglow-knob`: `input` y `change`
- `darkglow-fader`: `input` y `change`

## Modelo de actualización

La librería ya no depende del patrón `observedAttributes` + `innerHTML` para el catálogo principal.

Estado actual:

- los componentes principales están migrados a `LitElement`
- las actualizaciones ocurren por propiedades reactivas
- `layout` actualiza `document.title` sin borrar el atributo del host

## Interacción de controles

### Knob

- drag vertical ajusta el valor
- wheel también ajusta el valor
- teclado con flechas también ajusta el valor
- rango configurable con `min` y `max`
- el valor se clampa dentro del rango
- emite `input` y `change`

### Fader

- soporta `vertical` y `horizontal`
- drag y wheel modifican el valor
- teclado con flechas también modifica el valor
- expone `sensitivity` como propiedad JS, no como atributo
- mantiene texto numérico con el valor redondeado
- emite `input` y `change`

### Pad

- soporta estado `active`
- muestra el número si se define `number`
- usa un botón real como superficie interactiva
- usa `click` nativo como evento principal

## Componentes compuestos

### `apc40-clip-launch`

Especificación observada:

- renderiza `pad-count` pads
- usa `columns` y `gap` para controlar el grid
- asigna números consecutivos desde 1
- usa `click` de `darkglow-pad`
- emite `pad-trigger` con el número del pad activado
- acepta `active-pads` como lista CSV para resaltar pads activos

## Storybook

### Estado actual

- Storybook está listo para registrar componentes y cargar estilos globales
- la cobertura detectada es mínima
- no hay evidencia de una documentación viva completa por componente

## Distribución

### Bundle de librería

La salida compilada debe incluir:

- JS `ESM`
- JS `UMD`
- assets de tema/estilo
- fuentes estáticas

### Requisito operativo

Para reproducir correctamente la estética del sistema se deben distribuir también las fuentes y el asset de tema global.
