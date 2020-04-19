/**
 * @todo document
 * @since 0.11.0
 */
export interface IListLevelProperties {
  getListLevelPositionAndSpaceMode(): string;
  getLabelFollwedBy(): string;
  setLabelFollwedBy(value: 'listtab' | 'space' | 'nothing'): this; // default: 'listtab'
  getListTabStopPosition(): number | undefined;
  setListTabStopPosition(position: number | undefined): this;
  getTextIndent(): number | undefined;
  setTextIndent(indent: number | undefined): this;
  getMarginLeft(): number | undefined;
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
