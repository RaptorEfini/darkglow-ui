class KnobComponent extends HTMLElement {
  static get observedAttributes() {
    return ['value', 'min', 'max', 'disabled', 'variant'];
  }

  private _value: number = 50;
  private _min: number = 0;
  private _max: number = 100;
  private _isDragging: boolean = false;
  private _startY: number = 0;
  private _knobElement: HTMLElement | null = null;
  private _indicatorElement: HTMLElement | null = null;
  private _valueDisplay: HTMLElement | null = null;
  private _sensitivity: number = 1;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  connectedCallback() {
    this._knobElement = this.shadowRoot?.querySelector('.knob') as HTMLElement;
    this._indicatorElement = this.shadowRoot?.querySelector('.indicator') as HTMLElement;
    this._valueDisplay = this.shadowRoot?.querySelector('.value-display') as HTMLElement;

    this.addEventListener('mousedown', this.handleMouseDown);
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
    this.addEventListener('wheel', this.handleWheel);

    this.updateKnobPosition();
  }

  disconnectedCallback() {
    this.removeEventListener('mousedown', this.handleMouseDown);
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
        this.updateKnobPosition();
        break;
      case 'min':
        this._min = isNaN(Number(newValue)) ? 0 : Number(newValue);
        this.updateKnobPosition();
        break;
      case 'max':
        this._max = isNaN(Number(newValue)) ? 100 : Number(newValue);
        this.updateKnobPosition();
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
      this.updateKnobPosition();
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

  handleMouseDown = (e: MouseEvent) => {
    if (this.disabled) return;

    this._isDragging = true;
    this._startY = e.clientY;
    this._knobElement?.classList.add('active');

    // Prevent text selection during dragging
    e.preventDefault();
  }

  handleMouseMove = (e: MouseEvent) => {
    if (!this._isDragging) return;

    const deltaY = this._startY - e.clientY;
    const range = this._max - this._min;
    const valueChange = deltaY * this._sensitivity * (range / 100);

    this.value = this._value + valueChange;
    this._startY = e.clientY;
  }

  handleMouseUp = () => {
    if (this._isDragging) {
      this._isDragging = false;
      this._knobElement?.classList.remove('active');
    }
  }

  handleWheel = (e: WheelEvent) => {
    if (this.disabled) return;

    e.preventDefault();
    const direction = e.deltaY > 0 ? -1 : 1;
    const step = (this._max - this._min) / 100;
    this.value = this._value + (direction * step * 5);
  }

  updateKnobPosition() {
    if (!this._indicatorElement || !this._valueDisplay) return;

    const percentage = ((this._value - this._min) / (this._max - this._min)) * 100;
    // Adjust rotation to start at 225 degrees (7 o'clock) and end at 150 degrees (5 o'clock)
    // This means a 285 degree rotation range going clockwise (passing through 0/360)
    const startAngle = 225;
    const rotationRange = 285;
    const degrees = startAngle + (percentage * rotationRange / 100);

    this._indicatorElement.style.transform = `rotate(${degrees}deg)`;
    this._valueDisplay.textContent = Math.round(this._value).toString();
  }

  render() {
    if (!this.shadowRoot) return;

    const styles = `
      :host {
        display: inline-block;
        --knob-size: 80px;
        --knob-color: var(--color-darker);
        --indicator-color: var(--color-primary);
        --knob-border: var(--color-primary);
      }

      .knob-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: var(--knob-size);
        user-select: none;
      }

      .knob-wrapper {
        position: relative;
        width: var(--knob-size);
        height: var(--knob-size);
        overflow: hidden;
        border-radius: 50%;
      }

      .knob {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: var(--knob-color);
        border: 2px solid var(--knob-border);
        box-shadow: 0 0 10px var(--knob-border);
        cursor: ${this.disabled ? 'not-allowed' : 'pointer'};
        transition: box-shadow 0.3s ease, transform 0.1s ease;
        overflow: hidden;
      }

      .knob::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%);
        z-index: 1;
      }

      .knob::after {
        content: '';
        position: absolute;
        top: 5px;
        left: 5px;
        right: 5px;
        bottom: 5px;
        border-radius: 50%;
        background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%);
        z-index: 2;
      }

      .knob.active {
        transform: scale(0.95);
      }

      .indicator {
        position: absolute;
        top: 10%;
        left: 50%;
        width: 2px;
        height: 40%;
        background-color: var(--indicator-color);
        transform-origin: bottom center;
        transform: translateX(-50%) rotate(0deg);
        z-index: 3;
        box-shadow: 0 0 5px var(--indicator-color);
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

      /* Variants */
      .primary {
        --knob-border: var(--color-primary);
        --indicator-color: var(--color-primary);
      }

      .secondary {
        --knob-border: var(--color-secondary);
        --indicator-color: var(--color-secondary);
      }

      .danger {
        --knob-border: var(--color-danger);
        --indicator-color: var(--color-danger);
      }

      .accent {
        --knob-border: var(--color-accent);
        --indicator-color: var(--color-accent);
      }

      /* Disabled state */
      :host([disabled]) .knob {
        opacity: 0.6;
        box-shadow: none;
      }

      :host([disabled]) .value-display,
      :host([disabled]) .label {
        opacity: 0.6;
      }

      /* Tick marks around the knob */
      .ticks {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .tick {
        position: absolute;
        width: 2px;
        height: 6px;
        background-color: rgba(255, 255, 255, 0.3);
        transform-origin: bottom center;
        top: 0;
        left: calc(50% - 1px);
      }

      .tick.major {
        height: 10px;
        width: 2px;
        background-color: var(--indicator-color);
        box-shadow: 0 0 3px var(--indicator-color);
      }

      /* Special ticks at 7 o'clock and 5 o'clock positions */
      .tick.limit-marker {
        height: 12px;
        width: 2px;
        background-color: var(--indicator-color);
        box-shadow: 0 0 5px var(--indicator-color);
      }
    `;

    // Create tick marks
    let ticksHtml = '<div class="ticks">';

    // Add special limit markers at 7 o'clock (225 degrees) and 5 o'clock (150 degrees)
    const startAngle = 225; // 7 o'clock position
    const endAngle = 150;   // 5 o'clock position

    for (let i = 0; i < 28; i++) {
      const angle = i * (270 / 27);
      const isMajor = i % 9 === 0;

      // Check if this tick is at or very close to one of our limit positions
      const isStartLimit = Math.abs(angle - startAngle) < 5;
      const isEndLimit = Math.abs(angle - endAngle) < 5;
      const isLimitMarker = isStartLimit || isEndLimit;

      const radius = 'calc(var(--knob-size) / 2 - 4px)'; // Smaller to stay within the knob border

      // Apply appropriate classes based on whether it's a major tick or limit marker
      const tickClass = isLimitMarker ? 'limit-marker' : (isMajor ? 'major' : '');

      ticksHtml += `
        <div class="tick ${tickClass}" 
             style="transform: rotate(${angle}deg) translateY(-${radius});">
        </div>
      `;
    }

    // Add exact limit markers at precise angles if needed
    ticksHtml += `
      <div class="tick limit-marker" 
           style="transform: rotate(${startAngle}deg) translateY(-calc(var(--knob-size) / 2 - 4px));">
      </div>
      <div class="tick limit-marker" 
           style="transform: rotate(${endAngle}deg) translateY(-calc(var(--knob-size) / 2 - 4px));">
      </div>
    `;

    ticksHtml += '</div>';

    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="knob-container">
        <div class="knob-wrapper">
          <div class="knob ${this.variant} ${this.disabled ? 'disabled' : ''}">
            ${ticksHtml}
            <div class="indicator"></div>
          </div>
        </div>
        <div class="value-display">${Math.round(this._value).toString()}</div>
        <div class="label"><slot></slot></div>
      </div>
    `;

    // Re-query elements after render
    this._knobElement = this.shadowRoot.querySelector('.knob');
    this._indicatorElement = this.shadowRoot.querySelector('.indicator');
    this._valueDisplay = this.shadowRoot.querySelector('.value-display');

    // Update knob position
    this.updateKnobPosition();
  }
}

export default KnobComponent;
