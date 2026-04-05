import { LitElement } from 'lit';

export interface EmitOptions extends Omit<CustomEventInit, 'detail'> {
  detail?: unknown;
}

export abstract class DarkglowElement extends LitElement {
  protected emit<T>(eventName: string, detail?: T, options: EmitOptions = {}): boolean {
    return this.dispatchEvent(
      new CustomEvent<T>(eventName, {
        bubbles: true,
        composed: true,
        ...options,
        detail
      })
    );
  }
}
