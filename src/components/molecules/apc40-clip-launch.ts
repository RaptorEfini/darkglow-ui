import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('apc40-clip-launch')
export class Apc40ClipLaunch extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  @property({ type: Number, attribute: 'pad-count', reflect: true })
  padCount = 40;

  @property({ type: Number, reflect: true })
  columns = 8;

  @property({ type: String, reflect: true })
  gap = '5px';

  @property({ type: String, attribute: 'pad-variant', reflect: true })
  padVariant = 'primary';

  @property({ type: String, attribute: 'active-pads', reflect: true })
  activePads = '';

  private getActivePads(): Set<number> {
    return new Set(
      this.activePads
        .split(',')
        .map((value) => Number(value.trim()))
        .filter((value) => Number.isFinite(value) && value > 0)
    );
  }

  private handlePadClick(number: number) {
    this.dispatchEvent(
      new CustomEvent('pad-trigger', {
        bubbles: true,
        composed: true,
        detail: { number }
      })
    );
  }

  render() {
    const activePads = this.getActivePads();

    return html`
      <darkglow-card>
        <darkglow-grid columns=${String(this.columns)} gap=${this.gap}>
          ${Array.from({ length: this.padCount }, (_, i) => {
            const padNumber = i + 1;
            return html`
              <darkglow-pad
                number=${padNumber}
                variant=${this.padVariant}
                ?active=${activePads.has(padNumber)}
                @click=${() => this.handlePadClick(padNumber)}
              ></darkglow-pad>
            `;
          })}
        </darkglow-grid>
      </darkglow-card>
    `;
  }
}
