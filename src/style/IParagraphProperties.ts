import { HorizontalAlignment } from "./HorizontalAlignment";
import { TabStop } from "./TabStop";
import { TabStopType } from "./TabStopType";

/**
 * This class represents the styling properties of a paragraph.
 *
 * @since 0.4.0
 */
export interface IParagraphProperties {
  /**
   * Sets the horizontal alignment setting of this paragraph.
   *
   * @param {HorizontalAlignment} horizontalAlignment The horizontal alignment setting
   * @returns {IParagraphProperties} The `IParagraphProperties` object
   * @since 0.1.0
   */
  setHorizontalAlignment(horizontalAlignment: HorizontalAlignment): IParagraphProperties;

  /**
   * Returns the horizontal alignment setting of this paragraph.
   *
   * @returns {HorizontalAlignment} The horizontal alignment setting
   * @since 0.2.0
   */
  getHorizontalAlignment(): HorizontalAlignment;

  /**
   * Inserts a new page break to the document before the corresponding element.
   *
   * @returns {IParagraphProperties} The `IParagraphProperties` object
   * @since 0.1.0
   */
  setPageBreakBefore(): IParagraphProperties;

  /**
   * Keeps paragraph lines on the same page (page break before paragraph if necessary).
   *
   * @returns {IParagraphProperties} The `IParagraphProperties` object
   * @since 0.6.0
   */
  setKeepTogether(keepTogether?: boolean): IParagraphProperties;

  /**
   * Adds a new tab stop to this style.
   * If a tab stop at the same position already exists, the new tab stop will not be added.
   * The tab stops will be ordered by their position.
   *
   * @param {number} position The position of the tab stop in centimeters relative to the left margin.
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
   * @returns {IParagraphProperties} The `IParagraphProperties` object
   * @since 0.3.0
   */
  clearTabStops(): IParagraphProperties;
}
