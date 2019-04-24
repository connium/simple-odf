import { TabStopType } from './TabStopType';

/**
 * This class represents a tab stop.
 *
 * Tab stops are used to align text in a paragraph.
 * To become effective they must be set to the style of the respective paragraph.
 *
 * @example
 * // creates a right aligned tab stop with a distance of 40 mm from the left margin
 * const tabStop40 = new TabStop(40, TabStopType.Right);
 * paragraph.getStyle().addTabStop(tabStop40);
 *
 * @since 0.3.0
 */
export class TabStop {
  /**
   * Creates a tab stop to be set to the style of a paragraph.
   *
   * @param {number} [position] The position of the tab stop in millimeters relative to the left margin.
   * If a negative value is given, the `position` will be set to `0`.
   * @param {TabStopType} [type] The type of the tab stop. Defaults to `TabStopType.Left`.
   * @since 0.3.0
   */
  public constructor (private position: number, private type = TabStopType.Left) {
    this.setPosition(position);
  }

  /**
   * Sets the position of this tab stop.
   *
   * @param {number} position The position of the tab stop in millimeters relative to the left margin.
   * If a negative value is given, the `position` will be set to `0`.
   * @since 0.3.0
   */
  public setPosition (position: number): void {
    this.position = Math.max(position, 0);
  }

  /**
   * Returns the position of this tab stop.
   *
   * @returns {number} The position of this tab stop in millimeters
   * @since 0.3.0
   */
  public getPosition (): number {
    return this.position;
  }

  /**
   * Sets the type of this tab stop.
   *
   * @param {TabStopType} type The type of the tab stop
   * @since 0.3.0
   */
  public setType (type: TabStopType): void {
    this.type = type;
  }

  /**
   * Returns the type of this tab stop.
   *
   * @returns {TabStopType} The type of this tab stop
   * @since 0.3.0
   */
  public getType (): TabStopType {
    return this.type;
  }
}
