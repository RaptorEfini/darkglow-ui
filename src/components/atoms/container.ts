class ContainerComponent extends HTMLElement {
  static get observedAttributes() {
    return [];
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

  render() {
    if (!this.shadowRoot) return;

    const styles = `
      :host {
        display: block;
        width: 100%;
      }

      .container {
        margin: var(--spacing-lg) auto;
        max-width: 800px;
        padding: var(--spacing-sm);
        background-color: var(--color-dark);
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-md);
        overflow-x: auto;
        position: relative;
        border: 1px solid var(--color-secondary);
        box-shadow: 0 0 15px rgba(0, 255, 255, 0.2);
      }

      .container::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(90deg, transparent, var(--color-secondary), transparent);
        animation: neon-scan 3s ease-in-out infinite;
      }

      @keyframes neon-scan {
        0%, 100% {
          opacity: 0;
          transform: translateY(0);
        }
        50% {
          opacity: 1;
          transform: translateY(calc(100% - 2px));
        }
      }

      .content {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
        position: relative;
        z-index: 1;
      }

      /* Style for button rows inside the container */
      ::slotted(.button-row) {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-sm);
        padding-top: var(--spacing-sm);
        padding-bottom: var(--spacing-sm);
        justify-content: center;
      }
    `;

    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="container">
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

export default ContainerComponent;
