import { OdfAttributeName } from "../OdfAttributeName";
import { OdfElementName } from "../OdfElementName";

export class StyleHelper {
  public static getStyleElement(document: Document, family: string, name: string): Element {
    const automaticStylesElement = StyleHelper.getAutomaticStylesElement(document);

    if (automaticStylesElement.childNodes.length > 0) {
      /* tslint:disable-next-line:prefer-for-of*/
      for (let i = 0; i < automaticStylesElement.childNodes.length; i++) {
        const existingStyleElement = automaticStylesElement.childNodes[i] as Element;
        const nameAttribute = existingStyleElement.attributes.getNamedItem(OdfAttributeName.StyleName);
        if (nameAttribute !== null && nameAttribute.value === name) {
          return existingStyleElement;
        }
      }
    }

    const styleElement = document.createElement(OdfElementName.StyleStyle);
    automaticStylesElement.appendChild(styleElement);
    styleElement.setAttribute(OdfAttributeName.StyleFamily, family);
    styleElement.setAttribute(OdfAttributeName.StyleName, name);

    return styleElement;
  }

  /**
   * Returns the `automatic-styles` element of the document.
   * If there is no such element yet, it will be created.
   *
   * @param {Document} document The XML document
   * @returns {Element} The documents `automatic-styles` element
   */
  private static getAutomaticStylesElement(document: Document): Element {
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
  private static createAutomaticStylesElement(document: Document): Element {
    const rootNode = document.firstChild as Element;
    rootNode.setAttribute("xmlns:style", "urn:oasis:names:tc:opendocument:xmlns:style:1.0");
    rootNode.setAttribute("xmlns:fo", "urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0");

    const automaticStyles = document.createElement(OdfElementName.OfficeAutomaticStyles);
    rootNode.insertBefore(automaticStyles, rootNode.firstChild);

    return automaticStyles;
  }
}
