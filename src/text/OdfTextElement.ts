import { OdfElement } from "../OdfElement";
import { OdfElementName } from "../OdfElementName";

const SPACE = " ";

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

    let str = "";
    for (let index = 0; index < this.text.length; index++) {
      const currentChar = this.text.charAt(index);
      switch (currentChar) {
        case SPACE:
          str += currentChar;

          const count = this.findNextNonSpaceCharacter(this.text, index) - 1;
          if (count > 0) {
            this.appendTextNode(document, parent, str);
            this.appendSpaceNode(document, parent, count);
            str = "";
            index += count;
          }
          break;
        case "\n":
          this.appendTextNode(document, parent, str);
          this.appendLineBreakNode(document, parent);
          str = "";
          break;
        case "\t":
          this.appendTextNode(document, parent, str);
          this.appendTabNode(document, parent);
          str = "";
          break;
        default:
          str += currentChar;
          break;
      }
    }

    this.appendTextNode(document, parent, str);
  }

  /**
   * Creates a text node with the provided text and appends it to the parent element.
   *
   * @param {Document} document The XML document
   * @param {Element} parent The parent node
   * @param {string} text The text value of the text node
   * @since 0.3.0
   */
  private appendTextNode(document: Document, parent: Element, text: string): void {
    if (text.length === 0) {
      return;
    }

    const textNode = document.createTextNode(text);
    parent.appendChild(textNode);
  }

  /**
   * Creates a space node representing the specified number of space characters and appends it to the parent element.
   * If a single space character should be represented, the `c` attribute is omitted.
   *
   * @param {Document} document The XML document
   * @param {Element} parent The parent node
   * @param {number} count The number of space characters the node should represent
   * @since 0.3.0
   */
  private appendSpaceNode(document: Document, parent: Element, count: number): void {
    const space = document.createElement(OdfElementName.TextSpace);
    parent.appendChild(space);

    if (count > 1) {
      space.setAttribute("c", count.toString(10));
    }
  }

  /**
   * Creates a tabulation node and appends it to the parent element.
   *
   * @param {Document} document The XML document
   * @param {Element} parent The parent node
   * @since 0.3.0
   */
  private appendTabNode(document: Document, parent: Element): void {
    const tabulation = document.createElement(OdfElementName.TextTabulation);
    parent.appendChild(tabulation);
  }

  /**
   * Creates a line break node and appends it to the parent element.
   *
   * @param {Document} document The XML document
   * @param {Element} parent The parent node
   * @since 0.3.0
   */
  private appendLineBreakNode(document: Document, parent: Element): void {
    const lineBreak = document.createElement(OdfElementName.TextLineBreak);
    parent.appendChild(lineBreak);
  }

  /**
   * Finds the next non-space character and returns the number of space characters that occur before.
   *
   * @param {string} text The text to search in
   * @param {number} offset The index at which to start the search
   * @returns {number} The number of space characters before the next non-space character
   * @since 0.3.0
   */
  private findNextNonSpaceCharacter(text: string, offset: number): number {
    for (let index = offset; index < text.length; index++) {
      if (text.charAt(index) !== SPACE) {
        return index - offset;
      }
    }
    return text.length - offset;
  }
}
