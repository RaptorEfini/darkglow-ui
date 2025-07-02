class CardComponent extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'elevated'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  get variant() {
    return this.getAttribute('variant') || 'default';
  }

  get elevated() {
    return this.hasAttribute('elevated');
  }

  render() {
    if (!this.shadowRoot) return;

    const styles = `
      :host {
        display: block;
        width: 100%;
      }

      .card {
        background-color: var(--color-darker);
        border-radius: var(--border-radius);
        padding: var(--spacing-md);
        margin: var(--spacing-sm) 0;
        color: var(--color-white);
        transition: all 0.3s ease;
        ${this.elevated ? 'box-shadow: var(--shadow-lg);' : 'box-shadow: var(--shadow-sm);'}
      }

      .card:hover {
        ${this.elevated ? 'box-shadow: var(--shadow-xl);' : 'box-shadow: var(--shadow-md);'}
      }

      .card-content {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
      }

      /* Variant styles */
      .default {
        border: 1px solid var(--color-gray-dark);
      }

      .primary {
        border-left: 4px solid var(--color-primary);
      }

      .secondary {
        border-left: 4px solid var(--color-secondary);
      }

      .danger {
        border-left: 4px solid var(--color-danger);
      }

      .outlined {
        background-color: transparent;
        border: 1px solid var(--color-primary);
      }

      /* Style for slotted elements */
      ::slotted(h1), ::slotted(h2), ::slotted(h3) {
        margin-top: 0;
        color: var(--color-white);
      }

      ::slotted(p) {
        margin: 0;
        color: var(--color-gray-light);
      }
    `;

    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="card ${this.variant}">
        <div class="card-content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

export default CardComponent;
