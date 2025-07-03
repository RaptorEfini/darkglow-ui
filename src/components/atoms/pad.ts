class PadComponent extends HTMLElement {
  static get observedAttributes() {
    return ['number', 'variant', 'active', 'disabled'];
  }

  private _number: number | null = null;
  private _padElement: HTMLElement | null = null;
  private _numberElement: HTMLElement | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  connectedCallback() {
    this._padElement = this.shadowRoot?.querySelector('.pad') as HTMLElement;
    this._numberElement = this.shadowRoot?.querySelector('.number') as HTMLElement;
    
    this.addEventListener('click', this.handleClick);
    this.addEventListener('mousedown', this.handleMouseDown);
    this.addEventListener('mouseup', this.handleMouseUp);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.handleClick);
    this.removeEventListener('mousedown', this.handleMouseDown);
    this.removeEventListener('mouseup', this.handleMouseUp);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    switch (name) {
      case 'number':
        this._number = newValue !== null ? Number(newValue) : null;
        this.updateNumberDisplay();
        break;
      case 'variant':
      case 'active':
      case 'disabled':
        this.render();
        break;
    }
  }

  get number() {
    return this._number;
  }

  set number(val: number | null) {
    this._number = val;
    if (val === null) {
      this.removeAttribute('number');
    } else {
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

  set active(value: boolean) {
    if (value) {
      this.setAttribute('active', '');
    } else {
      this.removeAttribute('active');
    }
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  handleClick = (e: MouseEvent) => {
    if (this.disabled) return;

    this.dispatchEvent(new CustomEvent('pad-click', {
      bubbles: true,
      composed: true,
      detail: { number: this._number }
    }));
  }

  handleMouseDown = (e: MouseEvent) => {
    if (this.disabled) return;
    this._padElement?.classList.add('pressed');
  }

  handleMouseUp = (e: MouseEvent) => {
    if (this.disabled) return;
    this._padElement?.classList.remove('pressed');
  }

  updateNumberDisplay() {
    if (!this._numberElement) return;
    
    if (this._number !== null) {
      this._numberElement.textContent = String(this._number);
      this._numberElement.style.display = 'flex';
    } else {
      this._numberElement.style.display = 'none';
    }
  }

  render() {
    if (!this.shadowRoot) return;

    const styles = `
      :host {
        display: inline-block;
        --pad-size: 60px;
        --pad-color: var(--color-darker);
        --pad-border: var(--color-primary);
        --pad-active-color: var(--color-primary);
      }

      .pad-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: var(--pad-size);
        user-select: none;
      }

      .pad {
        position: relative;
        width: var(--pad-size);
        height: var(--pad-size);
        background-color: var(--pad-color);
        border: 2px solid var(--pad-border);
        box-shadow: 0 0 10px var(--pad-border);
        cursor: ${this.disabled ? 'not-allowed' : 'pointer'};
        transition: box-shadow 0.3s ease, transform 0.1s ease, background-color 0.2s ease;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .pad::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%);
        z-index: 1;
      }

      .pad.pressed {
        transform: scale(0.95);
      }

      .number {
        position: relative;
        z-index: 2;
        font-family: "Orbitron", sans-serif;
        font-size: 24px;
        color: var(--pad-border);
        text-shadow: 0 0 5px var(--pad-border);
        display: flex;
        justify-content: center;
        align-items: center;
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
        --pad-border: var(--color-primary);
        --pad-active-color: var(--color-primary);
      }

      .secondary {
        --pad-border: var(--color-secondary);
        --pad-active-color: var(--color-secondary);
      }

      .danger {
        --pad-border: var(--color-danger);
        --pad-active-color: var(--color-danger);
      }

      .accent {
        --pad-border: var(--color-accent);
        --pad-active-color: var(--color-accent);
      }

      /* Active state */
      :host([active]) .pad {
        background-color: var(--pad-active-color);
        box-shadow: 0 0 15px var(--pad-border);
      }

      :host([active]) .number {
        color: var(--color-white);
        text-shadow: 0 0 5px var(--color-white);
      }

      /* Disabled state */
      :host([disabled]) .pad {
        opacity: 0.6;
        box-shadow: none;
      }

      :host([disabled]) .number,
      :host([disabled]) .label {
        opacity: 0.6;
      }
    `;

    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
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