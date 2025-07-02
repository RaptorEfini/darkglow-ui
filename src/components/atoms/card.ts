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
        background-color: #1a1a1a;
        border-radius: 8px;
        padding: 1.5rem;
        margin: 1rem 0;
        color: #ffffff;
        transition: all 0.3s ease;
        ${this.elevated ? 'box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);' : 'box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);'}
      }

      .card:hover {
        ${this.elevated ? 'box-shadow: 0 12px 24px rgba(0, 0, 0, 0.5);' : 'box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);'}
      }

      .card-content {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      /* Variant styles */
      .default {
        border: 1px solid #333;
      }

      .primary {
        border-left: 4px solid #3498db;
      }

      .secondary {
        border-left: 4px solid #2ecc71;
      }

      .danger {
        border-left: 4px solid #e74c3c;
      }

      .outlined {
        background-color: transparent;
        border: 1px solid #3498db;
      }

      /* Style for slotted elements */
      ::slotted(h1), ::slotted(h2), ::slotted(h3) {
        margin-top: 0;
        color: #ffffff;
      }

      ::slotted(p) {
        margin: 0;
        color: #cccccc;
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