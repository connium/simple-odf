import { isPositiveLength } from '../util';
import { Color } from './Color';
import { ITextProperties } from './ITextProperties';
import { TextTransformation } from './TextTransformation';
import { Typeface } from './Typeface';

const DEFAULT_FONT_SIZE = 12;
const DEFAULT_TRANSFORMATION = TextTransformation.None;
const DEFAULT_TYPEFACE = Typeface.Normal;

/**
 * This class represents the style of some text.
 *
 * @extends ITextProperties
 * @since 0.4.0
 * @private
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
  public constructor () {
    this.fontSize = DEFAULT_FONT_SIZE;
    this.transformation = DEFAULT_TRANSFORMATION;
    this.typeface = DEFAULT_TYPEFACE;
  }

  /** @inheritDoc */
  public setColor (color: Color | undefined): void {
    this.color = color;
  }

  /** @inheritDoc */
  public getColor (): Color | undefined {
    return this.color;
  }

  /** @inheritDoc */
  public setFontName (name: string): void {
    this.fontName = name;
  }

  /** @inheritDoc */
  public getFontName (): string | undefined {
    return this.fontName;
  }

  /** @inheritDoc */
  public setFontSize (size: number): void {
    if (isPositiveLength(size)) {
      this.fontSize = size;
    }
  }

  /** @inheritDoc */
  public getFontSize (): number {
    return this.fontSize;
  }

  /** @inheritDoc */
  public setTextTransformation (transformation: TextTransformation): void {
    this.transformation = transformation;
  }

  /** @inheritDoc */
  public getTextTransformation (): TextTransformation {
    return this.transformation;
  }

  /** @inheritDoc */
  public setTypeface (typeface: Typeface): void {
    this.typeface = typeface;
  }

  /** @inheritDoc */
  public getTypeface (): Typeface {
    return this.typeface;
  }
}
