import { writeFile } from "fs";
import { promisify } from "util";
import { DOMImplementation, XMLSerializer } from "xmldom";

import { OdfAttributeName } from "./OdfAttributeName";
import { OdfElement } from "./OdfElement";
import { OdfElementName } from "./OdfElementName";
import { Heading } from "./text/Heading";
import { List } from "./text/List";
import { Paragraph } from "./text/Paragraph";

export const XML_DECLARATION = '<?xml version="1.0" encoding="UTF-8"?>\n';

const OFFICE_VERSION = "1.2";

/**
 * This class represents an empty ODF text document.
 * @since 0.1.0
 */
export class TextDocument extends OdfElement {
  public constructor() {
    super();
  }

  /**
   * Adds a heading at the end of the document.
   * If a text is given, this will be set as text content of the paragraph.
   * If the heading level is omitted, it defaults to 1.
   *
   * @param {string} [text] The optional text content of the heading
   * @param {number} [headingLevel] The optional heading level
   * @returns {Heading} The newly added heading
   * @since 0.1.0
   */
  public addHeading(text?: string, headingLevel?: number): Heading {
    const heading = new Heading(text, headingLevel);
    this.appendElement(heading);

    return heading;
  }

  /**
   * Adds a paragraph at the end of the document.
   * If a text is given, this will be set as text content of the paragraph.
   *
   * @param {string} [text] The optional text content of the paragraph
   * @returns {Paragraph} The newly added paragraph
   * @since 0.1.0
   */
  public addParagraph(text?: string): Paragraph {
    const paragraph = new Paragraph(text);
    this.appendElement(paragraph);

    return paragraph;
  }

  /**
   * Adds a list at the end of the document.
   *
   * @returns {List} The newly added list
   * @since 0.2.0
   */
  public addList(): List {
    const list = new List();
    this.appendElement(list);

    return list;
  }

  /** @inheritDoc */
  public toString(): string {
    /* tslint:disable-next-line:max-line-length */
    const document = new DOMImplementation().createDocument(
      "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
      OdfElementName.OfficeDocument,
      null);
    const root = document.firstChild;

    this.toXML(document, root as Element);

    return new XMLSerializer().serializeToString(document);
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

    return writeFileAsync(filePath, XML_DECLARATION + xml);
  }

  /** @inheritDoc */
  protected toXML(document: Document, root: Element): void {
    root.setAttribute(OdfAttributeName.OfficeMimetype, "application/vnd.oasis.opendocument.text");
    root.setAttribute(OdfAttributeName.OfficeVersion, OFFICE_VERSION);

    const bodyElement = document.createElement(OdfElementName.OfficeBody);
    root.appendChild(bodyElement);

    const textElement = document.createElement(OdfElementName.OfficeText);
    bodyElement.appendChild(textElement);

    super.toXML(document, textElement);
  }
}
