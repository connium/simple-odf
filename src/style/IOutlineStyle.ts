import { IOutlineLevelStyle } from "./IOutlineLevelStyle";

export interface IOutlineStyle {
  getOutlineLevelStyle(level: number): IOutlineLevelStyle | undefined;
}
