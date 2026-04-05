import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { property } from 'lit/decorators.js';
import { DarkglowElement } from '@base/DarkglowElement';
import styles from './styles';

type Orientation = 'horizontal' | 'vertical';

class FaderComponent extends DarkglowElement {
  static styles = styles;

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

  @property({ type: String, reflect: true })
  orientation: Orientation = 'vertical';

  @property({ type: Number })
  sensitivity = 1;

  private isDragging = false;
  private startY = 0;
  private startX = 0;

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
    this.startX = e.clientX;
    this.requestUpdate();
    e.preventDefault();
  };

  private handleMouseMove = (e: MouseEvent) => {
    if (!this.isDragging) return;
    const range = this.max - this.min;
    let delta = 0;

    if (this.orientation === 'horizontal') {
      delta = e.clientX - this.startX;
      this.startX = e.clientX;
    } else {
      delta = this.startY - e.clientY;
      this.startY = e.clientY;
    }

    const nextValue = this.value + delta * this.sensitivity * (range / 100);
    this.updateValue(nextValue, 'input');
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
    const direction = this.orientation === 'horizontal'
      ? (e.deltaY > 0 ? 1 : -1)
      : (e.deltaY > 0 ? -1 : 1);
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

  private getPercentage() {
    return ((this.value - this.min) / (this.max - this.min || 1)) * 100;
  }

  private getHostStyles() {
    const isHorizontal = this.orientation === 'horizontal';
    return {
      '--fader-width': isHorizontal ? '150px' : '40px',
      '--fader-height': isHorizontal ? '40px' : '150px',
      '--fader-color': 'var(--color-darker)',
      '--handle-color': 'var(--color-darker)',
      '--indicator-color': 'var(--color-primary)',
      '--fader-border': 'var(--color-primary)'
    };
  }

  private getTrackStyles() {
    const isHorizontal = this.orientation === 'horizontal';
    return isHorizontal
      ? { top: '50%', left: '0', transform: 'translateY(-50%)', width: '100%', height: '8px' }
      : { top: '0', left: '50%', transform: 'translateX(-50%)', width: '8px', height: '100%' };
  }

  private getHandleStyles() {
    const isHorizontal = this.orientation === 'horizontal';
    const percentage = this.getPercentage();

    return isHorizontal
      ? {
          left: `${percentage}%`,
          top: '50%',
          transform: this.isDragging ? 'translate(-50%, -50%) scale(0.95)' : 'translate(-50%, -50%)',
          width: '16px',
          height: 'var(--fader-height)'
        }
      : {
          left: '50%',
          top: `${100 - percentage}%`,
          transform: this.isDragging ? 'translateX(-50%) scale(0.95)' : 'translateX(-50%)',
          width: 'var(--fader-width)',
          height: '16px'
        };
  }

  private renderTicks() {
    const isHorizontal = this.orientation === 'horizontal';
    return Array.from({ length: 11 }, (_, i) => {
      const position = i * 10;
      const isMajor = i % 2 === 0;
      return html`<div
        class="tick ${isMajor ? 'major' : ''}"
        style=${styleMap(
          isHorizontal
            ? {
                left: `${position}%`,
                width: '2px',
                height: isMajor ? '10px' : '6px',
                top: 'calc(50% - 10px)'
              }
            : {
                top: `${position}%`,
                width: isMajor ? '10px' : '6px',
                height: '2px',
                left: 'calc(50% - 10px)'
              }
        )}
      ></div>`;
    });
  }

  render() {
    return html`
      <div class="fader-container" style=${styleMap(this.getHostStyles())}>
        <div class="fader-wrapper">
          <div class="fader-track ${this.variant} ${this.disabled ? 'disabled' : ''}" style=${styleMap(this.getTrackStyles())}>
            <div class="ticks">${this.renderTicks()}</div>
          </div>
          <div
            class="fader-handle ${this.variant} ${this.disabled ? 'disabled' : ''}"
            role="slider"
            tabindex=${this.disabled ? -1 : 0}
            aria-valuemin=${this.min}
            aria-valuemax=${this.max}
            aria-valuenow=${Math.round(this.value)}
            style=${styleMap(this.getHandleStyles())}
            @mousedown=${this.handleMouseDown}
            @wheel=${this.handleWheel}
            @keydown=${this.handleKeyDown}
          ></div>
        </div>
        <div class="value-display">${Math.round(this.value)}</div>
        <div class="label"><slot></slot></div>
      </div>
    `;
  }
}

export default FaderComponent;
