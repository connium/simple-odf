import { isNonNegativeNumber, isPercent } from '../util';
import { Color } from './Color';
import { HorizontalAlignment } from './HorizontalAlignment';
import { HorizontalAlignmentLastLine } from './HorizontalAlignmentLastLine';
import { IParagraphProperties } from './IParagraphProperties';
import { PageBreak } from './PageBreak';
import { TabStopType } from './TabStopType';
import { TabStop } from './TabStop';
import { VerticalAlignment } from './VerticalAlignment';

export class ParagraphProperties implements IParagraphProperties {
  private backgroundColor: Color | undefined;
  private horizontalAlignment: HorizontalAlignment;
  private horizontalAlignmentLastLine: HorizontalAlignmentLastLine;
  private lineHeight: number | string | undefined;
  private lineSpacing: number | undefined;
  private marginBottom: number;
  private marginLeft: number;
  private marginRight: number;
  private marginTop: number;
  private minimumLineHeight: number | undefined;
  private orphans: number | undefined;
  private pageBreak: PageBreak;
  private shouldKeepTogether: boolean;
  private shouldKeepWithNext: boolean;
  private textIndent: number;
  private verticalAlignment: VerticalAlignment;
  private widows: number | undefined;
  private tabStops: TabStop[] = [];

  public constructor () {
    this.horizontalAlignment = HorizontalAlignment.Default;
    this.horizontalAlignmentLastLine = HorizontalAlignmentLastLine.Default;
    this.marginBottom = 0;
    this.marginLeft = 0;
    this.marginRight = 0;
    this.marginTop = 0;
    this.pageBreak = PageBreak.None;
    this.shouldKeepTogether = false;
    this.shouldKeepWithNext = false;
    this.textIndent = 0;
    this.verticalAlignment = VerticalAlignment.Default;
  }

  /** @inheritdoc */
  public setBackgroundColor (color: Color | undefined): void {
    this.backgroundColor = color;
  }

  /** @inheritdoc */
  public getBackgroundColor (): Color | undefined {
    return this.backgroundColor;
  }

  /** @inheritdoc */
  public setHorizontalAlignment (horizontalAlignment: HorizontalAlignment): void {
    this.horizontalAlignment = horizontalAlignment;
  }

  /** @inheritdoc */
  public getHorizontalAlignment (): HorizontalAlignment {
    return this.horizontalAlignment;
  }

  /** @inheritdoc */
  public setHorizontalAlignmentLastLine (horizontalAlignment: HorizontalAlignmentLastLine): void {
    this.horizontalAlignmentLastLine = horizontalAlignment;
  }

  /** @inheritdoc */
  public getHorizontalAlignmentLastLine (): HorizontalAlignmentLastLine {
    return this.horizontalAlignmentLastLine;
  }

  /** @inheritdoc */
  public setKeepTogether (keepTogether = true): void {
    this.shouldKeepTogether = keepTogether;
  }

  /** @inheritdoc */
  public getKeepTogether (): boolean {
    return this.shouldKeepTogether;
  }

  /** @inheritdoc */
  public setKeepWithNext (keepWithNext = true): void {
    this.shouldKeepWithNext = keepWithNext;
  }

  /** @inheritdoc */
  public getKeepWithNext (): boolean {
    return this.shouldKeepWithNext;
  }

  /** @inheritdoc */
  public setLineHeight (lineHeight: number | string | undefined): void {
    if (isNonNegativeNumber(lineHeight) || isPercent(lineHeight) || lineHeight === undefined) {
      this.lineHeight = lineHeight;
    }
  }

  /** @inheritdoc */
  public getLineHeight (): number | string | undefined {
    return this.lineHeight;
  }

  /** @inheritdoc */
  public setLineHeightAtLeast (minimumLineHeight: number | undefined): void {
    if (isNonNegativeNumber(minimumLineHeight) || minimumLineHeight === undefined) {
      this.minimumLineHeight = minimumLineHeight;
    }
  }

  /** @inheritdoc */
  public getLineHeightAtLeast (): number | undefined {
    return this.minimumLineHeight;
  }

