import { readFileSync } from "fs";
import { OdfAttributeName } from "../OdfAttributeName";
import { OdfElement } from "../OdfElement";
import { OdfElementName } from "../OdfElementName";
import { IImageStyle } from "../style/IImageStyle";
import { ImageStyle } from "../style/ImageStyle";

const MINIMAL_SIZE = 1;
const ENCODING = "base64";

/**
 * This class represents an image in a paragraph.
 *
 * @since 0.3.0
 */
export class Image extends OdfElement {
  private style: IImageStyle;
  private height: number | undefined;
  private width: number | undefined;

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
    (document.firstChild as Element).setAttribute("xmlns:draw", "urn:oasis:names:tc:opendocument:xmlns:drawing:1.0");

    const frameElement = document.createElement(OdfElementName.DrawFrame);
    parent.appendChild(frameElement);

    this.embedImage(document, frameElement);

    this.style.toXml(document, frameElement);
    this.setFrameAttributes(frameElement);

    super.toXml(document, frameElement);
  }

  /**
   * Sets the attributes for the image frame.
   *
   * @param {Element} frameElement The element which will take the attribute
   */
  private setFrameAttributes(frameElement: Element): void {
    if (this.width !== undefined) {
      frameElement.setAttribute(OdfAttributeName.SvgWidth, + this.width + "mm");
    }

    if (this.height !== undefined) {
      frameElement.setAttribute(OdfAttributeName.SvgHeight, + this.height + "mm");
    }
  }

  /**
   * Creates the image element and embeds the denoted image base64 encoded binary data.
   *
   * @param {Document} document The XML document
   * @param {Element} frameElement The parent node in the DOM (`draw:frame`)
   */
  private embedImage(document: Document, frameElement: Element): void {
    const image = document.createElement(OdfElementName.DrawImage);
    frameElement.appendChild(image);

    const binaryData = document.createElement(OdfElementName.OfficeBinaryData);
    image.appendChild(binaryData);

    const rawImage = readFileSync(this.path);
    const base64Image = rawImage.toString(ENCODING);
    const textNode = document.createTextNode(base64Image);
    binaryData.appendChild(textNode);
  }
}
