import { Hyperlink } from "../../api/text/Hyperlink";
import { OdfAttributeName } from "../../OdfAttributeName";
import { TextElementName } from "../../text/TextElementName";
import { IWriter } from "../IWriter";

const LINK_TYPE = "simple";

/**
 * XML writer for {@link Hyperlink} elements
 *
 * @implements {IWriter}
 * @since 0.7.0
 */
export class HyperlinkWriter implements IWriter<Hyperlink> {
  /**
   * @inheritdoc
   * @since 0.7.0
   */
  public write(document: Document, parent: Element, hyperlink: Hyperlink): void {
    const text = hyperlink.getText();

    if (text === undefined || text === "") {
      return;
    }

    const hyperlinkElement = document.createElement(TextElementName.TextHyperlink);
    parent.appendChild(hyperlinkElement);
    hyperlinkElement.setAttribute(OdfAttributeName.XlinkType, LINK_TYPE);
    hyperlinkElement.setAttribute(OdfAttributeName.XlinkHref, hyperlink.getURI());

    const textNode = document.createTextNode(text);
    hyperlinkElement.appendChild(textNode);
  }
}
