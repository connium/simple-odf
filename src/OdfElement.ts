import { HyperlinkWriter } from "./xml/text/HyperlinkWriter";

/**
 * Base element in Open Document Format
 * @since 0.1.0
 * @private
 */
export class OdfElement {
  private children: OdfElement[];

  /**
   * Constructor.
   * @since 0.1.0
   */
  public constructor() {
    this.children = [];
  }

  /**
   * Appends the element as a child element to this element.
   *
   * @param {OdfElement} element The element to append
   * @since 0.1.0
   */
  protected append(element: OdfElement): void {
    this.children.push(element);
  }

  /**
   * Inserts the element at the specified position in the list of child elements.
   *
   * @param {number} position The index at which to insert the element (starting from 0).
   * If greater than the number child elements, the element will appended at the end of the list.
   * If negative, the element will be inserted as first element.
   * @param {OdfElement} element The element to insert
   * @since 0.2.0
   */
  protected insert(position: number, element: OdfElement): void {
    let index = position;

    if (position < 0) {
      index = 0;
    } else if (position > this.children.length) {
      index = this.children.length;
    }

    this.children.splice(index, 0, element);
  }

  /**
   * Returns the element at the specified position.
   *
   * @param {number} position The index of the requested the element (starting from 0).
   * @returns {OdfElement | undefined} The element at the specified position
   * or undefined if there is no element at the specified position
   * @since 0.2.0
   */
  protected get(position: number): OdfElement | undefined {
    if (position < 0) {
      return undefined;
    }
    if (position > this.children.length) {
      return undefined;
    }

    return this.children[position];
  }

  /**
   * Returns all child elements.
   *
   * @returns {OdfElement[]} A copy of the list of child elements
   * @since 0.2.0
   */
  protected getAll(): OdfElement[] {
    return Array.from(this.children);
  }

  /**
   * Removes the child element from the specified position.
   *
   * @param {number} position The index of the element to remove (starting from 0).
   * @returns {OdfElement | undefined} The removed child element
   * or undefined if there is no element at the specified position
   * @since 0.2.0
   */
  protected removeAt(position: number): OdfElement | undefined {
    const oldElement = this.get(position);

    if (oldElement !== undefined) {
      this.children.splice(position, 1);
    }

    return oldElement;
  }

  /**
   * Returns whether the element has any child elements.
   *
   * @returns {boolean} TRUE if the there is any child element, FALSE otherwise
   * @since 0.2.0
   */
  protected hasChildren(): boolean {
    return this.children.length > 0;
  }

  /**
   * Transforms the element into Open Document Format.
   * Implementors of this class must add themselves to the document and afterwards call <code>super.toXML(...)</code>.
   *
   * @param {Document} document The XML document
   * @param {Element} parent The parent node
   * @since 0.1.0
   */
  protected toXml(document: Document, parent: Element): void {
    this.children.forEach((child: OdfElement) => {
      // instanceof is not possible because of circular dependency
      if (child.hasOwnProperty("uri") === true) {
        new HyperlinkWriter().write(document, parent, <any>child);
      } else {
        child.toXml(document, parent);
      }
    });
  }
}
