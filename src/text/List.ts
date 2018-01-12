import { OdfElement } from "../OdfElement";
import { OdfElementName } from "../OdfElementName";
import { ListItem } from "./ListItem";

/**
 * This class represents a list.
 * It can contain multiple list items.
 *
 * @since 0.2.0
 */
export class List extends OdfElement {
  /**
   * Creates a list
   *
   * @since 0.2.0
   */
  public constructor() {
    super();
  }

  /**
   * Adds a new list item with the specified text or adds the specified item to the list.
   *
   * @param {string | ListItem} [item] The optional text content of the new item or the item to add
   * @returns {ListItem} The added list item
   * @since 0.2.0
   */
  public addItem(item?: string | ListItem): ListItem {
    if (item instanceof ListItem) {
      this.appendElement(item);
      return item;
    }

    const listItem = new ListItem(item);
    this.appendElement(listItem);

    return listItem;
  }

  /**
   * Inserts a new list item with the specified text or inserts the specified item at the specified position.
   * The item is inserted before the item at the specified position.
   *
   * @param {number} position The index to insert. The start number is 0
   * @param {string | ListItem} item The text content of the new item or the item to insert
   * @returns {ListItem} The added list item
   * @since 0.2.0
   */
  public insertItem(position: number, item: string | ListItem): ListItem {
    if (item instanceof ListItem) {
      this.insertElement(position, item);
      return item;
    }

    const listItem = new ListItem(item);
    this.insertElement(position, listItem);

    return listItem;
  }

  /**
   * Returns the item at the specified position in this list.
   * If an invalid position is given, undefined is returned.
   *
   * @param {number} position The index to insert. The start number is 0
   * @returns {ListItem | undefined} The list item at the specified position or undefined if the position is invalid
   * @since 0.2.0
   */
  public getItem(position: number): ListItem | undefined {
    return this.getElement(position) as ListItem;
  }

  /**
   * Returns the item at the specified position in this list.
   * If an invalid position is given, undefined is returned.
   *
   * @returns {ListItem[]} The list item at the specified position or undefined if the position is invalid
   * @since 0.2.0
   */
  public getItems(): ListItem[] {
    return this.getElements() as ListItem[];
  }

  /**
   * Replaces the item at the specified position with the specified item.
   *
   * @param {number} position The position to put the specified item. The start number is 0
   * @param {string | ListItem} item The text content of the new item or the item to insert
   * @returns {ListItem | undefined} The previous item at the position or undefined if the position is invalid
   * @since 0.2.0
   */
  public setItem(position: number, item: string | ListItem): ListItem | undefined {
    const newItem = item instanceof ListItem ? item : new ListItem(item);

    return this.setElement(position, newItem) as ListItem;
  }

  /**
   * Removes the item at the specified position from this list.
   * If an invalid position is given, undefined is returned.
   *
   * @param {number} position The index of the item to be removed. The start number is 0
   * @returns {ListItem | undefined} The removed item or undefined if the position is invalid
   * @since 0.2.0
   */
  public removeItem(position: number): ListItem | undefined {
    return this.removeElement(position) as ListItem;
  }

  /**
   * Removes all items from this list.
   *
   * @since 0.2.0
   */
  public clear(): void {
    let removedElement;

    do {
      removedElement = this.removeElement(0);
    } while (removedElement !== undefined);
  }

  /**
   * Returns the number of items in this list.
   *
   * @returns {number} The number of items in this list
   * @since 0.2.0
   */
  public size(): number {
    return this.getElements().length;
  }

  /** @inheritDoc */
  protected toXML(document: Document, parent: Element): void {
    if (this.hasChildren() === false) {
      return;
    }

    const listElement = document.createElement(OdfElementName.TextList);

    parent.appendChild(listElement);

    super.toXML(document, listElement);
  }
}
