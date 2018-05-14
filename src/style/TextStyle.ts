import { createHash } from "crypto";
import { OdfAttributeName } from "../OdfAttributeName";
import { OdfElementName } from "../OdfElementName";
import { StyleHelper } from "./StyleHelper";
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
export class TextStyle {
  private typeface: Typeface;

  /**
   * Constructor.
   *
   * @since 0.4.0
   */
  public constructor() {
    this.typeface = Typeface.Normal;
  }

  /**
   * Sets the typeface that will be applied to the text.
   *
   * @param {Typeface} typeface The typeface to apply
   * @since 0.4.0
   */
  public setTypeface(typeface: Typeface): void {
    this.typeface = typeface;
  }

  /**
   * Returns the typeface that will be applied to the text.
   *
   * @returns {Typeface} The typeface to apply
   * @since 0.4.0
   */
  public getTypeface(): Typeface {
    return this.typeface;
  }

  /**
   * Returns whether the text style represents the default style.
   *
   * @returns {boolean} `true` if the text style equals the default style, `false` otherwise
   * @since 0.4.0
   */
  public isDefault(): boolean {
    return this.typeface === Typeface.Normal;
  }

  /**
   * Returns the name of the style.
   * The name is computed to make sure equal styles feature equal names and reflects the current configuration.
   *
   * @returns {string} The name of the style
   * @since 0.4.0
   */
  public getName(): string {
    const hash = createHash("md5");

    hash.update(this.typeface.toString());

    return hash.digest("hex");
  }

  /**
   * Transforms the text style into Open Document Format.
   *
   * @param {Document} document The XML document
   * @since 0.4.0
   */
  public toXML(document: Document, styleName: string): void {
    if (this.isDefault() === true) {
      return;
    }

    const styleElement = StyleHelper.getStyleElement(document, "paragraph", styleName);

    const textPropertiesElement = document.createElement(OdfElementName.StyleTextProperties);
    styleElement.appendChild(textPropertiesElement);

    this.setFontStyleAttribute(textPropertiesElement);
    this.setFontWeightAttribute(textPropertiesElement);
  }

  /**
   * Sets the `font-style` attribute if the typeface is either italic or obique.
   *
   * @param {Element} textPropertiesElement The element which will take the attribute
   */
  private setFontStyleAttribute(textPropertiesElement: Element): void {
    if (this.typeface === Typeface.Italic || this.typeface === Typeface.BoldItalic) {
      textPropertiesElement.setAttribute(OdfAttributeName.FormatFontStyle, "italic");
    }

    if (this.typeface === Typeface.Oblique || this.typeface === Typeface.BoldOblique) {
      textPropertiesElement.setAttribute(OdfAttributeName.FormatFontStyle, "oblique");
    }
  }

  /**
   * Sets the `font-weight` attribute if the typeface is bold.
   *
   * @param {Element} textPropertiesElement The element which will take the attribute
   */
  private setFontWeightAttribute(textPropertiesElement: Element): void {
    if (this.typeface === Typeface.Bold
      || this.typeface === Typeface.BoldItalic
      || this.typeface === Typeface.BoldOblique) {
      textPropertiesElement.setAttribute(OdfAttributeName.FormatFontWeight, "bold");
    }
  }
}
