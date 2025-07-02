class TypographyComponent extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'type', 'light-off'];
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

  get type() {
    return this.getAttribute('type') || 'text';
  }

  get lightOff() {
    return this.hasAttribute('light-off');
  }

  render() {
    if (!this.shadowRoot) return;

    const styles = `
      :host {
        display: block;
      }

      .typography {
        margin: var(--spacing-xs) 0;
        transition: all 0.3s ease;
        position: relative;
      }

      /* Type styles */
      .title {
        font-family: "Orbitron", sans-serif;
        font-size: 2rem;
        font-weight: 700;
        letter-spacing: 1px;
        color: var(--color-primary);
        text-shadow: var(--color-primary-glow);
      }

      .subtitle {
        font-family: "Orbitron", sans-serif;
        font-size: 1.5rem;
        font-weight: 600;
        letter-spacing: 0.5px;
        color: var(--color-secondary);
        text-shadow: var(--color-secondary-glow);
      }

      .text {
        font-family: "Raleway", sans-serif;
        font-size: 1rem;
        font-weight: 300;
        color: var(--color-white-muted);
        line-height: 1.5;
      }

      /* Variant styles */
      .primary {
        color: var(--color-primary);
        text-shadow: var(--color-primary-glow);
      }

      .secondary {
        color: var(--color-secondary);
        text-shadow: var(--color-secondary-glow);
      }

      .danger {
        color: var(--color-danger);
        text-shadow: var(--color-danger-glow);
      }

      .accent {
        color: var(--color-accent);
        text-shadow: var(--color-accent-glow);
      }

      /* Light off (disabled) state */
      .light-off {
        opacity: 0.5;
        text-shadow: none;
        color: var(--color-gray-light);
        filter: grayscale(80%);
      }

      .light-off.title, .light-off.subtitle {
        text-shadow: 0 0 2px rgba(255, 255, 255, 0.3);
      }

      /* Hover effects for interactive typography */
      .typography:not(.light-off):hover {
        transform: translateY(-1px);
      }

      .title:not(.light-off):hover, .subtitle:not(.light-off):hover {
        text-shadow: 0 0 15px currentColor;
      }
    `;

    // Determine the HTML element based on type
    let element = 'p';
    if (this.type === 'title') element = 'h1';
    else if (this.type === 'subtitle') element = 'h2';

    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <${element} class="typography ${this.type} ${this.variant} ${this.lightOff ? 'light-off' : ''}">
        <slot></slot>
      </${element}>
    `;
  }
}

export default TypographyComponent;