  /** @inheritdoc */
  public setLineSpacing (lineSpacing: number | undefined): void {
    this.lineSpacing = lineSpacing;
  }

  /** @inheritdoc */
  public getLineSpacing (): number | undefined {
    return this.lineSpacing;
  }

  /** @inheritdoc */
  public setMarginBottom (margin: number): void {
    if (isNonNegativeNumber(margin)) {
      this.marginBottom = margin;
    }
  }

  /** @inheritdoc */
  public getMarginBottom (): number {
    return this.marginBottom;
  }

  /** @inheritdoc */
  public setMarginLeft (margin: number): void {
    this.marginLeft = margin;
  }

  /** @inheritdoc */
  public getMarginLeft (): number {
    return this.marginLeft;
  }

  /** @inheritdoc */
  public setMarginRight (margin: number): void {
    this.marginRight = margin;
  }

  /** @inheritdoc */
  public getMarginRight (): number {
    return this.marginRight;
  }

  /** @inheritdoc */
  public setMarginTop (margin: number): void {
    if (isNonNegativeNumber(margin)) {
      this.marginTop = margin;
    }
  }

  /** @inheritdoc */
  public getMarginTop (): number {
    return this.marginTop;
  }

  /** @inheritdoc */
  public setMargins (marginLeft: number, marginRight: number, marginTop: number, marginBottom: number): void {
    this.setMarginLeft(marginLeft);
    this.setMarginRight(marginRight);
    this.setMarginTop(marginTop);
    this.setMarginBottom(marginBottom);
  }

  /** @inheritdoc */
  public setOrphans (orphans: number | undefined): void {
    if (isNonNegativeNumber(orphans)) {
      this.orphans = Math.trunc(orphans as number);
      return;
    }

    if (orphans === undefined) {
      this.orphans = orphans;
    }
  }

  /** @inheritdoc */
  public getOrphans (): number | undefined {
    return this.orphans;
  }

  /** @inheritdoc */
  public setPageBreak (pageBreak: PageBreak): void {
    this.pageBreak = pageBreak;
  }

  /** @inheritdoc */
  public getPageBreak (): PageBreak {
    return this.pageBreak;
  }

  /** @inheritdoc */
  public setTextIndent (textIndent: number): void {
    this.textIndent = textIndent;
  }

  /** @inheritdoc */
  public getTextIndent (): number {
    return this.textIndent;
  }

  /** @inheritdoc */
  public setVerticalAlignment (verticalAlignment: VerticalAlignment): void {
    this.verticalAlignment = verticalAlignment;
  }

  /** @inheritdoc */
  public getVerticalAlignment (): VerticalAlignment {
    return this.verticalAlignment;
  }

  /** @inheritdoc */
  public setWidows (widows: number | undefined): void {
    if (isNonNegativeNumber(widows)) {
      this.widows = Math.trunc(widows as number);
      return;
    }

    if (widows === undefined) {
      this.widows = widows;
    }
  }

  /** @inheritdoc */
  public getWidows (): number | undefined {
    return this.widows;
  }

  /** @inheritdoc */
  public addTabStop (position: number, type: TabStopType): TabStop | undefined;

  /** @inheritDoc */
  public addTabStop (tabStop: TabStop): TabStop | undefined;
  public addTabStop (arg1: number | TabStop, type = TabStopType.Left): TabStop | undefined {
    const newTabStop = typeof arg1 === 'object' ? arg1 : new TabStop(arg1, type);

    const existsTabStop = this.tabStops.some((value: TabStop) => {
      return newTabStop.getPosition() === value.getPosition();
    });

    if (existsTabStop === true) {
      return undefined;
    }

    this.tabStops.push(newTabStop);
    this.sortTabStops();

    return newTabStop;
  }

  /** @inheritdoc */
  public getTabStops (): TabStop[] {
    return Array.from(this.tabStops);
  }

  /** @inheritdoc */
  public clearTabStops (): void {
    this.tabStops = [];
  }

  /**
   * Sorts the tab stops by their position ascending.
   */
  private sortTabStops (): void {
    this.tabStops.sort((a: TabStop, b: TabStop) => {
      return a.getPosition() - b.getPosition();
    });
  }
}
