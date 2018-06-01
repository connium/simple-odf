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
   * @since 0.5.0
   */
  setAnchorType(anchorType: AnchorType): void;

  /**
   * Returns the anchor type setting of this image.
   *
   * @returns {AnchorType} The anchor type setting
   * @since 0.5.0
   */
  getAnchorType(): AnchorType;

  /**
   * Transforms the image style into Open Document Format.
   *
   * @param {Document} document The XML document
   * @param {Element} parent The parent node in the DOM (`draw:frame`)
   * @since 0.5.0
   */
  toXml(document: Document, parent: Element): void;
}
