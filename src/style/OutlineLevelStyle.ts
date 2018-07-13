import { IOutlineLevelStyle } from "./IOutlineLevelStyle";
import { LabelFollowedBy } from "./LabelFollowedBy";
import { NumberingFormat } from "./NumberingFormat";

const DEFAULT_LABEL_FOLLOWED_BY = LabelFollowedBy.TabStop;
const DEFAULT_NUMBERING_FORMAT = NumberingFormat.None;
const START_POSITION = 0.75;
const LEVEL_OFFSET = 0.25;

/**
 * This class represents the style of a paragraph.
 *
 * @implements IOutlineLevelStyle
 * @since 0.6.0
 */
export class OutlineLevelStyle implements IOutlineLevelStyle {
  private labelFollowedBy: LabelFollowedBy;
  private listTabStopPosition: number;
  private marginLeft: number;
  private numberingFormat: NumberingFormat;
  private textIndent: number;

  /**
   * Constructor.
   */
  public constructor(private level: number) {
    const indent = START_POSITION + level * LEVEL_OFFSET;

    this.labelFollowedBy = DEFAULT_LABEL_FOLLOWED_BY;
    this.listTabStopPosition = indent;
    this.marginLeft = indent;
    this.numberingFormat = DEFAULT_NUMBERING_FORMAT;
    this.textIndent = -indent;
  }

  /** @inheritDoc */
  public getLevel(): number {
    return this.level;
  }

  /** @inheritDoc */
  public setNumberingFormat(numberingFormat: NumberingFormat): void {
    this.numberingFormat = numberingFormat;
  }

  /** @inheritDoc */
  public getNumberingFormat(): NumberingFormat {
    return this.numberingFormat;
  }

  /** @inheritDoc */
  public setMarginLeft(margin: number): void {
    this.marginLeft = margin;
  }

  /** @inheritDoc */
  public getMarginLeft(): number {
    return this.marginLeft;
  }

  /** @inheritDoc */
  public setTextIndent(indent: number): void {
    this.textIndent = indent;
  }

  /** @inheritDoc */
  public getTextIndent(): number {
    return this.textIndent;
  }

  /** @inheritDoc */
  public setLabelFollowedBy(labelFollowedBy: LabelFollowedBy): void {
    this.labelFollowedBy = labelFollowedBy;
  }

  /** @inheritDoc */
  public getLabelFollowedBy(): LabelFollowedBy {
    return this.labelFollowedBy;
  }

  /** @inheritDoc */
  public setTabStopPosition(position: number): void {
    this.listTabStopPosition = position;
  }

  /** @inheritDoc */
  public getTabStopPosition(): number {
    return this.listTabStopPosition;
  }

  /**
   * Transforms the style element into Open Document Format.
   *
   * @param {Document} document The XML document
   * @param {Element} parent The parent node in the DOM (`text:outline-style`)
   * @since 0.6.0
   */
  public toXml(document: Document, parent: Element): void {
    const outlineLevelStyleElement = document.createElement("text:outline-level-style");
    parent.appendChild(outlineLevelStyleElement);

    outlineLevelStyleElement.setAttribute("text:level", this.level.toString(10));
    outlineLevelStyleElement.setAttribute("style:num-format", this.numberingFormat);

    const listLevelPropertiesElement = document.createElement("style:list-level-properties");
    outlineLevelStyleElement.appendChild(listLevelPropertiesElement);

    listLevelPropertiesElement.setAttribute("text:list-level-position-and-space-mode", "label-alignment");

    const listLevelLabelAlignmentElement = document.createElement("style:list-level-label-alignment");
    listLevelPropertiesElement.appendChild(listLevelLabelAlignmentElement);

    listLevelLabelAlignmentElement.setAttribute("text:label-followed-by", "listtab");
    listLevelLabelAlignmentElement.setAttribute("text:list-tab-stop-position", this.listTabStopPosition.toString(10));
    listLevelLabelAlignmentElement.setAttribute("fo:text-indent", this.textIndent.toString(10));
    listLevelLabelAlignmentElement.setAttribute("fo:margin-left", this.marginLeft.toString(10));
  }
}
