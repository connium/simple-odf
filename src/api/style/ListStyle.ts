import { Style } from './Style';
import { StyleFamily } from './StyleFamily';

/**
 * This class represents a list style.
 *
 * List styles are used to specify the formatting of a list and its items.
 * A list style contains a set of style elements for each list level (@see ListLevelStyle).
 * If a list style is applied to a list but does not contain a list level specification for a specific level, the list level style of the next lower level is used.
 *
 * @example
 * document.getStyleManager().createListStyle('Contents');
 * document.getBody()
 *   .addList()
 *   .setStyleName('Contents);
 *
 * @since 0.11.0
 */
export class ListStyle extends Style {
  private isConsecutiveNumbering: boolean;

  /**
   * Creates a `ListStyle` instance that represents the formatting of a list.
   *
   * @example
   * const style = new ListStyle('Contents');
   *
   * @param {string} displayName The unique display name for the style
   *
   * @since 0.11.0
   */
  public constructor(displayName: string = Style.UNNAMED) {
    super(displayName, StyleFamily.Text);

    this.isConsecutiveNumbering = false;
  }

  /**
   * The `getConsecutiveNumbering()` method returns whether the style uses consecutive numbering for all list levels or whether each list level restarts the numbering.
   *
   * @example
   * const style = new ListStyle('Contents');
   * style.getConsecutiveNumbering();     // false
   * style.setConsecutiveNumbering(true);
   * style.getConsecutiveNumbering();     // true
   *
   * @returns {boolean} `true` if consecutive numbering is used for all list levels or `false` if each list level restarts numbering
   * @since 0.11.0
   */
  public getConsecutiveNumbering(): boolean {
    return this.isConsecutiveNumbering;
  }

  /**
   * The `setConsecutiveNumbering()` method sets returns whether the style uses consecutive numbering for all list levels or whether each list level restarts the numbering.
   *
   * @example
   * const style = new ListStyle('Contents');
   * style.setConsecutiveNumbering(true); // true
   *
   * @param {boolean} consecutiveNumbering `true` if consecutive numbering is used for all list levels or `false` if each list level restarts numbering
   * @returns {ListStyle} The `ListStyle` object
   * @since 0.11.0
   */
  public setConsecutiveNumbering(consecutiveNumbering: boolean): ListStyle {
    this.isConsecutiveNumbering = consecutiveNumbering;

    return this;
  }

  // public setListLevelStyle(/*style: any*/): ListStyle {
  //   return this;
  // }
}

/*
<define name="text-list-style">
	<element name="text:list-style">
		<ref name="text-list-style-attr"/>
		<zeroOrMore>
			<ref name="text-list-style-content"/>
		</zeroOrMore>
	</element>
</define>


<define name="text-list-style-attr">
	<interleave>
		<attribute name="style:name">
			<ref name="styleName"/>
		</attribute>
		<optional>
			<attribute name="style:display-name">
				<ref name="string"/>
			</attribute>
		</optional>
		<optional>
			<attribute name="text:consecutive-numbering">
				<ref name="boolean"/>
			</attribute>
		</optional>
	</interleave>
</define>


<define name="text-list-style-content">
	<choice>
		<element name="text:list-level-style-number">
			<ref name="text-list-level-style-attr"/>
			<ref name="text-list-level-style-number-attr"/>
			<optional>
				<ref name="style-list-level-properties"/>
			</optional>
			<optional>
				<ref name="style-text-properties"/>
			</optional>
		</element>
		<element name="text:list-level-style-bullet">
			<ref name="text-list-level-style-attr"/>
			<ref name="text-list-level-style-bullet-attr"/>
			<optional>
				<ref name="style-list-level-properties"/>
			</optional>
			<optional>
				<ref name="style-text-properties"/>
			</optional>
		</element>
		<element name="text:list-level-style-image">
			<ref name="text-list-level-style-attr"/>
			<ref name="text-list-level-style-image-attr"/>
			<optional>
				<ref name="style-list-level-properties"/>
			</optional>
		</element>
	</choice>
</define>


<define name="text-list-level-style-attr">
  <attribute name="text:level">
    <ref name="positiveInteger"/>
  </attribute>
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
