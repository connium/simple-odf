import { isPercent } from '../util';

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
export class BulletListLevelStyle {
  private bulletChar: string;
  private bulletRelativeSize: string | undefined;
  private level: number; // for all list level styles, regardless of the type
  private numPrefix: string | undefined;
  private numSuffix: string | undefined;

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
}

/*
<element name="text:list-level-style-bullet">
  <ref name="text-list-level-style-attr"/><!-- DONE -->
  <ref name="text-list-level-style-bullet-attr"/><!-- PARTIALLY DONE -->
  <optional>
    <ref name="style-list-level-properties"/><!-- for all -->
  </optional>
  <optional>
    <ref name="style-text-properties"/><!-- for number and bullet only -->
  </optional>
</element>


<define name="text-list-level-style-attr">
  <attribute name="text:level">
    <ref name="positiveInteger"/>
  </attribute>
</define>


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


<define name="common-num-format-prefix-suffix-attlist">
  <optional>
    <attribute name="style:num-prefix">
      <ref name="string"/>
    </attribute>
  </optional>
  <optional>
    <attribute name="style:num-suffix">
      <ref name="string"/>
    </attribute>
  </optional>
</define>


<define name="style-list-level-properties">
  <element name="style:list-level-properties">
    <ref name="style-list-level-properties-content-strict"/>
  </element>
</define>


<define name="style-list-level-properties-content-strict">
  <ref name="style-list-level-properties-attlist"/>
  <ref name="style-list-level-properties-elements"/>
</define>


<define name="style-list-level-properties-attlist">
  <interleave>
    <ref name="common-text-align"/>
    <optional>
      <attribute name="text:space-before">
        <ref name="length"/>
      </attribute>
    </optional>
    <optional>
      <attribute name="text:min-label-width">
        <ref name="nonNegativeLength"/>
      </attribute>
    </optional>
    <optional>
      <attribute name="text:min-label-distance">
        <ref name="nonNegativeLength"/>
      </attribute>
    </optional>
    <optional>
      <attribute name="style:font-name">
        <ref name="string"/>
      </attribute>
    </optional>
    <optional>
      <attribute name="fo:width">
        <ref name="positiveLength"/>
      </attribute>
    </optional>
    <optional>
      <attribute name="fo:height">
        <ref name="positiveLength"/>
      </attribute>
    </optional>
    <ref name="common-vertical-rel-attlist"/>
    <ref name="common-vertical-pos-attlist"/>
    <optional>
      <attribute name="text:list-level-position-and-space-mode">
        <choice>
          <value>label-width-and-position</value>
          <value>label-alignment</value>
        </choice>
      </attribute>
    </optional>
  </interleave>
</define>


<define name="style-list-level-properties-elements">
  <ref name="style-list-level-label-alignment"/>
</define>


<define name="style-list-level-label-alignment">
  <optional>
    <element name="style:list-level-label-alignment">
      <ref name="style-list-level-label-alignment-attlist"/>
      <empty/>
    </element>
  </optional>
</define>


<define name="style-list-level-label-alignment-attlist">
  <interleave>
    <attribute name="text:label-followed-by">
      <choice>
        <value>listtab</value>
        <value>space</value>
        <value>nothing</value>
      </choice>
    </attribute>
    <optional>
      <attribute name="text:list-tab-stop-position">
        <ref name="length"/>
      </attribute>
    </optional>
    <optional>
      <attribute name="fo:text-indent">
        <ref name="length"/>
      </attribute>
    </optional>
    <optional>
      <attribute name="fo:margin-left">
        <ref name="length"/>
      </attribute>
    </optional>
  </interleave>
</define>

*/
