import { DOMImplementation } from '@xmldom/xmldom';
import { AutomaticStyles, TextDocument } from '../api/office';
import { MetaWriter } from './meta/MetaWriter';
import { FontFaceDeclarationsWriter } from './office/FontFaceDeclarationsWriter';
import { StylesWriter } from './office/StylesWriter';
import { AutomaticStyleVisitor } from './AutomaticStyleVisitor';
import { DomVisitor } from './DomVisitor';
import { OdfAttributeName } from './OdfAttributeName';
import { OdfElementName } from './OdfElementName';

/**
 * Transforms a {@link TextDocument} object into ODF conform XML
 *
 * @since 0.7.0
 */
export class TextDocumentWriter {
  private fontFaceDeclarationsWriter: FontFaceDeclarationsWriter;
  private metaWriter: MetaWriter;
  private stylesWriter: StylesWriter;

  public constructor() {
    this.fontFaceDeclarationsWriter = new FontFaceDeclarationsWriter();
    this.metaWriter = new MetaWriter();
    this.stylesWriter = new StylesWriter();
  }

  /**
   * Transforms the given {@link TextDocument} into Open Document Format.
   *
   * @param {TextDocument} textDocument The text document to serialize
   * @returns {Document} The XML document
   * @since 0.7.0
   */
  public write(textDocument: TextDocument): Document {
    const document = new DOMImplementation().createDocument(
      'urn:oasis:names:tc:opendocument:xmlns:office:1.0',
      OdfElementName.OfficeDocument,
      null
    );
    const root = document.firstChild as Element;

    this.setXmlNamespaces(root);
    this.setOfficeAttributes(textDocument, root);

    const automaticStyles = new AutomaticStyles();

    this.writeMeta(textDocument, document, root);
    this.writeFontFaceDeclarations(textDocument, document, root);
    this.writeStyles(textDocument, automaticStyles, document, root);
    this.writeBody(textDocument, automaticStyles, document, root);

    return document;
  }

  /**
   * Declares the used XML namespaces.
   *
   * @param {Element} root The root element of the document which will be used as parent
   * @private
   */
  private setXmlNamespaces(root: Element): void {
    root.setAttribute('xmlns:dc', 'http://purl.org/dc/elements/1.1/');
    root.setAttribute(
      'xmlns:draw',
      'urn:oasis:names:tc:opendocument:xmlns:drawing:1.0'
    );
    root.setAttribute(
      'xmlns:fo',
      'urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0'
    );
    root.setAttribute(
      'xmlns:meta',
      'urn:oasis:names:tc:opendocument:xmlns:meta:1.0'
    );
    root.setAttribute(
      'xmlns:style',
      'urn:oasis:names:tc:opendocument:xmlns:style:1.0'
    );
    root.setAttribute(
      'xmlns:svg',
      'urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0'
    );
    root.setAttribute(
      'xmlns:text',
      'urn:oasis:names:tc:opendocument:xmlns:text:1.0'
    );
    root.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
  }

  /**
   * Sets the mime type and the version attributes.
   *
   * @param {TextDocument} textDocument The text document to serialize
   * @param {Element} root The root element of the document which will be used as parent
   * @private
   */
  private setOfficeAttributes(textDocument: TextDocument, root: Element): void {
    root.setAttribute(
      OdfAttributeName.OfficeMimetype,
      textDocument.getMimeType()
    );
    root.setAttribute(
      OdfAttributeName.OfficeVersion,
      textDocument.getOfficeVersion()
    );
  }

  /**
   * Adds the meta data to the document.
   *
   * @param {TextDocument} textDocument The text document to serialize
   * @param {Document} document The parent node in the DOM
   * @param {Element} root The root element of the document which will be used as parent
   * @private
   */
  private writeMeta(
    textDocument: TextDocument,
    document: Document,
    root: Element
  ): void {
    this.metaWriter.write(document, root, textDocument.getMeta());
  }

  /**
   * Adds the font face declarations to the document.
   *
   * @param {TextDocument} textDocument The text document to serialize
   * @param {Document} document The parent node in the DOM
   * @param {Element} root The root element of the document which will be used as parent
   * @private
   */
  private writeFontFaceDeclarations(
    textDocument: TextDocument,
    document: Document,
    root: Element
  ): void {
    this.fontFaceDeclarationsWriter.write(
      textDocument.getFontFaceDeclarations(),
      document,
      root
    );
  }

  /**
   * Adds the styles to the document.
   *
   * @param {TextDocument} textDocument The text document to serialize
   * @param {AutomaticStyles} automaticStyles The automatic styles for the document
   * @param {Document} document The parent node in the DOM
   * @param {Element} root The root element of the document which will be used as parent
   * @private
   */
  private writeStyles(
    textDocument: TextDocument,
    automaticStyles: AutomaticStyles,
    document: Document,
    root: Element
  ): void {
    new AutomaticStyleVisitor(automaticStyles).visit(textDocument.getBody());

    this.stylesWriter.write(textDocument.getCommonStyles(), document, root);
    this.stylesWriter.write(automaticStyles, document, root);
  }

  /**
   * Adds the documents body to the document.
   *
   * @param {TextDocument} textDocument The text document to serialize
   * @param {AutomaticStyles} automaticStyles The automatic styles for the document
   * @param {Document} document The parent node in the DOM
   * @param {Element} root The root element of the document which will be used as parent
   * @private
   */
  private writeBody(
    textDocument: TextDocument,
    automaticStyles: AutomaticStyles,
    document: Document,
    root: Element
  ): void {
    new DomVisitor(textDocument.getCommonStyles(), automaticStyles).visit(
      textDocument.getBody(),
      document,
      root
    );
  }
}
