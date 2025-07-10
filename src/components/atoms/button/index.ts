import styles from './styles.css?inline';

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

    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <button class="button ${this.variant}" ${this.disabled ? 'disabled' : ''}>
        <slot></slot>
      </button>
    `;
  }
}

export default ButtonComponent;