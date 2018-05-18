import { OdfElement } from "../OdfElement";
import { OdfElementName } from "../OdfElementName";
import { Paragraph } from "./Paragraph";

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
    const listItemElement = document.createElement(OdfElementName.TextListItem);
    parent.appendChild(listItemElement);

    super.toXml(document, listItemElement);
  }
}
