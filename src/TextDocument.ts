import { writeFile } from "fs";
import { promisify } from "util";
import { DOMImplementation, XMLSerializer } from "xmldom";

import { OdfAttributeName } from "./OdfAttributeName";
import { OdfElement } from "./OdfElement";
import { OdfElementName } from "./OdfElementName";
import { FontPitch } from "./style/FontPitch";
import { Heading } from "./text/Heading";
import { List } from "./text/List";
import { Paragraph } from "./text/Paragraph";

export const XML_DECLARATION = '<?xml version="1.0" encoding="UTF-8"?>\n';

const OFFICE_VERSION = "1.2";

/** This interface holds a font font declaration */
interface IFont {
  name: string;
  fontFamily: string;
  fontPitch: FontPitch;
}

/**
 * This class represents an empty ODF text document.
 * @since 0.1.0
 */
export class TextDocument extends OdfElement {
  private fonts: IFont[];

  public constructor() {
    super();

    this.fonts = [];
  }

  /**
   * Declares a font to be used in the document.
   *
   * **Note: There is no check whether the font exists.
   * In order to be displayed properly, the font must be present on the target system.**
   *
   * @param {string} name The name of the font; this name must be set to a {@link ParagraphStyle}
   * @param {string} fontFamily The name of the font family
   * @param {FontPitch} fontPitch The ptich of the fonr
   * @since 0.4.0
   */
  public declareFont(name: string, fontFamily: string, fontPitch: FontPitch): void {
    this.fonts.push({ name, fontFamily, fontPitch });
  }

  /**
   * Adds a heading at the end of the document.
   * If a text is given, this will be set as text content of the heading.
   *
   * @param {string} [text] The text content of the heading
   * @param {number} [level=1] The heading level; defaults to 1 if omitted
   * @returns {Heading} The newly added heading
   * @since 0.1.0
   */
  public addHeading(text?: string, level = 1): Heading {
    const heading = new Heading(text, level);
    this.append(heading);

    return heading;
  }

  /**
   * Adds an empty list at the end of the document.
   *
   * @returns {List} The newly added list
   * @since 0.2.0
   */
  public addList(): List {
    const list = new List();
    this.append(list);

    return list;
  }

  /**
   * Adds a paragraph at the end of the document.
   * If a text is given, this will be set as text content of the paragraph.
   *
   * @param {string} [text] The text content of the paragraph
   * @returns {Paragraph} The newly added paragraph
   * @since 0.1.0
   */
  public addParagraph(text?: string): Paragraph {
    const paragraph = new Paragraph(text);
    this.append(paragraph);

    return paragraph;
  }

  /**
   * Saves the document in flat open document xml format.
   *
   * @param {string} filePath The file path to write to
   * @returns {Promise<void>}
   * @since 0.1.0
   */
  public saveFlat(filePath: string): Promise<void> {
    const writeFileAsync = promisify(writeFile);
    const xml = this.toString();

    return writeFileAsync(filePath, xml);
  }

  /**
   * Returns the string representation of this document in flat open document xml format.
   *
   * @returns {string} The string representation of this document
   * @since 0.1.0
   * @deprecated since version 0.3.0; use {@link TextDocument#saveFlat} instead
   */
  public toString(): string {
    const document = new DOMImplementation().createDocument(
      "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
      OdfElementName.OfficeDocument,
      null);
    const root = document.firstChild;

    this.toXml(document, root as Element);

    return XML_DECLARATION + new XMLSerializer().serializeToString(document);
  }

  /** @inheritDoc */
  protected toXml(document: Document, root: Element): void {
    this.setXmlNamespaces(root);

    root.setAttribute(OdfAttributeName.OfficeMimetype, "application/vnd.oasis.opendocument.text");
    root.setAttribute(OdfAttributeName.OfficeVersion, OFFICE_VERSION);

    this.setFontFaceElements(document, root);

    const bodyElement = document.createElement(OdfElementName.OfficeBody);
    root.appendChild(bodyElement);

    const textElement = document.createElement(OdfElementName.OfficeText);
    bodyElement.appendChild(textElement);

    super.toXml(document, textElement);
  }

  /**
   * Declares the used XML namespaces.
   *
   * @param {Element} root The root element of the document which will be used as parent
   */
  private setXmlNamespaces(root: Element): void {
    root.setAttribute("xmlns:draw", "urn:oasis:names:tc:opendocument:xmlns:drawing:1.0");
    root.setAttribute("xmlns:fo", "urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0");
    root.setAttribute("xmlns:style", "urn:oasis:names:tc:opendocument:xmlns:style:1.0");
    root.setAttribute("xmlns:svg", "urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0");
    root.setAttribute("xmlns:text", "urn:oasis:names:tc:opendocument:xmlns:text:1.0");
    root.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
  }

  /**
   * Adds the `font-face-decls` element and the font faces if any font needs to be declared.
   *
   * @param {Document} document The XML document
   * @param {Element} root The element which will be used as parent
   */
  private setFontFaceElements(document: Document, root: Element): void {
    if (this.fonts.length === 0) {
      return;
    }

    const fontFaceDeclsElement = document.createElement(OdfElementName.OfficeFontFaceDeclarations);
    root.appendChild(fontFaceDeclsElement);

    this.fonts.forEach((font: IFont) => {
      const fontFaceElement = document.createElement(OdfElementName.StyleFontFace);
      fontFaceDeclsElement.appendChild(fontFaceElement);
      fontFaceElement.setAttribute("style:name", font.name);
      const encodedFontFamily = font.fontFamily.includes(" ") === true ? `'${font.fontFamily}'` : font.fontFamily;
      fontFaceElement.setAttribute("svg:font-family", encodedFontFamily);
      fontFaceElement.setAttribute("style:font-pitch", font.fontPitch);
    });
  }
}
