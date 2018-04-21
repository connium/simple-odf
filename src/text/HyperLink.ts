import { OdfAttributeName } from "../OdfAttributeName";
import { OdfElementName } from "../OdfElementName";
import { OdfTextElement } from "./OdfTextElement";

const LINK_TYPE = "simple";

/**
 * This class represents a hyperlink in a paragraph.
 *
 * @since 0.3.0
 */
export class Hyperlink extends OdfTextElement {
  /**
   * Creates a hyperlink
   *
   * @param {string} text The text content of the hyperlink
   * @param {string} uri The target URI of the hyperlink
   * @since 0.3.0
   */
  public constructor(text: string, private uri: string) {
    super(text);
  }

  /**
   * Sets the target URI for this hyperlink.
   *
   * @param {string} uri The new target URI
   * @since 0.3.0
   */
  public setURI(uri: string): void {
    this.uri = uri;
  }

  /**
   * Returns the target URI of this hyperlink.
   *
   * @returns {string} The target URI
   * @since 0.3.0
   */
  public getURI(): string {
    return this.uri;
  }

  /** @inheritDoc */
  protected toXML(document: Document, parent: Element): void {
    const text = this.getText();

    if (text === undefined || text === "") {
      return;
    }

    if (this.uri === undefined) {
      return super.toXML(document, parent);
    }

    (document.firstChild as Element).setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");

    const hyperlink = document.createElement(OdfElementName.TextHyperlink);
    hyperlink.setAttribute(OdfAttributeName.XlinkType, LINK_TYPE);
    hyperlink.setAttribute(OdfAttributeName.XlinkHref, this.uri);
    parent.appendChild(hyperlink);

    const textNode = document.createTextNode(text);
    hyperlink.appendChild(textNode);
  }
}
