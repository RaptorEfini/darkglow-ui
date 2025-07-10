import styles from './styles.css?inline';
class FaderComponent extends HTMLElement {
    static get observedAttributes() {
        return ['value', 'min', 'max', 'disabled', 'variant', 'orientation'];
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
        Object.defineProperty(this, "_startX", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "_faderElement", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "_handleElement", {
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
                this._startX = e.clientX;
                this._handleElement?.classList.add('active');
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
                const range = this._max - this._min;
                let valueChange;
                if (this.orientation === 'horizontal') {
                    const deltaX = e.clientX - this._startX;
                    valueChange = deltaX * this._sensitivity * (range / 100);
                    this._startX = e.clientX;
                }
                else {
                    const deltaY = this._startY - e.clientY;
                    valueChange = deltaY * this._sensitivity * (range / 100);
                    this._startY = e.clientY;
                }
                this.value = this._value + valueChange;
            }
        });
        Object.defineProperty(this, "handleMouseUp", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                if (this._isDragging) {
                    this._isDragging = false;
                    this._handleElement?.classList.remove('active');
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
                // For horizontal faders, we invert the direction to match the visual representation
                const direction = this.orientation === 'horizontal'
                    ? (e.deltaY > 0 ? 1 : -1)
                    : (e.deltaY > 0 ? -1 : 1);
                const step = (this._max - this._min) / 100;
                this.value = this._value + (direction * step * 5);
            }
        });
        this.attachShadow({ mode: 'open' });
        this.render();
    }
    connectedCallback() {
        this._faderElement = this.shadowRoot?.querySelector('.fader-track');
        this._handleElement = this.shadowRoot?.querySelector('.fader-handle');
        this._valueDisplay = this.shadowRoot?.querySelector('.value-display');
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
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue)
            return;
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
            case 'orientation':
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
    get orientation() {
        return this.getAttribute('orientation') || 'vertical';
    }
    updateFaderPosition() {
        if (!this._handleElement || !this._valueDisplay)
            return;
        const percentage = ((this._value - this._min) / (this._max - this._min)) * 100;
        if (this.orientation === 'horizontal') {
            this._handleElement.style.left = `${percentage}%`;
            this._handleElement.style.top = '50%';
            this._handleElement.style.transform = 'translate(-50%, -50%)';
        }
        else {
            // Invert the percentage for vertical fader (0% at bottom, 100% at top)
            const invertedPercentage = 100 - percentage;
            this._handleElement.style.top = `${invertedPercentage}%`;
            this._handleElement.style.left = '50%';
            this._handleElement.style.transform = 'translateX(-50%)';
        }
        this._valueDisplay.textContent = Math.round(this._value).toString();
    }
    render() {
        if (!this.shadowRoot)
            return;
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
            }
            else {
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
