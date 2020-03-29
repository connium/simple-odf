import { FontFaceDeclarations } from '../../api/office';
import { FontFace } from '../../api/style';
import { OdfElementName } from '../OdfElementName';

/**
 * Transforms a {@link FontFaceDeclarations} object into ODF conform XML
 *
 * @since 0.8.0
 */
export class FontFaceDeclarationsWriter {
  /**
   * Transforms the given {@link FontFaceDeclarations} into Open Document Format.
   *
   * @param {Document} document The XML document
   * @param {Element} parent The parent node in the DOM
   * @param {FontFaceDeclarations} fontFaceDeclarations The font face declarations to serialize
   * @since 0.7.0
   */
  public write(
    fontFaceDeclarations: FontFaceDeclarations,
    document: Document,
    root: Element
  ): void {
    const fonts = fontFaceDeclarations.getAll();

    if (fonts.length === 0) {
      return;
    }

    const fontFaceDeclsElement = document.createElement(
      OdfElementName.OfficeFontFaceDeclarations
    );
    root.appendChild(fontFaceDeclsElement);

    fonts.forEach((font: FontFace) => {
      this.visitFontFace(font, document, fontFaceDeclsElement);
    });
  }

  private visitFontFace(
    font: FontFace,
    document: Document,
    parent: Element
  ): Element {
    const fontFaceElement = document.createElement(
      OdfElementName.StyleFontFace
    );
    parent.appendChild(fontFaceElement);

    fontFaceElement.setAttribute('style:name', font.getName());

    const fontFamily = font.getFontFamily();
    if (fontFamily !== undefined) {
      const encodedFontFamily =
        fontFamily.includes(' ') === true ? `'${fontFamily}'` : fontFamily;
      fontFaceElement.setAttribute('svg:font-family', encodedFontFamily);
    }

    const fontPitch = font.getFontPitch();
    if (fontPitch !== undefined) {
      fontFaceElement.setAttribute('style:font-pitch', fontPitch);
    }

    return fontFaceElement;
  }
}
