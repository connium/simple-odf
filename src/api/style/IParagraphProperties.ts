import { HorizontalAlignment } from './HorizontalAlignment';
import { PageBreak } from './PageBreak';
import { TabStop } from './TabStop';
import { TabStopType } from './TabStopType';

/**
 * This class represents the styling properties of a paragraph.
 *
 * TODO improve documentation
 *
 * @since 0.4.0
 */
export interface IParagraphProperties {
  /**
   * Sets the horizontal alignment setting of this paragraph.
   *
   * @param {HorizontalAlignment} horizontalAlignment The horizontal alignment setting
   * @since 0.1.0
   */
  setHorizontalAlignment (horizontalAlignment: HorizontalAlignment): void;

  /**
   * Returns the horizontal alignment setting of this paragraph.
   *
   * @returns {HorizontalAlignment} The horizontal alignment setting
   * @since 0.2.0
   */
  getHorizontalAlignment (): HorizontalAlignment;

  /**
   * Keeps paragraph lines on the same page (page break before paragraph if necessary).
   *
   * @since 0.6.0
   */
  setKeepTogether (keepTogether?: boolean): void;

  /**
   * Returns whether the lines of the paragraph should be kept together.
   *
   * @returns {boolean} `true` if the paragraph lines should be kept together, `false` otherwise
   * @since 0.9.0
   */
  getKeepTogether (): boolean;

  /**
   * TODO
   *
   * @since 0.9.0
   */
  setKeepWithNext (keepWithNext?: boolean): void;

  /**
   * TODO
   *
   * @returns {boolean} `true` TODO, `false` otherwise
   * @since 0.9.0
   */
  getKeepWithNext (): boolean;

  /**
   * Sets the page break setting of the paragraph.
   *
   * @param {PageBreak} pageBreak The page break setting
   * @since 0.9.0
   */
  setPageBreak (pageBreak: PageBreak): void;

  /**
   * Returns the page break setting of the paragraph.
   *
   * @returns {PageBreak} The page break setting
   * @since 0.9.0
   */
  getPageBreak (): PageBreak;

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
  addTabStop (position: number, type: TabStopType): TabStop | undefined;

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
  addTabStop (tabStop: TabStop): TabStop | undefined;

  /**
   * Returns all tab stops.
   *
   * @returns {TabStop[]} A copy of the list of tab stops
   * @since 0.3.0
   */
  getTabStops (): TabStop[];

  /**
   * Removes all tab stops.
   *
   * @since 0.3.0
   */
  clearTabStops (): void;
}
