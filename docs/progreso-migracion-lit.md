# Progreso de migración a `Lit`

Estado del documento: activo

## Objetivo

Controlar la estandarización del proyecto hacia una arquitectura basada en `LitElement` sin romper la API pública de Darkglow UI.

## Estado general

- Paradigma objetivo aprobado: `LitElement`
- API pública preservada: sí, con compatibilidad transitoria
- Convención de eventos: definida
- Convención de tokens visuales: definida
- Base común `DarkglowElement`: implementada

## Decisiones

| Tema | Estado | Decisión |
|---|---|---|
| Base de implementación | decidido | `LitElement` |
| Contrato externo | decidido | mantener Web Components |
| Prefijo por defecto | decidido | `darkglow` |
| Registro central | decidido | se mantiene |
| Convención de eventos | decidido | `click` para acciones discretas, `input` + `change` para controles continuos |
| Estrategia de tokens | decidido | `src/tokens/theme.css` como fuente de verdad; `public/style.css` como compatibilidad/demo |

## Checklist transversal

- [x] Definir convención de eventos por tipo de componente
- [ ] Definir convención de props/atributos reflejados
- [ ] Definir convención de variantes soportadas
- [x] Crear `DarkglowElement`
- [ ] Crear guía de estilo de componentes
- [x] Migrar stories al catálogo completo
- [x] Revisar accesibilidad de todos los controles
- [x] Regenerar o reemplazar `custom-elements.json`
- [ ] Actualizar documentación raíz del proyecto
- [x] Definir estrategia de tokens y tema global

## Backlog por componente

| Componente | Tipo | Estado actual | Prioridad | Migrado a Lit | Story completa | API revisada |
|---|---|---|---|---|---|---|
| `darkglow-button` | atom | `LitElement` | alta | [x] | [x] | [ ] |
| `darkglow-button-group` | atom | `LitElement` | alta | [x] | [x] | [ ] |
| `darkglow-card` | atom | `LitElement` | media | [x] | [x] | [ ] |
| `darkglow-container` | atom | `LitElement` | media | [x] | [x] | [ ] |
| `darkglow-grid` | atom | `LitElement` | media | [x] | [x] | [ ] |
| `darkglow-typography` | atom | `LitElement` | media | [x] | [x] | [ ] |
| `darkglow-layout` | template | `LitElement` | alta | [x] | [x] | [ ] |
| `darkglow-pad` | atom | `LitElement` | alta | [x] | [x] | [ ] |
| `darkglow-knob` | atom | `LitElement` | alta | [x] | [x] | [ ] |
| `darkglow-fader` | atom | `LitElement` | alta | [x] | [x] | [ ] |
| `apc40-clip-launch` | molecule | `LitElement` | baja | [x] | [x] | [x] |

## Fases

### Fase 0. Definiciones

- [x] Confirmar convención de eventos
- [x] Confirmar estrategia de tokens
- [ ] Aprobar estructura objetivo en `docs/arquitectura-objetivo-lit.md`

### Convenciones aprobadas

#### Eventos

- acciones discretas: `click`
- controles continuos: `input` durante interacción y `change` al confirmar
- eventos custom: sólo si aportan semántica de dominio real

#### Tokens

- fuente de verdad: `src/tokens/theme.css`
- compatibilidad/demo: `public/style.css`
- objetivo: distribuir un asset de tema explícito y desacoplado del playground

### Fase 1. Base de plataforma

- [x] Implementar `DarkglowElement`
- [ ] Simplificar `registry.ts` si hace falta
- [ ] Preparar utilidades compartidas de eventos

### Fase 2. Componentes simples

- [x] Migrar `button`
- [x] Migrar `button-group`
- [x] Migrar `card`
- [x] Migrar `container`
- [x] Migrar `grid`
- [x] Migrar `typography`

### Fase 3. Templates y composición

- [x] Migrar `layout`
- [x] Revisar `apc40-clip-launch` para que use la nueva convención

### Fase 4. Controles complejos

- [x] Migrar `pad`
- [x] Migrar `knob`
- [x] Migrar `fader`
- [x] Añadir soporte de teclado y A11Y

### Fase 5. Cierre

- [x] Completar Storybook
- [x] Actualizar documentación
- [ ] Validar build de librería
- [ ] Validar consumo externo

## Riesgos a vigilar

- romper nombres de eventos usados por consumidores
- romper estilos por mover tokens demasiado pronto
- mezclar dos patrones durante demasiado tiempo
- sobreingenierizar la clase base

## Regla de progreso

Antes de marcar un componente como migrado:

- debe compilar
- debe conservar su tag público
- debe tener al menos una story funcional
- debe tener eventos y atributos documentados
