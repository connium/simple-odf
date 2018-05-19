import { OdfAttributeName } from "../OdfAttributeName";
import { OdfElementName } from "../OdfElementName";
import { Color } from "./Color";
import { ITextProperties } from "./ITextProperties";
import { TextTransformation } from "./TextTransformation";
import { Typeface } from "./Typeface";

const MINIMAL_FONT_SIZE = 2;
const DEFAULT_FONT_SIZE = 12;
const DEFAULT_TRANSFORMATION = TextTransformation.None;
const DEFAULT_TYPEFACE = Typeface.Normal;

/**
 * This class represents the style of some text.
 *
 * @extends ITextProperties
 * @since 0.4.0
 */
export class TextProperties implements ITextProperties {
  private color: Color | undefined;
  private fontName: string | undefined;
  private fontSize: number;
  private transformation: TextTransformation;
  private typeface: Typeface;

  /**
   * Constructor.
   *
   * @since 0.4.0
   */
  public constructor() {
    this.fontSize = DEFAULT_FONT_SIZE;
    this.transformation = DEFAULT_TRANSFORMATION;
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
  public setFontName(name: string): void {
    this.fontName = name;
  }

  /** @inheritDoc */
  public getFontName(): string | undefined {
    return this.fontName;
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
  public setTextTransformation(transformation: TextTransformation): void {
    this.transformation = transformation;
  }

  /** @inheritDoc */
  public getTextTransformation(): TextTransformation {
    return this.transformation;
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
      && this.fontName === undefined
      && this.fontSize === DEFAULT_FONT_SIZE
      && this.transformation === DEFAULT_TRANSFORMATION
      && this.typeface === DEFAULT_TYPEFACE;
  }

  /**
   * Transforms the text style into Open Document Format.
   *
   * @param {Document} document The XML document
   * @param {Element} parent The parent node in the DOM (`style:style`)
   * @since 0.4.0
   */
  public toXml(document: Document, parent: Element): void {
    if (this.isDefault() === true) {
      return;
    }

    const textPropertiesElement = document.createElement(OdfElementName.StyleTextProperties);
    parent.appendChild(textPropertiesElement);

    this.setColorAttribute(textPropertiesElement);
    this.setFontNameAttribute(textPropertiesElement);
    this.setFontSizeAttribute(textPropertiesElement);
    this.setFontStyleAttribute(textPropertiesElement);
    this.setFontWeightAttribute(textPropertiesElement);
    this.setTextTransformAttribute(textPropertiesElement);
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
   * Sets the `font-name` attribute if a font name is set.
   *
   * @param {Element} textPropertiesElement The element which will take the attribute
   */
  private setFontNameAttribute(textPropertiesElement: Element): void {
    if (this.fontName === undefined) {
      return;
    }

    textPropertiesElement.setAttribute(OdfAttributeName.StyleFontName, this.fontName);
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

  /**
   * Sets the `text-transform` attribute if a transformation is set.
   *
   * @param {Element} textPropertiesElement The element which will take the attribute
   */
  private setTextTransformAttribute(textPropertiesElement: Element): void {
    if (this.transformation === DEFAULT_TRANSFORMATION) {
      return;
    }

    textPropertiesElement.setAttribute(OdfAttributeName.FormatTextTransform, this.transformation);
  }
}
