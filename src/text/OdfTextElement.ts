import { OdfElement } from "../OdfElement";
import { OdfElementName } from "../OdfElementName";

/**
 * This class represents text in a paragraph.
 *
 * @since 0.3.0
 */
export class OdfTextElement extends OdfElement {
  /**
   * Creates a text
   *
   * @param {string} text The text content
   * @since 0.3.0
   */
  public constructor(private text: string) {
    super();
  }

  /**
   * Sets the new text content.
   *
   * @param {string} text The new text content
   * @since 0.3.0
   */
  public setText(text: string): void {
    this.text = text;
  }

  /**
   * Returns the text content.
   *
   * @returns {string} The text content
   * @since 0.3.0
   */
  public getText(): string {
    return this.text;
  }

  /** @inheritDoc */
  protected toXML(document: Document, parent: Element): void {
    if (this.text === undefined || this.text === "") {
      return;
    }

    const lines = this.text.split("\n");

    for (let i = 0; i < lines.length; i++) {
      if (i > 0) {
        const lineBreak = document.createElement(OdfElementName.TextLineBreak);
        parent.appendChild(lineBreak);
      }

      const textNode = document.createTextNode(lines[i]);
      parent.appendChild(textNode);
    }
  }
}
