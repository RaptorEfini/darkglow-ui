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
      }

      .content {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
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
