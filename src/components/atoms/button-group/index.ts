import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { property } from 'lit/decorators.js';
import { DarkglowElement } from '@base/DarkglowElement';
import styles from './styles';

type Orientation = 'horizontal' | 'vertical';
type Alignment = 'start' | 'center' | 'end';

class ButtonGroupComponent extends DarkglowElement {
  static styles = styles;

  @property({ type: String, reflect: true })
  orientation: Orientation = 'horizontal';

  @property({ type: String, reflect: true })
  align: Alignment = 'center';

  private getAlignmentStyles() {
    const value =
      this.align === 'start'
        ? 'flex-start'
        : this.align === 'end'
          ? 'flex-end'
          : 'center';

    return this.orientation === 'vertical'
      ? { flexDirection: 'column', alignItems: value }
      : { flexDirection: 'row', justifyContent: value };
  }

  render() {
    return html`
      <div
        class="button-group ${this.orientation}"
        style=${styleMap(this.getAlignmentStyles())}
      >
        <slot></slot>
      </div>
    `;
  }
}

export default ButtonGroupComponent;
