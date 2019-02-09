import { TextBody } from "../../api/office/TextBody";
import { OdfElementName } from "../../OdfElementName";
import { IWriter } from "../IWriter";

/**
 * XML writer for {@link TextBody} elements
 * 
 * @implements {IWriter}
 * @since 0.7.0
 */
export class TextBodyWriter implements IWriter<TextBody> {
  /**
   * @inheritdoc
   * @since 0.7.0
   */
  public write(document: Document, root: Element, textBody: TextBody): void {
    const bodyElement = document.createElement(OdfElementName.OfficeBody);
    root.appendChild(bodyElement);

    const textElement = document.createElement(OdfElementName.OfficeText);
    bodyElement.appendChild(textElement);

    (<any>textBody).toXml(document, textElement);
  }
}
