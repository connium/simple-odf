import { createHash } from "crypto";
import { OdfAttributeName } from "../OdfAttributeName";
import { OdfElementName } from "../OdfElementName";
import { HorizontalAlignment } from "./HorizontalAlignment";
import { StyleHelper } from "./StyleHelper";
import { TabStop } from "./TabStop";
import { TabStopType } from "./TabStopType";

/**
 * This class represents the style of a paragraph.
 *
 * @since 0.1.0
 */
export class Style {
  private horizontalAlignment: HorizontalAlignment;
  private shouldBreakPageBefore: boolean;
  private tabStops: TabStop[] = [];

  /**
   * Constructor.
   */
  public constructor() {
    this.horizontalAlignment = HorizontalAlignment.Default;
    this.shouldBreakPageBefore = false;
  }

  /**
   * Returns the name of the style.
   * The name is computed to make sure equal styles feature equal names and reflects the current configuration.
   *
   * @returns {string} The name of the style
   * @since 0.1.0
   */
  public getName(): string {
    const hash = createHash("md5");

    hash.update(this.horizontalAlignment);
    hash.update(this.shouldBreakPageBefore ? "pb" : "");
    this.tabStops.forEach((tabStop: TabStop) => {
      hash.update(`${tabStop.getPosition()}${tabStop.getType()}`);
    });

    return hash.digest("hex");
  }

  /**
   * Sets the horizontal alignment setting of this paragraph.
   *
   * @param {HorizontalAlignment} horizontalAlignment The horizontal alignment setting
   * @since 0.1.0
   */
  public setHorizontalAlignment(horizontalAlignment: HorizontalAlignment): void {
    this.horizontalAlignment = horizontalAlignment;
  }

  /**
   * Returns the horizontal alignment setting of this paragraph.
   *
   * @returns {HorizontalAlignment} The horizontal alignment setting
   * @since 0.2.0
   */
  public getHorizontalAlignment(): HorizontalAlignment {
    return this.horizontalAlignment;
  }

  /**
   * Inserts a new page break to the document before the corresponding element.
   *
   * @since 0.1.0
   */
  public setPageBreakBefore(): void {
    this.shouldBreakPageBefore = true;
  }

  /**
   * Adds a new tab stop to this style.
   * If a tab stop at the same position already exists, the new tab stop will not be added.
   * The tab stops will be ordered by their position.
   *
   * @param {number} position The position of the tab stop in centimeters relative to the left margin.
   * @param {TabStopType} type The type of the tab stop. Defaults to `TabStopType.Left`.
   * @returns {TabStop | undefined} The newly added tab stop
   * or `undefined` if a tab stop at the same position already exists
   * @since 0.3.0
   */
  public addTabStop(position: number, type: TabStopType): TabStop | undefined;
  /**
   * Adds a new tab stop to this style.
   * If a tab stop at the same position already exists, the new tab stop will not be added.
   * The tab stops will be ordered by their position.
   *
   * @param {TabStop} tabStop The tab stop to add
   * @returns {TabStop | undefined} The newly added tab stop
   * or `undefined` if a tab stop at the same position already exists
   * @since 0.3.0
   */
  public addTabStop(tabStop: TabStop): TabStop | undefined;
  public addTabStop(arg1: number | TabStop, type = TabStopType.Left) {
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

  /**
   * Returns all tab stops.
   *
   * @returns {TabStop[]} A copy of the list of tab stops
   * @since 0.3.0
   */
  public getTabStops(): TabStop[] {
    return Array.from(this.tabStops);
  }

  /**
   * Removes all tab stops.
   *
   * @since 0.3.0
   */
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
    return this.horizontalAlignment === HorizontalAlignment.Default
      && this.shouldBreakPageBefore === false
      && this.tabStops.length === 0;
  }

  /**
   * Transforms the style element into Open Document Format.
   *
   * @param {Document} document The XML document
   * @since 0.1.0
   */
  public toXML(document: Document, styleName: string): void {
    if (this.isDefault() === true) {
      return;
    }

    const styleElement = StyleHelper.getStyleElement(document, "paragraph", styleName);

    const paragraphPropertiesElement = document.createElement(OdfElementName.StyleParagraphProperties);
    styleElement.appendChild(paragraphPropertiesElement);

    if (this.horizontalAlignment !== HorizontalAlignment.Default) {
      paragraphPropertiesElement.setAttribute(OdfAttributeName.FormatTextAlign, this.horizontalAlignment);
    }

    if (this.shouldBreakPageBefore === true) {
      paragraphPropertiesElement.setAttribute(OdfAttributeName.FormatBreakBefore, "page");
    }

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
