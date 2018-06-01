import { OdfAttributeName } from "../OdfAttributeName";
import { AnchorType } from "./AnchorType";
import { IImageStyle } from "./IImageStyle";

const DEFAULT_ANCHOR_TYPE = AnchorType.Paragraph;
const MINIMAL_SIZE = 1;

/**
 * This class represents the style of an image
 *
 * @since 0.5.0
 */
export class ImageStyle implements IImageStyle {
  private anchorType: AnchorType;
  private height: number | undefined;
  private width: number | undefined;

  /**
   * Constructor.
   */
  public constructor() {
    this.anchorType = DEFAULT_ANCHOR_TYPE;
  }

  /** @inheritDoc */
  public setAnchorType(anchorType: AnchorType): void {
    this.anchorType = anchorType;
  }

  /** @inheritDoc */
  public getAnchorType(): AnchorType {
    return this.anchorType;
  }

  /**
   * Sets the target height of the image.
   *
   * @param {number} height The target height of the image in millimeter
   * @since 0.5.0
   */
  public setHeight(height: number): void {
    this.height = Math.max(height, MINIMAL_SIZE);
  }

  /**
   * Returns the target height of the image or `undefined` if no height was set.
   *
   * @returns {number | undefined} The target height of the image in millimeter or `undefined` if no height was set
   * @since 0.5.0
   */
  public getHeight(): number | undefined {
    return this.height;
  }

  /**
   * Sets the target width of the image.
   *
   * @param {number} width The target width of the image in millimeter
   * @since 0.5.0
   */
  public setWidth(width: number): void {
    this.width = Math.max(width, MINIMAL_SIZE);
  }

  /**
   * Returns the target width of the image or `undefined` if no width was set.
   *
   * @returns {number | undefined} The target width of the image in millimeter or `undefined` if no width was set
   * @since 0.5.0
   */
  public getWidth(): number | undefined {
    return this.width;
  }

  /**
   * Sets the target size of the image.
   *
   * @param {number} width The target width of the image in millimeter
   * @param {number} height The target height of the image in millimeter
   * @since 0.5.0
   */
  public setSize(width: number, height: number): void {
    this.setWidth(width);
    this.setHeight(height);
  }

  /** @inheritDoc */
  public toXml(parent: Element): void {
    this.setFrameAttributes(parent);
  }

  /**
   * Sets the attributes for the image frame.
   *
   * @param {Element} frameElement The element which will take the attribute
   */
  private setFrameAttributes(frameElement: Element): void {
    frameElement.setAttribute(OdfAttributeName.TextAnchorType, this.anchorType);

    if (this.width !== undefined) {
      frameElement.setAttribute(OdfAttributeName.SvgWidth, + this.width + "mm");
    }

    if (this.height !== undefined) {
      frameElement.setAttribute(OdfAttributeName.SvgHeight, + this.height + "mm");
    }
  }
}
