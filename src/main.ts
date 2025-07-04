import ButtonComponent from './components/atoms/button';
import LayoutComponent from './components/templates/layout';
import ContainerComponent from './components/atoms/container';
import ButtonGroupComponent from './components/atoms/button-group';
import CardComponent from './components/atoms/card';
import TypographyComponent from './components/atoms/typography';
import KnobComponent from './components/atoms/knob';
import PadComponent from './components/atoms/pad';
import FaderComponent from './components/atoms/fader';

customElements.define('darkglow-button', ButtonComponent);
customElements.define('darkglow-layout', LayoutComponent);
customElements.define('darkglow-container', ContainerComponent);
customElements.define('darkglow-button-group', ButtonGroupComponent);
customElements.define('darkglow-card', CardComponent);
customElements.define('darkglow-typography', TypographyComponent);
customElements.define('darkglow-knob', KnobComponent);
customElements.define('darkglow-pad', PadComponent);
customElements.define('darkglow-fader', FaderComponent);
