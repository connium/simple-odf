import { OdfAttributeName } from "../OdfAttributeName";
import { AnchorType } from "./AnchorType";
import { IImageStyle } from "./IImageStyle";

const DEFAULT_ANCHOR_TYPE = AnchorType.Paragraph;

/**
 * This class represents the style of an image
 *
 * @since 0.5.0
 */
export class ImageStyle implements IImageStyle {
  private anchorType: AnchorType;

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

  /** @inheritDoc */
  public toXml(document: Document, parent: Element): void {
    this.setFrameAttributes(parent);
  }

  /**
   * Sets the attributes for the image frame.
   *
   * @param {Element} frameElement The element which will take the attribute
   */
  private setFrameAttributes(frameElement: Element): void {
    frameElement.setAttribute(OdfAttributeName.TextAnchorType, this.anchorType);
  }
}
