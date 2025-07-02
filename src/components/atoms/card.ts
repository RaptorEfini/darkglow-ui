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
        position: relative;
        overflow: hidden;
        backdrop-filter: blur(5px);
        ${this.elevated ? 'box-shadow: var(--shadow-lg);' : 'box-shadow: var(--shadow-sm);'}
      }

      .card:hover {
        ${this.elevated ? 'box-shadow: var(--shadow-xl);' : 'box-shadow: var(--shadow-md);'}
        transform: translateY(-3px);
      }

      .card-content {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
        position: relative;
        z-index: 1;
      }

      /* Variant styles with synthwave effects */
      .default {
        border: 1px solid var(--color-gray-dark);
        box-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
      }

      .primary {
        border: 1px solid var(--color-primary);
        box-shadow: 0 0 10px rgba(255, 0, 255, 0.3);
      }

      .primary::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 100%;
        background-color: var(--color-primary);
        box-shadow: var(--color-primary-glow);
      }

      .secondary {
        border: 1px solid var(--color-secondary);
        box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
      }

      .secondary::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 100%;
        background-color: var(--color-secondary);
        box-shadow: var(--color-secondary-glow);
      }

      .danger {
        border: 1px solid var(--color-danger);
        box-shadow: 0 0 10px rgba(255, 43, 109, 0.3);
      }

      .danger::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 100%;
        background-color: var(--color-danger);
        box-shadow: var(--color-danger-glow);
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
