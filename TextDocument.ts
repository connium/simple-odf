import { writeFile } from 'fs';
import { DOMImplementation, XMLSerializer } from 'xmldom';

import { OdfElement } from './OdfElement';
import { Paragraph } from './Paragraph';
import { OdfElementName } from './OdfElementName';

const XML_DECLARATION = '<?xml version="1.0" encoding="UTF-8"?>',
      NEWLINE         = '\n';

/**
 * This class represents an empty ODF text document.
 */
export class TextDocument extends OdfElement {
  // load file from File, InputStream, OdfPackageDocument, String
  // public static load(filePath: string): Promise<TextDocument> {
  //   return Promise.resolve(undefined);
  // }

  public constructor() {
    super();
  }

  /**
   * Saves the document in flat open document xml format.
   *
   * @param {string} filePath The file path to write to
   * @returns {Promise<void>}
   */
  public save(filePath: string): Promise<void> {
    const document = new DOMImplementation().createDocument('urn:oasis:names:tc:opendocument:xmlns:office:1.0', 'office:document', undefined);
    const root     = <Element>document.firstChild;

    this.toXML(document, root);

    const xml = new XMLSerializer().serializeToString(document);

    return new Promise<void>((resolve, reject) => {
      writeFile(filePath, XML_DECLARATION + NEWLINE + xml, (error) => {
        if (error !== null) {
          console.error(`Failed to save document to ${filePath}`, error);
          reject(error);
          return;
        }

        resolve();
      });
    });
  }

  /**
   * Appends a paragraph to the document.
   * If a text is given, this will be set as content of the paragraph.
   *
   * @param {string} [text] The optional text of the paragraph
   * @returns {Paragraph} The newly added paragraph
   */
  public addParagraph(text?: string): Paragraph {
    const paragraph = new Paragraph(text);
    this.appendElement(paragraph);

    return paragraph;
  }

  /** @inheritDoc */
  protected toXML(document: Document, root: Element): void {
    root.setAttribute('office:mimetype', 'application/vnd.oasis.opendocument.text');
    root.setAttribute('office:version', '1.2');

    const automaticStyles = document.createElement(OdfElementName.OFFICE_AUTOMATIC_STYLES);
    root.appendChild(automaticStyles);

    const body = document.createElement(OdfElementName.OFFICE_BODY);
    root.appendChild(body);

    const text = document.createElement(OdfElementName.OFFICE_TEXT);
    body.appendChild(text);

    super.toXML(document, text);
  }
}
