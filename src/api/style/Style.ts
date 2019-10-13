import { StyleFamily } from './StyleFamily';

/**
 * This class represents a style.
 *
 * It is used to specify the formatting of a document or a portion of a document.
 * The unique name of a style can be used to apply a formatting to elements.
 *
 * @example
 * document.getStyleManager().createParagraphStyle('Summary');
 * document.getBody()
 *   .addParagraph('The quick, brown fox jumps over a lazy dog.')
 *   .setStyleName('Summary');
 *
 * @since 0.9.0
 */
export class Style {
  public static UNNAMED = 'UNNAMED';

  private name: string;
  private clazz?: string;
  private displayName: string;
  private family: StyleFamily;

  /**
   * Creates a `Style` instance that represents the formatting of a document or a portion of a document.
   *
   * @example
   * const style = new Style('Summary', StyleFamily.Paragraph);
   *
   * @param {string} displayName The unique display name for the style
   * @param {StyleFamily} family The family of the style
   *
   * @since 0.9.0
   */
  public constructor (displayName: string, family: StyleFamily) {
    this.displayName = displayName;
    this.name = displayName.replace(/[^a-zA-Z0-9]/g, (match) => `_${match.charCodeAt(0).toString(16)}_`);
    this.family = family;
  }

  /**
   * The `setClass()` method sets the name of the style class.
   *
   * @example
   * const style = new Style('Text body', StyleFamily.Paragraph);
   * style.setClass('text');    // 'text'
   * style.setClass(undefined); // undefined
   *
   * @param {string | undefined} clazz The name of the style class of the style or `undefined` to unset the style class
   * @returns {Style} The `Style` object
   * @since 0.9.0
   */
  public setClass (clazz: string | undefined): Style {
    if (clazz === undefined || typeof clazz === 'string') {
      this.clazz = clazz;
    }

    return this;
  }

  /**
   * The `getClass()` method returns name of the style class.
   *
   * @example
   * const style = new Style('Text body', StyleFamily.Paragraph);
   * style.getClass();       // undefined
   * style.setClass('text');
   * style.getClass();       // 'text'
   *
   * @returns {string | undefined} The name of the style class of the style or `undefined` if the style class is not set
   * @since 0.9.0
   */
  public getClass (): string | undefined {
    return this.clazz;
  }

  /**
   * The `getDisplayName()` method returns the name of a style as it should appear in the user interface.
   *
   * @example
   * const style = new Style('Text body', StyleFamily.Paragraph);
   * style.getDisplayName(); // 'Text body'
   *
   * @returns {string} The pretty and user-friendly name of a style
   * @since 0.9.0
   */
  public getDisplayName (): string {
    return this.displayName;
  }

  /**
   * The `getFamily()` method returns the family of the style.
   *
   * @example
   * const style = new Style('Text body', StyleFamily.Paragraph);
   * style.getFamily(); // 'paragraph'
   *
   * @returns {string} The family of the style
   * @since 0.9.0
   */
  public getFamily (): string {
    return this.family;
  }

  /**
   * The `getName()` method returns the unique name of the style.
   *
   * Non-alphanumeric characters in the display name are converted to hexadecimal and wrapped in underscores.
   * Thus blanks are converted to `_20_`.
   *
   * @example
   * const style = new Style('Text body', StyleFamily.Paragraph);
   * style.getName(); // 'Text_20_body'
   *
   * @returns {string} A string that identifies the style in this document
   * @since 0.9.0
   */
  public getName (): string {
    return this.name;
  }
}
