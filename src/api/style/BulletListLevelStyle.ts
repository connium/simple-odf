import { isPercent } from '../util';
import { IListLevelProperties } from './IListLevelProperties';
import { ListLevelProperties } from './ListLevelProperties';

const DEFAULT_BULLET_CHAR = '\u2022';

/**
 * This class represents a list style where list items are preceded by bullets.
 *
 * @example
 * document.getStyleManager()
 *   .createListStyle('Contents')
 *   .createBulletListLevelStyle(3);
 *
 * @since 0.11.0
 */
export class BulletListLevelStyle implements IListLevelProperties {
  private bulletChar: string;
  private bulletRelativeSize: string | undefined;
  private level: number; // for all list level styles, regardless of the type
  private numPrefix: string | undefined;
  private numSuffix: string | undefined;

  private listLevelProperties: IListLevelProperties;

  /**
   * Creates a `BulletListLevelStyle` instance that represents a list style where list items are preceded by bullets.
   *
   * @example
   * const style = new BulletListLevelStyle(3);
   *
   * @param {number} level The level of the list style, starting with `1`
   *
   * @since 0.11.0
   */
  public constructor(level: number) {
    this.bulletChar = DEFAULT_BULLET_CHAR;
    this.level = level;

    this.listLevelProperties = new ListLevelProperties();
  }

  /**
   * The `getBulletChar()` method returns the character to use as the bullet.
   *
   * @example
   * const style = new BulletListLevelStyle(3);
   * style.getBulletChar();    // '\u2022'
   * style.setBulletChar('~');
   * style.getBulletChar();    // '~'
   *
   * @returns {string} The character to use as the bullet
   * @since 0.11.0
   */
  public getBulletChar(): string {
    return this.bulletChar;
  }

  /**
   * The `setBulletChar()` method sets the character to use as the bullet.
   *
   * If an illegal value is provided, the value will be ignored.
   *
   * @example
   * const style = new BulletListLevelStyle(3);
   * style.setBulletChar('~'); // '~'
   * style.setBulletChar('');  // '~'
   *
   * @param {string} bulletChar The character to use as the bullet
   * @returns {BulletListLevelStyle} The `BulletListLevelStyle` object
   * @since 0.11.0
   */
  public setBulletChar(bulletChar: string): BulletListLevelStyle {
    this.bulletChar = bulletChar.trim().charAt(0) || this.bulletChar;

    return this;
  }

  /**
   * The `getLevel()` method returns the level of the list style.
   *
   * @example
   * const style = new BulletListLevelStyle(3);
   * style.getLevel(); // 3
   *
   * @returns {number} The level of the list style, starting with `1`
   * @since 0.11.0
   */
  public getLevel(): number {
    return this.level;
  }

  /**
   * The `getNumberPrefix()` method returns the character to display before a bullet.
   *
   * @example
   * const style = new BulletListLevelStyle(3);
   * style.getNumberPrefix();    // undefined
   * style.setNumberPrefix('~');
   * style.getNumberPrefix();    // '~'
   *
   * @returns {string | undefined} The character to display before a bullet or `undefined` if no prefix is set
   * @since 0.11.0
   */
  public getNumberPrefix(): string | undefined {
    return this.numPrefix;
  }

  /**
   * The `setNumberPrefix()` method sets the character to display before a bullet.
   *
   * @example
   * const style = new BulletListLevelStyle(3);
   * style.setNumberPrefix('~');       // '~'
   * style.setNumberPrefix(undefined); // undefined
   *
   * @param {string | undefined} prefix The character to display before a bullet or `undefined` to unset the prefix
   * @returns {BulletListLevelStyle} The `BulletListLevelStyle` object
   * @since 0.11.0
   */
  public setNumberPrefix(prefix: string | undefined): this {
    this.numPrefix = prefix;

    return this;
  }

  /**
   * The `getNumberSuffix()` method returns the character to display after a bullet.
   *
   * @example
   * const style = new BulletListLevelStyle(3);
   * style.getNumberSuffix();    // undefined
   * style.setNumberSuffix('~');
   * style.getNumberSuffix();    // '~'
   *
   * @returns {string | undefined} The character to display after a bullet or `undefined` if no suffix is set
   * @since 0.11.0
   */
  public getNumberSuffix(): string | undefined {
    return this.numSuffix;
  }

