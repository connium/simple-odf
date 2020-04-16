import { AutomaticStyles, CommonStyles, IStyles } from '../../api/office';
import { ListStyle, ParagraphStyle, Style } from '../../api/style';
import { OdfElementName } from '../OdfElementName';
import { ListStyleVisitor } from './ListStyleVisitor';
import { ParagraphPropertiesVisitor } from './ParagraphPropertiesVisitor';
import { TextPropertiesVisitor } from './TextPropertiesVisitor';

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
  public write(styles: IStyles, document: Document, root: Element): void {
    const allStyles = styles.getAll();

    if (allStyles.length === 0) {
      return;
    }

    const tagName =
      styles instanceof CommonStyles
        ? OdfElementName.OfficeStyles
        : OdfElementName.OfficeAutomaticStyles;
    const stylesElement = document.createElement(tagName);
    root.appendChild(stylesElement);

    allStyles.forEach((style) =>
      this.visitStyle(style, styles, document, stylesElement)
    );
  }

  private visitStyle(
    style: Style,
    styles: IStyles,
    document: Document,
    parent: Element
  ): Element {
    const styleElement = this.createStyleElement(style, document);
    parent.appendChild(styleElement);

    this.setName(styleElement, style, styles);
    this.setFamily(styleElement, style);
    this.setClass(styleElement, style);

    if (style instanceof ListStyle) {
      new ListStyleVisitor().visit(style, styleElement);
    } else if (style instanceof ParagraphStyle) {
      new ParagraphPropertiesVisitor().visit(style, document, styleElement);
      new TextPropertiesVisitor().visit(style, document, styleElement);
    }

    return styleElement;
  }

  private createStyleElement(style: Style, document: Document): Element {
    if (style instanceof ListStyle) {
      return document.createElement(OdfElementName.TextListStyle);
    }
    // else if (style instanceof ParagraphStyle)
    return document.createElement(OdfElementName.StyleStyle);
  }

  private setClass(styleElement: Element, style: Style): void {
    const clazz = style.getClass();
    if (clazz !== undefined) {
      styleElement.setAttribute('style:class', clazz);
    }
  }
  private setFamily(styleElement: Element, style: Style): void {
    styleElement.setAttribute('style:family', style.getFamily());
  }

  private setName(styleElement: Element, style: Style, styles: IStyles): void {
    const styleName = style.getName();
    if (styleName === Style.UNNAMED) {
      styleElement.setAttribute(
        'style:name',
        (styles as AutomaticStyles).getName(style)
      );
    } else {
      styleElement.setAttribute('style:name', style.getName());
      styleElement.setAttribute('style:display-name', style.getDisplayName());
    }
  }
}
