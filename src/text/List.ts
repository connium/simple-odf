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
   * @param {string | ListItem} [item] The text content of the new item or the item to add
   * @returns {ListItem} The newly added list item
   * @since 0.2.0
   */
  public addItem(item?: string | ListItem): ListItem {
    if (item instanceof ListItem) {
      this.append(item);
      return item;
    }

    const listItem = new ListItem(item);
    this.append(listItem);

    return listItem;
  }

  /**
   * Inserts a new list item with the specified text or inserts the specified item at the specified position.
   * The item is inserted before the item at the specified position.
   *
   * @param {number} position The index at which to insert the list item (starting from 0).
   * @param {string | ListItem} item The text content of the new item or the item to insert
   * @returns {ListItem} The newly added list item
   * @since 0.2.0
   */
  public insertItem(position: number, item: string | ListItem): ListItem {
    if (item instanceof ListItem) {
      this.insert(position, item);
      return item;
    }

    const listItem = new ListItem(item);
    this.insert(position, listItem);

    return listItem;
  }

  /**
   * Returns the item at the specified position in this list.
   * If an invalid position is given, undefined is returned.
   *
   * @param {number} position The index of the requested the list item (starting from 0).
   * @returns {ListItem | undefined} The list item at the specified position
   * or undefined if there is no list item at the specified position
   * @since 0.2.0
   */
  public getItem(position: number): ListItem | undefined {
    return this.get(position) as ListItem;
  }

  /**
   * Returns all list items.
   *
   * @returns {ListItem[]} A copy of the list of list items
   * @since 0.2.0
   */
  public getItems(): ListItem[] {
    return this.getAll() as ListItem[];
  }

  /**
   * Removes the list item from the specified position.
   *
   * @param {number} position The index of the list item to remove (starting from 0).
   * @returns {ListItem | undefined} The removed list item
   * or undefined if there is no list item at the specified position
   * @since 0.2.0
   */
  public removeItemAt(position: number): ListItem | undefined {
    return this.removeAt(position) as ListItem;
  }

  /**
   * Removes all items from this list.
   *
   * @since 0.2.0
   */
  public clear(): void {
    let removedElement;

    do {
      removedElement = this.removeAt(0);
    } while (removedElement !== undefined);
  }

  /**
   * Returns the number of items in this list.
   *
   * @returns {number} The number of items in this list
   * @since 0.2.0
   */
  public size(): number {
    return this.getAll().length;
  }

  /** @inheritDoc */
  protected toXml(document: Document, parent: Element): void {
    if (this.hasChildren() === false) {
      return;
    }

    const listElement = document.createElement(OdfElementName.TextList);
    parent.appendChild(listElement);

    super.toXml(document, listElement);
  }
}
