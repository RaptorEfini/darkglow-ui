import { BaseComponentProps, ComponentOrientation, ComponentVariant } from '@/types';

/**
 * Interface for Fader component properties
 */
export interface FaderProps extends BaseComponentProps {
  /**
   * Current value of the fader
   * @default 50
   */
  value: number;
  
  /**
   * Minimum value of the fader
   * @default 0
   */
  min: number;
  
  /**
   * Maximum value of the fader
   * @default 100
   */
  max: number;
  
  /**
   * Visual variant of the fader
   * @default 'primary'
   */
  variant: ComponentVariant;
  
  /**
   * Orientation of the fader
   * @default 'vertical'
   */
  orientation: ComponentOrientation;
  
  /**
   * Sensitivity of the fader movement
   * @default 1
   */
  sensitivity: number;
}

/**
 * Interface for Fader component events
 */
export interface FaderEvents {
  /**
   * Event fired when the fader value changes
   */
  change: CustomEvent<{ value: number }>;
}

/**
 * Default values for Fader component properties
 */
export const DEFAULT_FADER_PROPS: FaderProps = {
  value: 50,
  min: 0,
  max: 100,
  disabled: false,
  variant: 'primary',
  orientation: 'vertical',
  sensitivity: 1
};