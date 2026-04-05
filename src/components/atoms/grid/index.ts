import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { property } from 'lit/decorators.js';
import { DarkglowElement } from '@base/DarkglowElement';
import styles from './styles';

type Alignment = 'start' | 'center' | 'end';

class GridComponent extends DarkglowElement {
  static styles = styles;

  @property({ type: String, reflect: true })
  columns = '4';

  @property({ type: String, reflect: true })
  gap = '10px';

  @property({ type: String, attribute: 'max-width', reflect: true })
  maxWidth = 'none';

  @property({ type: String, reflect: true })
  align: Alignment = 'center';

  @property({ type: String, reflect: true })
  variant = 'default';

  private getAlignmentStyles() {
    switch (this.align) {
      case 'start':
        return { justifyItems: 'start', justifyContent: 'flex-start' };
      case 'end':
        return { justifyItems: 'end', justifyContent: 'flex-end' };
      default:
        return { justifyItems: 'center', justifyContent: 'center' };
    }
  }

  private getVariantStyles() {
    switch (this.variant) {
      case 'primary':
        return {
          background: 'rgba(13, 2, 33, 0.7)',
          border: '1px solid var(--color-primary)',
          boxShadow: '0 0 10px rgba(0, 128, 255, 0.3)'
        };
      case 'secondary':
        return {
          background: 'rgba(13, 2, 33, 0.7)',
          border: '1px solid var(--color-secondary)',
          boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)'
        };
      case 'danger':
        return {
          background: 'rgba(13, 2, 33, 0.7)',
          border: '1px solid var(--color-danger)',
          boxShadow: '0 0 10px rgba(255, 0, 0, 0.3)'
        };
      case 'accent':
        return {
          background: 'rgba(13, 2, 33, 0.7)',
          border: '1px solid var(--color-accent)',
          boxShadow: '0 0 10px rgba(255, 0, 255, 0.3)'
        };
      case 'outlined':
        return {
          background: 'transparent',
          border: '1px solid var(--color-gray-dark)',
          boxShadow: 'none'
        };
      default:
        return {
          background: 'rgba(13, 2, 33, 0.7)',
          border: 'none',
          boxShadow: 'none'
        };
    }
  }

  private getGridStyles() {
    return {
      gridTemplateColumns: `repeat(${this.columns}, 1fr)`,
      gap: this.gap,
      maxWidth: this.maxWidth,
      ...this.getAlignmentStyles(),
      ...this.getVariantStyles()
    };
  }

  render() {
    return html`
      <div class="grid-container" style=${styleMap(this.getGridStyles())}>
        <slot></slot>
      </div>
    `;
  }
}

export default GridComponent;
