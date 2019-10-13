import { createHash } from 'crypto';
import { ParagraphStyle, Style, StyleFamily } from '../style';
import { IStyles } from './IStyles';

type IStyleInformation = {
  readonly style: Style;
  readonly name: string;
};

/**
 * This class represents the automatic styles of a document.
 *
 * An automatic style contains formatting properties that are considered to be dedicated to a single element.
 *
 * @example
 * const automaticStyles = new AutomaticStyles();
 * automaticStyles.add(new ParagraphStyle());
 * automaticStyles.getName(new ParagraphStyle());
 * automaticStyles.getAll();
 *
 * @since 0.9.0
 * @private
 */
export class AutomaticStyles implements IStyles {
  private styles: Map<string, IStyleInformation>;
  private paragraphStyleCounter: number;

  /**
   * Creates a `AutomaticStyles` instance that represents the automatic styles of a document.
   *
   * @example
   * const automaticStyles = new AutomaticStyles();
   *
   * @since 0.9.0
   */
  public constructor () {
    this.styles = new Map();
    this.paragraphStyleCounter = 0;
  }

  /**
   * The `add()` method adds the given style to the list of automatic styles and a unique name will be assigned to it.
   *
   * If an equal style already was added the current style will be ignored.
   *
   * @example
   * const automaticStyles = new AutomaticStyles();
   * const style1 = new ParagraphStyle();
   * const style2 = new ParagraphStyle().setFontSize(23);
   * automaticStyles.add(style1); // 'P1'
   * automaticStyles.add(style2); // 'P2'
   * automaticStyles.add(style1); // ignore
   *
   * @param {Style} style The style which should be added to the list of automatic styles
   * @since 0.9.0
   */
  public add (style: Style): void {
    const hash = this.getHash(style);

    if (this.styles.has(hash)) {
      return;
    }

    this.styles.set(hash, { style: style, name: `P${++this.paragraphStyleCounter}` });
  }

  /**
   * The `getName()` method returns the unique name of the given style.
   *
   * @example
   * const automaticStyles = new AutomaticStyles();
   * const style1 = new ParagraphStyle();
   * const style2 = new ParagraphStyle().setFontSize(23);
   * automaticStyles.add(style1);
   * automaticStyles.getName(style1); // 'P1'
   * automaticStyles.getName(style2); // error
   *
   * @param {Style} style The style for which the unique name is being requested
   * @returns {string | never} The unique name of the style
   * @throws {Error} If the style has not been added to the list of automatic styles
   * @since 0.9.0
   */
  public getName (style: Style): string | never {
    const hash = this.getHash(style);
    const styleInformation = this.styles.get(hash);

    if (styleInformation === undefined) {
      throw new Error(`Unknown style [${style}}]`);
    }

    return styleInformation.name;
  }

  /** @inheritdoc */
  public getAll (): Style[] {
    return Array.from(this.styles.values())
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((styleInformation) => styleInformation.style);
  }

  /**
   * The `getHash()` method returns a representative hash for a given style.
   *
   * @param {Style} style The style for which a representative hash is being requested
   * @returns {string} The hash representing the given style
   */
  private getHash (style: Style): string {
    const hash = createHash('md5');

    hash.update(style.getClass() || '');
    hash.update(style.getFamily());

    if (style.getFamily() === StyleFamily.Paragraph) {
      const paragraphStyle = style as ParagraphStyle;

      // paragraph properties
      hash.update('background-color' + paragraphStyle.getBackgroundColor());
      hash.update('border-bottom' + paragraphStyle.getBorderBottom());
      hash.update('border-left' + paragraphStyle.getBorderLeft());
      hash.update('border-right' + paragraphStyle.getBorderRight());
      hash.update('border-top' + paragraphStyle.getBorderTop());
      hash.update(paragraphStyle.getHorizontalAlignment());
      hash.update(paragraphStyle.getHorizontalAlignmentLastLine());
      hash.update(paragraphStyle.getKeepTogether() ? 'kt' : '');
      hash.update(paragraphStyle.getKeepWithNext() ? 'kwn' : '');
      hash.update('lh' + paragraphStyle.getLineHeight());
      hash.update('lhal' + paragraphStyle.getLineHeightAtLeast());
      hash.update('ls' + paragraphStyle.getLineSpacing());
      hash.update('margin-bottom' + paragraphStyle.getMarginBottom());
      hash.update('margin-left' + paragraphStyle.getMarginLeft());
      hash.update('margin-right' + paragraphStyle.getMarginRight());
      hash.update('margin-top' + paragraphStyle.getMarginTop());
      hash.update('orphans' + paragraphStyle.getOrphans());
      hash.update('padding-bottom' + paragraphStyle.getPaddingBottom());
      hash.update('padding-left' + paragraphStyle.getPaddingLeft());
      hash.update('padding-right' + paragraphStyle.getPaddingRight());
      hash.update('padding-top' + paragraphStyle.getPaddingTop());
      hash.update(paragraphStyle.getPageBreak().toString());
      hash.update('text-indent' + paragraphStyle.getTextIndent());
      hash.update(paragraphStyle.getVerticalAlignment());
      hash.update('widows' + paragraphStyle.getWidows());
      paragraphStyle.getTabStops().forEach((tabStop) => {
        hash.update(`tab${tabStop.getChar()}${tabStop.getLeaderColor()}${tabStop.getLeaderStyle()}${tabStop.getPosition()}${tabStop.getType()}`); // eslint-disable-line max-len
      });

      // text properties
      hash.update('color' + paragraphStyle.getColor());
      hash.update(paragraphStyle.getFontName() || '');
      hash.update(paragraphStyle.getFontSize().toString());
      hash.update(paragraphStyle.getFontVariant());
      hash.update(paragraphStyle.getTextTransformation());
      hash.update(paragraphStyle.getTypeface().toString());
    }

    return hash.digest('hex');
  }
}
