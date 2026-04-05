import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { DarkglowElement } from '@base/DarkglowElement';
import styles from './styles';

class ButtonComponent extends DarkglowElement {
  static styles = styles;

  @property({ type: String, reflect: true })
  variant = 'primary';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  private handleClick(event: MouseEvent) {
    if (!this.disabled) {
      return;
    }

    event.preventDefault();
    event.stopImmediatePropagation();
  }

  render() {
    return html`
      <button
        class="button ${this.variant}"
        ?disabled=${this.disabled}
        @click=${this.handleClick}
      >
        <slot></slot>
      </button>
    `;
  }
}

export default ButtonComponent;
