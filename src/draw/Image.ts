import { readFileSync } from "fs";
import { OdfElement } from "../OdfElement";

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
  protected toXML(document: Document, parent: Element): void {
    // TODO
    (document.firstChild as Element).setAttribute("xmlns:draw", "urn:oasis:names:tc:opendocument:xmlns:drawing:1.0");

    const frame = document.createElement("draw:frame"); // TODO
    frame.setAttribute("text:anchor-type", "paragraph"); // TODO

    const image = document.createElement("draw:image"); // TODO
    frame.appendChild(image);

    const binaryData = document.createElement("office:binary-data"); // TODO
    image.appendChild(binaryData);

    const rawImage = readFileSync(this.path);
    const base64Image = rawImage.toString("base64");
    const textNode = document.createTextNode(base64Image);
    binaryData.appendChild(textNode);

    parent.appendChild(frame);

    super.toXML(document, frame);
  }
}
