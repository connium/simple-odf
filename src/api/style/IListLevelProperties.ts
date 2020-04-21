/**
 * This class specifies formatting properties for a list level.
 * This includes the position and spacing of a list label and its list item.
 *
 * @since 0.11.0
 */
export interface IListLevelProperties {
  /**
   * The `getListLevelPositionAndSpaceMode()` method returns how the position and spacing of the list labels (numbers or bullets) is defined.
   *
   * The value is fixed to `label-alignment`.
   *
   * @example
   * listLevelStyle.getListLevelPositionAndSpaceMode(); // 'label-alignment'
   *
   * @returns {string} always `'label-alignment'`
   * @since 0.11.0
   */
  getListLevelPositionAndSpaceMode(): string;

  /**
   * The `getLabelFollowedBy()` method returns the character that is inserted behind a list label.
   *
   * The defined values are:
   * * `listtab`: a tab character is inserted after a list label before the text starts.
   * * `nothing`: text starts directly after a list label.
   * * `space`: a SPACE character is inserted after a list label before the text starts.
   *
   * @example
   * listLevelStyle.getLabelFollowedBy();        // 'listtab'
   * listLevelStyle.setLabelFollowedBy('space');
   * listLevelStyle.getLabelFollowedBy();        // 'space'
   *
   * @returns {string} the character that is inserted behind a list label
   * @since 0.11.0
   */
  getLabelFollowedBy(): string;

  /**
   * The `setLabelFollowedBy()` method sets the character that is inserted behind a list label.
   *
   * The defined values are:
   * * `listtab`: a tab character is inserted after a list label before the text starts.
   * * `nothing`: text starts directly after a list label.
   * * `space`: a SPACE character is inserted after a list label before the text starts.
   *
   * @example
   * listLevelStyle.setLabelFollowedBy('space');
   *
   * @param {string} character The character that is inserted behind a list label
   * @returns {IListLevelProperties} The `IListLevelProperties` object
   * @since 0.11.0
   */
  setLabelFollowedBy(character: 'listtab' | 'space' | 'nothing'): this;

  /**
   * The `getListTabStopPosition()` method returns the position of the tab stop which is inserted behind a list label.
   *
   * This additional tab stop is inserted into the list of tab stops that are defined for a list item.
   * By default the tab stop's position is behind list label.
   * The text of the first line of list item starts at this tab stop.
   *
   * The position of the tab stop is ignored unless the `labelFollowedBy` property is set set to `listtab`.
   *
   * @example
   * style.getListTabStopPosition();   // undefined
   * style.setListTabStopPosition(23);
   * style.getListTabStopPosition();   // 23
   *
   * @returns {number | undefined} The position of the tab stop in millimeters or `undefined` if no tab stop will be inserted
   * @since 0.11.0
   */
  getListTabStopPosition(): number | undefined;

  /**
   * The `setListTabStopPosition()` method sets the position of the tab stop which is inserted behind a list label.
   *
   * This additional tab stop is inserted into the list of tab stops that are defined for a list item.
   * By default the tab stop's position is behind list label.
   * The text of the first line of list item starts at this tab stop.
   *
   * The position of the tab stop is ignored unless the `labelFollowedBy` property is set set to `listtab`.
   *
   * @example
   * style.setListTabStopPosition(23);
   * style.setListTabStopPosition(undefined);
   *
   * @param {number | undefined} position The position of the tab stop in millimeters or `undefined` to remove the tab stop
   * @returns {IListLevelProperties} The `IListLevelProperties` object
   * @since 0.11.0
   */
  setListTabStopPosition(position: number | undefined): this;

  /**
   * The `getTextIndent()` method returns the indent for the text lines of a list item.
   *
   * @example
   * style.getTextIndent();   // undefined
   * style.setTextIndent(23);
   * style.getTextIndent();   // 23
   *
   * @returns {number | undefined} The indent for the text lines of a list item or `undefined` if the text is not indented
   * @since 0.11.0
   */
  getTextIndent(): number | undefined;

  /**
   * The `setTextIndent()` method sets the indent for the text lines of a list item.
   *
   * @example
   * style.setTextIndent(23);
   * style.setTextIndent(undefined);
   *
   * @param {number | undefined} indent The indent for the text lines of a list item or `undefined` to remove indentation
   * @returns {IListLevelProperties} The `IListLevelProperties` object
   * @since 0.11.0
   */
  setTextIndent(indent: number | undefined): this;

  /**
   * The `getMarginLeft()` method returns the left margins for the text lines of a list item.
   *
   * @example
   * style.getMarginLeft();   // undefined
   * style.setMarginLeft(23);
   * style.getMarginLeft();   // 23
   *
   * @returns {number | undefined} The left margins for the text lines of a list item or `undefined` if the text has no left margin
   * @since 0.11.0
   */
  getMarginLeft(): number | undefined;

  /**
   * The `setMarginLeft()` method sets the left margins for the text lines of a list item.
   *
   * @example
   * style.setMarginLeft(23);
   * style.setMarginLeft(undefined);
   *
   * @param {number | undefined} margin The left margins for the text lines of a list item or `undefined` to remove the left margin
   * @returns {IListLevelProperties} The `IListLevelProperties` object
   * @since 0.11.0
   */
  setMarginLeft(margin: number | undefined): this;
}

/*
<define name="style-list-level-properties-content-strict">
  <ref name="style-list-level-properties-attlist"/>
  <ref name="style-list-level-properties-elements"/><!-- DONE -->
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


<define name="common-text-align">
	<optional>
		<attribute name="fo:text-align">
			<choice>
				<value>start</value>
				<value>end</value>
				<value>left</value>
				<value>right</value>
				<value>center</value>
				<value>justify</value>
			</choice>
		</attribute>
	</optional>
</define>


<define name="common-vertical-pos-attlist">
  <optional>
    <attribute name="style:vertical-pos">
      <choice>
        <value>top</value>
        <value>middle</value>
        <value>bottom</value>
        <value>from-top</value>
        <value>below</value>
      </choice>
    </attribute>
  </optional>
  <optional>
    <attribute name="svg:y">
      <ref name="coordinate"/>
    </attribute>
  </optional>
</define>


<define name="common-vertical-rel-attlist">
  <optional>
    <attribute name="style:vertical-rel">
      <choice>
        <value>page</value>
        <value>page-content</value>
        <value>frame</value>
        <value>frame-content</value>
        <value>paragraph</value>
        <value>paragraph-content</value>
        <value>char</value>
        <value>line</value>
        <value>baseline</value>
        <value>text</value>
      </choice>
    </attribute>
  </optional>
</define>
*/
