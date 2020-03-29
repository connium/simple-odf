import { Border } from './Border';
import { BorderStyle } from './BorderStyle';
import { Color } from './Color';
import { HorizontalAlignment } from './HorizontalAlignment';
import { HorizontalAlignmentLastLine } from './HorizontalAlignmentLastLine';
import { PageBreak } from './PageBreak';
import { TabStop } from './TabStop';
import { TabStopType } from './TabStopType';
import { VerticalAlignment } from './VerticalAlignment';

/**
 * This class represents the styling properties of a paragraph.
 *
 * TODO improve documentation
 *
 * @since 0.4.0
 */
export interface IParagraphProperties {
  /**
   * @since 0.9.0
   */
  setBackgroundColor(color: Color | undefined): void;

  /**
   * @since 0.9.0
   */
  getBackgroundColor(): Color | undefined;

  /**
   * @since 0.9.0
   */
  setBorder(width: number, style: BorderStyle, color: Color): void;

  /**
   * @since 0.9.0
   */
  removeBorder(): void;

  /**
   * @since 0.9.0
   */
  setBorderBottom(width: number, style: BorderStyle, color: Color): void;

  /**
   * @since 0.9.0
   */
  getBorderBottom(): Border | undefined;

  /**
   * @since 0.9.0
   */
  removeBorderBottom(): void;

  /**
   * @since 0.9.0
   */
  setBorderLeft(width: number, style: BorderStyle, color: Color): void;

  /**
   * @since 0.9.0
   */
  getBorderLeft(): Border | undefined;

  /**
   * @since 0.9.0
   */
  removeBorderLeft(): void;

  /**
   * @since 0.9.0
   */
  setBorderRight(width: number, style: BorderStyle, color: Color): void;

  /**
   * @since 0.9.0
   */
  getBorderRight(): Border | undefined;

  /**
   * @since 0.9.0
   */
  removeBorderRight(): void;

  /**
   * @since 0.9.0
   */
  setBorderTop(width: number, style: BorderStyle, color: Color): void;

  /**
   * @since 0.9.0
   */
  getBorderTop(): Border | undefined;

  /**
   * @since 0.9.0
   */
  removeBorderTop(): void;

  /**
   * Sets the horizontal alignment setting of this paragraph.
   *
   * @param {HorizontalAlignment} horizontalAlignment The horizontal alignment setting
   * @since 0.1.0
   */
  setHorizontalAlignment(horizontalAlignment: HorizontalAlignment): void;

  /**
   * Returns the horizontal alignment setting of this paragraph.
   *
   * @returns {HorizontalAlignment} The horizontal alignment setting
   * @since 0.2.0
   */
  getHorizontalAlignment(): HorizontalAlignment;

  /**
   * @since 0.9.0
   */
  setHorizontalAlignmentLastLine(
    horizontalAlignment: HorizontalAlignmentLastLine
  ): void;

  /**
   * @since 0.9.0
   */
  getHorizontalAlignmentLastLine(): HorizontalAlignmentLastLine;

  /**
   * Keeps paragraph lines on the same page (page break before paragraph if necessary).
   *
   * @since 0.6.0
   */
  setKeepTogether(keepTogether?: boolean): void;

  /**
   * Returns whether the lines of the paragraph should be kept together.
   *
   * @returns {boolean} `true` if the paragraph lines should be kept together, `false` otherwise
   * @since 0.9.0
   */
  getKeepTogether(): boolean;

  /**
   * @since 0.9.0
   */
  setKeepWithNext(keepWithNext?: boolean): void;

  /**
   * @since 0.9.0
   */
  getKeepWithNext(): boolean;

  /**
   * @since 0.9.0
   */
  setLineHeight(lineHeight: number | string | undefined): void;

  /**
   * @since 0.9.0
   */
  getLineHeight(): number | string | undefined;

  /**
   * @since 0.9.0
   */
  setLineHeightAtLeast(minimumLineHeight: number | undefined): void;

  /**
   * @since 0.9.0
   */
  getLineHeightAtLeast(): number | undefined;

  /**
   * @since 0.9.0
   */
  setLineSpacing(lineSpacing: number | undefined): void;

