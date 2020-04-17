/**
 * This class represents a list style where list items are preceded by bullets.
 *
 * @example @todo
 * document.getStyleManager().createParagraphStyle('Summary');
 * document.getBody()
 *   .addParagraph('The quick, brown fox jumps over a lazy dog.')
 *   .setStyleName('Summary');
 *
 * @since 0.11.0
 */
export class BulletListLevelStyle {
  private level: number; // for all list level styles, regardless of the type

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
    this.level = level;
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
}

/*
<element name="text:list-level-style-bullet">
  <ref name="text-list-level-style-attr"/><!-- DONE -->
  <ref name="text-list-level-style-bullet-attr"/>
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
    <attribute name="text:bullet-char">
      <ref name="character"/>
    </attribute>
    <ref name="common-num-format-prefix-suffix-attlist"/>
    <optional>
      <attribute name="text:bullet-relative-size">
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
