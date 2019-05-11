import { HorizontalAlignment } from './HorizontalAlignment';
import { IParagraphProperties } from './IParagraphProperties';
import { PageBreak } from './PageBreak';
import { TabStopType } from './TabStopType';
import { TabStop } from './TabStop';

const DEFAULT_HORIZONTAL_ALIGNMENT = HorizontalAlignment.Default;
const DEFAULT_PAGE_BREAK = PageBreak.None;
const DEFAULT_KEEP_TOGETHER = false;
const DEFAULT_KEEP_WITH_NEXT = false;

export class ParagraphProperties implements IParagraphProperties {
  private horizontalAlignment: HorizontalAlignment;
  private pageBreak: PageBreak;
  private shouldKeepTogether: boolean;
  private shouldKeepWithNext: boolean;
  private tabStops: TabStop[] = [];

  public constructor () {
    this.horizontalAlignment = DEFAULT_HORIZONTAL_ALIGNMENT;
    this.pageBreak = DEFAULT_PAGE_BREAK;
    this.shouldKeepTogether = DEFAULT_KEEP_TOGETHER;
    this.shouldKeepWithNext = DEFAULT_KEEP_WITH_NEXT;
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
  setKeepWithNext (keepWithNext = true): void {
    this.shouldKeepWithNext = keepWithNext;
  }

  /** @inheritdoc */
  getKeepWithNext (): boolean {
    return this.shouldKeepWithNext;
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
