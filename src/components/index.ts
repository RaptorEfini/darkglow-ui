// Import components
import ButtonComponent from './atoms/button';
import ButtonGroupComponent from './atoms/button-group';
import CardComponent from './atoms/card';
import ContainerComponent from './atoms/container';
import FaderComponent from './atoms/fader';
import GridComponent from './atoms/grid';
import KnobComponent from './atoms/knob';
import PadComponent from './atoms/pad';
import TypographyComponent from './atoms/typography';
import LayoutComponent from './templates/layout';

// Export components
export { 
  ButtonComponent,
  ButtonGroupComponent,
  CardComponent,
  ContainerComponent,
  FaderComponent,
  GridComponent,
  KnobComponent,
  PadComponent,
  TypographyComponent,
  LayoutComponent
};

// Helper function to register all components
export function registerComponents(prefix = 'darkglow') {
  customElements.define(`${prefix}-button`, ButtonComponent);
  customElements.define(`${prefix}-button-group`, ButtonGroupComponent);
  customElements.define(`${prefix}-card`, CardComponent);
  customElements.define(`${prefix}-container`, ContainerComponent);
  customElements.define(`${prefix}-fader`, FaderComponent);
  customElements.define(`${prefix}-grid`, GridComponent);
  customElements.define(`${prefix}-knob`, KnobComponent);
  customElements.define(`${prefix}-pad`, PadComponent);
  customElements.define(`${prefix}-typography`, TypographyComponent);
  customElements.define(`${prefix}-layout`, LayoutComponent);
}
