/**
 * Component registry system for Darkglow UI
 * This provides a more scalable way to register and manage components
 */

// Component type definitions
export interface ComponentDefinition {
  /** The component class */
  component: CustomElementConstructor;
  /** The tag name to use when registering the component */
  tagName: string;
  /** Whether the component should be registered with a prefix */
  usePrefix?: boolean;
}

// Registry to keep track of all components
class ComponentRegistry {
  private _components: Map<string, ComponentDefinition> = new Map();
  private _prefix: string = 'darkglow';
  private _registeredComponents: Set<string> = new Set();

  /**
   * Register a component with the registry
   * @param name The name of the component (used as key in the registry)
   * @param definition The component definition
   */
  register(name: string, definition: ComponentDefinition): void {
    this._components.set(name, definition);
  }

  /**
   * Register multiple components at once
   * @param components Map of component names to definitions
   */
  registerBulk(components: Record<string, ComponentDefinition>): void {
    Object.entries(components).forEach(([name, definition]) => {
      this.register(name, definition);
    });
  }

  /**
   * Define all registered components with the CustomElements registry
   * @param prefix Optional prefix to use for component tag names
   */
  defineAll(prefix?: string): void {
    if (prefix) {
      this._prefix = prefix;
    }

    this._components.forEach((definition, name) => {
      const finalTagName = definition.usePrefix !== false 
        ? `${this._prefix}-${definition.tagName}`
        : definition.tagName;
      
      // Only register if not already registered
      if (!this._registeredComponents.has(finalTagName)) {
        customElements.define(finalTagName, definition.component);
        this._registeredComponents.add(finalTagName);
      }
    });
  }

  /**
   * Get a component definition by name
   * @param name The name of the component
   */
  getComponent(name: string): ComponentDefinition | undefined {
    return this._components.get(name);
  }

  /**
   * Get all registered component definitions
   */
  getAllComponents(): Map<string, ComponentDefinition> {
    return new Map(this._components);
  }

  /**
   * Get the current prefix
   */
  getPrefix(): string {
    return this._prefix;
  }
}

// Export a singleton instance
export const componentRegistry = new ComponentRegistry();