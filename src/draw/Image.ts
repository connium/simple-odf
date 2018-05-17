import { readFileSync } from "fs";
import { OdfAttributeName } from "../OdfAttributeName";
import { OdfElement } from "../OdfElement";
import { OdfElementName } from "../OdfElementName";

const DEFAULT_ANCHOR_TYPE = "paragraph";
const ENCODING = "base64";

/**
 * This class represents an image in a paragraph.
 *
 * @since 0.3.0
 */
export class Image extends OdfElement {
  /**
   * Creates an image
   *
   * @param {string} path Path to the image file that should be embedded
   * @since 0.3.0
   */
  public constructor(private path: string) {
    super();
  }

  /** @inheritDoc */
  protected toXml(document: Document, parent: Element): void {
    (document.firstChild as Element).setAttribute("xmlns:draw", "urn:oasis:names:tc:opendocument:xmlns:drawing:1.0");

    const frame = document.createElement(OdfElementName.DrawFrame);
    frame.setAttribute(OdfAttributeName.TextAnchorType, DEFAULT_ANCHOR_TYPE);
    parent.appendChild(frame);

    const image = document.createElement(OdfElementName.DrawImage);
    frame.appendChild(image);

    const binaryData = document.createElement(OdfElementName.OfficeBinaryData);
    image.appendChild(binaryData);

    const rawImage = readFileSync(this.path);
    const base64Image = rawImage.toString(ENCODING);
    const textNode = document.createTextNode(base64Image);
    binaryData.appendChild(textNode);

    super.toXml(document, frame);
  }
}