  /**
   * The `setNumberSuffix()` method sets the character to display after a bullet.
   *
   * @example
   * const style = new BulletListLevelStyle(3);
   * style.setNumberSuffix('~');       // '~'
   * style.setNumberSuffix(undefined); // undefined
   *
   * @param {string | undefined} suffix The character to display after a bullet or `undefined` to unset the suffix
   * @returns {BulletListLevelStyle} The `BulletListLevelStyle` object
   * @since 0.11.0
   */
  public setNumberSuffix(suffix: string | undefined): this {
    this.numSuffix = suffix;

    return this;
  }

  /**
   * The `getRelativeBulletSize()` method returns the percentage value for the bullet size relative to the font size of the paragraphs in the bullet list.
   *
   * @example
   * const style = new BulletListLevelStyle(3);
   * style.getRelativeBulletSize();      // undefined
   * style.setRelativeBulletSize('23%');
   * style.getRelativeBulletSize();      // '23%'
   *
   * @returns {string | undefined} The percentage value for the bullet size or `undefined` if no relative bullet size is set
   * @since 0.11.0
   */
  public getRelativeBulletSize(): string | undefined {
    return this.bulletRelativeSize;
  }

  /**
   * The `setNumberSuffix()` method sets the percentage value for the bullet size relative to the font size of the paragraphs in the bullet list.
   *
   * If an illegal value is provided, the value will be ignored.
   *
   * @example
   * const style = new BulletListLevelStyle(3);
   * style.setRelativeBulletSize('23%');     // '23%'
   * style.setRelativeBulletSize('42px');    // '23%'
   * style.setRelativeBulletSize(undefined); // undefined
   *
   * @param {string | undefined} relativeSize The percentage value for the bullet size or `undefined` to unset the bullet size
   * @returns {BulletListLevelStyle} The `BulletListLevelStyle` object
   * @since 0.11.0
   */
  public setRelativeBulletSize(
    relativeSize: string | undefined
  ): BulletListLevelStyle {
    if (relativeSize === undefined || isPercent(relativeSize)) {
      this.bulletRelativeSize = relativeSize;
    }

    return this;
  }

  // ListLevelProperties
  /** @inheritdoc */
  /* istanbul ignore next */
  public getListLevelPositionAndSpaceMode(): string {
    return this.listLevelProperties.getListLevelPositionAndSpaceMode();
  }

  /** @inheritdoc */
  /* istanbul ignore next */
  public getLabelFollowedBy(): string {
    return this.listLevelProperties.getLabelFollowedBy();
  }

  /** @inheritdoc */
  /* istanbul ignore next */
  public setLabelFollowedBy(value: 'listtab' | 'space' | 'nothing'): this {
    this.listLevelProperties.setLabelFollowedBy(value);

    return this;
  }

  /** @inheritdoc */
  /* istanbul ignore next */
  public getListTabStopPosition(): number | undefined {
    return this.listLevelProperties.getListTabStopPosition();
  }

  /** @inheritdoc */
  /* istanbul ignore next */
  public setListTabStopPosition(position: number | undefined): this {
    this.listLevelProperties.setListTabStopPosition(position);

    return this;
  }

  /** @inheritdoc */
  /* istanbul ignore next */
  public getTextIndent(): number | undefined {
    return this.listLevelProperties.getTextIndent();
  }

  /** @inheritdoc */
  /* istanbul ignore next */
  public setTextIndent(indent: number | undefined): this {
    this.listLevelProperties.setTextIndent(indent);

    return this;
  }

  /** @inheritdoc */
  /* istanbul ignore next */
  public getMarginLeft(): number | undefined {
    return this.listLevelProperties.getMarginLeft();
  }

  /** @inheritdoc */
  /* istanbul ignore next */
  public setMarginLeft(margin: number | undefined): this {
    this.listLevelProperties.setMarginLeft(margin);

    return this;
  }
}

/*
<element name="text:list-level-style-bullet">
  <ref name="text-list-level-style-attr"/><!-- DONE -->
  <ref name="text-list-level-style-bullet-attr"/><!-- PARTIALLY DONE -->
  <optional>
    <ref name="style-list-level-properties"/><!-- DONE -->
  </optional>
  <optional>
    <ref name="style-text-properties"/><!-- for number and bullet only -->
  </optional>
</element>

<define name="text-list-level-style-bullet-attr">
  <interleave>
    <optional>
      <attribute name="text:style-name">
        <ref name="styleNameRef"/>
      </attribute>
    </optional>
    <attribute name="text:bullet-char"><!-- DONE -->
      <ref name="character"/>
    </attribute>
    <ref name="common-num-format-prefix-suffix-attlist"/><!-- DONE -->
    <optional>
      <attribute name="text:bullet-relative-size"><!-- DONE -->
        <ref name="percent"/>
      </attribute>
    </optional>
  </interleave>
</define>
*/
