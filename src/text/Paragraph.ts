import { Image } from "../draw/Image";
import { OdfAttributeName } from "../OdfAttributeName";
import { OdfElement } from "../OdfElement";
import { OdfElementName } from "../OdfElementName";
import { HorizontalAlignment } from "../style/HorizontalAlignment";
import { Style } from "../style/Style";
import { Hyperlink } from "./HyperLink";
import { Text } from "./Text";

/**
 * This class represents a paragraph.
 * If a text is specified, this will be set as text content of the paragraph.
 *
 * @since 0.1.0
 */
export class Paragraph extends OdfElement {
  private style: Style;

  /**
   * Creates a paragraph
   *
   * @param {string} [text] The optional text content of the paragraph
   * @since 0.1.0
   */
  public constructor(text?: string) {
    super();

    this.appendText(text || "");

    this.style = new Style();
  }

  /**
   * Returns the text content of this paragraph.
   * Note: This will only return the text; other elements and markup will be omitted.
   *
   * @returns {string} The text content of this paragraph
   * @since 0.1.0
   */
  public getText(): string {
    return this.getElements()
      .map((value: OdfElement) => {
        return value instanceof Text ? value.getText() : "";
      })
      .join("");
  }

  /**
   * Appends the specified text to the end of this paragraph.
   *
   * @param {string} text The additional text content
   * @since 0.1.0
   */
  public appendText(text: string): void {
    const elements = this.getElements();

    if (elements.length > 0 && elements[elements.length - 1].constructor.name === Text.name) {
      const lastElement = elements[elements.length - 1] as Text;
      lastElement.setText(lastElement.getText() + text);
      return;
    }

    this.appendElement(new Text(text));
  }

  /**
   * Sets the text content of this paragraph.
   * Note: This will replace any existing content of the paragraph.
   *
   * @param {string} text The text content
   * @since 0.1.0
   */
  public setText(text: string): void {
    this.removeText();
    this.appendText(text || "");
  }

  /**
   * Removes the text content of this paragraph.
   *
   * @since 0.1.0
   */
  public removeText(): void {
    const elements = this.getElements();

    for (let i = elements.length - 1; i >= 0; i--) {
      this.removeElement(i);
    }
  }

  /**
   * Appends the specified text as hyperlink to the end of this paragraph.
   *
   * @param {string} text The text content of the hyperlink
   * @param {string} uri The URI of the hyperlink
   * @since 0.3.0
   */
  public appendHyperlink(text: string, uri: string): void {
    this.appendElement(new Hyperlink(text, uri));
  }

  /**
   * Appends the image of the denoted path to the end of this paragraph.
   * The current paragraph will be set as anchor for the image.
   *
   * @param {string} path The path to the image file
   * @since 0.3.0
   */
  public appendImage(path: string): void {
    this.appendElement(new Image(path));
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
   * Returns the horizontal alignment setting of this paragraph.
   *
   * @returns {HorizontalAlignment} The horizontal alignment setting
   * @since 0.2.0
   */
  public getHorizontalAlignment(): HorizontalAlignment {
    return this.style.getHorizontalAlignment();
  }

  /**
   * Sets the horizontal alignment setting of this paragraph.
   *
   * @param {HorizontalAlignment} horizontalAlignment The horizontal alignment setting
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
    (document.firstChild as Element).setAttribute("xmlns:text", "urn:oasis:names:tc:opendocument:xmlns:text:1.0");

    const paragraph = this.createElement(document);

    this.appendStyle(document, paragraph);

    parent.appendChild(paragraph);

    super.toXML(document, paragraph);
  }

  /**
   * Appends the style of the paragraph to the XML document.
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
}
