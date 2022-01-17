import { Border } from './Border';
import { BorderStyle } from './BorderStyle';
import { Color } from './Color';
import { FontVariant } from './FontVariant';
import { HorizontalAlignment } from './HorizontalAlignment';
import { HorizontalAlignmentLastLine } from './HorizontalAlignmentLastLine';
import { IParagraphProperties } from './IParagraphProperties';
import { ITextProperties } from './ITextProperties';
import { LineMode } from './LineMode';
import { LineStyle } from './LineStyle';
import { LineType } from './LineType';
import { LineWidth } from './LineWidth';
import { PageBreak } from './PageBreak';
import { ParagraphProperties } from './ParagraphProperties';
import { Style } from './Style';
import { StyleFamily } from './StyleFamily';
import { TabStop } from './TabStop';
import { TabStopType } from './TabStopType';
import { TextLine } from './TextLine';
import { TextProperties } from './TextProperties';
import { TextTransformation } from './TextTransformation';
import { Typeface } from './Typeface';
import { VerticalAlignment } from './VerticalAlignment';

export class ParagraphStyle
  extends Style
  implements IParagraphProperties, ITextProperties
{
  private paragraphProperties: ParagraphProperties;
  private textProperties: TextProperties;

  public constructor(displayName: string = Style.UNNAMED) {
    super(displayName, StyleFamily.Paragraph);

    this.paragraphProperties = new ParagraphProperties();
    this.textProperties = new TextProperties();
  }

  // paragraph properties

  /** @inheritdoc */
  public setBackgroundColor(color: Color | undefined): ParagraphStyle {
    this.paragraphProperties.setBackgroundColor(color);

    return this;
  }

  /** @inheritdoc */
  public getBackgroundColor(): Color | undefined {
    return this.paragraphProperties.getBackgroundColor();
  }

  /** @inheritdoc */
  public setBorder(
    width: number,
    style: BorderStyle,
    color: Color
  ): ParagraphStyle {
    this.paragraphProperties.setBorder(width, style, color);

    return this;
  }

  /** @inheritdoc */
  public removeBorder(): ParagraphStyle {
    this.paragraphProperties.removeBorder();

    return this;
  }

  /** @inheritdoc */
  public setBorderBottom(
    width: number,
    style: BorderStyle,
    color: Color
  ): ParagraphStyle {
    this.paragraphProperties.setBorderBottom(width, style, color);

    return this;
  }

  /** @inheritdoc */
  public getBorderBottom(): Border | undefined {
    return this.paragraphProperties.getBorderBottom();
  }

  /** @inheritdoc */
  public removeBorderBottom(): ParagraphStyle {
    this.paragraphProperties.removeBorderBottom();

    return this;
  }

  /** @inheritdoc */
  public setBorderLeft(
    width: number,
    style: BorderStyle,
    color: Color
  ): ParagraphStyle {
    this.paragraphProperties.setBorderLeft(width, style, color);

    return this;
  }

  /** @inheritdoc */
  public getBorderLeft(): Border | undefined {
    return this.paragraphProperties.getBorderLeft();
  }

  /** @inheritdoc */
  public removeBorderLeft(): ParagraphStyle {
    this.paragraphProperties.removeBorderLeft();

    return this;
  }

  /** @inheritdoc */
  public setBorderRight(
    width: number,
    style: BorderStyle,
    color: Color
  ): ParagraphStyle {
    this.paragraphProperties.setBorderRight(width, style, color);

    return this;
  }

  /** @inheritdoc */
  public getBorderRight(): Border | undefined {
    return this.paragraphProperties.getBorderRight();
  }

  /** @inheritdoc */
  public removeBorderRight(): ParagraphStyle {
    this.paragraphProperties.removeBorderRight();

    return this;
  }

  /** @inheritdoc */
  public setBorderTop(
    width: number,
    style: BorderStyle,
    color: Color
  ): ParagraphStyle {
    this.paragraphProperties.setBorderTop(width, style, color);

    return this;
  }

  /** @inheritdoc */
  public getBorderTop(): Border | undefined {
    return this.paragraphProperties.getBorderTop();
  }

  /** @inheritdoc */
  public removeBorderTop(): ParagraphStyle {
    this.paragraphProperties.removeBorderTop();

    return this;
  }

  /** @inheritdoc */
  public setHorizontalAlignment(
    horizontalAlignment: HorizontalAlignment
  ): ParagraphStyle {
    this.paragraphProperties.setHorizontalAlignment(horizontalAlignment);

    return this;
  }

  /** @inheritdoc */
  public getHorizontalAlignment(): HorizontalAlignment {
    return this.paragraphProperties.getHorizontalAlignment();
  }

  /** @inheritdoc */
  public setHorizontalAlignmentLastLine(
    horizontalAlignment: HorizontalAlignmentLastLine
  ): ParagraphStyle {
    this.paragraphProperties.setHorizontalAlignmentLastLine(
      horizontalAlignment
    );

    return this;
  }

  /** @inheritdoc */
  public getHorizontalAlignmentLastLine(): HorizontalAlignmentLastLine {
    return this.paragraphProperties.getHorizontalAlignmentLastLine();
  }

  /** @inheritdoc */
  public setKeepTogether(keepTogether = true): ParagraphStyle {
    this.paragraphProperties.setKeepTogether(keepTogether);

    return this;
  }

  /** @inheritdoc */
  public getKeepTogether(): boolean {
    return this.paragraphProperties.getKeepTogether();
  }

  /** @inheritdoc */
  public setKeepWithNext(keepWithNext = true): ParagraphStyle {
    this.paragraphProperties.setKeepWithNext(keepWithNext);

    return this;
  }

  /** @inheritdoc */
  public getKeepWithNext(): boolean {
    return this.paragraphProperties.getKeepWithNext();
  }

  /** @inheritdoc */
  public setLineHeight(
    lineHeight: number | string | undefined
  ): ParagraphStyle {
    this.paragraphProperties.setLineHeight(lineHeight);

    return this;
  }

  /** @inheritdoc */
  public getLineHeight(): number | string | undefined {
    return this.paragraphProperties.getLineHeight();
  }

  /** @inheritdoc */
  public setLineHeightAtLeast(
    minimumLineHeight: number | undefined
  ): ParagraphStyle {
    this.paragraphProperties.setLineHeightAtLeast(minimumLineHeight);

    return this;
  }

  /** @inheritdoc */
  public getLineHeightAtLeast(): number | undefined {
    return this.paragraphProperties.getLineHeightAtLeast();
  }

  /** @inheritdoc */
  public setLineSpacing(lineSpacing: number | undefined): ParagraphStyle {
    this.paragraphProperties.setLineSpacing(lineSpacing);

    return this;
  }

  /** @inheritdoc */
  public getLineSpacing(): number | undefined {
    return this.paragraphProperties.getLineSpacing();
  }

  /** @inheritdoc */
  public setMarginBottom(margin: number): ParagraphStyle {
    this.paragraphProperties.setMarginBottom(margin);

    return this;
  }

  /** @inheritdoc */
  public getMarginBottom(): number {
    return this.paragraphProperties.getMarginBottom();
  }

  /** @inheritdoc */
  public setMarginLeft(margin: number): ParagraphStyle {
    this.paragraphProperties.setMarginLeft(margin);

    return this;
  }

  /** @inheritdoc */
  public getMarginLeft(): number {
    return this.paragraphProperties.getMarginLeft();
  }

  /** @inheritdoc */
  public setMarginRight(margin: number): ParagraphStyle {
    this.paragraphProperties.setMarginRight(margin);

    return this;
  }

  /** @inheritdoc */
  public getMarginRight(): number {
    return this.paragraphProperties.getMarginRight();
  }

  /** @inheritdoc */
  public setMarginTop(margin: number): ParagraphStyle {
    this.paragraphProperties.setMarginTop(margin);

    return this;
  }

  /** @inheritdoc */
  public getMarginTop(): number {
    return this.paragraphProperties.getMarginTop();
  }

  /** @inheritdoc */
  public setMargin(
    marginLeft: number,
    marginRight: number,
    marginTop: number,
    marginBottom: number
  ): ParagraphStyle {
    this.paragraphProperties.setMargin(
      marginLeft,
      marginRight,
      marginTop,
      marginBottom
    );

    return this;
  }

  /** @inheritdoc */
  public setOrphans(orphans: number | undefined): ParagraphStyle {
    this.paragraphProperties.setOrphans(orphans);

    return this;
  }

  /** @inheritdoc */
  public getOrphans(): number | undefined {
    return this.paragraphProperties.getOrphans();
  }

  /** @inheritdoc */
  public setPaddingBottom(padding: number): ParagraphStyle {
    this.paragraphProperties.setPaddingBottom(padding);

    return this;
  }

  /** @inheritdoc */
  public getPaddingBottom(): number {
    return this.paragraphProperties.getPaddingBottom();
  }

  /** @inheritdoc */
  public setPaddingLeft(padding: number): ParagraphStyle {
    this.paragraphProperties.setPaddingLeft(padding);

    return this;
  }

  /** @inheritdoc */
  public getPaddingLeft(): number {
    return this.paragraphProperties.getPaddingLeft();
  }

  /** @inheritdoc */
  public setPaddingRight(padding: number): ParagraphStyle {
    this.paragraphProperties.setPaddingRight(padding);

    return this;
  }

  /** @inheritdoc */
  public getPaddingRight(): number {
    return this.paragraphProperties.getPaddingRight();
  }

  /** @inheritdoc */
  public setPaddingTop(padding: number): ParagraphStyle {
    this.paragraphProperties.setPaddingTop(padding);

    return this;
  }

  /** @inheritdoc */
  public getPaddingTop(): number {
    return this.paragraphProperties.getPaddingTop();
  }

  /** @inheritdoc */
  public setPadding(
    paddingLeft: number,
    paddingRight: number,
    paddingTop: number,
    paddingBottom: number
  ): ParagraphStyle {
    this.paragraphProperties.setPadding(
      paddingLeft,
      paddingRight,
      paddingTop,
      paddingBottom
    );

    return this;
  }

  /** @inheritdoc */
  public setPageBreak(pageBreak: PageBreak): ParagraphStyle {
    this.paragraphProperties.setPageBreak(pageBreak);

    return this;
  }

  /** @inheritdoc */
  public getPageBreak(): PageBreak {
    return this.paragraphProperties.getPageBreak();
  }

  /** @inheritdoc */
  public setTextIndent(textIndent: number): ParagraphStyle {
    this.paragraphProperties.setTextIndent(textIndent);

    return this;
  }

  /** @inheritdoc */
  public getTextIndent(): number {
    return this.paragraphProperties.getTextIndent();
  }

  /** @inheritdoc */
  public setVerticalAlignment(
    verticalAlignment: VerticalAlignment
  ): ParagraphStyle {
    this.paragraphProperties.setVerticalAlignment(verticalAlignment);

    return this;
  }

  /** @inheritdoc */
  public getVerticalAlignment(): VerticalAlignment {
    return this.paragraphProperties.getVerticalAlignment();
  }

  /** @inheritdoc */
  public setWidows(widows: number | undefined): ParagraphStyle {
    this.paragraphProperties.setWidows(widows);

    return this;
  }

  /** @inheritdoc */
  public getWidows(): number | undefined {
    return this.paragraphProperties.getWidows();
  }

  /** @inheritdoc */
  public addTabStop(position: number, type: TabStopType): TabStop | undefined;

  /** @inheritDoc */
  public addTabStop(tabStop: TabStop): TabStop | undefined;
  public addTabStop(
    arg1: number | TabStop,
    type = TabStopType.Left
  ): TabStop | undefined {
    return this.paragraphProperties.addTabStop(arg1 as unknown as number, type);
  }

  /** @inheritdoc */
  public getTabStops(): TabStop[] {
    return this.paragraphProperties.getTabStops();
  }

  /** @inheritdoc */
  public clearTabStops(): ParagraphStyle {
    this.paragraphProperties.clearTabStops();

    return this;
  }

  // text properties

  /** @inheritDoc */
  public setColor(color: Color | undefined): ParagraphStyle {
    this.textProperties.setColor(color);

    return this;
  }

  /** @inheritDoc */
  public getColor(): Color | undefined {
    return this.textProperties.getColor();
  }

  /** @inheritDoc */
  public setFontName(name: string): ParagraphStyle {
    this.textProperties.setFontName(name);

    return this;
  }

  /** @inheritDoc */
  public getFontName(): string | undefined {
    return this.textProperties.getFontName();
  }

  /** @inheritDoc */
  public setFontSize(size: number): ParagraphStyle {
    this.textProperties.setFontSize(size);

    return this;
  }

  /** @inheritDoc */
  public getFontSize(): number {
    return this.textProperties.getFontSize();
  }

  /** @inheritDoc */
  public setTextTransformation(
    transformation: TextTransformation
  ): ParagraphStyle {
    this.textProperties.setTextTransformation(transformation);

    return this;
  }

  /** @inheritDoc */
  public setFontVariant(fontVariant: FontVariant): ParagraphStyle {
    this.textProperties.setFontVariant(fontVariant);

    return this;
  }

  /** @inheritDoc */
  public getFontVariant(): FontVariant {
    return this.textProperties.getFontVariant();
  }

  /** @inheritDoc */
  public setOverline(
    color: 'font-color' | Color,
    width: LineWidth | number,
    style: LineStyle,
    type: LineType,
    mode: LineMode
  ): this {
    this.textProperties.setOverline(color, width, style, type, mode);

    return this;
  }

  /** @inheritDoc */
  public getOverline(): TextLine | undefined {
    return this.textProperties.getOverline();
  }

  /** @inheritDoc */
  public removeOverline(): this {
    this.textProperties.removeOverline();

    return this;
  }

  /** @inheritDoc */
  public getTextTransformation(): TextTransformation {
    return this.textProperties.getTextTransformation();
  }

  /** @inheritDoc */
  public setTypeface(typeface: Typeface): ParagraphStyle {
    this.textProperties.setTypeface(typeface);

    return this;
  }

  /** @inheritDoc */
  public getTypeface(): Typeface {
    return this.textProperties.getTypeface();
  }

  /** @inheritDoc */
  public setUnderline(
    color: 'font-color' | Color,
    width: LineWidth | number,
    style: LineStyle,
    type: LineType,
    mode: LineMode
  ): this {
    this.textProperties.setUnderline(color, width, style, type, mode);

    return this;
  }

  /** @inheritDoc */
  public getUnderline(): TextLine | undefined {
    return this.textProperties.getUnderline();
  }

  /** @inheritDoc */
  public removeUnderline(): this {
    this.textProperties.removeUnderline();

    return this;
  }
}
