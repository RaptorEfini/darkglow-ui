import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { DarkglowElement } from '@base/DarkglowElement';
import styles from './styles';

class LayoutComponent extends DarkglowElement {
  static styles = styles;

  @property({ type: String, attribute: 'title', reflect: true })
  pageTitle = 'Darkglow UI';

  protected updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('pageTitle')) {
      document.title = this.pageTitle || 'Darkglow UI';
    }
  }

  connectedCallback() {
    super.connectedCallback();
    document.title = this.pageTitle || 'Darkglow UI';
  }

  render() {
    return html`
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
  }
}

export default LayoutComponent;
