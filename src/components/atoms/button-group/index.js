import styles from './styles.css?inline';
class ButtonGroupComponent extends HTMLElement {
    static get observedAttributes() {
        return ['orientation', 'align'];
    }
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }
    /*  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue !== newValue) {
          this.render();
        }
      }*/
    get orientation() {
        return this.getAttribute('orientation') || 'horizontal';
    }
    get align() {
        return this.getAttribute('align') || 'center';
    }
    render() {
        if (!this.shadowRoot)
            return;
        // Determine alignment based on orientation
        let justifyContent; // Default
        let alignItems;
        switch (this.align) {
            case 'start':
                justifyContent = 'flex-start';
                alignItems = 'flex-start';
                break;
            case 'end':
                justifyContent = 'flex-end';
                alignItems = 'flex-end';
                break;
            case 'center':
            default:
                justifyContent = 'center';
                alignItems = 'center';
                break;
        }
        console.log(alignItems);
        // Dynamic styles that depend on component properties
        const dynamicStyles = `
      .button-group {
        flex-direction: ${this.orientation === 'vertical' ? 'column' : 'row'};
        ${this.orientation === 'vertical'
            ? `align-items: ${justifyContent};`
            : `justify-content: ${justifyContent};`}
      }
    `;
        this.shadowRoot.innerHTML = `
      <style>
        ${styles}
        ${dynamicStyles}
      </style>
      <div class="button-group ${this.orientation}">
        <slot></slot>
      </div>
    `;
    }
}
export default ButtonGroupComponent;
