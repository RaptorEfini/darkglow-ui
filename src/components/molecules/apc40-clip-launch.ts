import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('apc40-clip-launch')
export class Apc40ClipLaunch extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  private handlePadClick(number: number) {
    console.log(`Clicked pad number: ${number}`);
  }

  render() {
    return html`
      <darkglow-card>
        <darkglow-grid columns="8" gap="5px">
          ${Array.from({ length: 40 }, (_, i) => {
            const padNumber = i + 1;
            return html`
              <darkglow-pad
                number=${padNumber}
                variant="primary"
                @click=${() => this.handlePadClick(padNumber)}
              ></darkglow-pad>
            `;
          })}
        </darkglow-grid>
      </darkglow-card>
    `;
  }
}