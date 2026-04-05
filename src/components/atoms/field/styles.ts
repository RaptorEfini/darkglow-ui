import { css, unsafeCSS } from 'lit';
import rawStyles from './styles.css?inline';

export default css`${unsafeCSS(rawStyles)}`;
