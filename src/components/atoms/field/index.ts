import { html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { DarkglowElement } from '@base/DarkglowElement';
import styles from './styles';

class FieldComponent extends DarkglowElement {
  static styles = styles;

  @property({ type: String, reflect: true })
  label = '';

  @property({ type: String, reflect: true })
  hint = '';

  @property({ type: String, reflect: true })
  error = '';

  @property({ type: Boolean, reflect: true })
  required = false;

  @property({ type: Boolean, reflect: true })
  invalid = false;

  render() {
    const showFooter = this.error || this.hint;

    return html`
      <div class="field">
        ${this.label
          ? html`
              <div class="field-header">
                <label class="label">
                  ${this.label}
                  ${this.required ? html`<span class="required">*</span>` : nothing}
                </label>
                <slot name="label-meta"></slot>
              </div>
            `
          : nothing}

        <div class="control">
          <slot></slot>
        </div>

        ${showFooter
          ? html`
              <div class="field-footer">
                ${this.error ? html`<p class="error">${this.error}</p>` : html`<p class="hint">${this.hint}</p>`}
                <slot name="hint-meta"></slot>
              </div>
            `
          : nothing}
      </div>
    `;
  }
}

export default FieldComponent;
