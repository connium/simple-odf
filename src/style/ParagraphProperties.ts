import { OdfAttributeName } from "../OdfAttributeName";
import { OdfElementName } from "../OdfElementName";
import { HorizontalAlignment } from "./HorizontalAlignment";
import { IParagraphProperties } from "./IParagraphProperties";
import { TabStop } from "./TabStop";
import { TabStopType } from "./TabStopType";

const DEFAULT_HORIZONTAL_ALIGNMENT = HorizontalAlignment.Default;
const DEFAULT_PAGE_BREAK = false;

/**
 * This class represents the style of a paragraph.
 *
 * @since 0.1.0
 */
export class ParagraphProperties implements IParagraphProperties {
  private horizontalAlignment: HorizontalAlignment;
  private shouldBreakPageBefore: boolean;
  private tabStops: TabStop[] = [];

  /**
   * Constructor.
   */
  public constructor() {
    this.horizontalAlignment = DEFAULT_HORIZONTAL_ALIGNMENT;
    this.shouldBreakPageBefore = DEFAULT_PAGE_BREAK;
  }

  /** @inheritDoc */
  public setHorizontalAlignment(horizontalAlignment: HorizontalAlignment): void {
    this.horizontalAlignment = horizontalAlignment;
  }

  /** @inheritDoc */
  public getHorizontalAlignment(): HorizontalAlignment {
    return this.horizontalAlignment;
  }

  /** @inheritDoc */
  public setPageBreakBefore(): void {
    this.shouldBreakPageBefore = true;
  }

  /** @inheritDoc */
  public addTabStop(position: number, type: TabStopType): TabStop | undefined;

  /** @inheritDoc */
  public addTabStop(tabStop: TabStop): TabStop | undefined;
  public addTabStop(arg1: number | TabStop, type = TabStopType.Left): TabStop | undefined {
    const newTabStop = typeof arg1 === "object" ? arg1 : new TabStop(arg1, type);

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

  /** @inheritDoc */
  public getTabStops(): TabStop[] {
    return Array.from(this.tabStops);
  }

  /** @inheritDoc */
  public clearTabStops(): void {
    this.tabStops = [];
  }

  /**
   * Returns whether the style represents the default style.
   *
   * @returns {boolean} `true` if the style equals the default style, `false` otherwise
   * @since 0.1.0
   */
  public isDefault(): boolean {
    return this.horizontalAlignment === DEFAULT_HORIZONTAL_ALIGNMENT
      && this.shouldBreakPageBefore === DEFAULT_PAGE_BREAK
      && this.tabStops.length === 0;
  }

  /**
   * Transforms the style element into Open Document Format.
   *
   * @param {Document} document The XML document
   * @param {Element} parent The parent node in the DOM (`style:style`)
   * @since 0.1.0
   */
  public toXml(document: Document, parent: Element): void {
    if (this.isDefault() === true) {
      return;
    }

    const paragraphPropertiesElement = document.createElement(OdfElementName.StyleParagraphProperties);
    parent.appendChild(paragraphPropertiesElement);

    this.setHorizontalAlignmentAttribute(paragraphPropertiesElement);
    this.setPageBreakAttribute(paragraphPropertiesElement);
    this.setTabStopElements(document, paragraphPropertiesElement);
  }

  /**
   * Sets the `text-align` attribute if an horizontal alignment is set.
   *
   * @param {Element} textPropertiesElement The element which will take the attribute
   */
  private setHorizontalAlignmentAttribute(paragraphPropertiesElement: Element): void {
    if (this.horizontalAlignment !== HorizontalAlignment.Default) {
      paragraphPropertiesElement.setAttribute(OdfAttributeName.FormatTextAlign, this.horizontalAlignment);
    }
  }

  /**
   * Sets the page break attribute if a page break is set.
   *
   * @param {Element} textPropertiesElement The element which will take the attribute
   */
  private setPageBreakAttribute(paragraphPropertiesElement: Element): void {
    if (this.shouldBreakPageBefore === true) {
      paragraphPropertiesElement.setAttribute(OdfAttributeName.FormatBreakBefore, "page");
    }
  }

  /**
   * Adds the `tab-stops` element and the tab stop definitions if any tab stop is set.
   *
   * @param {Element} textPropertiesElement The element which will take the attribute
   */
  private setTabStopElements(document: Document, paragraphPropertiesElement: Element): void {
    if (this.tabStops.length > 0) {
      const tabStopsElement = document.createElement(OdfElementName.StyleTabStops);
      paragraphPropertiesElement.appendChild(tabStopsElement);

      this.tabStops.forEach((tabStop: TabStop) => {
        tabStop.toXml(document, tabStopsElement);
      });
    }
  }

  /**
   * Sorts the tab stops by their position ascending.
   */
  private sortTabStops(): void {
    this.tabStops.sort((a: TabStop, b: TabStop) => {
      return a.getPosition() - b.getPosition();
    });
  }
}
