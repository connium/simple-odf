import { FontFace, FontPitch } from '../style';

/**
 * This class contains all font face declarations of a document.
 *
 * It is used to manage the fonts that are used in the document.
 *
 * @example
 * document.getFontFaceDeclarations()
 *   .create('FreeSans', 'FreeSans', FontPitch.Variable);
 *
 * @since 0.8.0
 */
export class FontFaceDeclarations {
  private readonly fontFaces: Map<string, FontFace> = new Map();

  /**
   * Creates a {@link FontFace} object with the given name.
   * If a font with this name already exists, the existing font will be returned.
   *
   * @example
   * const fontFaceDeclarations = new FontFaceDeclarations();
   * fontFaceDeclarations.create('FreeSans', 'FreeSans', FontPitch.Variable);
   *
   * @param {string} name The unique name for the font
   * @param {string} [fontFamily] The name of the font family
   * @param {FontPitch} [fontPitch] Indicator whether the font has a fixed or variable width
   * @returns {FontFace} A new `FontFace` object with the specified properties
   * or an existing font face, if one with the specified name exists
   * @since 0.8.0
   */
  public create (name: string, fontFamily?: string, fontPitch?: FontPitch): FontFace {
    let fontFace = this.fontFaces.get(name);

    if (fontFace !== undefined) {
      return fontFace;
    }

    fontFace = new FontFace(name, fontFamily, fontPitch);
    this.fontFaces.set(name, fontFace);

    return fontFace;
  }

  /**
   * The `get()` method returns a specified element from a Map object.
   *
   * @example
   * const fontFaceDeclarations = new FontFaceDeclarations();
   * fontFaceDeclarations.create('FreeSans');
   * fontFaceDeclarations.get('UnknownFont'); // undefined
   * fontFaceDeclarations.get('FreeSans');    // FreeSans font
   *
   * @param {string} name The name of the requested font
   * @returns {FontFace | undefined} The `FontFace` object associated with the specified name
   * or `undefined` if there is no font with this name
   * @since 0.8.0
   */
  public get (name: string): FontFace | undefined {
    return this.fontFaces.get(name);
  }

  /**
   * The `getAll()` method returns a new `Array` object that contains the fonts of the document.
   *
   * @example
   * const fontFaceDeclarations = new FontFaceDeclarations();
   * fontFaceDeclarations.create('FreeSans');
   * fontFaceDeclarations.create('Symbol');
   * fontFaceDeclarations.getAll();           // [FreeSans, Symbol]
   *
   * @returns {FontFace[]} A new `Array` object that contains the fonts of the document
   * @since 0.8.0
   */
  public getAll (): FontFace[] {
    return [...this.fontFaces.values()];
  }

  /**
   * The `delete()` method removes the specified font from the font face declarations.
   *
   * @example
   * var myMap = new Map();
   * const fontFaceDeclarations = new FontFaceDeclarations();
   * fontFaceDeclarations.create('FreeSans');
   * fontFaceDeclarations.create('Symbol');
   * fontFaceDeclarations.delete('FreeSans');
   * fontFaceDeclarations.get('FreeSans');    // undefined
   *
   * @param {string} name The name of the font to remove from the font face declarations
   * @returns {Meta} The `Meta` object
   * @since 0.8.0
   */
  public delete (name: string): FontFaceDeclarations {
    this.fontFaces.delete(name);

    return this;
  }
}
