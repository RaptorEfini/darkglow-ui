import styles from './styles.css?inline';
class CardComponent extends HTMLElement {
    static get observedAttributes() {
        return ['variant', 'elevated'];
    }
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }
    attributeChangedCallback(name, oldValue, newValue) {
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
        if (!this.shadowRoot)
            return;
        // Dynamic styles that depend on component properties
        const dynamicStyles = `
      .card {
        ${this.elevated ? 'box-shadow: var(--shadow-lg);' : 'box-shadow: var(--shadow-sm);'}
      }
      
      .card:hover {
        ${this.elevated ? 'box-shadow: var(--shadow-xl);' : 'box-shadow: var(--shadow-md);'}
      }
    `;
        this.shadowRoot.innerHTML = `
      <style>
        ${styles}
        ${dynamicStyles}
      </style>
      <div class="card ${this.variant}">
        <div class="card-content">
          <slot></slot>
        </div>
      </div>
    `;
    }
}
export default CardComponent;
