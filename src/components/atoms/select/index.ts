import { html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { DarkglowElement } from '@base/DarkglowElement';
import styles from './styles';

interface SelectOption {
  label: string;
  value: string;
  disabled: boolean;
  selected: boolean;
}

class SelectComponent extends DarkglowElement {
  static styles = styles;

  @property({ type: String, reflect: true })
  value = '';

  @property({ type: String, reflect: true })
  name = '';

  @property({ type: String, reflect: true })
  variant = 'secondary';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  invalid = false;

  @state()
  private options: SelectOption[] = [];

  private observer?: MutationObserver;

  connectedCallback() {
    super.connectedCallback();
    this.syncOptions();
    this.observer = new MutationObserver(() => this.syncOptions());
    this.observer.observe(this, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['value', 'label', 'disabled', 'selected']
    });
  }

  disconnectedCallback() {
    this.observer?.disconnect();
    super.disconnectedCallback();
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('value')) {
      this.syncOptions();
    }
  }

  private syncOptions() {
    const optionElements = Array.from(this.querySelectorAll('option'));
    const options = optionElements.map((option) => ({
      label: option.label || option.textContent?.trim() || option.value,
      value: option.value,
      disabled: option.disabled,
      selected: this.value
        ? option.value === this.value
        : option.selected
    }));

    const selectedOption = options.find((option) => option.selected);
    if (!this.value && selectedOption) {
      this.value = selectedOption.value;
      return;
    }

    this.options = options;
  }

  private handleChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.value = target.value;
    this.emit('change', { value: this.value });
  }

  render() {
    return html`
      <div class="select-shell">
        <select
          class="select"
          .value=${this.value}
          name=${this.name}
          ?disabled=${this.disabled}
          aria-invalid=${this.invalid ? 'true' : 'false'}
          @change=${this.handleChange}
        >
          ${this.options.map(
            (option) => html`
              <option
                value=${option.value}
                ?disabled=${option.disabled}
                ?selected=${option.selected}
              >
                ${option.label}
              </option>
            `
          )}
        </select>
        <span class="arrow" aria-hidden="true"></span>
      </div>
    `;
  }
}

export default SelectComponent;
