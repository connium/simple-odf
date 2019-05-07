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

  /**
   * Creates a `CommonStyles` instance that represents the common styles of a document.
   *
   * @example
   * const commonStyles = new CommonStyles();
   *
   * @since 0.9.0
   */
  public constructor () {
    this.styles = new Map();
  }

  /**
   * The `createParagraphStyle()` method creates a new `ParagraphStyle` instance with the given name.
   * If a style with this name already exists, the existing style will be returned.
   *
   * @example
   * const commonStyles = new CommonStyles();
   * commonStyles.createParagraphStyle('Summary');
   *
   * @param {string} name The unique name for the style
   * @returns {ParagraphStyle} A new `ParagraphStyle` instance with the specified name
   * or an existing style, if one with the specified name exists
   * @since 0.9.0
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
   * The `getName()` method returns the unique name of the style with the specified display name.
   *
   * @example
   * const commonStyles = new CommonStyles();
   * commonStyles.createParagraphStyle('Heading 1');
   * commonStyles.getName('UnknownStyle'); // undefined
   * commonStyles.getName('Heading 1');    // Heading_20_1
   *
   * @param {string} displayName The display name of the requested style
   * @returns {string | undefined} The unique name of the style with the specified display name
   * or `undefined` if there is no style with this display name
   * @since 0.9.0
   */
  public getName (displayName: string): string | undefined {
    const style = this.styles.get(displayName);

    return style !== undefined ? style.getName() : undefined;
  }

  /** @inheritdoc */
  public getAll (): Style[] {
    return [...this.styles.values()];
  }
}
