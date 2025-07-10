import styles from './styles.css?inline';
class PadComponent extends HTMLElement {
    static get observedAttributes() {
        return ['number', 'variant', 'active', 'disabled', 'size'];
    }
    constructor() {
        super();
        Object.defineProperty(this, "_number", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "_padElement", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "_numberElement", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "handleClick", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (e) => {
                if (this.disabled)
                    return;
                this.dispatchEvent(new CustomEvent('pad-click', {
                    bubbles: true,
                    composed: true,
                    detail: { number: this._number }
                }));
            }
        });
        Object.defineProperty(this, "handleMouseDown", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (e) => {
                if (this.disabled)
                    return;
                this._padElement?.classList.add('pressed');
            }
        });
        Object.defineProperty(this, "handleMouseUp", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (e) => {
                if (this.disabled)
                    return;
                this._padElement?.classList.remove('pressed');
            }
        });
        this.attachShadow({ mode: 'open' });
        this.render();
    }
    connectedCallback() {
        this._padElement = this.shadowRoot?.querySelector('.pad');
        this._numberElement = this.shadowRoot?.querySelector('.number');
        this.addEventListener('click', this.handleClick);
        this.addEventListener('mousedown', this.handleMouseDown);
        this.addEventListener('mouseup', this.handleMouseUp);
    }
    disconnectedCallback() {
        this.removeEventListener('click', this.handleClick);
        this.removeEventListener('mousedown', this.handleMouseDown);
        this.removeEventListener('mouseup', this.handleMouseUp);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue)
            return;
        switch (name) {
            case 'number':
                this._number = newValue !== null ? Number(newValue) : null;
                this.updateNumberDisplay();
                break;
            case 'variant':
            case 'active':
            case 'disabled':
            case 'size':
                this.render();
                break;
        }
    }
    get number() {
        return this._number;
    }
    set number(val) {
        this._number = val;
        if (val === null) {
            this.removeAttribute('number');
        }
        else {
            this.setAttribute('number', String(val));
        }
        this.updateNumberDisplay();
    }
    get variant() {
        return this.getAttribute('variant') || 'primary';
    }
    get active() {
        return this.hasAttribute('active');
    }
    set active(value) {
        if (value) {
            this.setAttribute('active', '');
        }
        else {
            this.removeAttribute('active');
        }
    }
    get disabled() {
        return this.hasAttribute('disabled');
    }
    get size() {
        return this.getAttribute('size') || 'default';
    }
    updateNumberDisplay() {
        if (!this._numberElement)
            return;
        if (this._number !== null) {
            this._numberElement.textContent = String(this._number);
            this._numberElement.style.display = 'flex';
        }
        else {
            this._numberElement.style.display = 'none';
        }
    }
    render() {
        if (!this.shadowRoot)
            return;
        // Dynamic styles that depend on component properties
        const dynamicStyles = `
      .pad {
        cursor: ${this.disabled ? 'not-allowed' : 'pointer'};
      }
    `;
        this.shadowRoot.innerHTML = `
      <style>
        ${styles}
        ${dynamicStyles}
      </style>
      <div class="pad-container">
        <div class="pad ${this.variant} ${this.active ? 'active' : ''} ${this.disabled ? 'disabled' : ''}">
          <div class="number">${this._number !== null ? this._number : ''}</div>
        </div>
        <div class="label"><slot></slot></div>
      </div>
    `;
        // Re-query elements after render
        this._padElement = this.shadowRoot.querySelector('.pad');
        this._numberElement = this.shadowRoot.querySelector('.number');
        // Update number display
        this.updateNumberDisplay();
    }
}
export default PadComponent;
