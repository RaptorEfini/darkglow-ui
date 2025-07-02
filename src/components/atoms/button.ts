class ButtonComponent extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'disabled'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  connectedCallback() {
    this.addEventListener('click', this.handleClick);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.handleClick);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  handleClick = (event: Event) => {
    if (this.disabled) {
      event.preventDefault();
      return;
    }

    // Dispatch a custom event that can be listened to
    this.dispatchEvent(new CustomEvent('button-click', {
      bubbles: true,
      composed: true
    }));
  }

  get variant() {
    return this.getAttribute('variant') || 'primary';
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  render() {
    if (!this.shadowRoot) return;

    const styles = `
      :host {
        display: inline-block;
      }

      .button {
        font-family: "Raleway", sans-serif;
        padding: var(--spacing-xs) var(--spacing-sm);
        border: none;
        border-radius: var(--border-radius);
        cursor: pointer;
        font-size: 16px;
        transition: all 0.3s ease;
        outline: none;
      }

      .button:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: var(--shadow-sm);
      }

      .button:active:not(:disabled) {
        transform: translateY(0);
        box-shadow: var(--shadow-sm);
      }

      .button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      .primary {
        background-color: var(--color-primary);
        color: var(--color-white);
      }

      .secondary {
        background-color: var(--color-secondary);
        color: var(--color-white);
      }

      .danger {
        background-color: var(--color-danger);
        color: var(--color-white);
      }

      .ghost {
        background-color: transparent;
        color: var(--color-primary);
        border: 1px solid var(--color-primary);
      }
    `;

    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <button class="button ${this.variant}" ${this.disabled ? 'disabled' : ''}>
        <slot></slot>
      </button>
    `;
  }
}

export default ButtonComponent;
