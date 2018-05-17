import { createHash } from "crypto";
import { OdfAttributeName } from "../OdfAttributeName";
import { OdfElementName } from "../OdfElementName";
import { Color } from "./Color";
import { ITextStyle } from "./ITextStyle";
import { StyleHelper } from "./StyleHelper";
import { Typeface } from "./Typeface";

const MINIMAL_FONT_SIZE = 2;
const DEFAULT_FONT_SIZE = 12;
const DEFAULT_TYPEFACE = Typeface.Normal;

/**
 * This class represents the style of some text.
 *
 * @extends ITextStyle
 * @since 0.4.0
 */
export class TextStyle implements ITextStyle {
  private color: Color | undefined;
  private fontSize: number;
  private typeface: Typeface;

  /**
   * Constructor.
   *
   * @since 0.4.0
   */
  public constructor() {
    this.fontSize = DEFAULT_FONT_SIZE;
    this.typeface = DEFAULT_TYPEFACE;
  }

  /** @inheritDoc */
  public setColor(color: Color | undefined): void {
    this.color = color;
  }

  /** @inheritDoc */
  public getColor(): Color | undefined {
    return this.color;
  }

  /** @inheritDoc */
  public setFontSize(size: number): void {
    this.fontSize = Math.max(size, MINIMAL_FONT_SIZE);
  }

  /** @inheritDoc */
  public getFontSize(): number {
    return this.fontSize;
  }

  /** @inheritDoc */
  public setTypeface(typeface: Typeface): void {
    this.typeface = typeface;
  }

  /** @inheritDoc */
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
    return this.color === undefined
      && this.fontSize === DEFAULT_FONT_SIZE
      && this.typeface === DEFAULT_TYPEFACE;
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

    if (this.color !== undefined) {
      hash.update(this.color.toHex());
    }
    hash.update(this.fontSize.toString());
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

    this.setColorAttribute(textPropertiesElement);
    this.setFontSizeAttribute(textPropertiesElement);
    this.setFontStyleAttribute(textPropertiesElement);
    this.setFontWeightAttribute(textPropertiesElement);
  }

  /**
   * Sets the `color` attribute if a color is set.
   *
   * @param {Element} textPropertiesElement The element which will take the attribute
   */
  private setColorAttribute(textPropertiesElement: Element): void {
    if (this.color === undefined) {
      return;
    }

    textPropertiesElement.setAttribute(OdfAttributeName.FormatColor, this.color.toHex());
  }

  /**
   * Sets the `font-size` attribute if the font size is different from the default font size.
   *
   * @param {Element} textPropertiesElement The element which will take the attribute
   */
  private setFontSizeAttribute(textPropertiesElement: Element): void {
    if (this.fontSize === DEFAULT_FONT_SIZE) {
      return;
    }

    textPropertiesElement.setAttribute(OdfAttributeName.FormatFontSize, this.fontSize + "pt");
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
