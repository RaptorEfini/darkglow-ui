import { html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { DarkglowElement } from '@base/DarkglowElement';
import styles from './styles';

class ModalComponent extends DarkglowElement {
  static styles = styles;

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: String, reflect: true })
  title = '';

  @property({ type: String, reflect: true })
  eyebrow = 'System Notice';

  @property({ type: String, reflect: true })
  variant = 'primary';

  @property({ type: Boolean, attribute: 'close-on-backdrop', reflect: true })
  closeOnBackdrop = true;

  @property({ type: Boolean, attribute: 'close-on-escape', reflect: true })
  closeOnEscape = true;

  @property({ type: Boolean, attribute: 'hide-close', reflect: true })
  hideClose = false;

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('keydown', this.handleDocumentKeydown);
  }

  disconnectedCallback() {
    document.removeEventListener('keydown', this.handleDocumentKeydown);
    super.disconnectedCallback();
  }

  private close(reason: 'backdrop' | 'escape' | 'close-button') {
    if (!this.open) {
      return;
    }

    this.open = false;
    this.emit('close', { reason });
    this.emit('open-change', { open: this.open, reason });
  }

  private handleDocumentKeydown = (event: KeyboardEvent) => {
    if (!this.open || !this.closeOnEscape || event.key !== 'Escape') {
      return;
    }

    event.preventDefault();
    this.close('escape');
  };

  private handleOverlayClick(event: MouseEvent) {
    if (!this.closeOnBackdrop || event.target !== event.currentTarget) {
      return;
    }

    this.close('backdrop');
  }

  private handleCloseClick() {
    this.close('close-button');
  }

  render() {
    if (!this.open) {
      return nothing;
    }

    return html`
      <div
        class="overlay"
        role="presentation"
        @click=${this.handleOverlayClick}
      >
        <div
          class="panel"
          role="dialog"
          aria-modal="true"
          aria-label=${this.title || this.eyebrow}
        >
          <div class="content">
            <div class="header">
              <div class="title-wrap">
                ${this.eyebrow ? html`<div class="eyebrow">${this.eyebrow}</div>` : nothing}
                ${this.title ? html`<h2 class="title">${this.title}</h2>` : html`<slot name="title"></slot>`}
              </div>

              ${this.hideClose
                ? nothing
                : html`
                    <button
                      class="close"
                      type="button"
                      aria-label="Close dialog"
                      @click=${this.handleCloseClick}
                    >
                      X
                    </button>
                  `}
            </div>

            <div class="body">
              <slot></slot>
            </div>

            <div class="footer">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

export default ModalComponent;
