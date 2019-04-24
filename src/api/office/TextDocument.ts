import { writeFile } from 'fs';
import { promisify } from 'util';
import { XMLSerializer } from 'xmldom';
import { TextDocumentWriter } from '../../xml/TextDocumentWriter';
import { Meta } from '../meta';
import { CommonStyles } from './CommonStyles';
import { FontFaceDeclarations } from './FontFaceDeclarations';
import { TextBody } from './TextBody';

export const XML_DECLARATION = '<?xml version="1.0" encoding="UTF-8"?>\n';

/**
 * This class represents a text document in OpenDocument format.
 *
 * @example
 * const document = new TextDocument();
 * document.getMeta().setCreator('Homer Simpson');
 * document.getFontFaceDeclarations().create('FreeSans', 'FreeSans', FontPitch.Variable);
 * document.getBody().addHeading('My first document');
 * document.saveFlat('/home/homer/document.fodt');
 *
 * @since 0.1.0
 */
export class TextDocument {
  private meta: Meta;
  private fontFaceDeclarations: FontFaceDeclarations;
  private commonStyles: CommonStyles;
  private body: TextBody;

  /**
   * Creates a `TextDocument` instance that represents a OpenDocument text document.
   *
   * @example
   * const document = new TextDocument();
   *
   * @since 0.1.0
   */
  public constructor () {
    this.meta = new Meta();
    this.fontFaceDeclarations = new FontFaceDeclarations();
    this.commonStyles = new CommonStyles();
    this.body = new TextBody();
  }

  /**
   * The `getBody()` method returns the content of the document.
   *
   * @example
   * new TextDocument()
   *   .getBody()
   *   .addHeading('My first document');
   *
   * @returns {TextBody} A `TextBody` object that holds the content of the document
   * @since 0.7.0
   */
  public getBody (): TextBody {
    return this.body;
  }

  /**
   * The `getCommonStyles()` method returns the named styles of the document.
   *
   * @example
   * new TextDocument()
   *   .getCommonStyles()
   *   .createParagraphStyle('Summary');
   *
   * @returns {CommonStyles} A `CommonStyles` object that holds the named styles of the document
   * @since 0.9.0
   */
  public getCommonStyles (): CommonStyles {
    return this.commonStyles;
  }

  /**
   * The `getFonts()` method returns the font face declarations of the document.
   *
   * @example
   * new TextDocument()
   *   .getFontFaceDeclarations()
   *   .create('FreeSans', 'FreeSans', FontPitch.Variable);
   *
   * @returns {FontFaceDeclarations} An object holding the font faces of the document
   * @since 0.8.0
   */
  public getFontFaceDeclarations (): FontFaceDeclarations {
    return this.fontFaceDeclarations;
  }

  /**
   * The `getMeta()` method returns the metadata of the document.
   *
   * @example
   * new TextDocument()
   *   .getMeta()
   *   .setCreator('Homer Simpson');
   *
   * @returns {Meta} An object holding the metadata of the document
   * @since 0.6.0
   */
  public getMeta (): Meta {
    return this.meta;
  }

  /**
   * The `saveFlat()` method converts the document into an XML string and stores it in flat open document xml format.
   *
   * @example
   * new TextDocument()
   *   .saveFlat('/home/homer/document.fodt');
   *
   * @param {string} filePath The file path to write to
   * @returns {Promise<void>}
   * @since 0.1.0
   */
  public saveFlat (filePath: string): Promise<void> {
    const writeFileAsync = promisify(writeFile);
    const xml = this.toString();

    return writeFileAsync(filePath, xml);
  }

  /**
   * Returns the string representation of this document in flat open document xml format.
   *
   * @returns {string} The string representation of this document
   * @since 0.1.0
   */
  public toString (): string {
    const document = new TextDocumentWriter().write(this);

    return XML_DECLARATION + new XMLSerializer().serializeToString(document);
  }
}
