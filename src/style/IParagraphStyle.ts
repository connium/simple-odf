import { IParagraphProperties } from "./IParagraphProperties";
import { ITextProperties } from "./ITextProperties";

/**
 * This class represents the style of a paragraph
 *
 * @since 0.4.0
 */
export interface IParagraphStyle extends ITextProperties, IParagraphProperties {
  /**
   * Transforms the tab stop into Open Document Format.
   *
   * @param {Document} document The XML document
   * @param {Element} parent The parent node in the DOM (`style:tab-stops`)
   * @since 0.4.0
   */
  toXml(document: Document, parent: Element): void;
}
