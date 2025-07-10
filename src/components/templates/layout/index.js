import styles from './styles.css?inline';
class LayoutComponent extends HTMLElement {
    static get observedAttributes() {
        return ['title'];
    }
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }
    /*
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
      if (oldValue !== newValue) {
        if (name === 'title') {
          // Update the document title
          document.title = newValue || 'Darkglow UI';
          // Remove the title attribute to prevent tooltip on hover
          this.removeAttribute('title');
        } else {
          this.render();
        }
      }
    }
    */
    get title() {
        return this.getAttribute('title') || 'Darkglow UI';
    }
    render() {
        if (!this.shadowRoot)
            return;
        this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <header>
        <div class="header-content">
          <slot name="header"></slot>
        </div>
      </header>
      <main>
        <slot></slot>
      </main>
      <footer>
        <div class="footer-content">
          <slot name="footer"></slot>
        </div>
      </footer>
    `;
        // Update the document title
        document.title = this.title;
        // Remove the title attribute from the host element to prevent tooltip on hover
        this.removeAttribute('title');
    }
}
export default LayoutComponent;
