import { OdfElement } from "../OdfElement";
import { Paragraph } from "./Paragraph";
import { TextElementName } from "./TextElementName";

/**
 * This class represents an item in a list.
 *
 * @since 0.2.0
 */
export class ListItem extends OdfElement {
  private paragraph: Paragraph;

  /**
   * Creates a list item
   *
   * @param {string} [text] The text content of the list item
   * @since 0.2.0
   */
  public constructor(text?: string) {
    super();

    this.paragraph = new Paragraph(text);
    this.append(this.paragraph);
  }

  /** @inheritDoc */
  protected toXml(document: Document, parent: Element): void {
    const listItemElement = document.createElement(TextElementName.TextListItem);
    parent.appendChild(listItemElement);

    super.toXml(document, listItemElement);
  }
}
