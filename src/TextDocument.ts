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

    this.toXML(document, root as Element);

    return XML_DECLARATION + new XMLSerializer().serializeToString(document);
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
