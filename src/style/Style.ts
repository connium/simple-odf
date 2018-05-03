import { createHash } from "crypto";
import { OdfAttributeName } from "../OdfAttributeName";
import { OdfElementName } from "../OdfElementName";
import { HorizontalAlignment } from "./HorizontalAlignment";
import { TabStop } from "./TabStop";

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
   * @param {TabStop} tabStop The tab stop to add
   * @returns {TabStop | undefined} The newly added tab stop
   * or `undefined` if a tab stop at the same position already exists
   * @since 0.3.0
   */
  public addTabStop(tabStop: TabStop): TabStop | undefined {
    const existsTabStop = this.tabStops.some((value: TabStop) => {
      return tabStop.getPosition() === value.getPosition();
    });

    if (existsTabStop === true) {
      return undefined;
    }

    this.tabStops.push(tabStop);
    this.sortTabStops();

    return tabStop;
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
   * Returns whether the style represents the default style.
   *
   * @returns {boolean} TRUE if the style equals the default style, FALSE otherwise
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
  public toXML(document: Document): void {
    if (this.isDefault() === true) {
      return;
    }

    const automaticStylesElement = this.getAutomaticStylesElement(document);
    const styleName = this.getName();

    if (automaticStylesElement.childNodes.length > 0) {
      /* tslint:disable-next-line:prefer-for-of*/
      for (let i = 0; i < automaticStylesElement.childNodes.length; i++) {
        const existingStyleElement = automaticStylesElement.childNodes[i] as Element;
        const nameAttribute = existingStyleElement.attributes.getNamedItem(OdfAttributeName.StyleName);
        if (nameAttribute !== null && nameAttribute.value === styleName) {
          return;
        }
      }
    }

    const styleElement = document.createElement(OdfElementName.StyleStyle);
    styleElement.setAttribute(OdfAttributeName.StyleFamily, "paragraph");
    styleElement.setAttribute(OdfAttributeName.StyleName, styleName);
    automaticStylesElement.appendChild(styleElement);

    const paragraphPropertiesElement = document.createElement(OdfElementName.StyleParagraphProperties);

    if (this.horizontalAlignment !== HorizontalAlignment.Default) {
      paragraphPropertiesElement.setAttribute("fo:text-align", this.horizontalAlignment);
    }

    if (this.shouldBreakPageBefore === true) {
      paragraphPropertiesElement.setAttribute("fo:break-before", "page");
    }

    if (this.tabStops.length > 0) {
      const tabStopsElement = document.createElement("style:tab-stops");
      paragraphPropertiesElement.appendChild(tabStopsElement);

      this.tabStops.forEach((tabStop: TabStop) => {
        tabStop.toXml(document, tabStopsElement);
      });
    }

    styleElement.appendChild(paragraphPropertiesElement);
  }

  /**
   * Returns the `automatic-styles` element of the document.
   * If there is no such element yet, it will be created.
   *
   * @param {Document} document The XML document
   * @returns {Element} The documents `automatic-styles` element
   */
  private getAutomaticStylesElement(document: Document): Element {
    const rootNode = document.firstChild as Element;

    const automaticStylesElements = rootNode.getElementsByTagName(OdfElementName.OfficeAutomaticStyles);

    if (automaticStylesElements.length === 0) {
      return this.createAutomaticStylesElement(document);
    }

    return automaticStylesElements[0];
  }

  /**
   * Creates and returns the `automatic-styles` element for the document.
   *
   * @param {Document} document The XML document
   * @returns {Element} The newly created `automatic-styles` element
   */
  private createAutomaticStylesElement(document: Document): Element {
    const rootNode = document.firstChild as Element;
    rootNode.setAttribute("xmlns:style", "urn:oasis:names:tc:opendocument:xmlns:style:1.0");
    rootNode.setAttribute("xmlns:fo", "urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0");

    const automaticStyles = document.createElement(OdfElementName.OfficeAutomaticStyles);
    rootNode.insertBefore(automaticStyles, rootNode.firstChild);

    return automaticStyles;
  }

  private sortTabStops(): void {
    this.tabStops.sort((a: TabStop, b: TabStop) => {
      return a.getPosition() - b.getPosition();
    });
  }
}
