import styles from './styles.css?inline';
class KnobComponent extends HTMLElement {
    static get observedAttributes() {
        return ['value', 'min', 'max', 'disabled', 'variant'];
    }
    constructor() {
        super();
        Object.defineProperty(this, "_value", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 50
        });
        Object.defineProperty(this, "_min", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "_max", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 100
        });
        Object.defineProperty(this, "_isDragging", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "_startY", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "_knobElement", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "_indicatorElement", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "_valueDisplay", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "_sensitivity", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1
        });
        Object.defineProperty(this, "handleMouseDown", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (e) => {
                if (this.disabled)
                    return;
                this._isDragging = true;
                this._startY = e.clientY;
                this._knobElement?.classList.add('active');
                // Prevent text selection during dragging
                e.preventDefault();
            }
        });
        Object.defineProperty(this, "handleMouseMove", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (e) => {
                if (!this._isDragging)
                    return;
                const deltaY = this._startY - e.clientY;
                const range = this._max - this._min;
                const valueChange = deltaY * this._sensitivity * (range / 100);
                this.value = this._value + valueChange;
                this._startY = e.clientY;
            }
        });
        Object.defineProperty(this, "handleMouseUp", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                if (this._isDragging) {
                    this._isDragging = false;
                    this._knobElement?.classList.remove('active');
                }
            }
        });
        Object.defineProperty(this, "handleWheel", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (e) => {
                if (this.disabled)
                    return;
                e.preventDefault();
                const direction = e.deltaY > 0 ? -1 : 1;
                const step = (this._max - this._min) / 100;
                this.value = this._value + (direction * step * 5);
            }
        });
        this.attachShadow({ mode: 'open' });
        this.render();
    }
    connectedCallback() {
        this._knobElement = this.shadowRoot?.querySelector('.knob');
        this._indicatorElement = this.shadowRoot?.querySelector('.indicator');
        this._valueDisplay = this.shadowRoot?.querySelector('.value-display');
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
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue)
            return;
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
    set value(val) {
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
    set min(val) {
        this._min = val;
        this.setAttribute('min', String(val));
    }
    get max() {
        return this._max;
    }
    set max(val) {
        this._max = val;
        this.setAttribute('max', String(val));
    }
    get disabled() {
        return this.hasAttribute('disabled');
    }
    get variant() {
        return this.getAttribute('variant') || 'primary';
    }
    updateKnobPosition() {
        if (!this._indicatorElement || !this._valueDisplay)
            return;
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
        if (!this.shadowRoot)
            return;
        // Dynamic styles that depend on component properties
        const dynamicStyles = `
      .knob {
        cursor: ${this.disabled ? 'not-allowed' : 'pointer'};
      }
    `;
        // Create tick marks
        let ticksHtml = '<div class="ticks">';
        // Add special limit markers at 7 o'clock (225 degrees) and 5 o'clock (150 degrees)
        const startAngle = 225; // 7 o'clock position
        const endAngle = 150; // 5 o'clock position
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
      <style>
        ${styles}
        ${dynamicStyles}
      </style>
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
