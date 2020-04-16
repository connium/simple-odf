import { ListStyle } from '../style';
import { OdfElement } from '../OdfElement';
import { ListItem } from './ListItem';

/**
 * This class represents a list and may contain any number list items.
 *
 * @example
 * const list = document.getBody().addList();
 * list.addItem();
 * list.addItem();
 * list.insertItem(1, new ListItem());
 * list.removeItemAt(2);
 *
 * @since 0.2.0
 */
export class List extends OdfElement {
  private style: ListStyle | undefined;
  private styleName: string | undefined;

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
   * The `addItem()` method adds a new list item or adds the specified item to the list.
   *
   * @example
   * const list = new List();
   * list.addItem();
   * list.addItem(new ListItem());
   *
   * @param {ListItem} [item] The item to add
   * @returns {ListItem} The added `ListItem` object
   * @since 0.2.0
   */
  public addItem(item?: ListItem): ListItem {
    const listItem = item || new ListItem();
    this.append(listItem);

    return listItem;
  }

  /**
   * The `getItem()` method returns the item at the specified position in the list.
   * If an invalid position is given, undefined is returned.
   *
   * @example
   * const list = new List();
   * list.addItem();
   * list.addItem();
   * list.getItem(1); // second item
   * list.getItem(2); // undefined
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
   * list.getItems(); // []
   * list.addItem();
   * list.addItem();
   * list.getItems(); // [first item, second item]
   *
   * @returns {ListItem[]} A copy of the list of `ListItem` objects
   * @since 0.2.0
   */
  public getItems(): ListItem[] {
    return this.getAll() as ListItem[];
  }

  /**
   * The `insertItem` method inserts the specified item at the specified position.
   * The item is inserted before the item at the specified position.
   *
   * If the position is greater than the current number of items, the new item is appended at the end of the list.
   * If the position is negative, the new item is inserted as first element.
   *
   * @example
   * const list = new List();
   * list.addItem();
   * list.insertItem(0, new ListItem()); // insert before existing item
   *
   * @param {number} position The index at which to insert the list item (starting from 0).
   * @param {ListItem} item The item to insert
   * @returns {ListItem} The inserted `ListItem` object
   * @since 0.2.0
   */
  public insertItem(position: number, item: ListItem): ListItem {
    this.insert(position, item);
    return item;
  }

  /**
   * The `removeItemAt()` method removes the list item from the specified position.
   *
   * @example
   * const list = new List();
   * list.addItem();
   * list.addItem();
   * list.removeItemAt(0); // first item
   * list.getItems();      // [second item]
   * list.removeItemAt(2); // undefined
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
   * Returns the style of the list.
   *
   * @example
   * const list = new List();
   * list.getStyle();                // undefined
   * list.setStyle(new ListStyle());
   * list.getStyle();                // previously set style
   *
   * @returns {ListStyle | undefined} The style of the list or `undefined` if no style was set
   * @since 0.11.0
   */
  public getStyle(): ListStyle | undefined {
    return this.style;
  }

  /**
   * Sets the new style of the list.
   * To reset the style, `undefined` must be given.
   *
   * If style and style name are both set, the custom style will be set and the common style will be ignored.
   *
   * @example
   * new List()
   *   .setStyle(new ListStyle());
   *
   * @param {ListStyle | undefined} style The new style or `undefined` to reset the style
   * @returns {List} The `List` object
   * @since 0.11.0
   */
  public setStyle(style: ListStyle | undefined): List {
    this.style = style;

    return this;
  }

  /**
   * Returns the name of the common style of the list.
   *
   * @example
   * const list = new List();
   * list.getStyleName();         // undefined
   * list.setStyleName('Summary');
   * list.getStyleName();         // 'Summary'
   *
   * @returns {string | undefined} The name of the common style or `undefined` if no common style was set
   * @since 0.11.0
   */
  public getStyleName(): string | undefined {
    return this.styleName;
  }

  /**
   * Sets the name of the common style that should be applied to the list.
   * To reset the common style, `undefined` must be given.
   *
   * If style and style name are both set, the custom style will be set and the common style will be ignored.
   *
   * @example
   * new List()
   *   .setStyleName('Summary');
   *
   * @param {string | undefined} styleName The name of the common style or `undefined` to reset the common style
   * @returns {List} The `List` object
   * @since 0.11.0
   */
  public setStyleName(styleName: string | undefined): List {
    this.styleName = styleName;

    return this;
  }

  /**
   * The `clear()` method removes all items from the list.
   *
   * @example
   * const list = new List();
   * list.addItem();
   * list.addItem();
   * list.clear();
   * list.getItems(); // []
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
   * list.size();    // 0
   * list.addItem();
   * list.addItem();
   * list.size();    // 2
   *
   * @returns {number} The number of items in this list
   * @since 0.2.0
   */
  public size(): number {
    return this.getAll().length;
  }
}
