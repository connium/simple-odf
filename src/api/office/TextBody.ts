import { OdfElement } from '../OdfElement';
import { Heading, List, Paragraph } from '../text';

/**
 * This class represents the content of a text document.
 *
 * @example
 * const body = document.getBody();
 * body.addHeading('My document');
 * body.addParagraph('This is the first paragraph');
 * body.addHeading('Subheadline', 2);
 *
 * @since 0.7.0
 */
export class TextBody extends OdfElement {
  /**
   * Adds a heading at the end of the document.
   * If a text is given, this will be set as text content of the heading.
   *
   * @param {string} [text] The text content of the heading
   * @param {number} [level=1] The heading level; defaults to 1 if omitted
   * @returns {Heading} The newly added heading
   * @since 0.7.0
   */
  public addHeading (text?: string, level = 1): Heading {
    const heading = new Heading(text, level);
    this.append(heading);

    return heading;
  }

  /**
   * Adds an empty list at the end of the document.
   *
   * @example
   * new TextBody()
   *   .addList();
   *
   * @returns {List} The newly added list
   * @since 0.7.0
   */
  public addList (): List {
    const list = new List();
    this.append(list);

    return list;
  }

  /**
   * Adds a paragraph at the end of the document.
   * If a text is given, this will be set as text content of the paragraph.
   *
   * @param {string} [text] The text content of the paragraph
   * @returns {Paragraph} The newly added paragraph
   * @since 0.7.0
   */
  public addParagraph (text?: string): Paragraph {
    const paragraph = new Paragraph(text);
    this.append(paragraph);

    return paragraph;
  }
}
