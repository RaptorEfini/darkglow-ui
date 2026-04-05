import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { DarkglowElement } from '@base/DarkglowElement';
import '@atoms/modal';
import styles from './styles';

class AlertComponent extends DarkglowElement {
  static styles = styles;

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: String, reflect: true })
  title = 'Alert';

  @property({ type: String, reflect: true })
  message = '';

  @property({ type: String, reflect: true })
  confirmText = 'Confirm';

  @property({ type: String, reflect: true })
  cancelText = 'Cancel';

  @property({ type: Boolean, attribute: 'show-cancel', reflect: true })
  showCancel = false;

  @property({ type: String, reflect: true })
  variant = 'primary';

  @property({ type: String, reflect: true })
  eyebrow = 'Priority Signal';

  @property({ type: String, reflect: true })
  icon = '!';

  private handleClose(event: CustomEvent<{ reason: string }>) {
    this.open = false;
    this.emit('close', event.detail);
    this.emit('open-change', { open: this.open, reason: event.detail.reason });
  }

  private handleConfirm() {
    this.open = false;
    this.emit('confirm', { value: true });
    this.emit('open-change', { open: this.open, reason: 'confirm' });
  }

  private handleCancel() {
    this.open = false;
    this.emit('cancel', { value: false });
    this.emit('open-change', { open: this.open, reason: 'cancel' });
  }

  render() {
    return html`
      <darkglow-modal
        ?open=${this.open}
        .title=${this.title}
        .eyebrow=${this.eyebrow}
        .variant=${this.variant}
        ?hide-close=${false}
        @close=${this.handleClose}
      >
        <div class="alert">
          <div class="icon" aria-hidden="true">${this.icon}</div>
          <p class="message">${this.message}</p>
          <div class="actions" slot="footer">
            ${this.showCancel
              ? html`
                  <button class="btn cancel" type="button" @click=${this.handleCancel}>
                    ${this.cancelText}
                  </button>
                `
              : null}
            <button class="btn confirm" type="button" @click=${this.handleConfirm}>
              ${this.confirmText}
            </button>
          </div>
        </div>
      </darkglow-modal>
    `;
  }
}

export default AlertComponent;
