import {
  ComponentAlignment,
  ComponentOrientation,
  ComponentSize,
  ComponentVariant,
  BaseComponentProps
} from '@/types';

/**
 * Base component class that provides common functionality for all Darkglow UI components.
 * This helps reduce code duplication and standardize component implementation.
 */
export abstract class BaseComponent extends HTMLElement {
  protected shadowRoot: ShadowRoot;

  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.render();
  }

  /**
   * Abstract method that must be implemented by all components
   * to define their rendering logic.
   */
  protected abstract render(): void;

  /**
   * Helper method to safely get a number attribute with a default value
   */
  protected getNumberAttribute(name: string, defaultValue: number): number {
    const value = this.getAttribute(name);
    return value !== null ? Number(value) : defaultValue;
  }

  /**
   * Helper method to safely get a string attribute with a default value
   */
  protected getStringAttribute(name: string, defaultValue: string): string {
    return this.getAttribute(name) || defaultValue;
  }

  /**
   * Helper method to check if a boolean attribute is present
   */
  protected getBooleanAttribute(name: string): boolean {
    return this.hasAttribute(name);
  }

  /**
   * Helper method to set a boolean attribute
   */
  protected setBooleanAttribute(name: string, value: boolean): void {
    if (value) {
      this.setAttribute(name, '');
    } else {
      this.removeAttribute(name);
    }
  }

  /**
   * Helper method to dispatch a custom event
   */
  protected dispatchCustomEvent<T>(eventName: string, detail: T): void {
    this.dispatchEvent(
      new CustomEvent(eventName, {
        bubbles: true,
        composed: true,
        detail
      })
    );
  }
}

/**
 * Interface for component properties that can be used for type checking
 */
export interface ComponentProps extends BaseComponentProps {
  [key: string]: unknown;
}