import { AnchorType } from "./AnchorType";

/**
 * This class represents the style of an image
 *
 * @since 0.5.0
 */
export interface IImageStyle {
  /**
   * Sets the anchor type setting of this image.
   *
   * @param {AnchorType} anchorType The anchor type setting
   * @returns {IImageStyle} The `IImageStyle` object
   * @since 0.5.0
   */
  setAnchorType(anchorType: AnchorType): IImageStyle;

  /**
   * Returns the anchor type setting of this image.
   *
   * @returns {AnchorType} The anchor type setting
   * @since 0.5.0
   */
  getAnchorType(): AnchorType;

  /**
   * Sets the target height of the image.
   *
   * @param {number} height The target height of the image in millimeter
   * @returns {IImageStyle} The `IImageStyle` object
   * @since 0.5.0
   */
  setHeight(height: number): IImageStyle;

  /**
   * Returns the target height of the image or `undefined` if no height was set.
   *
   * @returns {number | undefined} The target height of the image in millimeter or `undefined` if no height was set
   * @since 0.5.0
   */
  getHeight(): number | undefined;

  /**
   * Sets the target width of the image.
   *
   * @param {number} width The target width of the image in millimeter
   * @returns {IImageStyle} The `IImageStyle` object
   * @since 0.5.0
   */
  setWidth(width: number): IImageStyle;

  /**
   * Returns the target width of the image or `undefined` if no width was set.
   *
   * @returns {number | undefined} The target width of the image in millimeter or `undefined` if no width was set
   * @since 0.5.0
   */
  getWidth(): number | undefined;

  /**
   * Sets the target size of the image.
   *
   * @param {number} width The target width of the image in millimeter
   * @param {number} height The target height of the image in millimeter
   * @returns {IImageStyle} The `IImageStyle` object
   * @since 0.5.0
   */
  setSize(width: number, height: number): IImageStyle;

  /**
   * Transforms the image style into Open Document Format.
   *
   * @param {Element} parent The parent node in the DOM (`draw:frame`)
   * @since 0.5.0
   */
  toXml(parent: Element): void;
}
