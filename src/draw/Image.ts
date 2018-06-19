import { readFileSync } from "fs";
import { OdfElement } from "../OdfElement";
import { OdfElementName } from "../OdfElementName";
import { IImageStyle } from "../style/IImageStyle";
import { ImageStyle } from "../style/ImageStyle";
import { DrawElementName } from "./DrawElementName";

const ENCODING = "base64";

/**
 * This class represents an image in a paragraph.
 *
 * @since 0.3.0
 */
export class Image extends OdfElement {
  private style: IImageStyle;

  /**
   * Creates an image
   *
   * @param {string} path Path to the image file that should be embedded
   * @since 0.3.0
   */
  public constructor(private path: string) {
    super();

    this.style = new ImageStyle();
  }

  /**
   * Sets the new style of this image.
   *
   * @param {IImageStyle} style The new style
   * @since 0.5.0
   */
  public setStyle(style: IImageStyle): void {
    this.style = style;
  }

  /**
   * Returns the style of this image.
   *
   * @returns {IImageStyle} The style of the image
   * @since 0.5.0
   */
  public getStyle(): IImageStyle {
    return this.style;
  }

  /** @inheritDoc */
  protected toXml(document: Document, parent: Element): void {
    const frameElement = document.createElement(DrawElementName.DrawFrame);
    parent.appendChild(frameElement);

    this.embedImage(document, frameElement);

    this.style.toXml(frameElement);

    super.toXml(document, frameElement);
  }

  /**
   * Creates the image element and embeds the denoted image base64 encoded binary data.
   *
   * @param {Document} document The XML document
   * @param {Element} frameElement The parent node in the DOM (`draw:frame`)
   */
  private embedImage(document: Document, frameElement: Element): void {
    const image = document.createElement(DrawElementName.DrawImage);
    frameElement.appendChild(image);

    const binaryData = document.createElement(OdfElementName.OfficeBinaryData);
    image.appendChild(binaryData);

    const rawImage = readFileSync(this.path);
    const base64Image = rawImage.toString(ENCODING);
    const textNode = document.createTextNode(base64Image);
    binaryData.appendChild(textNode);
  }
}
