import styles from './styles.css?inline';
import { BaseComponent } from '../../base/BaseComponent';
import { DEFAULT_FADER_PROPS, FaderProps } from './types';

class FaderComponent extends BaseComponent {
  static get observedAttributes() {
    return ['value', 'min', 'max', 'disabled', 'variant', 'orientation'];
  }

  private _props: FaderProps = { ...DEFAULT_FADER_PROPS };
  private _isDragging: boolean = false;
  private _startY: number = 0;
  private _startX: number = 0;
  private _faderElement: HTMLElement | null = null;
  private _handleElement: HTMLElement | null = null;
  private _valueDisplay: HTMLElement | null = null;

  constructor() {
    super();
  }

  connectedCallback() {
    this._faderElement = this.shadowRoot?.querySelector('.fader-track') as HTMLElement;
    this._handleElement = this.shadowRoot?.querySelector('.fader-handle') as HTMLElement;
    this._valueDisplay = this.shadowRoot?.querySelector('.value-display') as HTMLElement;

    this._handleElement?.addEventListener('mousedown', this.handleMouseDown);
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
    this.addEventListener('wheel', this.handleWheel);

    this.updateFaderPosition();
  }

  disconnectedCallback() {
    this._handleElement?.removeEventListener('mousedown', this.handleMouseDown);
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
    this.removeEventListener('wheel', this.handleWheel);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    switch (name) {
      case 'value':
        this._props.value = isNaN(Number(newValue)) ? DEFAULT_FADER_PROPS.value : Number(newValue);
        this.updateFaderPosition();
        break;
      case 'min':
        this._props.min = isNaN(Number(newValue)) ? DEFAULT_FADER_PROPS.min : Number(newValue);
        this.updateFaderPosition();
        break;
      case 'max':
        this._props.max = isNaN(Number(newValue)) ? DEFAULT_FADER_PROPS.max : Number(newValue);
        this.updateFaderPosition();
        break;
      case 'disabled':
        this._props.disabled = this.getBooleanAttribute('disabled');
        this.render();
        break;
      case 'variant':
        this._props.variant = this.getStringAttribute('variant', DEFAULT_FADER_PROPS.variant) as FaderProps['variant'];
        this.render();
        break;
      case 'orientation':
        this._props.orientation = this.getStringAttribute('orientation', DEFAULT_FADER_PROPS.orientation) as FaderProps['orientation'];
        this.render();
        break;
    }
  }

  get value(): number {
    return this._props.value;
  }

  set value(val: number) {
    const newValue = Math.min(Math.max(val, this._props.min), this._props.max);
    if (newValue !== this._props.value) {
      this._props.value = newValue;
      this.setAttribute('value', String(newValue));
      this.updateFaderPosition();
      this.dispatchCustomEvent('change', { value: this._props.value });
    }
  }

  get min(): number {
    return this._props.min;
  }

  set min(val: number) {
    this._props.min = val;
    this.setAttribute('min', String(val));
  }

  get max(): number {
    return this._props.max;
  }

  set max(val: number) {
    this._props.max = val;
    this.setAttribute('max', String(val));
  }

  get disabled(): boolean {
    return this._props.disabled;
  }

  get variant(): FaderProps['variant'] {
    return this._props.variant;
  }

  get orientation(): FaderProps['orientation'] {
    return this._props.orientation;
  }
  
  get sensitivity(): number {
    return this._props.sensitivity;
  }
  
  set sensitivity(val: number) {
    this._props.sensitivity = val;
  }

  handleMouseDown = (e: MouseEvent) => {
    if (this.disabled) return;

    this._isDragging = true;
    this._startY = e.clientY;
    this._startX = e.clientX;
    this._handleElement?.classList.add('active');

    // Prevent text selection during dragging
    e.preventDefault();
  }

  handleMouseMove = (e: MouseEvent) => {
    if (!this._isDragging) return;

    const range = this._props.max - this._props.min;
    let valueChange;

    if (this.orientation === 'horizontal') {
      const deltaX = e.clientX - this._startX;
      valueChange = deltaX * this._props.sensitivity * (range / 100);
      this._startX = e.clientX;
    } else {
      const deltaY = this._startY - e.clientY;
      valueChange = deltaY * this._props.sensitivity * (range / 100);
      this._startY = e.clientY;
    }

    this.value = this._props.value + valueChange;
  }

  handleMouseUp = () => {
    if (this._isDragging) {
      this._isDragging = false;
      this._handleElement?.classList.remove('active');
    }
  }

  handleWheel = (e: WheelEvent) => {
    if (this.disabled) return;

    e.preventDefault();
    // For horizontal faders, we invert the direction to match the visual representation
    const direction = this.orientation === 'horizontal' 
      ? (e.deltaY > 0 ? 1 : -1) 
      : (e.deltaY > 0 ? -1 : 1);
    const step = (this._props.max - this._props.min) / 100;
    this.value = this._props.value + (direction * step * 5);
  }

