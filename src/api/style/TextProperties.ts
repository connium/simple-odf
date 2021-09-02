import { isPositiveLength } from '../util';
import { Color } from './Color';
import { FontVariant } from './FontVariant';
import { ITextProperties } from './ITextProperties';
import { LineMode } from './LineMode';
import { LineStyle } from './LineStyle';
import { LineType } from './LineType';
import { LineWidth } from './LineWidth';
import { TextLine } from './TextLine';
import { TextTransformation } from './TextTransformation';
import { Typeface } from './Typeface';

/**
 * This class represents the style of some text.
 *
 * @extends ITextProperties
 * @since 0.4.0
 * @private
 */
export class TextProperties implements ITextProperties {
  private backgroundColor: Color | undefined;
  private color: Color | undefined;
  private fontName: string | undefined;
  private fontSize: number;
  private fontVariant: FontVariant;
  // private lineThrough: TextLine | undefined;
  private overline: TextLine | undefined;
  private transformation: TextTransformation;
  private typeface: Typeface;
  private underline: TextLine | undefined;

  /**
   * Constructor.
   *
   * @since 0.4.0
   */
  public constructor() {
    this.fontSize = 12;
    this.fontVariant = FontVariant.Normal;
    this.transformation = TextTransformation.None;
    this.typeface = Typeface.Normal;
  }

  /** @inheritDoc */
  public setBackgroundColor(color: Color | undefined): void {
    this.backgroundColor = color;
  }

  /** @inheritDoc */
  public getBackgroundColor(): Color | undefined {
    return this.backgroundColor;
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
    if (isPositiveLength(size)) {
      this.fontSize = size;
    }
  }

  /** @inheritDoc */
  public getFontSize(): number {
    return this.fontSize;
  }

  /** @inheritDoc */
  public setFontVariant(fontVariant: FontVariant): void {
    this.fontVariant = fontVariant;
  }

  /** @inheritDoc */
  public getFontVariant(): FontVariant {
    return this.fontVariant;
  }

  /** @inheritDoc */
  public setOverline(
    color: 'font-color' | Color = 'font-color',
    width: LineWidth | number = LineWidth.Auto,
    style: LineStyle = LineStyle.Solid,
    type: LineType = LineType.Single,
    mode: LineMode = LineMode.Continuous
  ): void {
    if (typeof width !== 'number' || isPositiveLength(width)) {
      this.overline = {
        color,
        mode,
        style,
        type,
        width,
      };
    }
  }

  /** @inheritDoc */
  public getOverline(): TextLine | undefined {
    return this.overline;
  }

  /** @inheritDoc */
  public removeOverline(): void {
    this.overline = undefined;
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

  /** @inheritDoc */
  public setUnderline(
    color: 'font-color' | Color = 'font-color',
    width: LineWidth | number = LineWidth.Auto,
    style: LineStyle = LineStyle.Solid,
    type: LineType = LineType.Single,
    mode: LineMode = LineMode.Continuous
  ): void {
    if (typeof width !== 'number' || isPositiveLength(width)) {
      this.underline = {
        color,
        mode,
        style,
        type,
        width,
      };
    }
  }

  /** @inheritDoc */
  public getUnderline(): TextLine | undefined {
    return this.underline;
  }

  /** @inheritDoc */
  public removeUnderline(): void {
    this.underline = undefined;
  }
}
