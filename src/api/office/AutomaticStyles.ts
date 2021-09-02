import { createHash, Hash } from 'crypto';
import {
  BulletListLevelStyle,
  ListStyle,
  ParagraphStyle,
  Style,
} from '../style';
import { IParagraphProperties } from '../style/IParagraphProperties';
import { ITextProperties } from '../style/ITextProperties';
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
  private listStyleCounter: number;
  private paragraphStyleCounter: number;

  /**
   * Creates a `AutomaticStyles` instance that represents the automatic styles of a document.
   *
   * @example
   * const automaticStyles = new AutomaticStyles();
   *
   * @since 0.9.0
   */
  public constructor() {
    this.styles = new Map();
    this.listStyleCounter = 0;
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
  public add(style: Style): void {
    const hash = this.getHash(style);

    if (this.styles.has(hash)) {
      return;
    }

    this.styles.set(hash, {
      style: style,
      name: this.createUniqueName(style),
    });
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
  public getName(style: Style): string | never {
    const hash = this.getHash(style);
    const existingStyle = this.styles.get(hash);

    if (existingStyle === undefined) {
      throw new Error(`Unknown style [${style}}]`);
    }

    return existingStyle.name;
  }

  /** @inheritdoc */
  public getAll(): Style[] {
    return Array.from(this.styles.values())
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((styleInformation) => styleInformation.style);
  }

  /**
   * Creates the unique name for the given style.
   * The name follows the pattern <type><count> (e.g. P2 for the second paragraph style).
   *
   * @param {Style} style The style for which a unique name is being requested
   * @returns {string} The unique name representing the given style
   */
  private createUniqueName(style: Style): string {
    if (style instanceof ListStyle) {
      return `L${++this.listStyleCounter}`;
    } else if (style instanceof ParagraphStyle) {
      return `P${++this.paragraphStyleCounter}`;
    }

    throw new Error(`Unknown style type [${style}}]`);
  }

  /**
   * The `getHash()` method returns a representative hash for a given style.
   *
   * @param {Style} style The style for which a representative hash is being requested
   * @returns {string} The hash representing the given style
   */
  private getHash(style: Style): string {
    const hash = createHash('md5');

    hash.update(style.getClass() ?? '');
    hash.update(style.getFamily());

    if (style instanceof ListStyle) {
      hash.update('consecutive-numbering' + style.getConsecutiveNumbering());
      style.getListLevelStyles().forEach((listLevelStyle) => {
        this.updateHashWithListLevelStyle(hash, listLevelStyle);
      });
    } else if (style instanceof ParagraphStyle) {
      this.updateHashWithParagraphProperties(hash, style);
      this.updateHashWithTextProperties(hash, style);
    }

    return hash.digest('hex');
  }

  /**
   * Updates the hash with the list level style.
   *
   * @param {Hash} hash The hash to update
   * @param {BulletListLevelStyle} listLevelStyle The list level style to evaluate
   */
  private updateHashWithListLevelStyle(
    hash: Hash,
    listLevelStyle: BulletListLevelStyle
  ): void {
    const level = listLevelStyle.getLevel();
    const properties = [
      'bullet-char',
      listLevelStyle.getBulletChar(),
      'bullet-relative-size',
      listLevelStyle.getRelativeBulletSize(),
      'num-prefix',
      listLevelStyle.getNumberPrefix(),
      'num-suffix',
      listLevelStyle.getNumberSuffix(),
    ];
    const listLevelProperties = [
      'list-level-position-and-space-mode',
      listLevelStyle.getListLevelPositionAndSpaceMode(),
      'label-followed-by',
      listLevelStyle.getLabelFollowedBy(),
      'list-tab-stop-position',
      listLevelStyle.getListTabStopPosition(),
      'text-indent',
      listLevelStyle.getTextIndent(),
      'margin-left',
      listLevelStyle.getMarginLeft(),
    ];

    hash.update(
      `${level}${properties.join('')}${listLevelProperties.join('')}`
    );
  }

  /**
   * Updates the hash with the paragraph properties.
   *
   * @param {Hash} hash The hash to update
   * @param {IParagraphProperties} paragraphProperties The paragraph properties to evaluate
   */
  private updateHashWithParagraphProperties(
    hash: Hash,
    paragraphProperties: IParagraphProperties
  ): void {
    hash.update('background-color' + paragraphProperties.getBackgroundColor());
    hash.update('border-bottom' + paragraphProperties.getBorderBottom());
    hash.update('border-left' + paragraphProperties.getBorderLeft());
    hash.update('border-right' + paragraphProperties.getBorderRight());
    hash.update('border-top' + paragraphProperties.getBorderTop());
    hash.update(paragraphProperties.getHorizontalAlignment());
    hash.update(paragraphProperties.getHorizontalAlignmentLastLine());
    hash.update(paragraphProperties.getKeepTogether() ? 'kt' : '');
    hash.update(paragraphProperties.getKeepWithNext() ? 'kwn' : '');
    hash.update('lh' + paragraphProperties.getLineHeight());
    hash.update('lhal' + paragraphProperties.getLineHeightAtLeast());
    hash.update('ls' + paragraphProperties.getLineSpacing());
    hash.update('margin-bottom' + paragraphProperties.getMarginBottom());
    hash.update('margin-left' + paragraphProperties.getMarginLeft());
    hash.update('margin-right' + paragraphProperties.getMarginRight());
    hash.update('margin-top' + paragraphProperties.getMarginTop());
    hash.update('orphans' + paragraphProperties.getOrphans());
    hash.update('padding-bottom' + paragraphProperties.getPaddingBottom());
    hash.update('padding-left' + paragraphProperties.getPaddingLeft());
    hash.update('padding-right' + paragraphProperties.getPaddingRight());
    hash.update('padding-top' + paragraphProperties.getPaddingTop());
    hash.update(paragraphProperties.getPageBreak().toString());
    hash.update('text-indent' + paragraphProperties.getTextIndent());
    hash.update(paragraphProperties.getVerticalAlignment());
    hash.update('widows' + paragraphProperties.getWidows());
    paragraphProperties.getTabStops().forEach((tabStop) => {
      hash.update(
        `tab${tabStop.getChar()}${tabStop.getLeaderColor()}${tabStop.getLeaderStyle()}${tabStop.getPosition()}${tabStop.getType()}`
      );
    });
  }

  /**
   * Updates the hash with the text properties.
   *
   * @param {Hash} hash The hash to update
   * @param {ITextProperties} textProperties The text properties to evaluate
   */
  private updateHashWithTextProperties(
    hash: Hash,
    textProperties: ITextProperties
  ): void {
    hash.update('color' + textProperties.getColor());
    hash.update(textProperties.getFontName() ?? '');
    hash.update(textProperties.getFontSize().toString());
    hash.update(textProperties.getFontVariant());
    hash.update(textProperties.getTextTransformation());
    hash.update(textProperties.getTypeface().toString());

    const overline = textProperties.getOverline();
    if (overline) {
      hash.update('overline-color' + overline.color);
      hash.update('overline-mode' + overline.mode);
      hash.update('overline-style' + overline.style);
      hash.update('overline-type' + overline.type);
      hash.update('overline-width' + overline.width);
    }

    const underline = textProperties.getUnderline();
    if (underline) {
      hash.update('underline-color' + underline.color);
      hash.update('underline-mode' + underline.mode);
      hash.update('underline-style' + underline.style);
      hash.update('underline-type' + underline.type);
      hash.update('underline-width' + underline.width);
    }
  }
}
