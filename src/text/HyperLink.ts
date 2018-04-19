import { OdfAttributeName } from "../OdfAttributeName";
import { OdfElementName } from "../OdfElementName";
import { Text } from "./Text";

/**
 * This class represents a hyperlink in a paragraph.
 *
 * @since 0.3.0
 */
export class Hyperlink extends Text {
  /**
   * Creates a hyperlink
   *
   * @param {string} text The text content of the hyperlink
   * @param {string} uri The URI of the hyperlink
   * @since 0.3.0
   */
  public constructor(text: string, private uri: string) {
    super(text);
  }

  /**
   * Returns the URI of this hyperlink.
   *
   * @returns {string} The URI of this hyperlink
   * @since 0.3.0
   */
  public getURI(): string {
    return this.uri;
  }

  /**
   * Sets the URI for this hyperlink.
   *
   * @param {string} uri The new URI of this hyperlink
   * @since 0.3.0
   */
  public setURI(uri: string): void {
    this.uri = uri;
  }

  /** @inheritDoc */
  protected toXML(document: Document, parent: Element): void {
    const text = this.getText();

    if (text === undefined || text === "") {
      return;
    }

    (document.firstChild as Element).setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");

    const hyperlink = document.createElement(OdfElementName.TextHyperlink);
    hyperlink.setAttribute(OdfAttributeName.XlinkType, "simple");
    hyperlink.setAttribute(OdfAttributeName.XlinkHref, this.uri);

    const textNode = document.createTextNode(text);
    hyperlink.appendChild(textNode);

    parent.appendChild(hyperlink);
  }
}
