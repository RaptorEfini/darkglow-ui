import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { DarkglowElement } from '@base/DarkglowElement';
import styles from './styles';

class TextareaComponent extends DarkglowElement {
  static styles = styles;

  @property({ type: String, reflect: true })
  value = '';

  @property({ type: String, reflect: true })
  placeholder = '';

  @property({ type: String, reflect: true })
  name = '';

  @property({ type: Number, reflect: true })
  rows = 5;

  @property({ type: String, reflect: true })
  variant = 'primary';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  readonly = false;

  @property({ type: Boolean, reflect: true })
  invalid = false;

  private handleInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.value = target.value;
    this.emit('input', { value: this.value });
  }

  private handleChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.value = target.value;
    this.emit('change', { value: this.value });
  }

  render() {
    return html`
      <div class="textarea-shell">
        <textarea
          class="textarea"
          .value=${this.value}
          placeholder=${this.placeholder}
          name=${this.name}
          rows=${this.rows}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          aria-invalid=${this.invalid ? 'true' : 'false'}
          @input=${this.handleInput}
          @change=${this.handleChange}
        ></textarea>
      </div>
    `;
  }
}

export default TextareaComponent;
