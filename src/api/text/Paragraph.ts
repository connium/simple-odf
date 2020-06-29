import { Image } from '../draw';
import { ParagraphStyle } from '../style';
import { OdfElement } from '../OdfElement';
import { Hyperlink } from './Hyperlink';
import { OdfTextElement } from './OdfTextElement';

/**
 * This class represents a paragraph.
 *
 * @example
 * document.getBody().addParagraph('Some text')
 *   .addText('\nEven more text')
 *   .addImage('/home/homer/myself.png');
 *
 * @since 0.1.0
 */
export class Paragraph extends OdfElement {
  private style: ParagraphStyle | undefined;
  private styleName: string | undefined;

  /**
   * Creates a `Paragraph` instance.
   *
   * @example
   * new Paragraph('Some text');
   * new Paragraph();
   *
   * @param {string} [text] The text content of the paragraph; defaults to an empty string if omitted
   * @since 0.1.0
   */
  public constructor(text?: string) {
    super();

    this.addText(text ?? '');
  }

  /**
   * Appends the specified text to the end of the paragraph.
   *
   * @example
   * new Paragraph('Some text')      // Some text
   *   .addText('\nEven more text'); // Some text\nEven more text
   *
   * @param {string} text The additional text content
   * @returns {Paragraph} The `Paragraph` object
   * @since 0.1.0
   */
  public addText(text: string): Paragraph {
    const elements = this.getAll();

    if (
      elements.length > 0 &&
      elements[elements.length - 1].constructor.name === OdfTextElement.name
    ) {
      const lastElement = elements[elements.length - 1] as OdfTextElement;
      lastElement.setText(lastElement.getText() + text);
      return this;
    }

    this.append(new OdfTextElement(text));

    return this;
  }

  /**
   * Returns the text content of the paragraph.
   * Note: This will only return the text; other elements and markup will be omitted.
   *
   * @example
   * const paragraph = new Paragraph('Some text, ');
   * paragraph.addHyperlink('some linked text');
   * paragraph.addText(', even more text');
   * paragraph.getText(); // Some text, some linked text, even more text
   *
   * @returns {string} The text content of the paragraph
   * @since 0.1.0
   */
  public getText(): string {
    return this.getAll()
      .map((value: OdfElement) => {
        return value instanceof OdfTextElement ? value.getText() : '';
      })
      .join('');
  }

  /**
   * Sets the text content of the paragraph.
   * Note: This will replace any existing content of the paragraph.
   *
   * @example
   * new Paragraph('Some text')     // Some text
   *   .setText('Some other text'); // Some other text
   *
   * @param {string} text The new text content
   * @returns {Paragraph} The `Paragraph` object
   * @since 0.1.0
   */
  public setText(text: string): Paragraph {
    this.removeText();
    this.addText(text ?? '');

    return this;
  }

  /**
   * Appends the specified text as hyperlink to the end of the paragraph.
   *
   * @example
   * new Paragraph('Some text, ')         // Some text,
   *   .addHyperlink('some linked text'); // Some text, some linked text
   *
   * @param {string} text The text content of the hyperlink
   * @param {string} uri The target URI of the hyperlink
   * @returns {Hyperlink} The added `Hyperlink` object
   * @since 0.3.0
   */
  public addHyperlink(text: string, uri: string): Hyperlink {
    const hyperlink = new Hyperlink(text, uri);
    this.append(hyperlink);

    return hyperlink;
  }

  /**
   * Appends the image of the denoted path to the end of the paragraph.
   * The current paragraph will be set as anchor for the image.
   *
   * @example
   * new Paragraph('Some text')
   *   .addImage('/home/homer/myself.png');
   *
   * @param {string} path The path to the image file
   * @returns {Image} The added `Image` object
   * @since 0.3.0
   */
  public addImage(path: string): Image {
    const image = new Image(path);
    this.append(image);

    return image;
  }

  /**
   * Sets the new style of the paragraph.
   * To reset the style, `undefined` must be given.
   *
   * If style and style name are both set, the custom style will be set and the common style will be ignored.
   *
   * @example
   * new Paragraph('Some text')
   *   .setStyle(new ParagraphStyle());
   *
   * @param {ParagraphStyle | undefined} style The new style or `undefined` to reset the style
   * @returns {Paragraph} The `Paragraph` object
   * @since 0.3.0
   */
  public setStyle(style: ParagraphStyle | undefined): Paragraph {
    this.style = style;

    return this;
  }

  /**
   * Returns the style of the paragraph.
   *
   * @example
   * const paragraph = new Paragraph('Some text');
   * paragraph.getStyle();                     // undefined
   * paragraph.setStyle(new ParagraphStyle());
   * paragraph.getStyle();                     // previously set style
   *
   * @returns {ParagraphStyle | undefined} The style of the paragraph or `undefined` if no style was set
   * @since 0.3.0
   */
  public getStyle(): ParagraphStyle | undefined {
    return this.style;
  }

  /**
   * Sets the name of the common style that should be applied to the paragraph.
   * To reset the common style, `undefined` must be given.
   *
   * If style and style name are both set, the custom style will be set and the common style will be ignored.
   *
   * @example
   * new Paragraph('Some text')
   *   .setStyleName('Summary');
   *
   * @param {string | undefined} styleName The name of the common style or `undefined` to reset the common style
   * @returns {Paragraph} The `Paragraph` object
   * @since 0.9.0
   */
  public setStyleName(styleName: string | undefined): Paragraph {
    this.styleName = styleName;

    return this;
  }

  /**
   * Returns the name of the common style of the paragraph.
   *
   * @example
   * const paragraph = new Paragraph('Some text');
   * paragraph.getStyleName();         // undefined
   * paragraph.setStyleName('Summary);
   * paragraph.getStyleName();         // 'Summary'
   *
   * @returns {string | undefined} The name of the common style or `undefined` if no common style was set
   * @since 0.3.0
   */
  public getStyleName(): string | undefined {
    return this.styleName;
  }

  /**
   * Removes the text content of the paragraph.
   *
   * @example
   * new Paragraph('Some text') // Some text
   *   .removeText();           // ''
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
