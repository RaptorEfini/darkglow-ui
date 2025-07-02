class ButtonGroupComponent extends HTMLElement {
  static get observedAttributes() {
    return ['orientation', 'align'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

/*  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      this.render();
    }
  }*/

  get orientation() {
    return this.getAttribute('orientation') || 'horizontal';
  }

  get align() {
    return this.getAttribute('align') || 'center';
  }

  render() {
    if (!this.shadowRoot) return;

    // Determine alignment based on orientation
    let justifyContent; // Default
    let alignItems;

    switch (this.align) {
      case 'start':
        justifyContent = 'flex-start';
        alignItems = 'flex-start';
        break;
      case 'end':
        justifyContent = 'flex-end';
        alignItems = 'flex-end';
        break;
      case 'center':
      default:
        justifyContent = 'center';
        alignItems = 'center';
        break;
    }
    console.log(alignItems)

    const styles = `
      :host {
        display: block;
        width: 100%;
      }

      .button-group {
        display: flex;
        flex-direction: ${this.orientation === 'vertical' ? 'column' : 'row'};
        gap: var(--spacing-sm);
        ${this.orientation === 'vertical' 
          ? `align-items: ${justifyContent};` 
          : `justify-content: ${justifyContent};`}
        padding: var(--spacing-xs);
        background: rgba(13, 2, 33, 0.7);
        border-radius: var(--border-radius);
        position: relative;
        backdrop-filter: blur(5px);
      }

      /* When horizontal, allow wrapping on small screens */
      .horizontal {
        flex-wrap: wrap;
      }

      /* Style for slotted buttons */
      ::slotted(darkglow-button) {
        margin: 0;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }

      ::slotted(darkglow-button:hover) {
        transform: translateY(-2px);
        filter: brightness(1.2);
      }
    `;

    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="button-group ${this.orientation}">
        <slot></slot>
      </div>
    `;
  }
}

export default ButtonGroupComponent;
