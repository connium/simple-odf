import { ParagraphStyle, Style } from '../style';
import { IStyles } from './IStyles';

/**
 * This class contains common styles of a document.
 *
 * It is used to manage the named styles that are used in the document.
 *
 * @example
 * document.getCommonStyles()
 *   .createParagraphStyle('Summary');
 *
 * @since 0.9.0
 */
export class CommonStyles implements IStyles {
  private styles: Map<string, Style>;

  public constructor () {
    this.styles = new Map();
  }

  /**
   * Creates a {@link ParagraphStyle} object with the given name.
   * If a style with this name already exists, the existing style will be returned.
   *
   * @example
   * const commonStyles = new CommonStyles();
   * commonStyles.createParagraphStyle('Summary');
   *
   * @param {string} name The unique name for the style
   * @returns {ParagraphStyle} A new `ParagraphStyle` object with the specified name
   * or an existing style, if one with the specified name exists
   */
  public createParagraphStyle (name: string): ParagraphStyle {
    let style = this.styles.get(name);

    if (style !== undefined) {
      return style as ParagraphStyle;
    }

    style = new ParagraphStyle(name);
    this.styles.set(name, style);

    return style as ParagraphStyle;
  }

  /**
   * The `get()` method returns a style with the specified style.
   *
   * @example
   * const commonStyles = new CommonStyles();
   * commonStyles.createParagraphStyle('Summary');
   * commonStyles.get('UnknownStyle'); // undefined
   * commonStyles.get('Summary');      // Summary style
   *
   * @param {string} name The name of the requested style
   * @returns {T | undefined} The `Style` object associated with the specified name
   * or `undefined` if there is no style with this name
   * @since 0.9.0
   */
  public get<T extends Style> (name: string): T | undefined {
    return this.styles.get(name) as T;
  }

  /** @inheritdoc */
  public getAll (): Style[] {
    return [...this.styles.values()];
  }
}
