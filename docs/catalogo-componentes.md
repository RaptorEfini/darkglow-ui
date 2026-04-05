# Catálogo de componentes

Este documento describe la API observable en el código actual.

## Convenciones

- Prefijo por defecto: `darkglow`
- Excepción: `apc40-clip-launch` no usa prefijo
- Los slots no nombrados se indican como `default`
- Los eventos listados son los realmente emitidos por el componente

## `darkglow-button`

Elemento interactivo de acción simple.

### Atributos

| Atributo | Tipo | Default | Notas |
|---|---|---:|---|
| `variant` | string | `primary` | Variante visual |
| `disabled` | boolean | `false` | Inhibe acción y marca el botón interno como `disabled` |

### Slots

| Slot | Uso |
|---|---|
| `default` | Texto o contenido del botón |

### Eventos

| Evento | Detail | Cuándo ocurre |
|---|---|---|
| `click` | nativo | Al hacer click si no está `disabled` |

## `darkglow-button-group`

Agrupa botones horizontal o verticalmente.

### Atributos

| Atributo | Tipo | Default | Notas |
|---|---|---:|---|
| `orientation` | `horizontal \| vertical` | `horizontal` | Dirección del layout |
| `align` | `start \| center \| end` | `center` | Alineación visual |

### Slots

| Slot | Uso |
|---|---|
| `default` | Botones o elementos agrupados |

### Eventos

No emite eventos propios.

## `darkglow-card`

Contenedor visual con borde/sombra y variante cromática.

### Atributos

| Atributo | Tipo | Default | Notas |
|---|---|---:|---|
| `variant` | string | `default` | Modifica estilo del card |
| `elevated` | boolean | `false` | Aumenta sombra base y hover |

### Slots

| Slot | Uso |
|---|---|
| `default` | Contenido del card |

## `darkglow-container`

Wrapper de contenido con padding y ancho consistente.

### Atributos

No expone atributos funcionales.

### Slots

| Slot | Uso |
|---|---|
| `default` | Contenido del contenedor |

## `darkglow-fader`

Control lineal vertical u horizontal.

### Atributos

| Atributo | Tipo | Default | Notas |
|---|---|---:|---|
| `value` | number | `50` | Valor actual |
| `min` | number | `0` | Mínimo |
| `max` | number | `100` | Máximo |
| `disabled` | boolean | `false` | Bloquea drag y wheel |
| `variant` | string | `primary` | Variante visual |
| `orientation` | `horizontal \| vertical` | `vertical` | Dirección del fader |

### Propiedad interna relevante

- `sensitivity: number = 1`

No está expuesta como atributo HTML, pero existe como propiedad de instancia.

### Slots

| Slot | Uso |
|---|---|
| `default` | Label visible debajo del valor |

### Eventos

| Evento | Detail | Cuándo ocurre |
|---|---|---|
| `input` | `{ value: number }` | Durante drag, wheel o teclado |
| `change` | `{ value: number }` | Al confirmar/finalizar el cambio |

## `darkglow-grid`

Grid layout configurable por columnas, separación y apariencia.

### Atributos

| Atributo | Tipo | Default | Notas |
|---|---|---:|---|
| `columns` | string/number | `4` | Se usa en `repeat(columns, 1fr)` |
| `gap` | string | `10px` | Gap CSS |
| `max-width` | string | `none` | Máximo ancho del contenedor |
| `align` | `start \| center \| end` | `center` | Alinea contenido e ítems |
| `variant` | string | `default` | `primary`, `secondary`, `danger`, `accent`, `outlined`, `default` |

### Slots

| Slot | Uso |
|---|---|
| `default` | Hijos de la cuadrícula |

## `darkglow-knob`

Control rotatorio para valores continuos.

### Atributos

| Atributo | Tipo | Default | Notas |
|---|---|---:|---|
| `value` | number | `50` | Valor actual |
| `min` | number | `0` | Mínimo |
| `max` | number | `100` | Máximo |
| `disabled` | boolean | `false` | Deshabilita interacción |
| `variant` | string | `primary` | Variante visual |

### Slots

| Slot | Uso |
|---|---|
| `default` | Label del knob |

### Eventos

| Evento | Detail | Cuándo ocurre |
|---|---|---|
| `input` | `{ value: number }` | Durante drag, wheel o teclado |
| `change` | `{ value: number }` | Al confirmar/finalizar el cambio |

## `darkglow-pad`

Pad cuadrado para disparo o selección.

### Atributos

| Atributo | Tipo | Default | Notas |
|---|---|---:|---|
| `number` | number | `null` | Identificador visual y lógico |
| `variant` | string | `primary` | Variante visual |
| `active` | boolean | `false` | Estado iluminado/activo |
| `disabled` | boolean | `false` | Deshabilita click |
| `size` | string | `default` | Tamaño visual |

### Slots

| Slot | Uso |
|---|---|
| `default` | Label del pad |

### Eventos

| Evento | Detail | Cuándo ocurre |
|---|---|---|
| `click` | nativo | Al hacer click si no está `disabled` |

## `darkglow-typography`

Componente tipográfico con glow opcional.

### Atributos

| Atributo | Tipo | Default | Notas |
|---|---|---:|---|
| `variant` | string | `default` | Variante cromática |
| `type` | `title \| subtitle \| text` | `text` | Cambia tag renderizado |
| `light-off` | boolean | `false` | Reduce/apaga efecto luminoso |
| `glow-spread` | number | `1` | Multiplicador del glow para títulos y subtítulos |

### Renderizado

- `title` renderiza `h1`
- `subtitle` renderiza `h2`
- `text` renderiza `p`

### Slots

| Slot | Uso |
|---|---|
| `default` | Contenido textual |

## `darkglow-layout`

Template de página con header, main y footer.

### Atributos

| Atributo | Tipo | Default | Notas |
|---|---|---:|---|
| `title` | string | `Darkglow UI` | Se usa para `document.title` sin eliminar el atributo del host |

### Slots

| Slot | Uso |
|---|---|
| `header` | Cabecera |
| `default` | Contenido principal |
| `footer` | Pie de página |

### Efectos colaterales

- actualiza `document.title`

## `apc40-clip-launch`

Componente compuesto basado en `LitElement` que compone:

- `darkglow-card`
- `darkglow-grid`
- múltiples instancias de `darkglow-pad`

### Tag

| Tag | Prefijo |
|---|---|
| `apc40-clip-launch` | sin prefijo |

### Atributos

| Atributo | Tipo | Default | Notas |
|---|---|---:|---|
| `pad-count` | number | `40` | Cantidad total de pads renderizados |
| `columns` | number | `8` | Columnas del grid |
| `gap` | string | `5px` | Separación entre pads |
| `pad-variant` | string | `primary` | Variante visual aplicada a todos los pads |
| `active-pads` | string | `""` | Lista CSV de pads activos, por ejemplo `1,5,9` |

### Eventos

| Evento | Detail | Cuándo ocurre |
|---|---|---|
| `pad-trigger` | `{ number: number }` | Cuando se activa uno de los pads |

### Propósito

Representa una cuadrícula tipo APC40 para clip launch con configuración básica de layout y estado activo por pad.
