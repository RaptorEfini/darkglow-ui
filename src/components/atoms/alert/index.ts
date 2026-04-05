import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { DarkglowElement } from '@base/DarkglowElement';
import { componentRegistry } from '@components/registry';
import '@atoms/modal';
import styles from './styles';

export interface AlertOpenOptions {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  variant?: 'primary' | 'secondary' | 'accent' | 'danger';
  eyebrow?: string;
  icon?: string;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  hideClose?: boolean;
}

export interface AlertResult {
  isConfirmed: boolean;
  isDismissed: boolean;
  action: 'confirm' | 'cancel' | 'close';
  reason: 'confirm' | 'cancel' | 'backdrop' | 'escape' | 'close-button';
}

class AlertComponent extends DarkglowElement {
  static styles = styles;

  static open(options: AlertOpenOptions = {}) {
    componentRegistry.defineAll(componentRegistry.getPrefix());
    const tagName = componentRegistry.resolveTagName('alert');

    if (!tagName) {
      return Promise.reject(new Error('Alert component is not registered.'));
    }

    const element = document.createElement(tagName) as AlertComponent;
    Object.assign(element, {
      ...options,
      open: true
    });

    return new Promise<AlertResult>((resolve) => {
      const cleanup = (result: AlertResult) => {
        element.removeEventListener('confirm', handleConfirm as EventListener);
        element.removeEventListener('cancel', handleCancel as EventListener);
        element.removeEventListener('close', handleClose as EventListener);
        element.remove();
        resolve(result);
      };

      const handleConfirm = () => {
        cleanup({
          isConfirmed: true,
          isDismissed: false,
          action: 'confirm',
          reason: 'confirm'
        });
      };

      const handleCancel = () => {
        cleanup({
          isConfirmed: false,
          isDismissed: true,
          action: 'cancel',
          reason: 'cancel'
        });
      };

      const handleClose = (event: CustomEvent<{ reason: AlertResult['reason'] }>) => {
        cleanup({
          isConfirmed: false,
          isDismissed: true,
          action: 'close',
          reason: event.detail.reason
        });
      };

      element.addEventListener('confirm', handleConfirm as EventListener, { once: true });
      element.addEventListener('cancel', handleCancel as EventListener, { once: true });
      element.addEventListener('close', handleClose as EventListener, { once: true });
      document.body.appendChild(element);
    });
  }

  static success(options: AlertOpenOptions = {}) {
    return this.open({
      confirmText: 'OK',
      eyebrow: 'Status Update',
      icon: 'OK',
      variant: 'secondary',
      ...options
    });
  }

  static error(options: AlertOpenOptions = {}) {
    return this.open({
      confirmText: 'Understood',
      eyebrow: 'Critical Alert',
      icon: '!',
      variant: 'danger',
      ...options
    });
  }

  static confirm(options: AlertOpenOptions = {}) {
    return this.open({
      cancelText: 'Cancel',
      confirmText: 'Confirm',
      eyebrow: 'Confirmation Required',
      icon: '?',
      showCancel: true,
      variant: 'accent',
      ...options
    });
  }

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

  @property({ type: Boolean, attribute: 'close-on-backdrop', reflect: true })
  closeOnBackdrop = true;

  @property({ type: Boolean, attribute: 'close-on-escape', reflect: true })
  closeOnEscape = true;

  @property({ type: Boolean, attribute: 'hide-close', reflect: true })
  hideClose = false;

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
        ?close-on-backdrop=${this.closeOnBackdrop}
        ?close-on-escape=${this.closeOnEscape}
        ?hide-close=${this.hideClose}
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
