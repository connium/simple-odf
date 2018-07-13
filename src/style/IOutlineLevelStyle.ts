import { LabelFollowedBy } from "./LabelFollowedBy";
import { NumberingFormat } from "./NumberingFormat";

export interface IOutlineLevelStyle {
  getLevel(): number;
  setNumberingFormat(numberingFormat: NumberingFormat): void;
  getNumberingFormat(): NumberingFormat;
  setMarginLeft(margin: number): void;
  getMarginLeft(): number;
  setTextIndent(indent: number): void;
  getTextIndent(): number;
  setLabelFollowedBy(labelFollowedBy: LabelFollowedBy): void;
  getLabelFollowedBy(): LabelFollowedBy;
  setTabStopPosition(position: number): void;
  getTabStopPosition(): number;
}
