import { createHash } from "crypto";
import { OdfAttributeName } from "../OdfAttributeName";
import { OdfElementName } from "../OdfElementName";
import { HorizontalAlignment } from "./HorizontalAlignment";

/**
 * TODO
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
   * TODO
   *
   * @returns {string} TODO
   * @since 0.1.0
   */
  public getName(): string {
    const hash = createHash("md5");

    hash.update(this.shouldBreakPageBefore ? "pb" : "");

    return hash.digest("hex");
  }

  /**
   * TODO
   *
   * @returns {boolean} TODO
   * @since 0.1.0
   */
  public isDefault(): boolean {
    return this.horizontalAlignment === HorizontalAlignment.Default
      && this.shouldBreakPageBefore === false;
  }

  /**
   * TODO
   *
   * @returns {HorizontalAlignment} TODO
   * @since 0.2.0
   */
  public getHorizontalAlignment(): HorizontalAlignment {
    return this.horizontalAlignment;
  }

  /**
   * TODO
   *
   * @param {HorizontalAlignment} horizontalAlignment TODO
   * @since 0.1.0
   */
  public setHorizontalAlignment(horizontalAlignment: HorizontalAlignment): void {
    this.horizontalAlignment = horizontalAlignment;
  }

  /**
   * TODO
   *
   * @param {boolean} shouldBreakBefore TODO
   * @since 0.1.0
   */
  public setPageBreakBefore(shouldBreakBefore: boolean): void {
    this.shouldBreakPageBefore = shouldBreakBefore;
  }

  /**
   * TODO
   *
   * @param {Document} document TODO
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
        const existingStyleElement = automaticStylesElement.childNodes[i];
        const nameAttribute = existingStyleElement.attributes.getNamedItem(OdfAttributeName.StyleName);
        if (nameAttribute.value === styleName) {
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
   * TODO
   *
   * @param {Document} document TODO
   * @returns {Element} TODO
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
   * TODO
   *
   * @param {Document} document TODO
   * @returns {Element} TODO
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
