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
  public setAnchorType(anchorType: AnchorType): IImageStyle {
    this.anchorType = anchorType;

    return this;
  }

  /** @inheritDoc */
  public getAnchorType(): AnchorType {
    return this.anchorType;
  }

  /** @inheritDoc */
  public setHeight(height: number): IImageStyle {
    this.height = Math.max(height, MINIMAL_SIZE);

    return this;
  }

  /** @inheritDoc */
  public getHeight(): number | undefined {
    return this.height;
  }

  /** @inheritDoc */
  public setWidth(width: number): IImageStyle {
    this.width = Math.max(width, MINIMAL_SIZE);

    return this;
  }

  /** @inheritDoc */
  public getWidth(): number | undefined {
    return this.width;
  }

  /** @inheritDoc */
  public setSize(width: number, height: number): IImageStyle {
    this.setWidth(width);
    this.setHeight(height);

    return this;
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