  /**
   * @since 0.9.0
   */
  getLineSpacing(): number | undefined;

  /**
   * @since 0.9.0
   */
  setMargin(
    marginLeft: number,
    marginRight: number,
    marginTop: number,
    marginBottom: number
  ): void;

  /**
   * @since 0.9.0
   */
  setMarginBottom(margin: number): void;

  /**
   * @since 0.9.0
   */
  getMarginBottom(): number;

  /**
   * @since 0.9.0
   */
  setMarginLeft(margin: number): void;

  /**
   * @since 0.9.0
   */
  getMarginLeft(): number;

  /**
   * @since 0.9.0
   */
  setMarginRight(margin: number): void;

  /**
   * @since 0.9.0
   */
  getMarginRight(): number;

  /**
   * @since 0.9.0
   */
  setMarginTop(margin: number): void;

  /**
   * @since 0.9.0
   */
  getMarginTop(): number;

  /**
   * @since 0.9.0
   */
  setOrphans(orphans: number | undefined): void;

  /**
   * @since 0.9.0
   */
  getOrphans(): number | undefined;

  /**
   * @since 0.9.0
   */
  setPadding(
    paddingLeft: number,
    paddingRight: number,
    paddingTop: number,
    paddingBottom: number
  ): void;

  /**
   * @since 0.9.0
   */
  setPaddingBottom(padding: number): void;

  /**
   * @since 0.9.0
   */
  getPaddingBottom(): number;

  /**
   * @since 0.9.0
   */
  setPaddingLeft(padding: number): void;

  /**
   * @since 0.9.0
   */
  getPaddingLeft(): number;

  /**
   * @since 0.9.0
   */
  setPaddingRight(padding: number): void;

  /**
   * @since 0.9.0
   */
  getPaddingRight(): number;

  /**
   * @since 0.9.0
   */
  setPaddingTop(padding: number): void;

  /**
   * @since 0.9.0
   */
  getPaddingTop(): number;

  /**
   * Sets the page break setting of the paragraph.
   *
   * @param {PageBreak} pageBreak The page break setting
   * @since 0.9.0
   */
  setPageBreak(pageBreak: PageBreak): void;

  /**
   * Returns the page break setting of the paragraph.
   *
   * @returns {PageBreak} The page break setting
   * @since 0.9.0
   */
  getPageBreak(): PageBreak;

  /**
   * @since 0.9.0
   */
  setTextIndent(textIndent: number): void;

  /**
   * @since 0.9.0
   */
  getTextIndent(): number;

  /**
   * @since 0.9.0
   */
  setVerticalAlignment(verticalAlignment: VerticalAlignment): void;

  /**
   * @since 0.9.0
   */
  getVerticalAlignment(): VerticalAlignment;

  /**
   * @since 0.9.0
   */
  setWidows(widows: number | undefined): void;

  /**
   * @since 0.9.0
   */
  getWidows(): number | undefined;

  /**
   * Adds a new tab stop to this style.
   * If a tab stop at the same position already exists, the new tab stop will not be added.
   * The tab stops will be ordered by their position.
   *
   * @param {number} position The position of the tab stop in millimeters relative to the left margin.
   * @param {TabStopType} type The type of the tab stop. Defaults to `TabStopType.Left`.
   * @returns {TabStop | undefined} The newly added tab stop
   * or `undefined` if a tab stop at the same position already exists
   * @since 0.3.0
   */
  addTabStop(position: number, type: TabStopType): TabStop | undefined;

  /**
   * Adds a new tab stop to this style.
   * If a tab stop at the same position already exists, the new tab stop will not be added.
   * The tab stops will be ordered by their position.
   *
   * @param {TabStop} tabStop The tab stop to add
   * @returns {TabStop | undefined} The newly added tab stop
   * or `undefined` if a tab stop at the same position already exists
   * @since 0.3.0
   */
  addTabStop(tabStop: TabStop): TabStop | undefined;

  /**
   * Returns all tab stops.
   *
   * @returns {TabStop[]} A copy of the list of tab stops
   * @since 0.3.0
   */
  getTabStops(): TabStop[];

  /**
   * Removes all tab stops.
   *
   * @since 0.3.0
   */
  clearTabStops(): void;
}
