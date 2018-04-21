import { createHash } from "crypto";
import { OdfAttributeName } from "../OdfAttributeName";
import { OdfElementName } from "../OdfElementName";
import { HorizontalAlignment } from "./HorizontalAlignment";

/**
 * This class represents the style of a paragraph.
 *
 * @since 0.1.0
 */
export class Style {
  private horizontalAlignment: HorizontalAlignment;
  private shouldBreakPageBefore: boolean;

  /**
   * Constructor.
   */
  public constructor() {
    this.horizontalAlignment = HorizontalAlignment.Default;
    this.shouldBreakPageBefore = false;
  }

  /**
   * Returns the name of the style.
   * The name is computed to make sure equal styles feature equal names and reflects the current comnfiguration.
   *
   * @returns {string} The name of the style
   * @since 0.1.0
   */
  public getName(): string {
    const hash = createHash("md5");

    hash.update(this.horizontalAlignment);
    hash.update(this.shouldBreakPageBefore ? "pb" : "");

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
   * Returns whether the style represents the default style.
   *
   * @returns {boolean} TRUE if the style equals the default style, FALSE otherwise
   * @since 0.1.0
   */
  public isDefault(): boolean {
    return this.horizontalAlignment === HorizontalAlignment.Default
      && this.shouldBreakPageBefore === false;
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
}
