import { OdfElement } from "../OdfElement";
import { ListItem } from "./ListItem";

/**
 * This class represents a list and may contain any number list items.
 *
 * @example
 * const list = document.getBody().addList();
 * list.addItem("First item");
 * list.addItem("Second item");
 * list.insertItem(1, "After first item")
 * list.removeItemAt(2);
 *
 * @since 0.2.0
 */
export class List extends OdfElement {
  /**
   * Creates a `List` instance that represents a list.
   *
   * @example
   * new List();
   *
   * @since 0.2.0
   */
  public constructor() {
    super();
  }

  /**
   * The `addItem()` method adds a new list item with the specified text or adds the specified item to the list.
   *
   * @example
   * const list = new List();
   * list.addItem("First item");
   * list.addItem(new ListItem("Second item"));
   *
   * @param {string | ListItem} [item] The text content of the new item or the item to add
   * @returns {ListItem} The added `ListItem` object
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
   * The `insertItem` method inserts a new list item with the specified text
   * or inserts the specified item at the specified position.
   * The item is inserted before the item at the specified position.
   *
   * If the position is greater than the current number items, the new item is appended at the end of the list.
   * If the position is negative, the new item is inserted as first element.
   *
   * @example
   * const list = new List();
   * list.addItem("First item");             // "First item"
   * list.addItem("Second item");            // "First item", "Second item"
   * list.insertItem(1, "After first item"); // "First item", "After first item", "Second item"
   *
   * @param {number} position The index at which to insert the list item (starting from 0).
   * @param {string | ListItem} item The text content of the new item or the item to insert
   * @returns {ListItem} The inserted `ListItem` object
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
   * The `getItem()` method returns the item at the specified position in the list.
   * If an invalid position is given, undefined is returned.
   *
   * @example
   * const list = new List();
   * list.addItem("First item");
   * list.addItem("Second item");
   * list.getItem(1);             // "Second item"
   * list.getItem(2);             // undefined
   *
   * @param {number} position The index of the requested list item (starting from 0).
   * @returns {ListItem | undefined} The `ListItem` object at the specified position
   * or `undefined` if there is no list item at the specified position
   * @since 0.2.0
   */
  public getItem(position: number): ListItem | undefined {
    return this.get(position) as ListItem;
  }

  /**
   * The `getItems()` method returns all list items.
   *
   * @example
   * const list = new List();
   * list.getItems();             // []
   * list.addItem("First item");
   * list.addItem("Second item");
   * list.getItems();             // ["First item", "Second item"]
   *
   * @returns {ListItem[]} A copy of the list of `ListItem` objects
   * @since 0.2.0
   */
  public getItems(): ListItem[] {
    return this.getAll() as ListItem[];
  }

  /**
   * The `removeItemAt()` method removes the list item from the specified position.
   *
   * @example
   * const list = new List();
   * list.addItem("First item");
   * list.addItem("Second item");
   * list.removeItemAt(0);        // "First item"
   * list.getItems();             // ["Second item"]
   * list.removeItemAt(2);        // undefined
   *
   * @param {number} position The index of the list item to remove (starting from 0).
   * @returns {ListItem | undefined} The removed `ListItem` object
   * or undefined if there is no list item at the specified position
   * @since 0.2.0
   */
  public removeItemAt(position: number): ListItem | undefined {
    return this.removeAt(position) as ListItem;
  }

  /**
   * The `clear()` method removes all items from the list.
   *
   * @example
   * const list = new List();
   * list.addItem("First item");  // "First item"
   * list.addItem("Second item"); // "First item", "Second item"
   * list.clear();                // -
   *
   * @returns {List} The `List` object
   * @since 0.2.0
   */
  public clear(): List {
    let removedElement;

    do {
      removedElement = this.removeAt(0);
    } while (removedElement !== undefined);

    return this;
  }

  /**
   * The `size()` method returns the number of items in the list.
   *
   * @example
   * const list = new List();
   * list.size();                 // 0
   * list.addItem("First item");
   * list.addItem("Second item");
   * list.size();                 // 2
   *
   * @returns {number} The number of items in this list
   * @since 0.2.0
   */
  public size(): number {
    return this.getAll().length;
  }
}
