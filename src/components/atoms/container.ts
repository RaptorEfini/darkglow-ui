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
        margin: 2rem auto;
        max-width: 800px;
        padding: 1rem;
        background-color: #111;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        overflow-x: auto;
      }

      .content {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      /* Style for button rows inside the container */
      ::slotted(.button-row) {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        padding-top: 1rem;
        padding-bottom: 1rem;
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
