import { css, html } from 'lit';
import { property } from 'lit/decorators.js';
import { DarkglowElement } from '@base/DarkglowElement';
import styles from './styles';

class PadComponent extends DarkglowElement {
  static styles = [
    styles,
    css`
      .pad {
        cursor: pointer;
      }

      .pad.disabled {
        cursor: not-allowed;
      }
    `
  ];

  @property({ type: Number, reflect: true })
  number: number | null = null;

  @property({ type: String, reflect: true })
  variant = 'primary';

  @property({ type: Boolean, reflect: true })
  active = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String, reflect: true })
  size = 'default';

  private pressed = false;

  private handleClick() {
    if (this.disabled) {
      return;
    }
  }

  private handlePressStart() {
    if (!this.disabled) {
      this.pressed = true;
      this.requestUpdate();
    }
  }

  private handlePressEnd() {
    if (this.pressed) {
      this.pressed = false;
      this.requestUpdate();
    }
  }

  render() {
    return html`
      <div class="pad-container">
        <button
          class="pad ${this.variant} ${this.active ? 'active' : ''} ${this.disabled ? 'disabled' : ''} ${this.pressed ? 'pressed' : ''}"
          type="button"
          ?disabled=${this.disabled}
          @click=${this.handleClick}
          @mousedown=${this.handlePressStart}
          @mouseup=${this.handlePressEnd}
          @mouseleave=${this.handlePressEnd}
        >
          <div class="number" ?hidden=${this.number === null}>${this.number ?? ''}</div>
        </button>
        <div class="label"><slot></slot></div>
      </div>
    `;
  }
}

export default PadComponent;
