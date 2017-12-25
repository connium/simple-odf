/**
 * Base element in Open Document Format
 */
export class OdfElement {
  private children: Array<OdfElement>;

  /**
   * Constructor.
   */
  public constructor() {
    this.children = [];
  }

  /**
   * Appends a child element to this element.
   *
   * @param {OdfElement} element The element to append
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
   */
  protected toXML(document: Document, parent: Element): void {
    this.children.forEach((child: OdfElement) => {
      child.toXML(document, parent);
    });
  }
}
