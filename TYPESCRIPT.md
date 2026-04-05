# TypeScript Implementation Notes

This document summarizes the current TypeScript conventions in Darkglow UI after the migration to `Lit`.

## Current model

- Components are implemented with `LitElement`
- Shared base class: `src/components/base/DarkglowElement.ts`
- Decorators use the legacy TypeScript mode:
  - `experimentalDecorators: true`
  - `useDefineForClassFields: false`

## Shared typing

Common types live in `src/types/index.ts`:

- `ComponentVariant`
- `ComponentSize`
- `ComponentOrientation`
- `ComponentAlignment`
- `BaseComponentProps`

The project still uses these shared types mainly as vocabulary for the design system and component contracts.

## Registry

The public component registry remains centralized in `src/components/registry.ts`.

It provides:

- a single place to declare the catalog
- prefixed registration
- duplicate-define protection

## Path aliases

Both `tsconfig.json` and `tsconfig.components.json` define aliases such as:

- `@`
- `@components`
- `@atoms`
- `@molecules`
- `@templates`
- `@base`
- `@types`

## Recommended pattern for components

```ts
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { DarkglowElement } from '@base/DarkglowElement';

class MyComponent extends DarkglowElement {
  @property({ type: String, reflect: true })
  variant = 'primary';

  render() {
    return html`<slot></slot>`;
  }
}
```

## Practical benefits

1. Better consistency across the component catalog
2. Less manual DOM synchronization
3. Simpler attribute/property handling
4. A clearer path to documentation and tooling
