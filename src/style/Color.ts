/**
 * This class represents a Color.
 *
 * @since 0.4.0
 */
export class Color {
  /**
   * The `Color.fromHex()` method parses a string argument and returns a color.
   * The string is expected to be in `#rrggbb` or `rrggbb` format.
   *
   * @param {string} value The value you want to parse
   * @returns {Color | never} A color parsed from the given value
   * @throws {Error} If the value cannot be converted to a color
   * @since 0.4.0
   */
  public static fromHex(value: string): Color | never {
    const matches = value.match(/^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/);
    if (matches === null) {
      throw new Error("Invalid color value");
    }

    return new Color(parseInt(matches[1], 16), parseInt(matches[2], 16), parseInt(matches[3], 16));
  }

  /**
   * The `Color.fromRgb()` method returns a color with the channel arguments.
   *
   * @param {number} red The red channel of the color with a range of 0...255
   * @param {number} green The green channel of the color with a range of 0...255
   * @param {number} blue The blue channel of the color with a range of 0...255
   * @returns {Color | never} A color parsed from the given value
   * @throws {Error} If any channel is outside the allowable range
   * @since 0.4.0
   */
  public static fromRgb(red: number, green: number, blue: number): Color | never {
    if (Color.checkRange(red) && Color.checkRange(green) && Color.checkRange(blue)) {
      return new Color(red, green, blue);
    }
    throw new Error("Invalid value for a color channel");
  }

  /**
   * The `Color.checkRange()` method determines whether the passed value is inside the allowable range.
   *
   * @param {number} value The value to be tested
   * @returns {boolean} A `Boolean` indicating whether or not the given value is inside the allowable range
   * @since 0.4.0
   * @private
   */
  private static checkRange(value: number): boolean {
    return value >= 0 && value <= 255;
  }

  /**
   * The `Color.numberToHex()` method returns a string representing the number argument as a two-character hex string.
   *
   * @param {number} value The number value to convert
   * @returns {string} A string representing the given number value
   * @since 0.4.0
   * @private
   */
  private static numberToHex(value: number): string {
    const hexString = value.toString(16);
    if (hexString.length === 2) {
      return hexString;
    }

    return "0" + hexString;
  }

  /**
   * Creates a new color with the specified channel values.
   *
   * @param {number} red The red channel of the color
   * @param {number} green The green channel of the color
   * @param {number} blue The blue channel of the color
   * @since 0.4.0
   * @private
   */
  private constructor(private red: number, private green: number, private blue: number) {
  }

  /**
   * The toHex() method returns a string representing the color as hex string.
   *
   * @returns {string} A hex string representing the color
   * @since 0.4.0
   */
  public toHex(): string {
    return `#${Color.numberToHex(this.red)}${Color.numberToHex(this.green)}${Color.numberToHex(this.blue)}`;
  }
}
