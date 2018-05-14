import { createHash } from "crypto";
import { OdfAttributeName } from "../OdfAttributeName";
import { OdfElementName } from "../OdfElementName";
import { StyleHelper } from "./StyleHelper";
import { Typeface } from "./Typeface";

// TODO
export class TextStyle {
  // <style:text-properties fo:font-style="normal|italic|oblique" fo:font-weight="normal|bold">
  private typeface: Typeface;

  // TODO
  public constructor() {
    this.typeface = Typeface.Normal;
  }

  // TODO
  public setTypeface(typeface: Typeface): void {
    this.typeface = typeface;
  }

  // TODO
  public getTypeface(): Typeface {
    return this.typeface;
  }

  // TODO
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

    if (this.typeface === Typeface.Italic || this.typeface === Typeface.BoldItalic) {
      textPropertiesElement.setAttribute(OdfAttributeName.FormatFontStyle, "italic");
    }

    if (this.typeface === Typeface.Oblique || this.typeface === Typeface.BoldOblique) {
      textPropertiesElement.setAttribute(OdfAttributeName.FormatFontStyle, "oblique");
    }

    if (this.typeface === Typeface.Bold
      || this.typeface === Typeface.BoldItalic
      || this.typeface === Typeface.BoldOblique) {
      textPropertiesElement.setAttribute(OdfAttributeName.FormatFontWeight, "bold");
    }
  }
}
