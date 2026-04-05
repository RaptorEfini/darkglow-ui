import { css, html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { property } from 'lit/decorators.js';
import { DarkglowElement } from '@base/DarkglowElement';
import styles from './styles';

class CardComponent extends DarkglowElement {
  static styles = [
    styles,
    css`
      .card {
        box-shadow: var(--card-shadow, var(--shadow-sm));
      }

      .card:hover {
        box-shadow: var(--card-hover-shadow, var(--shadow-md));
      }
    `
  ];

  @property({ type: String, reflect: true })
  variant = 'default';

  @property({ type: Boolean, reflect: true })
  elevated = false;

  private getShadowStyles() {
    return {
      '--card-shadow': this.elevated ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
      '--card-hover-shadow': this.elevated ? 'var(--shadow-xl)' : 'var(--shadow-md)'
    };
  }

  render() {
    return html`
      <div class="card ${this.variant}" style=${styleMap(this.getShadowStyles())}>
        <div class="card-content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

export default CardComponent;
