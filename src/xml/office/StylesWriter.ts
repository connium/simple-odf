// tslint:disable:no-duplicate-imports
import { AutomaticStyles, CommonStyles, IStyles } from '../../api/office';
import { HorizontalAlignment, HorizontalAlignmentLastLine, PageBreak, ParagraphStyle, Style } from '../../api/style';
import { StyleFamily, TabStopType, TextTransformation, Typeface, VerticalAlignment } from '../../api/style';
import { OdfAttributeName } from '../OdfAttributeName';
import { OdfElementName } from '../OdfElementName';

/**
 * Transforms a {@link StyleManager} object into ODF conform XML
 *
 * NOTE: The properties are set in the order of their appearance in the Realx NG schema.
 *
 * @since 0.9.0
 */
export class StylesWriter {
  /**
   * Transforms the given {@link FontFaceDeclarations} into Open Document Format.
   *
   * @param {IStyles} styles The styles to serialize
   * @param {Document} document The XML document
   * @param {Element} parent The parent node in the DOM
   * @since 0.7.0
   */
  public write (styles: IStyles, document: Document, root: Element): void {
    const allStyles = styles.getAll();

    if (allStyles.length === 0) {
      return;
    }

    const tagName = styles instanceof CommonStyles ? OdfElementName.OfficeStyles : OdfElementName.OfficeAutomaticStyles;
    const stylesElement = document.createElement(tagName);
    root.appendChild(stylesElement);

    allStyles.forEach((style) => this.visitStyle(style, styles, document, stylesElement));
  }

  private visitStyle (style: Style, styles: IStyles, document: Document, parent: Element): Element {
    const styleElement = document.createElement(OdfElementName.StyleStyle);
    parent.appendChild(styleElement);

    const styleName = style.getName();
    if (styleName === Style.UNNAMED) {
      styleElement.setAttribute('style:name', (styles as AutomaticStyles).getName(style));
    } else {
      styleElement.setAttribute('style:name', style.getName());
      styleElement.setAttribute('style:display-name', style.getDisplayName());
    }

    styleElement.setAttribute('style:family', style.getFamily());

    const clazz = style.getClass();
    if (clazz !== undefined) {
      styleElement.setAttribute('style:class', clazz);
    }

    switch (style.getFamily()) {
      case StyleFamily.Paragraph:
        this.visitParagraphProperties(style as ParagraphStyle, document, styleElement);
        this.visitTextProperties(style as ParagraphStyle, document, styleElement);
        break;
      default:
        break;
    }

    return styleElement;
  }

