/**
 * Base element in Open Document Format
 * @since 0.1.0
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
   * Appends a child element to this element.
   *
   * @param {OdfElement} element The element to append
   * @since 0.1.0
   */
  public appendElement(element: OdfElement): void {
    this.children.push(element);
  }

  /** TODO */
  protected insertElement(position: number, element: OdfElement): void {
    let index = position;

    if (position < 0) {
      index = 0;
    } else if (position > this.children.length) {
      index = this.children.length;
    }

    this.children.splice(index, 0, element);
  }

  /** TODO */
  protected getElement(position: number): OdfElement | undefined {
    if (position < 0) {
      return undefined;
    }
    if (position > this.children.length) {
      return undefined;
    }

    return this.children[position];
  }

  /** TODO */
  protected getElements(): OdfElement[] {
    return Array.from(this.children);
  }

  /** TODO */
  protected setElement(position: number, element: OdfElement): OdfElement | undefined {
    const oldElement = this.getElement(position);

    if (oldElement !== undefined) {
      this.children[position] = element;
    }

    return oldElement;
  }

  /** TODO */
  protected removeElement(position: number): OdfElement | undefined {
    const oldElement = this.getElement(position);

    if (oldElement !== undefined) {
      this.children.splice(position, 1);
    }

    return oldElement;
  }

  /** TODO */
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
  protected toXML(document: Document, parent: Element): void {
    this.children.forEach((child: OdfElement) => {
      child.toXML(document, parent);
    });
  }
}
