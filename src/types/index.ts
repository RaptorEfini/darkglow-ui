/**
 * Common types used across the Darkglow UI project
 */

/**
 * Common component variants
 */
export type ComponentVariant = 
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'accent'
  | 'outlined'
  | 'default';

/**
 * Common component sizes
 */
export type ComponentSize = 
  | 'small'
  | 'default'
  | 'large';

/**
 * Common component orientations
 */
export type ComponentOrientation = 
  | 'horizontal'
  | 'vertical';

/**
 * Common component alignments
 */
export type ComponentAlignment = 
  | 'start'
  | 'center'
  | 'end';

/**
 * Common component positions
 */
export type ComponentPosition =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left';

/**
 * Base component properties interface
 * All component props interfaces should extend this
 */
export interface BaseComponentProps {
  /**
   * CSS classes to add to the component
   */
  className?: string;
  
  /**
   * Whether the component is disabled
   */
  disabled?: boolean;
}

/**
 * Event handler type for DOM events
 */
export type EventHandler<T extends Event> = (event: T) => void;

/**
 * Generic event handler type for custom events
 */
export type CustomEventHandler<T> = (event: CustomEvent<T>) => void;