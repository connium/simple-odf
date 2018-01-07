import { OdfAttributeName } from "../OdfAttributeName";
import { OdfElement } from "../OdfElement";
import { OdfElementName } from "../OdfElementName";
import { HorizontalAlignment } from "../style/HorizontalAlignment";
import { Style } from "../style/Style";

/**
 * This class represents a paragraph.
 * If a text is given, this will be set as text content of the paragraph.
 *
 * @since 0.1.0
 */
export class Paragraph extends OdfElement {
  private text: string | undefined;
  private style: Style;

  /**
   * Creates a paragraph
   *
   * @param {string} [text] The optional text content of the paragraph
   * @since 0.1.0
   */
  public constructor(text?: string) {
    super();

    this.text = text;
    this.style = new Style();
  }

  /**
   * Sets the text content of this paragraph.
   *
   * @param {string} text The text content
   * @since 0.1.0
   */
  public setTextContent(text: string): void {
    this.text = text;
  }

  /**
   * Returns the text content of this paragraph.
   *
   * @returns {string | undefined} The text content of this paragraph
   * @since 0.1.0
   */
  public getTextContent(): string | undefined {
    return this.text;
  }

  /**
   * Appends the given text at the end of this paragraph.
   *
   * @param {string} text The additional text content
   * @since 0.1.0
   */
  public appendTextContent(text: string): void {
    if (this.text === undefined) {
      this.text = text;
      return;
    }

    this.text += text;
  }

  /**
   * Removes the text content of this paragraph.
   *
   * @since 0.1.0
   */
  public removeTextContent(): void {
    this.text = undefined;
  }

  /**
   * Inserts a new page break to the document before this paragraph.
   *
   * @since 0.1.0
   */
  public setPageBreak(): void {
    this.style.setPageBreakBefore(true);
  }

  /**
   * TODO
   *
   * @param horizontalAlignment TODO
   * @since 0.1.0
   */
  public setHorizontalAlignment(horizontalAlignment: HorizontalAlignment): void {
    this.style.setHorizontalAlignment(horizontalAlignment);
  }

  /**
   * Creates the paragraph element.
   *
   * @param {Document} document The XML document
   * @since 0.1.0
   */
  protected createElement(document: Document): Element {
    return document.createElement(OdfElementName.TextParagraph);
  }

  /** @inheritDoc */
  protected toXML(document: Document, parent: Element): void {
    const paragraph = this.createElement(document);

    this.appendStyle(document, paragraph); // TODO test
    this.appendText(document, paragraph);

    parent.appendChild(paragraph);

    super.toXML(document, paragraph);
  }

  /**
   * Appends the style of the paragraph.
   *
   * @param {Document} document The XML document
   * @param {Element} paragraph The paragraph the text belongs to
   */
  private appendStyle(document: Document, paragraph: Element): void {
    this.style.toXML(document);

    if (this.style.isDefault() === false) {
      paragraph.setAttribute(OdfAttributeName.TextStyleName, this.style.getName());
    }
  }

  /**
   * Appends the text of the paragraph.
   * Newlines will be replaced with line breaks.
   *
   * @param {Document} document The XML document
   * @param {Element} paragraph The paragraph the text belongs to
   */
  private appendText(document: Document, paragraph: Element): void {
    if (this.text === undefined) {
      return;
    }

    (document.firstChild as Element).setAttribute("xmlns:text", "urn:oasis:names:tc:opendocument:xmlns:text:1.0");

    const lines = this.text.split("\n");

    for (let i = 0; i < lines.length; i++) {
      if (i > 0) {
        const lineBreak = document.createElement(OdfElementName.TextLineBreak);
        paragraph.appendChild(lineBreak);
      }

      const textNode = document.createTextNode(lines[i]);
      paragraph.appendChild(textNode);
    }
  }
}
