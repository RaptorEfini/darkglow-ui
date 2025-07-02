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
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
        transition: all 0.3s ease;
        outline: none;
      }

      .button:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }

      .button:active:not(:disabled) {
        transform: translateY(0);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      .primary {
        background-color: #3498db;
        color: white;
      }

      .secondary {
        background-color: #2ecc71;
        color: white;
      }

      .danger {
        background-color: #e74c3c;
        color: white;
      }

      .ghost {
        background-color: transparent;
        color: #3498db;
        border: 1px solid #3498db;
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