  private visitParagraphProperties (style: ParagraphStyle, document: Document, parent: Element): Element {
    const paragraphPropertiesElement = document.createElement(OdfElementName.StyleParagraphProperties);
    parent.appendChild(paragraphPropertiesElement);

    const lineHeight = style.getLineHeight();
    switch (typeof lineHeight) {
      case 'number':
        paragraphPropertiesElement.setAttribute(OdfAttributeName.FormatLineHeight, lineHeight + 'mm');
        break;
      case 'string':
        paragraphPropertiesElement.setAttribute(OdfAttributeName.FormatLineHeight, lineHeight);
        break;
      default:
        break;
    }

    const lineHeightAtLeast = style.getLineHeightAtLeast();
    if (lineHeightAtLeast !== undefined) {
      paragraphPropertiesElement.setAttribute(OdfAttributeName.StyleLineHeightAtLeast, lineHeightAtLeast + 'mm');
    }

    const lineSpacing = style.getLineSpacing();
    if (lineSpacing !== undefined) {
      paragraphPropertiesElement.setAttribute(OdfAttributeName.StyleLineSpacing, lineSpacing + 'mm');
    }

    const horizontalAlignment = style.getHorizontalAlignment();
    if (horizontalAlignment !== HorizontalAlignment.Default) {
      paragraphPropertiesElement.setAttribute(OdfAttributeName.FormatTextAlign, horizontalAlignment);
    }

    const horizontalAlignmentLastLine = style.getHorizontalAlignmentLastLine();
    if (horizontalAlignment === HorizontalAlignment.Justify
      && horizontalAlignmentLastLine !== HorizontalAlignmentLastLine.Default) {
      paragraphPropertiesElement.setAttribute(OdfAttributeName.FormatTextAlignLast, horizontalAlignmentLastLine);
    }

    if (style.getKeepTogether() === true) {
      paragraphPropertiesElement.setAttribute(OdfAttributeName.FormatKeepTogether, 'always');
    }

    const widows = style.getWidows();
    if (widows !== undefined) {
      paragraphPropertiesElement.setAttribute(OdfAttributeName.FormatWidows, widows.toString(10));
    }

    const orphans = style.getOrphans();
    if (orphans !== undefined) {
      paragraphPropertiesElement.setAttribute(OdfAttributeName.FormatOrphans, orphans.toString(10));
    }

    const marginLeft = style.getMarginLeft();
    if (marginLeft !== 0) {
      paragraphPropertiesElement.setAttribute(OdfAttributeName.FormatMarginLeft, marginLeft.toString(10) + 'mm');
    }

    const marginRight = style.getMarginRight();
    if (marginRight !== 0) {
      paragraphPropertiesElement.setAttribute(OdfAttributeName.FormatMarginRight, marginRight.toString(10) + 'mm');
    }

    const textIndent = style.getTextIndent();
    if (textIndent !== 0) {
      paragraphPropertiesElement.setAttribute(OdfAttributeName.FormatTextIndent, textIndent.toString(10) + 'mm');
    }

    const marginTop = style.getMarginTop();
    if (marginTop !== 0) {
      paragraphPropertiesElement.setAttribute(OdfAttributeName.FormatMarginTop, marginTop.toString(10) + 'mm');
    }

    const marginBottom = style.getMarginBottom();
    if (marginBottom !== 0) {
      paragraphPropertiesElement.setAttribute(OdfAttributeName.FormatMarginBottom, marginBottom.toString(10) + 'mm');
    }

    switch (style.getPageBreak()) {
      case PageBreak.Before:
        paragraphPropertiesElement.setAttribute(OdfAttributeName.FormatBreakBefore, 'page');
        break;
      case PageBreak.After:
        paragraphPropertiesElement.setAttribute(OdfAttributeName.FormatBreakAfter, 'page');
        break;
      default:
        break;
    }

    const backgroundColor = style.getBackgroundColor();
    if (backgroundColor !== undefined) {
      paragraphPropertiesElement.setAttribute(OdfAttributeName.FormatBackgroundColor, backgroundColor.toHex());
    }

    if (style.getKeepWithNext() === true) {
      paragraphPropertiesElement.setAttribute(OdfAttributeName.FormatKeepWithNext, 'always');
    }

    if (style.getVerticalAlignment() !== VerticalAlignment.Default) {
      paragraphPropertiesElement.setAttribute(OdfAttributeName.StyleVerticalAlign, style.getVerticalAlignment());
    }

    const tabStops = style.getTabStops();
    if (tabStops.length === 0) {
      return paragraphPropertiesElement;
    }

    const tabStopsElement = document.createElement(OdfElementName.StyleTabStops);
    paragraphPropertiesElement.appendChild(tabStopsElement);

    tabStops.forEach((tabStop) => {
      const tabStopElement = document.createElement(OdfElementName.StyleTabStop);
      parent.appendChild(tabStopElement);

      tabStopElement.setAttribute(OdfAttributeName.StylePosition, tabStop.getPosition() + 'mm');
      if (tabStop.getType() !== TabStopType.Left) {
        tabStopElement.setAttribute(OdfAttributeName.StyleType, tabStop.getType());
      }
    });

    return paragraphPropertiesElement;
  }

  private visitTextProperties (style: ParagraphStyle, document: Document, parent: Element): Element {
    const textPropertiesElement = document.createElement(OdfElementName.StyleTextProperties);
    parent.appendChild(textPropertiesElement);

    const textTransformation = style.getTextTransformation();
    if (textTransformation !== TextTransformation.None) {
      textPropertiesElement.setAttribute(OdfAttributeName.FormatTextTransform, textTransformation);
    }

    const color = style.getColor();
    if (color !== undefined) {
      textPropertiesElement.setAttribute(OdfAttributeName.FormatColor, color.toHex());
    }

    const fontName = style.getFontName();
    if (fontName !== undefined) {
      textPropertiesElement.setAttribute(OdfAttributeName.StyleFontName, fontName);
    }

    const fontSize = style.getFontSize();
    if (fontSize !== 12) {
      textPropertiesElement.setAttribute(OdfAttributeName.FormatFontSize, fontSize + 'pt');
    }

    const typeface = style.getTypeface();
    if (typeface === Typeface.Italic || typeface === Typeface.BoldItalic) {
      textPropertiesElement.setAttribute(OdfAttributeName.FormatFontStyle, 'italic');
    }

    if (typeface === Typeface.Oblique || typeface === Typeface.BoldOblique) {
      textPropertiesElement.setAttribute(OdfAttributeName.FormatFontStyle, 'oblique');
    }

    if (typeface === Typeface.Bold
      || typeface === Typeface.BoldItalic
      || typeface === Typeface.BoldOblique) {
      textPropertiesElement.setAttribute(OdfAttributeName.FormatFontWeight, 'bold');
    }

    return textPropertiesElement;
  }
}