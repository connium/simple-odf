import { isNonNegativeNumber, isPercent } from '../util';
import { Color } from './Color';
import { HorizontalAlignment } from './HorizontalAlignment';
import { IParagraphProperties } from './IParagraphProperties';
import { PageBreak } from './PageBreak';
import { TabStopType } from './TabStopType';
import { TabStop } from './TabStop';
import { VerticalAlignment } from './VerticalAlignment';

const DEFAULT_HORIZONTAL_ALIGNMENT = HorizontalAlignment.Default;
const DEFAULT_KEEP_TOGETHER = false;
const DEFAULT_KEEP_WITH_NEXT = false;
const DEFAULT_PAGE_BREAK = PageBreak.None;
const DEFAULT_VERTICAL_ALIGNMENT = VerticalAlignment.Default;

export class ParagraphProperties implements IParagraphProperties {
  private backgroundColor: Color | undefined;
  private horizontalAlignment: HorizontalAlignment;
  private lineHeight: number | string | undefined;
  private minimumLineHeight: number | undefined;
  private orphans: number | undefined;
  private pageBreak: PageBreak;
  private shouldKeepTogether: boolean;
  private shouldKeepWithNext: boolean;
  private verticalAlignment: VerticalAlignment;
  private widows: number | undefined;
  private tabStops: TabStop[] = [];

  public constructor () {
    this.horizontalAlignment = DEFAULT_HORIZONTAL_ALIGNMENT;
    this.pageBreak = DEFAULT_PAGE_BREAK;
    this.shouldKeepTogether = DEFAULT_KEEP_TOGETHER;
    this.shouldKeepWithNext = DEFAULT_KEEP_WITH_NEXT;
    this.verticalAlignment = DEFAULT_VERTICAL_ALIGNMENT;
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
      this.minimumLineHeight = undefined;
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
      this.lineHeight = undefined;
    }
  }

  /** @inheritdoc */
  public getLineHeightAtLeast (): number | undefined {
    return this.minimumLineHeight;
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
