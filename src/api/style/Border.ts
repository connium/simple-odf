import { BorderStyle } from './BorderStyle';
import { Color } from './Color';

export interface Border {
  width: number;
  style: BorderStyle;
  color: Color;
}
