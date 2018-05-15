import { Typeface } from "./Typeface";

/**
 * This class represents the style of some text.
 *
 * It is used to apply formatting to the text content.
 * To format the text of a paragraph either the paragraphs test style must be altered
 * or a new text style is set to the paragraph.
 *
 * @example
 * // alter the text style of a paragraph to use a bold typeface
 * paragraph.getTextStyle().setTypeface(Typeface.Bold);
 *
 * @example
 * // apply the same text style to multiple paragraphs
 * const style = new TextSyle();
 * style.setTypeface(Typeface.Italic);
 * paragraph1.setTextStyle(style);
 * paragraph2.setTextStyle(style);
 *
 * @since 0.4.0
 */
export interface ITextStyle {
  /**
   * Sets the typeface that will be applied to the text.
   *
   * @param {Typeface} typeface The typeface to apply
   * @since 0.4.0
   */
  setTypeface(typeface: Typeface): void;

  /**
   * Returns the typeface that will be applied to the text.
   *
   * @returns {Typeface} The typeface to apply
   * @since 0.4.0
   */
  getTypeface(): Typeface;

  /**
   * Returns whether the text style represents the default style.
   *
   * @returns {boolean} `true` if the text style equals the default style, `false` otherwise
   * @since 0.4.0
   */
  isDefault(): boolean;

  /**
   * Returns the name of the style.
   * The name is computed to make sure equal styles feature equal names and reflects the current configuration.
   *
   * @returns {string} The name of the style
   * @since 0.4.0
   */
  getName(): string;

  /**
   * Transforms the text style into Open Document Format.
   *
   * @param {Document} document The XML document
   * @since 0.4.0
   */
  toXML(document: Document, styleName: string): void;
}
