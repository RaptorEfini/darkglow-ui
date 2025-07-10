import styles from './styles.css?inline';
class TypographyComponent extends HTMLElement {
    static get observedAttributes() {
        return ['variant', 'type', 'light-off'];
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
    get type() {
        return this.getAttribute('type') || 'text';
    }
    get lightOff() {
        return this.hasAttribute('light-off');
    }
    render() {
        if (!this.shadowRoot)
            return;
        // Determine the HTML element based on type
        let element = 'p';
        if (this.type === 'title')
            element = 'h1';
        else if (this.type === 'subtitle')
            element = 'h2';
        this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <${element} class="typography ${this.type} ${this.variant} ${this.lightOff ? 'light-off' : ''}">
        <slot></slot>
      </${element}>
    `;
    }
}
export default TypographyComponent;
