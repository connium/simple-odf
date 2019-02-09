import { OdfAttributeName } from "../OdfAttributeName";
import { OdfTextElement } from "./OdfTextElement";
import { TextElementName } from "./TextElementName";

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
  protected toXml(document: Document, parent: Element): void {
    const text = this.getText();

    if (text === undefined || text === "") {
      return;
    }

    if (this.uri === undefined || this.uri === "") {
      return super.toXml(document, parent);
    }

    const hyperlink = document.createElement(TextElementName.TextHyperlink);
    parent.appendChild(hyperlink);
    hyperlink.setAttribute(OdfAttributeName.XlinkType, LINK_TYPE);
    hyperlink.setAttribute(OdfAttributeName.XlinkHref, this.uri);

    const textNode = document.createTextNode(text);
    hyperlink.appendChild(textNode);
  }
}
