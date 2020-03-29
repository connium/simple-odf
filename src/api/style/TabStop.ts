import { Color } from './Color';
import { TabStopLeaderStyle } from './TabStopLeaderStyle';
import { TabStopType } from './TabStopType';

/**
 * This class represents a tab stop.
 *
 * Tab stops are used to align text in a paragraph.
 * To become effective they must be set to the style of the respective paragraph.
 *
 * @example
 * const tabStop = new TabStop(40)
 *   .setLeaderColor(Color.fromRgb(1, 2, 3))
 *   .setLeaderStyle(TabStopLeaderStyle.Dotted);
 *
 * @example
 * const tabStop = new TabStop(40, TabStopType.Char)
 *   .setChar('~');
 *
 * @since 0.3.0
 */
export class TabStop {
  private char: string | undefined;
  private leaderColor: Color | undefined;
  private leaderStyle: TabStopLeaderStyle;

  /**
   * Creates a `TabStop` instance that represents the settings of a tab stop.
   *
   * @example
   * const tabStop = new TabStop(23);                     // 23mm, TabStopType.Left
   * const tabStop = new TabStop(23, TabStopType.Center); // 23mm, TabStopType.Center
   *
   * @param {number} position The position of the tab stop in millimeters relative to the left margin.
   * If a negative value is given, the `position` will be set to `0`.
   * @param {TabStopType} [type=TabStopType.Left] The type of the tab stop
   * @since 0.3.0
   */
  public constructor(
    private position: number,
    private type = TabStopType.Left
  ) {
    this.setPosition(position);
    this.leaderStyle = TabStopLeaderStyle.None;
  }

  /**
   * The `getChar()` method returns delimiter character for tab stops of type `char`.
   *
   * @example
   * const tabStop = new TabStop(23, TabStopType.Char);
   * tabStop.getChar();    // undefined
   * tabStop.setChar('~');
   * tabStop.getChar();    // '~'
   *
   * @returns {string | undefined} The delimiter character or `undefined` if the delimiter character is not set
   * @since 0.10.0
   */
  public getChar(): string | undefined {
    return this.char;
  }

  /**
   * The `setChar()` method sets the delimiter character for tab stops of type `char`.
   *
   * If an illegal value is provided, the value will be ignored.
   *
   * @example
   * const tabStop = new TabStop(23, TabStopType.Char);
   * tabStop.setChar('~');       // '~'
   * tabStop.setChar('foo');     // '~'
   * tabStop.setChar(undefined); // undefined
   *
   * @param {string | undefined} char The delimiter character or `undefined` to unset the delimiter character
   * @returns {TabStop} The `TabStop` object
   * @since 0.10.0
   */
  public setChar(char: string | undefined): TabStop {
    if (char === undefined || char.length === 1) {
      this.char = char;
    }

    return this;
  }

  /**
   * The `getLeaderColor()` method returns the color of a leader line.
   *
   * @example
   * const tabStop = new TabStop(23);
   * tabStop.getLeaderColor();                           // `undefined`
   * tabStop.setLeaderColor(Color.fromRgb(255, 128, 0));
   * tabStop.getLeaderColor();                           // yellow color
   *
   * @returns {Color | undefined} The color of a leader line or `undefined` if the current text color will be used
   * @since 0.10.0
   */
  public getLeaderColor(): Color | undefined {
    return this.leaderColor;
  }

  /**
   * The `setLeaderColor()` method sets the color of a leader line.
   *
   * @example
   * const tabStop = new TabStop(23);
   * tabStop.setLeaderColor(Color.fromRgb(255, 128, 0));
   * tabStop.setLeaderColor(undefined);
   *
   * @param {Color | undefined} color The color of a leader line or `undefined` if the current text color will be used
   * @returns {TabStop} The `TabStop` object
   * @since 0.10.0
   */
  public setLeaderColor(color: Color | undefined): TabStop {
    this.leaderColor = color;

    return this;
  }

  /**
   * The `getLeaderStyle()` method returns the style for a leader line.
   *
   * @example
   * const tabStop = new TabStop(23);
   * tabStop.getLeaderStyle();                          // TabStopLeaderStyle.None
   * tabStop.setLeaderStyle(TabStopLeaderStyle.Dotted);
   * tabStop.getLeaderStyle();                          // TabStopLeaderStyle.Dotted
   *
   * @returns {TabStopLeaderStyle} The style for a leader line
   * @since 0.10.0
   */
  public getLeaderStyle(): TabStopLeaderStyle {
    return this.leaderStyle;
  }

  /**
   * The `setLeaderStyle()` method sets the style for a leader line.
   *
   * @example
   * const tabStop = new TabStop(23);
   * tabStop.setLeaderStyle(TabStopLeaderStyle.Dotted);
   *
   * @param {TabStopLeaderStyle} leaderStyle The style for a leader line
   * @returns {TabStop} The `TabStop` object
   * @since 0.10.0
   */
  public setLeaderStyle(leaderStyle: TabStopLeaderStyle): TabStop {
    this.leaderStyle = leaderStyle;

    return this;
  }

  /**
   * The `getPosition` method returns the position of the tab stop which is interpreted as being relative
   * to the left margin or the left indent.
   *
   * @example
   * const tabStop = new TabStop(23);
   * tabStop.getPosition();   // 23
   * tabStop.setPosition(42);
   * tabStop.getPosition();   // 42
   *
   * @returns {number} The position of the tab stop in millimeters
   * @since 0.3.0
   */
  public getPosition(): number {
    return this.position;
  }

  /**
   * The `setPosition` method sets the position of the tab stop which is interpreted as being relative
   * to the left margin or the left indent.
   *
   * @example
   * const tabStop = new TabStop(23); // 23 mm
   * tabStop.setPosition(42);         // 42 mm
   * tabStop.setPosition(-7);         // 0 mm
   *
   * @param {number} position The position of the tab stop in millimeters.
   * If a negative value is given, the `position` will be set to `0`.
   * @returns {TabStop} The `TabStop` object
   * @since 0.3.0
   */
  public setPosition(position: number): TabStop {
    this.position = Math.max(position, 0);

    return this;
  }

  /**
   * The `getType` method returns the type of the tab stop.
   *
   * @example
   * const tabStop = new TabStop(23);
   * font.getType();                   // TabStopType.Left
   * font.setType(TabStopType.Center);
   * font.getType();                   // TabStopType.Center
   *
   * @returns {TabStopType} The type of the tab stop
   * @since 0.3.0
   */
  public getType(): TabStopType {
    return this.type;
  }

  /**
   * The `setType` method sets the type of the tab stop.
   *
   * @example
   * const tabStop = new TabStop(23);     // TabStopType.Left
   * tabStop.setType(TabStopType.Center); // TabStopType.Center
   *
   * @param {TabStopType} type The type of the tab stop
   * @returns {TabStop} The `TabStop` object
   * @since 0.3.0
   */
  public setType(type: TabStopType): TabStop {
    this.type = type;

    return this;
  }
}
