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

// Apc40
import { Apc40ClipLaunch } from './molecules/apc40-clip-launch';

// Import registry
import { componentRegistry, ComponentDefinition } from './registry';

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

// Register all components with the registry
const components: Record<string, ComponentDefinition> = {
  // Atoms
  button: { component: ButtonComponent, tagName: 'button' },
  buttonGroup: { component: ButtonGroupComponent, tagName: 'button-group' },
  card: { component: CardComponent, tagName: 'card' },
  container: { component: ContainerComponent, tagName: 'container' },
  fader: { component: FaderComponent, tagName: 'fader' },
  grid: { component: GridComponent, tagName: 'grid' },
  knob: { component: KnobComponent, tagName: 'knob' },
  pad: { component: PadComponent, tagName: 'pad' },
  typography: { component: TypographyComponent, tagName: 'typography' },
  
  // Templates
  layout: { component: LayoutComponent, tagName: 'layout' },
  
  // Molecules - APC40 (no prefix)
  apc40ClipLaunch: { component: Apc40ClipLaunch, tagName: 'apc40-clip-launch', usePrefix: false }
};

// Register all components with the registry
componentRegistry.registerBulk(components);

// Helper function to register all components
export function registerComponents(prefix = 'darkglow') {
  componentRegistry.defineAll(prefix);
}
