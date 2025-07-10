class FaderComponent extends HTMLElement {
  static get observedAttributes() {
    return ['value', 'min', 'max', 'disabled', 'variant', 'orientation'];
  }

  private _value: number = 50;
  private _min: number = 0;
  private _max: number = 100;
  private _isDragging: boolean = false;
  private _startY: number = 0;
  private _startX: number = 0;
  private _faderElement: HTMLElement | null = null;
  private _handleElement: HTMLElement | null = null;
  private _valueDisplay: HTMLElement | null = null;
  private _sensitivity: number = 1;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
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
        // Use isNaN to check if the value is not a number, instead of using || which treats 0 as falsy
        this._value = isNaN(Number(newValue)) ? 50 : Number(newValue);
        this.updateFaderPosition();
        break;
      case 'min':
        this._min = isNaN(Number(newValue)) ? 0 : Number(newValue);
        this.updateFaderPosition();
        break;
      case 'max':
        this._max = isNaN(Number(newValue)) ? 100 : Number(newValue);
        this.updateFaderPosition();
        break;
      case 'disabled':
      case 'variant':
        this.render();
        break;
    }
  }

  get value() {
    return this._value;
  }

  set value(val: number) {
    const newValue = Math.min(Math.max(val, this._min), this._max);
    if (newValue !== this._value) {
      this._value = newValue;
      this.setAttribute('value', String(newValue));
      this.updateFaderPosition();
      this.dispatchEvent(new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: { value: this._value }
      }));
    }
  }

  get min() {
    return this._min;
  }

  set min(val: number) {
    this._min = val;
    this.setAttribute('min', String(val));
  }

  get max() {
    return this._max;
  }

  set max(val: number) {
    this._max = val;
    this.setAttribute('max', String(val));
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  get variant() {
    return this.getAttribute('variant') || 'primary';
  }

  get orientation() {
    return this.getAttribute('orientation') || 'vertical';
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

    const range = this._max - this._min;
    let valueChange;

    if (this.orientation === 'horizontal') {
      const deltaX = e.clientX - this._startX;
      valueChange = deltaX * this._sensitivity * (range / 100);
      this._startX = e.clientX;
    } else {
      const deltaY = this._startY - e.clientY;
      valueChange = deltaY * this._sensitivity * (range / 100);
      this._startY = e.clientY;
    }

    this.value = this._value + valueChange;
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
    const step = (this._max - this._min) / 100;
    this.value = this._value + (direction * step * 5);
  }

  updateFaderPosition() {
    if (!this._handleElement || !this._valueDisplay) return;

    const percentage = ((this._value - this._min) / (this._max - this._min)) * 100;

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

    this._valueDisplay.textContent = Math.round(this._value).toString();
  }

  render() {
    if (!this.shadowRoot) return;

    const isHorizontal = this.orientation === 'horizontal';

    const styles = `
      :host {
        display: inline-block;
        --fader-width: ${isHorizontal ? '150px' : '40px'};
        --fader-height: ${isHorizontal ? '40px' : '150px'};
        --fader-color: var(--color-darker);
        --handle-color: var(--color-darker);
        --indicator-color: var(--color-primary);
        --fader-border: var(--color-primary);
      }

      .fader-container {
        display: flex;
        flex-direction: ${isHorizontal ? 'column' : 'column'};
        align-items: center;
        width: var(--fader-width);
        user-select: none;
      }

      .fader-wrapper {
        position: relative;
        width: var(--fader-width);
        height: var(--fader-height);
        margin: ${isHorizontal ? '0 0 10px 0' : '10px 0'};
      }

      .fader-track {
        position: absolute;
        ${isHorizontal ? 'top: 50%; left: 0; transform: translateY(-50%); width: 100%; height: 8px;' : 'top: 0; left: 50%; transform: translateX(-50%); width: 8px; height: 100%;'}
        background-color: var(--fader-color);
        border: 2px solid var(--fader-border);
        box-shadow: 0 0 10px var(--fader-border);
        border-radius: 4px;
        overflow: hidden;
      }

      .fader-track::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: ${isHorizontal ? 'linear-gradient(to right, rgba(255,255,255,0.1) 0%, transparent 50%)' : 'linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, transparent 50%)'};
        z-index: 1;
      }

      .fader-handle {
        position: absolute;
        ${isHorizontal ? 'left: 0; top: 50%; transform: translate(-50%, -50%);' : 'left: 50%; top: 0; transform: translateX(-50%);'}
        width: ${isHorizontal ? '16px' : 'var(--fader-width)'};
        height: ${isHorizontal ? 'var(--fader-height)' : '16px'};
        background-color: var(--handle-color);
        border: 2px solid var(--fader-border);
        box-shadow: 0 0 10px var(--fader-border);
        border-radius: 4px;
        cursor: ${this.disabled ? 'not-allowed' : (isHorizontal ? 'ew-resize' : 'ns-resize')};
        transition: box-shadow 0.3s ease, transform 0.1s ease;
        z-index: 2;
      }

      .fader-handle::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%);
        z-index: 1;
      }

      .fader-handle.active {
        transform: ${isHorizontal ? 'translate(-50%, -50%) scale(0.95)' : 'translateX(-50%) scale(0.95)'};
      }

      .value-display {
        margin-top: 8px;
        font-family: "Orbitron", sans-serif;
        font-size: 14px;
        color: var(--indicator-color);
        text-shadow: 0 0 5px var(--indicator-color);
      }

      .label {
        margin-top: 4px;
        font-family: "Orbitron", sans-serif;
        font-size: 12px;
        color: var(--color-white);
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      /* Tick marks along the fader */
      .ticks {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 0;
      }

      .tick {
        position: absolute;
        ${isHorizontal ? 'width: 2px; height: 6px; top: calc(50% - 10px);' : 'width: 6px; height: 2px; left: calc(50% - 10px);'}
        background-color: rgba(255, 255, 255, 0.3);
      }

      .tick.major {
        ${isHorizontal ? 'width: 2px; height: 10px;' : 'width: 10px; height: 2px;'}
        background-color: var(--indicator-color);
        box-shadow: 0 0 3px var(--indicator-color);
      }

      /* Variants */
      .primary {
        --fader-border: var(--color-primary);
        --indicator-color: var(--color-primary);
      }

      .secondary {
        --fader-border: var(--color-secondary);
        --indicator-color: var(--color-secondary);
      }

      .danger {
        --fader-border: var(--color-danger);
        --indicator-color: var(--color-danger);
      }

      .accent {
        --fader-border: var(--color-accent);
        --indicator-color: var(--color-accent);
      }

      /* Disabled state */
      :host([disabled]) .fader-track,
      :host([disabled]) .fader-handle {
        opacity: 0.6;
        box-shadow: none;
      }

      :host([disabled]) .value-display,
      :host([disabled]) .label {
        opacity: 0.6;
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
      <style>${styles}</style>
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
