class GridComponent extends HTMLElement {
  static get observedAttributes() {
    return ['columns', 'gap', 'max-width', 'align', 'variant'];
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

  get columns() {
    return this.getAttribute('columns') || '4';
  }

  get gap() {
    return this.getAttribute('gap') || '10px';
  }

  get maxWidth() {
    return this.getAttribute('max-width') || 'none';
  }

  get align() {
    return this.getAttribute('align') || 'center';
  }

  get variant() {
    return this.getAttribute('variant') || 'default';
  }

  render() {
    if (!this.shadowRoot) return;

    // Determine alignment
    let justifyItems;
    let justifyContent;

    switch (this.align) {
      case 'start':
        justifyItems = 'start';
        justifyContent = 'flex-start';
        break;
      case 'end':
        justifyItems = 'end';
        justifyContent = 'flex-end';
        break;
      case 'center':
      default:
        justifyItems = 'center';
        justifyContent = 'center';
        break;
    }

    // Determine background and border based on variant
    let background = 'transparent';
    let border = 'none';
    let boxShadow = 'none';

    switch (this.variant) {
      case 'primary':
        background = 'rgba(13, 2, 33, 0.7)';
        border = '1px solid var(--color-primary)';
        boxShadow = '0 0 10px rgba(0, 128, 255, 0.3)';
        break;
      case 'secondary':
        background = 'rgba(13, 2, 33, 0.7)';
        border = '1px solid var(--color-secondary)';
        boxShadow = '0 0 10px rgba(0, 255, 255, 0.3)';
        break;
      case 'danger':
        background = 'rgba(13, 2, 33, 0.7)';
        border = '1px solid var(--color-danger)';
        boxShadow = '0 0 10px rgba(255, 0, 0, 0.3)';
        break;
      case 'accent':
        background = 'rgba(13, 2, 33, 0.7)';
        border = '1px solid var(--color-accent)';
        boxShadow = '0 0 10px rgba(255, 0, 255, 0.3)';
        break;
      case 'outlined':
        background = 'transparent';
        border = '1px solid var(--color-border)';
        break;
      case 'default':
      default:
        background = 'rgba(13, 2, 33, 0.7)';
        break;
    }

    const styles = `
      :host {
        display: block;
        width: 100%;
      }

      .grid-container {
        display: grid;
        grid-template-columns: repeat(${this.columns}, 1fr);
        gap: ${this.gap};
        max-width: ${this.maxWidth};
        margin: var(--spacing-md) auto;
        justify-items: ${justifyItems};
        justify-content: ${justifyContent};
        padding: var(--spacing-sm);
        background: ${background};
        border: ${border};
        box-shadow: ${boxShadow};
        border-radius: var(--border-radius);
        position: relative;
        backdrop-filter: blur(5px);
      }

      /* Style for slotted elements */
      ::slotted(*) {
        transition: transform 0.2s ease, filter 0.2s ease;
      }

      ::slotted(*:hover) {
        transform: translateY(-2px);
        filter: brightness(1.2);
      }
    `;

    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="grid-container">
        <slot></slot>
      </div>
    `;
  }
}

export default GridComponent;