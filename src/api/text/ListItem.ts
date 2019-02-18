import { OdfElement } from '../OdfElement';
import { Paragraph } from './Paragraph';

/**
 * This class represents an item in a list.
 *
 * @example
 * const list = document.getBody()
 *   .addList()
 *   .addItem('First item');
 *
 * @since 0.2.0
 */
export class ListItem extends OdfElement {
  private paragraph: Paragraph;

  /**
   * Creates a `ListItem` instance that represents an item in a list.
   *
   * @example
   * new ListItem('First item');
   *
   * @param {string} [text=''] The text content of the list item; defaults to an empty string if omitted
   * @since 0.2.0
   */
  public constructor (text?: string) {
    super();

    this.paragraph = new Paragraph(text);
    this.append(this.paragraph);
  }
}
