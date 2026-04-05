import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { property } from 'lit/decorators.js';
import { DarkglowElement } from '@base/DarkglowElement';
import styles from './styles';

interface RgbValue {
  r: number;
  g: number;
  b: number;
}

class ColorInputComponent extends DarkglowElement {
  static styles = styles;

  @property({ type: String, reflect: true })
  value = '#ff00ff';

  @property({ type: String, reflect: true })
  name = '';

  @property({ type: String, reflect: true })
  label = 'RGB';

  @property({ type: String, reflect: true })
  variant = 'primary';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  private normalizeHex(value: string) {
    const normalized = value.trim().toLowerCase();
    if (/^#[0-9a-f]{6}$/.test(normalized)) {
      return normalized;
    }

    if (/^#[0-9a-f]{3}$/.test(normalized)) {
      const [, r, g, b] = normalized;
      return `#${r}${r}${g}${g}${b}${b}`;
    }

    return '#ff00ff';
  }

  private hexToRgb(value: string): RgbValue {
    const hex = this.normalizeHex(value).slice(1);

    return {
      r: Number.parseInt(hex.slice(0, 2), 16),
      g: Number.parseInt(hex.slice(2, 4), 16),
      b: Number.parseInt(hex.slice(4, 6), 16)
    };
  }

  private emitColor(eventName: 'input' | 'change') {
    this.emit(eventName, {
      value: this.value,
      rgb: this.hexToRgb(this.value)
    });
  }

  private handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = this.normalizeHex(target.value);
    this.emitColor('input');
  }

  private handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = this.normalizeHex(target.value);
    this.emitColor('change');
  }

  render() {
    const color = this.normalizeHex(this.value);
    const rgb = this.hexToRgb(color);

    return html`
      <div
        class="color-input"
        style=${styleMap({
          '--current-color': color
        })}
      >
        <input
          class="picker"
          type="color"
          .value=${color}
          name=${this.name}
          ?disabled=${this.disabled}
          aria-label=${this.label}
          @input=${this.handleInput}
          @change=${this.handleChange}
        />

        <div class="info">
          <div class="eyebrow">${this.label}</div>
          <div class="value">rgb(${rgb.r}, ${rgb.g}, ${rgb.b})</div>
          <div class="channels">
            <span class="channel">R ${rgb.r}</span>
            <span class="channel">G ${rgb.g}</span>
            <span class="channel">B ${rgb.b}</span>
          </div>
        </div>
      </div>
    `;
  }
}

export default ColorInputComponent;
