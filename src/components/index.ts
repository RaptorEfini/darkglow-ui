// Import components
import ButtonComponent from '@atoms/button';
import ButtonGroupComponent from '@atoms/button-group';
import AlertComponent from '@atoms/alert';
import CardComponent from '@atoms/card';
import ColorInputComponent from '@atoms/color-input';
import ContainerComponent from '@atoms/container';
import FieldComponent from '@atoms/field';
import FaderComponent from '@atoms/fader';
import GridComponent from '@atoms/grid';
import InputComponent from '@atoms/input';
import KnobComponent from '@atoms/knob';
import ModalComponent from '@atoms/modal';
import PadComponent from '@atoms/pad';
import SelectComponent from '@atoms/select';
import TextareaComponent from '@atoms/textarea';
import TypographyComponent from '@atoms/typography';
import LayoutComponent from '@templates/layout';

// Apc40
import { Apc40ClipLaunch } from '@molecules/apc40-clip-launch';

// Import registry
import { componentRegistry, ComponentDefinition } from '@components/registry';

// Export components
export { 
  AlertComponent,
  ButtonComponent,
  ButtonGroupComponent,
  CardComponent,
  ColorInputComponent,
  ContainerComponent,
  FieldComponent,
  FaderComponent,
  GridComponent,
  InputComponent,
  KnobComponent,
  ModalComponent,
  PadComponent,
  SelectComponent,
  TextareaComponent,
  TypographyComponent,
  LayoutComponent
};

// Register all components with the registry
const components: Record<string, ComponentDefinition> = {
  // Atoms
  alert: { component: AlertComponent, tagName: 'alert' },
  button: { component: ButtonComponent, tagName: 'button' },
  buttonGroup: { component: ButtonGroupComponent, tagName: 'button-group' },
  card: { component: CardComponent, tagName: 'card' },
  colorInput: { component: ColorInputComponent, tagName: 'color-input' },
  container: { component: ContainerComponent, tagName: 'container' },
  field: { component: FieldComponent, tagName: 'field' },
  fader: { component: FaderComponent, tagName: 'fader' },
  grid: { component: GridComponent, tagName: 'grid' },
  input: { component: InputComponent, tagName: 'input' },
  knob: { component: KnobComponent, tagName: 'knob' },
  modal: { component: ModalComponent, tagName: 'modal' },
  pad: { component: PadComponent, tagName: 'pad' },
  select: { component: SelectComponent, tagName: 'select' },
  textarea: { component: TextareaComponent, tagName: 'textarea' },
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
