import { OdfElement } from '../OdfElement';
import { Heading } from './Heading';
import { List } from './List';
import { Paragraph } from './Paragraph';

/**
 * This class represents an item in a list.
 *
 * @example
 * const listItem = new ListItem();
 * listItem.addHeading('headline');
 * listItem.addParagraph('paragraph');
 * const subList = listItem.addList();
 *
 * @since 0.2.0
 */
export class ListItem extends OdfElement {
  /**
   * Creates a `ListItem` instance that represents an item in a list.
   *
   * @example
   * new ListItem();
   *
   * @since 0.2.0
   */
  public constructor() {
    super();
  }

  /**
   * Adds a heading at the end of the list item.
   * If a text is given, this will be set as text content of the heading.
   *
   * @param {string} [text] The text content of the heading
   * @param {number} [level=1] The heading level; defaults to 1 if omitted
   * @returns {Heading} The newly added heading
   * @since 0.11.0
   */
  public addHeading(text?: string, level = 1): Heading {
    const heading = new Heading(text, level);
    this.append(heading);

    return heading;
  }

  /**
   * Adds an empty list at the end of the list item.
   *
   * @example
   * new ListItem()
   *   .addList();
   *
   * @returns {List} The newly added list
   * @since 0.11.0
   */
  public addList(): List {
    const list = new List();
    this.append(list);

    return list;
  }

  /**
   * Adds a paragraph at the end of the list item.
   * If a text is given, this will be set as text content of the paragraph.
   *
   * @param {string} [text] The text content of the paragraph
   * @returns {Paragraph} The newly added paragraph
   * @since 0.11.0
   */
  public addParagraph(text?: string): Paragraph {
    const paragraph = new Paragraph(text);
    this.append(paragraph);

    return paragraph;
  }
}
