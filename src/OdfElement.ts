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
