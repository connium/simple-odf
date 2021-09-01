import { Color } from './Color';
import { LineMode } from './LineMode';
import { LineStyle } from './LineStyle';
import { LineType } from './LineType';
import { LineWidth } from './LineWidth';

/**
 * @since 2.1.0
 */
export type TextLine = {
  color: 'font-color' | Color;
  mode: LineMode;
  style: LineStyle;
  type: LineType;
  width: LineWidth | number;
};
