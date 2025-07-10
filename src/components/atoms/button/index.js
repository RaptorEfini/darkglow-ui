import styles from './styles.css?inline';
class ButtonComponent extends HTMLElement {
    static get observedAttributes() {
        return ['variant', 'disabled'];
    }
    constructor() {
        super();
        Object.defineProperty(this, "handleClick", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (event) => {
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
        });
        this.attachShadow({ mode: 'open' });
        this.render();
    }
    connectedCallback() {
        this.addEventListener('click', this.handleClick);
    }
    disconnectedCallback() {
        this.removeEventListener('click', this.handleClick);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }
    get variant() {
        return this.getAttribute('variant') || 'primary';
    }
    get disabled() {
        return this.hasAttribute('disabled');
    }
    render() {
        if (!this.shadowRoot)
            return;
        this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <button class="button ${this.variant}" ${this.disabled ? 'disabled' : ''}>
        <slot></slot>
      </button>
    `;
    }
}
export default ButtonComponent;
