import { IParagraphProperties } from '../../api/style/IParagraphProperties';
import {
  BorderStyle,
  HorizontalAlignment,
  HorizontalAlignmentLastLine,
  PageBreak,
  TabStopLeaderStyle,
  TabStopType,
  VerticalAlignment,
} from '../../api/style';
import { OdfAttributeName } from '../OdfAttributeName';
import { OdfElementName } from '../OdfElementName';

export class ParagraphPropertiesVisitor {
  public visit(
    paragraphProperties: IParagraphProperties,
    document: Document,
    parent: Element
  ): Element {
    const paragraphPropertiesElement = document.createElement(
      OdfElementName.StyleParagraphProperties
    );
    parent.appendChild(paragraphPropertiesElement);

    const lineHeight = paragraphProperties.getLineHeight();
    switch (typeof lineHeight) {
      case 'number':
        paragraphPropertiesElement.setAttribute(
          OdfAttributeName.FormatLineHeight,
          lineHeight + 'mm'
        );
        break;
      case 'string':
        paragraphPropertiesElement.setAttribute(
          OdfAttributeName.FormatLineHeight,
          lineHeight
        );
        break;
      default:
        break;
    }

    const lineHeightAtLeast = paragraphProperties.getLineHeightAtLeast();
    if (lineHeightAtLeast !== undefined) {
      paragraphPropertiesElement.setAttribute(
        OdfAttributeName.StyleLineHeightAtLeast,
        lineHeightAtLeast + 'mm'
      );
    }

    const lineSpacing = paragraphProperties.getLineSpacing();
    if (lineSpacing !== undefined) {
      paragraphPropertiesElement.setAttribute(
        OdfAttributeName.StyleLineSpacing,
        lineSpacing + 'mm'
      );
    }

    const horizontalAlignment = paragraphProperties.getHorizontalAlignment();
    if (horizontalAlignment !== HorizontalAlignment.Default) {
      paragraphPropertiesElement.setAttribute(
        OdfAttributeName.FormatTextAlign,
        horizontalAlignment
      );
    }

    const horizontalAlignmentLastLine =
      paragraphProperties.getHorizontalAlignmentLastLine();
    if (
      horizontalAlignment === HorizontalAlignment.Justify &&
      horizontalAlignmentLastLine !== HorizontalAlignmentLastLine.Default
    ) {
      paragraphPropertiesElement.setAttribute(
        OdfAttributeName.FormatTextAlignLast,
        horizontalAlignmentLastLine
      );
    }

    if (paragraphProperties.getKeepTogether() === true) {
      paragraphPropertiesElement.setAttribute(
        OdfAttributeName.FormatKeepTogether,
        'always'
      );
    }

    const widows = paragraphProperties.getWidows();
    if (widows !== undefined) {
      paragraphPropertiesElement.setAttribute(
        OdfAttributeName.FormatWidows,
        widows.toString(10)
      );
    }

    const orphans = paragraphProperties.getOrphans();
    if (orphans !== undefined) {
      paragraphPropertiesElement.setAttribute(
        OdfAttributeName.FormatOrphans,
        orphans.toString(10)
      );
    }

    const marginLeft = paragraphProperties.getMarginLeft();
    if (marginLeft !== 0) {
      paragraphPropertiesElement.setAttribute(
        OdfAttributeName.FormatMarginLeft,
        marginLeft.toString(10) + 'mm'
      );
    }

    const marginRight = paragraphProperties.getMarginRight();
    if (marginRight !== 0) {
      paragraphPropertiesElement.setAttribute(
        OdfAttributeName.FormatMarginRight,
        marginRight.toString(10) + 'mm'
      );
    }

    const textIndent = paragraphProperties.getTextIndent();
    if (textIndent !== 0) {
      paragraphPropertiesElement.setAttribute(
        OdfAttributeName.FormatTextIndent,
        textIndent.toString(10) + 'mm'
      );
    }

    const marginTop = paragraphProperties.getMarginTop();
    if (marginTop !== 0) {
      paragraphPropertiesElement.setAttribute(
        OdfAttributeName.FormatMarginTop,
        marginTop.toString(10) + 'mm'
      );
    }

    const marginBottom = paragraphProperties.getMarginBottom();
    if (marginBottom !== 0) {
      paragraphPropertiesElement.setAttribute(
        OdfAttributeName.FormatMarginBottom,
        marginBottom.toString(10) + 'mm'
      );
    }

    switch (paragraphProperties.getPageBreak()) {
      case PageBreak.Before:
        paragraphPropertiesElement.setAttribute(
          OdfAttributeName.FormatBreakBefore,
          'page'
        );
        break;
      case PageBreak.After:
        paragraphPropertiesElement.setAttribute(
          OdfAttributeName.FormatBreakAfter,
          'page'
        );
        break;
      default:
        break;
    }

    const backgroundColor = paragraphProperties.getBackgroundColor();
    if (backgroundColor !== undefined) {
      paragraphPropertiesElement.setAttribute(
        OdfAttributeName.FormatBackgroundColor,
        backgroundColor.toHex()
      );
    }

    const borderTop = paragraphProperties.getBorderTop();
    if (
      borderTop !== undefined &&
      borderTop.width > 0 &&
      borderTop.style !== BorderStyle.None
    ) {
      const border = `${borderTop.width}mm ${
        borderTop.style
      } ${borderTop.color.toHex()}`;
      paragraphPropertiesElement.setAttribute(
        OdfAttributeName.FormatBorderTop,
        border
      );
    }

    const borderBottom = paragraphProperties.getBorderBottom();
    if (
      borderBottom !== undefined &&
      borderBottom.width > 0 &&
      borderBottom.style !== BorderStyle.None
    ) {
      const border = `${borderBottom.width}mm ${
        borderBottom.style
      } ${borderBottom.color.toHex()}`;
      paragraphPropertiesElement.setAttribute(
        OdfAttributeName.FormatBorderBottom,
        border
      );
    }

    const borderLeft = paragraphProperties.getBorderLeft();
    if (
      borderLeft !== undefined &&
      borderLeft.width > 0 &&
      borderLeft.style !== BorderStyle.None
    ) {
      const border = `${borderLeft.width}mm ${
        borderLeft.style
      } ${borderLeft.color.toHex()}`;
      paragraphPropertiesElement.setAttribute(
        OdfAttributeName.FormatBorderLeft,
        border
      );
    }

    const borderRight = paragraphProperties.getBorderRight();
    if (
      borderRight !== undefined &&
      borderRight.width > 0 &&
      borderRight.style !== BorderStyle.None
    ) {
      const border = `${borderRight.width}mm ${
        borderRight.style
      } ${borderRight.color.toHex()}`;
      paragraphPropertiesElement.setAttribute(
        OdfAttributeName.FormatBorderRight,
        border
      );
    }

    const paddingLeft = paragraphProperties.getPaddingLeft();
    if (paddingLeft !== 0) {
      paragraphPropertiesElement.setAttribute(
        OdfAttributeName.FormatPaddingLeft,
        paddingLeft.toString(10) + 'mm'
      );
    }

    const paddingRight = paragraphProperties.getPaddingRight();
    if (paddingRight !== 0) {
      paragraphPropertiesElement.setAttribute(
        OdfAttributeName.FormatPaddingRight,
        paddingRight.toString(10) + 'mm'
      );
    }

    const paddingTop = paragraphProperties.getPaddingTop();
    if (paddingTop !== 0) {
      paragraphPropertiesElement.setAttribute(
        OdfAttributeName.FormatPaddingTop,
        paddingTop.toString(10) + 'mm'
      );
    }

    const paddingBottom = paragraphProperties.getPaddingBottom();
    if (paddingBottom !== 0) {
      paragraphPropertiesElement.setAttribute(
        OdfAttributeName.FormatPaddingBottom,
        paddingBottom.toString(10) + 'mm'
      );
    }

    if (paragraphProperties.getKeepWithNext() === true) {
      paragraphPropertiesElement.setAttribute(
        OdfAttributeName.FormatKeepWithNext,
        'always'
      );
    }

    if (
      paragraphProperties.getVerticalAlignment() !== VerticalAlignment.Default
    ) {
      paragraphPropertiesElement.setAttribute(
        OdfAttributeName.StyleVerticalAlign,
        paragraphProperties.getVerticalAlignment()
      );
    }

    const tabStops = paragraphProperties.getTabStops();
    if (tabStops.length === 0) {
      return paragraphPropertiesElement;
    }

    const tabStopsElement = document.createElement(
      OdfElementName.StyleTabStops
    );
    paragraphPropertiesElement.appendChild(tabStopsElement);

    tabStops.forEach((tabStop) => {
      const tabStopElement = document.createElement(
        OdfElementName.StyleTabStop
      );
      tabStopsElement.appendChild(tabStopElement);

      tabStopElement.setAttribute(
        OdfAttributeName.StylePosition,
        tabStop.getPosition() + 'mm'
      );

      const type = tabStop.getType();
      const char = tabStop.getChar();
      if (type === TabStopType.Char && char !== undefined) {
        tabStopElement.setAttribute(OdfAttributeName.StyleType, type);
        tabStopElement.setAttribute(OdfAttributeName.StyleChar, char);
      } else if (type !== TabStopType.Left) {
        tabStopElement.setAttribute(OdfAttributeName.StyleType, type);
      }

      const leaderStyle = tabStop.getLeaderStyle();
      if (leaderStyle !== TabStopLeaderStyle.None) {
        tabStopElement.setAttribute(
          OdfAttributeName.StyleLeaderStyle,
          leaderStyle
        );
      }

      const leaderColor = tabStop.getLeaderColor();
      if (leaderColor !== undefined) {
        tabStopElement.setAttribute(
          OdfAttributeName.StyleLeaderColor,
          leaderColor.toHex()
        );
      }
    });

    return paragraphPropertiesElement;
  }
}
