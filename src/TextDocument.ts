import { writeFile } from "fs";
import { promisify } from "util";
import { DOMImplementation, XMLSerializer } from "xmldom";
import { Meta } from "./api/meta";
import { TextBody } from "./api/office";
import { FontPitch } from "./style/FontPitch";
import { DomVisitor } from "./xml/DomVisitor";
import { MetaWriter } from "./xml/meta/MetaWriter";
import { OdfAttributeName } from "./xml/OdfAttributeName";
import { OdfElementName } from "./xml/OdfElementName";

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
export class TextDocument {
  private meta: Meta;
  private fonts: IFont[];
  private body: TextBody;

  public constructor() {
    this.meta = new Meta();
    this.fonts = [];
    this.body = new TextBody();
  }

  /**
   * The `getMeta()` method returns the metadata of the document.
   *
   * @example
   * document.getMeta().setCreator('Lisa Simpson');
   *
   * @returns {Meta} An object holding the metadata of the document
   * @see {@link Meta}
   * @since 0.6.0
   */
  public getMeta(): Meta {
    return this.meta;
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
   * The `getBody()` method returns the content of the document.
   *
   * @example
   * document.getBody().addHeading('My document');
   *
   * @returns {TextBody} An object holding the content of the document
   * @since 0.7.0
   */
  public getBody(): TextBody {
    return this.body;
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

    new MetaWriter().write(document, root, this.meta);

    this.setFontFaceElements(document, root);

    new DomVisitor().visit(this.body, document, root);
  }

  /**
   * Declares the used XML namespaces.
   *
   * @param {Element} root The root element of the document which will be used as parent
   * @private
   */
  private setXmlNamespaces(root: Element): void {
    root.setAttribute("xmlns:dc", "http://purl.org/dc/elements/1.1");
    root.setAttribute("xmlns:draw", "urn:oasis:names:tc:opendocument:xmlns:drawing:1.0");
    root.setAttribute("xmlns:fo", "urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0");
    root.setAttribute("xmlns:meta", "urn:oasis:names:tc:opendocument:xmlns:meta:1.0");
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
   * @private
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
