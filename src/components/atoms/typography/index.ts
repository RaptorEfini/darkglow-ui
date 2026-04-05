import { html, nothing } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { property } from 'lit/decorators.js';
import { DarkglowElement } from '@base/DarkglowElement';
import styles from './styles';

type TypographyType = 'title' | 'subtitle' | 'text';

class TypographyComponent extends DarkglowElement {
  static styles = styles;

  @property({ type: String, reflect: true })
  variant = 'default';

  @property({ type: String, reflect: true })
  type: TypographyType = 'text';

  @property({ type: Boolean, attribute: 'light-off', reflect: true })
  lightOff = false;

  @property({ type: Number, attribute: 'glow-spread', reflect: true })
  glowSpread = 1;

  private getTagName() {
    if (this.type === 'title') return 'h1';
    if (this.type === 'subtitle') return 'h2';
    return 'p';
  }

  private getGlowColor() {
    switch (this.variant) {
      case 'primary':
        return 'var(--color-primary)';
      case 'secondary':
        return 'var(--color-secondary)';
      case 'danger':
        return 'var(--color-danger)';
      case 'accent':
        return 'var(--color-accent)';
      default:
        return this.type === 'subtitle' ? 'var(--color-secondary)' : 'var(--color-primary)';
    }
  }

  private getGlowStyles() {
    if (this.lightOff || this.type === 'text') {
      return nothing;
    }

    const spread = Number.isFinite(this.glowSpread) ? Math.max(this.glowSpread, 0) : 1;
    const glowColor = this.getGlowColor();
    const blurA = `${Math.round(5 * spread)}px`;
    const blurB = `${Math.round(10 * spread)}px`;
    const blurC = `${Math.round(15 * spread)}px`;

    return styleMap({
      '--typography-glow-color': glowColor,
      '--typography-glow-shadow': `0 0 ${blurA} ${glowColor}, 0 0 ${blurB} ${glowColor}, 0 0 ${blurC} ${glowColor}`,
      '--typography-glow-hover': `0 0 ${Math.round(15 * spread)}px ${glowColor}`
    });
  }

  render() {
    const tag = this.getTagName();
    const classes = `typography ${this.type} ${this.variant} ${this.lightOff ? 'light-off' : ''}`;

    if (tag === 'h1') {
      return html`<h1 class=${classes} style=${this.getGlowStyles()}><slot></slot></h1>`;
    }

    if (tag === 'h2') {
      return html`<h2 class=${classes} style=${this.getGlowStyles()}><slot></slot></h2>`;
    }

    return html`<p class=${classes}><slot></slot></p>`;
  }
}

export default TypographyComponent;
