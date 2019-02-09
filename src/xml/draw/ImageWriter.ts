import { IWriter } from "../IWriter";
import { Image } from "../../api/draw/Image";
import { DrawElementName } from "./DrawElementName";
import { OdfElementName } from "../../OdfElementName";
import { readFileSync } from "fs";

const ENCODING = "base64";

/**
 * TODO
 * 
 * @implements {IWriter}
 * @since 0.7.0
 */
export class ImageWriter implements IWriter<Image> {
  /**
   * @inheritdoc
   * @since 0.7.0
   */
  public write(document: Document, parent: Element, image: Image): void {
    const frameElement = document.createElement(DrawElementName.DrawFrame);
    parent.appendChild(frameElement);

    this.embedImage(document, frameElement, image);

    image.getStyle().toXml(frameElement);
  }

  /**
   * Creates the image element and embeds the denoted image base64 encoded binary data.
   *
   * @param {Document} document The XML document
   * @param {Element} frameElement The parent node in the DOM (`draw:frame`)
   * @param {Image} image The image
   * @private
   */
  private embedImage(document: Document, frameElement: Element, image: Image): void {
    const imageElement = document.createElement(DrawElementName.DrawImage);
    frameElement.appendChild(imageElement);

    const binaryData = document.createElement(OdfElementName.OfficeBinaryData);
    imageElement.appendChild(binaryData);

    const rawImage = readFileSync(image.getPath());
    const base64Image = rawImage.toString(ENCODING);
    const textNode = document.createTextNode(base64Image);
    binaryData.appendChild(textNode);
  }
}
