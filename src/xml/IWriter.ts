/**
 * Implementors of this class are used to transform an object into ODF conform XML.
 * 
 * @since 0.7.0
 */
export interface IWriter<T> {
  /**
   * Transforms the given object into Open Document Format.
   *
   * @param {Document} document The XML document
   * @param {Element} root The root node in the DOM
   * @param {T} object The object to serialize
   * @since 0.7.0
   */
  write(document: Document, root: Element, object: T): void;
}
