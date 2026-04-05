import { html } from 'lit';
import { DarkglowElement } from '@base/DarkglowElement';
import styles from './styles';

class ContainerComponent extends DarkglowElement {
  static styles = styles;

  render() {
    return html`
      <div class="container">
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

export default ContainerComponent;
