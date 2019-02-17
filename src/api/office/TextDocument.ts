import { writeFile } from "fs";
import { promisify } from "util";
import { XMLSerializer } from "xmldom";
import { TextDocumentWriter } from "../../xml/TextDocumentWriter";
import { Meta } from "../meta";
import { FontFace, FontPitch } from "../style";
import { TextBody } from "./TextBody";

export const XML_DECLARATION = '<?xml version="1.0" encoding="UTF-8"?>\n';

/**
 * This class represents a text document in OpenDocument format.
 *
 * @example
 * const document = new TextDocument();
 * document.getMeta().setCreator("Homer Simpson");
 * document.declareFont("FreeSans", "FreeSans", FontPitch.Variable);
 * document.getBody().addHeading("My first document");
 * document.saveFlat("/home/homer/document.fodt");
 *
 * @since 0.1.0
 */
export class TextDocument {
  private meta: Meta;
  private fonts: FontFace[];
  private body: TextBody;

  public constructor() {
    this.meta = new Meta();
    this.fonts = [];
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
  public getBody(): TextBody {
    return this.body;
  }

  /**
   * The `declareFont` method creates a font face to be used in the document.
   *
   * **Note: There is no check whether the font exists.
   * In order to be displayed properly, the font must be present on the target system.**
   *
   * @example
   * new TextDocument()
   *   .declareFont("FreeSans", "FreeSans", FontPitch.Variable);
   *
   * @param {string} name The name of the font; this name must be set to a {@link ParagraphStyle}
   * @param {string} fontFamily The name of the font family
   * @param {FontPitch} fontPitch The pitch of the font
   * @returns {FontFace} The declared `FontFace` object
   * @since 0.4.0
   */
  public declareFont(name: string, fontFamily: string, fontPitch: FontPitch): FontFace {
    const fontFace = new FontFace(name, fontFamily, fontPitch);
    this.fonts.push(fontFace);

    return fontFace;
  }

  /**
   * The `getFonts()` method returns all font face declarations for the document.
   *
   * @example
   * const document = new TextDocument();
   * document.declareFont("FreeSans", "FreeSans", FontPitch.Variable);
   * document.getFonts();
   *
   * @returns {FontFace[]} A copy of the list of font face declarations for the document
   * @since 0.7.0
   */
  public getFonts(): FontFace[] {
    return Array.from(this.fonts);
  }

  /**
   * The `getMeta()` method returns the metadata of the document.
   *
   * @example
   * new TextDocument.getMeta()
   *   .setCreator('Homer Simpson');
   *
   * @returns {Meta} An object holding the metadata of the document
   * @see {@link Meta}
   * @since 0.6.0
   */
  public getMeta(): Meta {
    return this.meta;
  }

  /**
   * The `saveFlat()` method converts the document into an XML string and stores it in flat open document xml format.
   *
   * @example
   * new TextDocument()
   *   .saveFlat("/home/homer/document.fodt");
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
    const document = new TextDocumentWriter().write(this);

    return XML_DECLARATION + new XMLSerializer().serializeToString(document);
  }
}
