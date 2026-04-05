import { css, html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { property } from 'lit/decorators.js';
import { DarkglowElement } from '@base/DarkglowElement';
import styles from './styles';

class KnobComponent extends DarkglowElement {
  static styles = [
    styles,
    css`
      .knob {
        cursor: pointer;
      }

      .knob.disabled {
        cursor: not-allowed;
      }
    `
  ];

  @property({ type: Number, reflect: true })
  value = 50;

  @property({ type: Number, reflect: true })
  min = 0;

  @property({ type: Number, reflect: true })
  max = 100;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String, reflect: true })
  variant = 'primary';

  @property({ type: Number })
  sensitivity = 1;

  private isDragging = false;
  private startY = 0;

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  }

  disconnectedCallback() {
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
    super.disconnectedCallback();
  }

  private clamp(nextValue: number) {
    return Math.min(Math.max(nextValue, this.min), this.max);
  }

  private updateValue(nextValue: number, eventName: 'input' | 'change') {
    const clamped = this.clamp(nextValue);
    if (clamped === this.value) {
      return;
    }
    this.value = clamped;
    this.emit(eventName, { value: this.value });
  }

  private commitValue(nextValue: number) {
    const clamped = this.clamp(nextValue);
    if (clamped !== this.value) {
      this.value = clamped;
    }
    this.emit('change', { value: this.value });
  }

  private handleMouseDown = (e: MouseEvent) => {
    if (this.disabled) return;
    this.isDragging = true;
    this.startY = e.clientY;
    this.requestUpdate();
    e.preventDefault();
  };

  private handleMouseMove = (e: MouseEvent) => {
    if (!this.isDragging) return;

    const deltaY = this.startY - e.clientY;
    const range = this.max - this.min;
    const valueChange = deltaY * this.sensitivity * (range / 100);

    this.startY = e.clientY;
    this.updateValue(this.value + valueChange, 'input');
  };

  private handleMouseUp = () => {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.requestUpdate();
    this.emit('change', { value: this.value });
  };

  private handleWheel = (e: WheelEvent) => {
    if (this.disabled) return;
    e.preventDefault();
    const direction = e.deltaY > 0 ? -1 : 1;
    const step = (this.max - this.min) / 100;
    const nextValue = this.value + direction * step * 5;
    this.updateValue(nextValue, 'input');
    this.commitValue(nextValue);
  };

  private handleKeyDown = (e: KeyboardEvent) => {
    if (this.disabled) return;

    const step = (this.max - this.min) / 100 || 1;
    if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
      e.preventDefault();
      const nextValue = this.value + step * 5;
      this.updateValue(nextValue, 'input');
      this.commitValue(nextValue);
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const nextValue = this.value - step * 5;
      this.updateValue(nextValue, 'input');
      this.commitValue(nextValue);
    }
  };

  private getRotation() {
    const percentage = ((this.value - this.min) / (this.max - this.min || 1)) * 100;
    return 225 + (percentage * 285) / 100;
  }

  private renderTicks() {
    const radius = 'calc(var(--knob-size) / 2 - 4px)';
    const ticks = [];
    for (let i = 0; i < 28; i++) {
      const angle = i * (270 / 27);
      const isMajor = i % 9 === 0;
      const isLimitMarker = Math.abs(angle - 225) < 5 || Math.abs(angle - 150) < 5;
      const tickClass = isLimitMarker ? 'limit-marker' : isMajor ? 'major' : '';
      ticks.push(html`<div class="tick ${tickClass}" style=${styleMap({
        transform: `rotate(${angle}deg) translateY(-${radius})`
      })}></div>`);
    }

    ticks.push(html`<div class="tick limit-marker" style=${styleMap({
      transform: `rotate(225deg) translateY(-${radius})`
    })}></div>`);
    ticks.push(html`<div class="tick limit-marker" style=${styleMap({
      transform: `rotate(150deg) translateY(-${radius})`
    })}></div>`);

    return ticks;
  }

  render() {
    return html`
      <div class="knob-container">
        <div class="knob-wrapper">
          <div
            class="knob ${this.variant} ${this.disabled ? 'disabled' : ''} ${this.isDragging ? 'active' : ''}"
            role="slider"
            tabindex=${this.disabled ? -1 : 0}
            aria-valuemin=${this.min}
            aria-valuemax=${this.max}
            aria-valuenow=${Math.round(this.value)}
            @mousedown=${this.handleMouseDown}
            @wheel=${this.handleWheel}
            @keydown=${this.handleKeyDown}
          >
            <div class="ticks">${this.renderTicks()}</div>
            <div class="indicator" style=${styleMap({
              transform: `translateX(-50%) rotate(${this.getRotation()}deg)`
            })}></div>
          </div>
        </div>
        <div class="value-display">${Math.round(this.value)}</div>
        <div class="label"><slot></slot></div>
      </div>
    `;
  }
}

export default KnobComponent;
