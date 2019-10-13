import { FontFamilyGeneric } from './FontFamilyGeneric';
import { FontPitch } from './FontPitch';

/**
 * This class represents a font face declaration.
 *
 * It is used to describe the characteristics of a font which is used in the document.
 * The unique name of a font can be used inside styles to select a font face declaration.
 *
 * @example
 * const font = document.getFontFaceDeclarations().create('FreeSans', 'FreeSans', FontPitch.Variable);
 * font.setFontFamilyGeneric(FontFamilyGeneric.Swiss);
 *
 * @since 0.8.0
 */
export class FontFace {
  private name: string;
  private fontCharset: string | undefined;
  private fontFamily: string | undefined;
  private fontFamilyGeneric: FontFamilyGeneric | undefined;
  private fontPitch: FontPitch | undefined;

  /**
   * Creates a `FontFace` instance that represents the characteristics of a font.
   *
   * @example
   * const font = new FontFace('FreeSans', 'FreeSans', FontPitch.Variable);
   * const font = new FontFace('FreeSans', 'FreeSans');
   * const font = new FontFace('FreeSans');
   *
   * @param {string} name The unique name for the font
   * @param {string} [fontFamily] The name of the font family
   * @param {FontPitch} [fontPitch] Indicator whether the font has a fixed or variable width
   *
   * @since 0.8.0
   */
  public constructor (name: string, fontFamily?: string, fontPitch?: FontPitch) {
    this.name = name;
    this.fontFamily = fontFamily;
    this.fontPitch = fontPitch;
  }

  /**
   * The `setCharset()` method sets whether the font defines glyphs according to the semantics of Unicode or not.
   *
   * The value can be `x-symbol` or a character encoding.
   *
   * If an illegal value is provided, the value will be ignored.
   *
   * @example
   * const font = new FontFace('OpenSymbol', 'OpenSymbol', FontPitch.Variable);
   * font.setCharset('x-symbol'); // 'x-symbol'
   * font.setCharset('23');       // 'x-symbol'
   * font.setCharset(undefined);  // undefined
   *
   * @param {string | undefined} fontCharset The charset of the font or `undefined` to unset the charset
   * @returns {FontFace} The `FontFace` object
   * @since 0.8.0
   */
  public setCharset (fontCharset: string | undefined): FontFace {
    if (fontCharset === undefined || /^[A-Za-z][A-Za-z0-9._-]*$/.test(fontCharset) === true) {
      this.fontCharset = fontCharset;
    }

    return this;
  }

  /**
   * The `getCharset()` method returns whether the font defines glyphs according to the semantics of Unicode or not.
   *
   * @example
   * const font = new FontFace('OpenSymbol', 'OpenSymbol', FontPitch.Variable);
   * font.getCharset();           // undefined
   * font.setCharset('x-symbol');
   * font.getCharset();           // 'x-symbol'
   *
   * @returns {string | undefined} The charset of the font or `undefined` if the charset is not set
   * @since 0.8.0
   */
  public getCharset (): string | undefined {
    return this.fontCharset;
  }

  /**
   * The `setFontFamily()` method sets the font family which is to be used to render the text.
   *
   * @example
   * const font = new FontFace('OpenSymbol');
   * font.setFontFamily('OpenSymbol'); // 'OpenSymbol'
   * font.setFontFamily(undefined);    // undefined
   *
   * @param {string | undefined} fontFamily The font family of the font or `undefined` to unset the font family
   * @returns {FontFace} The `FontFace` object
   * @since 0.8.0
   */
  public setFontFamily (fontFamily: string | undefined): FontFace {
    if (fontFamily === undefined || typeof fontFamily === 'string') {
      this.fontFamily = fontFamily;
    }

    return this;
  }

  /**
   * The `getFontFamily()` method returns the font family which is to be used to render the text.
   *
   * @example
   * const font = new FontFace('OpenSymbol');
   * font.setFontFamily('OpenSymbol'); // 'OpenSymbol'
   * font.setFontFamily(undefined);    // undefined
   *
   * @returns {string | undefined} The font family of the font or `undefined` if the font family is not set
   * @since 0.8.0
   */
  public getFontFamily (): string | undefined {
    return this.fontFamily;
  }

  /**
   * The `setFontFamilyGeneric()` method sets the generic font family name of the font.
   *
   * @example
   * const font = new FontFace('OpenSymbol');
   * font.setFontFamilyGeneric(FontFamilyGeneric.System); // 'system'
   * font.setFontFamilyGeneric(undefined);                // undefined
   *
   * @param {FontFamilyGeneric | undefined} fontFamilyGeneric The generic font family name
   *                                                          or `undefined` to unset the generic font family name
   * @returns {FontFace} The `FontFace` object
   * @since 0.8.0
   */
  public setFontFamilyGeneric (fontFamilyGeneric: FontFamilyGeneric | undefined): FontFace {
    if (fontFamilyGeneric === undefined || typeof fontFamilyGeneric === 'string') {
      this.fontFamilyGeneric = fontFamilyGeneric;
    }

    return this;
  }

  /**
   * The `getFontFamilyGeneric()` method returns the generic font family name of the font.
   *
   * @example
   * const font = new FontFace('OpenSymbol');
   * font.getFontFamilyGeneric();                         // undefined
   * font.setFontFamilyGeneric(FontFamilyGeneric.System);
   * font.getFontFamilyGeneric();                         // 'system'
   *
   * @returns {string | undefined} The generic font family name of the font
   *                               or `undefined` if the generic font family name is not set
   * @since 0.8.0
   */
  public getFontFamilyGeneric (): FontFamilyGeneric | undefined {
    return this.fontFamilyGeneric;
  }

  /**
   * The `setFontPitch()` method sets whether the font has a fixed or variable width.
   *
   * @example
   * const font = new FontFace('OpenSymbol');
   * font.setFontPitch(FontPitch.Variable); // variable
   * font.setFontPitch(undefined);          // undefined
   *
   * @param {FontPitch | undefined} fontPitch The pitch of the font or `undefined` to unset the font pitch
   * @returns {FontFace} The `FontFace` object
   * @since 0.8.0
   */
  public setFontPitch (fontPitch: FontPitch | undefined): FontFace {
    this.fontPitch = fontPitch;

    return this;
  }

  /**
   * The `getFontPitch()` method returns whether the font has a fixed or variable width.
   *
   * @example
   * const font = new FontFace('OpenSymbol');
   * font.getFontPitch();                   // undefined
   * font.setFontPitch(FontPitch.Variable);
   * font.getFontPitch();                   // variable
   *
   * @returns {string | undefined} The pitch of the font or `undefined` if the font pitch is not set
   * @since 0.8.0
   */
  public getFontPitch (): FontPitch | undefined {
    return this.fontPitch;
  }

  /**
   * The `getName()` method returns the unique name of the font.
   *
   * @example
   * const font = new FontFace('FreeSans');
   * font.getName(); // 'FreeSans'
   *
   * @returns {string} A string that identifies the font in this document
   * @since 0.8.0
   */
  public getName (): string {
    return this.name;
  }
}
