import { IParagraphStyle } from "../../style/IParagraphStyle";
import { Image } from "../draw";
import { OdfElement } from "../OdfElement";
import { Hyperlink } from "./Hyperlink";
import { OdfTextElement } from "./OdfTextElement";

/**
 * This class represents a paragraph.
 *
 * @since 0.1.0
 */
export class Paragraph extends OdfElement {
  private style: IParagraphStyle | undefined;

  /**
   * Creates a paragraph
   *
   * @param {string} [text] The text content of the paragraph
   * @since 0.1.0
   */
  public constructor(text?: string) {
    super();

    this.addText(text || "");
  }

  /**
   * Appends the specified text to the end of this paragraph.
   *
   * @param {string} text The additional text content
   * @returns {Paragraph} The `Paragraph` object
   * @since 0.1.0
   */
  public addText(text: string): Paragraph {
    const elements = this.getAll();

    if (elements.length > 0 && elements[elements.length - 1].constructor.name === OdfTextElement.name) {
      const lastElement = elements[elements.length - 1] as OdfTextElement;
      lastElement.setText(lastElement.getText() + text);
      return this;
    }

    this.append(new OdfTextElement(text));

    return this;
  }

  /**
   * Returns the text content of this paragraph.
   * Note: This will only return the text; other elements and markup will be omitted.
   *
   * @returns {string} The text content of this paragraph
   * @since 0.1.0
   */
  public getText(): string {
    return this.getAll()
      .map((value: OdfElement) => {
        return value instanceof OdfTextElement ? value.getText() : "";
      })
      .join("");
  }

  /**
   * Sets the text content of this paragraph.
   * Note: This will replace any existing content of the paragraph.
   *
   * @param {string} text The new text content
   * @returns {Paragraph} The `Paragraph` object
   * @since 0.1.0
   */
  public setText(text: string): Paragraph {
    this.removeText();
    this.addText(text || "");

    return this;
  }

  /**
   * Appends the specified text as hyperlink to the end of this paragraph.
   *
   * @param {string} text The text content of the hyperlink
   * @param {string} uri The target URI of the hyperlink
   * @returns {Hyperlink} The newly added hyperlink
   * @since 0.3.0
   */
  public addHyperlink(text: string, uri: string): Hyperlink {
    const hyperlink = new Hyperlink(text, uri);
    this.append(hyperlink);

    return hyperlink;
  }

  /**
   * Appends the image of the denoted path to the end of this paragraph.
   * The current paragraph will be set as anchor for the image.
   *
   * @param {string} path The path to the image file
   * @returns {Image} The newly added image
   * @since 0.3.0
   */
  public addImage(path: string): Image {
    const image = new Image(path);
    this.append(image);

    return image;
  }

  /**
   * Sets the new style of this paragraph.
   * To reset the style, `undefined` must be given.
   *
   * @param {IParagraphStyle | undefined} style The new style or `undefined` to reset the style
   * @returns {Paragraph} The `Paragraph` object
   * @since 0.3.0
   */
  public setStyle(style: IParagraphStyle | undefined): Paragraph {
    this.style = style;

    return this;
  }

  /**
   * Returns the style of this paragraph.
   *
   * @returns {IParagraphStyle | undefined} The style of the paragraph or `undefined` if no style was set
   * @since 0.3.0
   */
  public getStyle(): IParagraphStyle | undefined {
    return this.style;
  }

  /**
   * Removes the text content of this paragraph.
   * 
   * @returns {Paragraph} The `Paragraph` object
   * @private
   */
  private removeText(): Paragraph {
    const elements = this.getAll();

    for (let index = elements.length - 1; index >= 0; index--) {
      this.removeAt(index);
    }

    return this;
  }
}