  updateFaderPosition() {
    if (!this._handleElement || !this._valueDisplay) return;

    const percentage = ((this._props.value - this._props.min) / (this._props.max - this._props.min)) * 100;

    if (this.orientation === 'horizontal') {
      this._handleElement.style.left = `${percentage}%`;
      this._handleElement.style.top = '50%';
      this._handleElement.style.transform = 'translate(-50%, -50%)';
    } else {
      // Invert the percentage for vertical fader (0% at bottom, 100% at top)
      const invertedPercentage = 100 - percentage;
      this._handleElement.style.top = `${invertedPercentage}%`;
      this._handleElement.style.left = '50%';
      this._handleElement.style.transform = 'translateX(-50%)';
    }

    this._valueDisplay.textContent = Math.round(this._props.value).toString();
  }

  render() {
    if (!this.shadowRoot) return;

    const isHorizontal = this.orientation === 'horizontal';

    // Dynamic styles that depend on component properties
    const dynamicStyles = `
      :host {
        --fader-width: ${isHorizontal ? '150px' : '40px'};
        --fader-height: ${isHorizontal ? '40px' : '150px'};
        --fader-color: var(--color-darker);
        --handle-color: var(--color-darker);
        --indicator-color: var(--color-primary);
        --fader-border: var(--color-primary);
      }

      .fader-container {
        flex-direction: ${isHorizontal ? 'column' : 'column'};
        width: var(--fader-width);
      }

      .fader-wrapper {
        width: var(--fader-width);
        height: var(--fader-height);
        margin: ${isHorizontal ? '0 0 10px 0' : '10px 0'};
      }

      .fader-track {
        ${isHorizontal ? 'top: 50%; left: 0; transform: translateY(-50%); width: 100%; height: 8px;' : 'top: 0; left: 50%; transform: translateX(-50%); width: 8px; height: 100%;'}
      }

      .fader-track::before {
        background: ${isHorizontal ? 'linear-gradient(to right, rgba(255,255,255,0.1) 0%, transparent 50%)' : 'linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, transparent 50%)'};
      }

      .fader-handle {
        ${isHorizontal ? 'left: 0; top: 50%; transform: translate(-50%, -50%);' : 'left: 50%; top: 0; transform: translateX(-50%);'}
        width: ${isHorizontal ? '16px' : 'var(--fader-width)'};
        height: ${isHorizontal ? 'var(--fader-height)' : '16px'};
        cursor: ${this.disabled ? 'not-allowed' : (isHorizontal ? 'ew-resize' : 'ns-resize')};
      }

      .fader-handle.active {
        transform: ${isHorizontal ? 'translate(-50%, -50%) scale(0.95)' : 'translateX(-50%) scale(0.95)'};
      }

      .tick {
        ${isHorizontal ? 'width: 2px; height: 6px; top: calc(50% - 10px);' : 'width: 6px; height: 2px; left: calc(50% - 10px);'}
      }

      .tick.major {
        ${isHorizontal ? 'width: 2px; height: 10px;' : 'width: 10px; height: 2px;'}
      }
    `;

    // Create tick marks
    let ticksHtml = '<div class="ticks">';
    for (let i = 0; i <= 10; i++) {
      const position = i * 10;
      const isMajor = i % 2 === 0;
      if (this.orientation === 'horizontal') {
        ticksHtml += `
          <div class="tick ${isMajor ? 'major' : ''}" 
               style="left: ${position}%;">
          </div>
        `;
      } else {
        ticksHtml += `
          <div class="tick ${isMajor ? 'major' : ''}" 
               style="top: ${position}%;">
          </div>
        `;
      }
    }
    ticksHtml += '</div>';

    this.shadowRoot.innerHTML = `
      <style>
        ${styles}
        ${dynamicStyles}
      </style>
      <div class="fader-container">
        <div class="fader-wrapper">
          <div class="fader-track ${this.variant} ${this.disabled ? 'disabled' : ''}">
            ${ticksHtml}
          </div>
          <div class="fader-handle ${this.variant} ${this.disabled ? 'disabled' : ''}"></div>
        </div>
        <div class="value-display">50</div>
        <div class="label"><slot></slot></div>
      </div>
    `;

    // Re-query elements after render
    this._faderElement = this.shadowRoot.querySelector('.fader-track');
    this._handleElement = this.shadowRoot.querySelector('.fader-handle');
    this._valueDisplay = this.shadowRoot.querySelector('.value-display');

    // Update fader position
    this.updateFaderPosition();
  }
}

export default FaderComponent;