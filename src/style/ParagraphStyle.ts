import { createHash } from 'crypto';
import { OdfAttributeName } from '../xml/OdfAttributeName';
import { OdfElementName } from '../xml/OdfElementName';
import { Color } from './Color';
import { HorizontalAlignment } from './HorizontalAlignment';
import { IParagraphStyle } from './IParagraphStyle';
import { ParagraphProperties } from './ParagraphProperties';
import { StyleHelper } from './StyleHelper';
import { TabStop } from './TabStop';
import { TabStopType } from './TabStopType';
import { TextProperties } from './TextProperties';
import { TextTransformation } from './TextTransformation';
import { Typeface } from './Typeface';

/**
 * This class represents the style of a paragraph
 *
 * @since 0.4.0
 */
export class ParagraphStyle implements IParagraphStyle {
  private paragraphProperties: ParagraphProperties;
  private textProperties: TextProperties;

  /**
   * Constructor.
   */
  public constructor () {
    this.paragraphProperties = new ParagraphProperties();
    this.textProperties = new TextProperties();
  }

  /** @inheritDoc */
  public setColor (color: Color | undefined): void {
    return this.textProperties.setColor(color);
  }

  /** @inheritDoc */
  public getColor (): Color | undefined {
    return this.textProperties.getColor();
  }

  /** @inheritDoc */
  public setFontName (name: string): void {
    this.textProperties.setFontName(name);
  }

  /** @inheritDoc */
  public getFontName (): string | undefined {
    return this.textProperties.getFontName();
  }

  /** @inheritDoc */
  public setFontSize (size: number): void {
    return this.textProperties.setFontSize(size);
  }

  /** @inheritDoc */
  public getFontSize (): number {
    return this.textProperties.getFontSize();
  }

  /** @inheritDoc */
  public setTextTransformation (transformation: TextTransformation): void {
    this.textProperties.setTextTransformation(transformation);
  }

  /** @inheritDoc */
  public getTextTransformation (): TextTransformation {
    return this.textProperties.getTextTransformation();
  }

  /** @inheritDoc */
  public setTypeface (typeface: Typeface): void {
    return this.textProperties.setTypeface(typeface);
  }

  /** @inheritDoc */
  public getTypeface (): Typeface {
    return this.textProperties.getTypeface();
  }

  /** @inheritDoc */
  public setHorizontalAlignment (horizontalAlignment: HorizontalAlignment): void {
    return this.paragraphProperties.setHorizontalAlignment(horizontalAlignment);
  }

  /** @inheritDoc */
  public getHorizontalAlignment (): HorizontalAlignment {
    return this.paragraphProperties.getHorizontalAlignment();
  }

  /** @inheritDoc */
  public setPageBreakBefore (): void {
    return this.paragraphProperties.setPageBreakBefore();
  }

  /** @inheritDoc */
  public setKeepTogether (keepTogether: boolean = true): void {
    return this.paragraphProperties.setKeepTogether(keepTogether);
  }

  /** @inheritDoc */
  public addTabStop (position: number, type: TabStopType): TabStop | undefined;
  /** @inheritDoc */
  public addTabStop (tabStop: TabStop): TabStop | undefined;
  public addTabStop (position: any, type?: any): TabStop | undefined {
    return this.paragraphProperties.addTabStop(position, type);
  }

  /** @inheritDoc */
  public getTabStops (): TabStop[] {
    return this.paragraphProperties.getTabStops();
  }

  /** @inheritDoc */
  public clearTabStops (): void {
    return this.paragraphProperties.clearTabStops();
  }

  /** @inheritDoc */
  public toXml (document: Document, parent: Element): void {
    if (this.paragraphProperties.isDefault() === true && this.textProperties.isDefault() === true) {
      return;
    }

    const styleName = this.getName();
    parent.setAttribute(OdfAttributeName.TextStyleName, styleName);

    if (this.existsStyle(document, styleName) === true) {
      return;
    }

    const styleElement = this.createStyleElement(document, styleName);
    this.paragraphProperties.toXml(document, styleElement);
    this.textProperties.toXml(document, styleElement);
  }

  /**
   * Returns the name of the style.
   * The name is computed to make sure equal styles feature equal names and reflects the current configuration.
   *
   * @returns {string} The name of the style
   * @since 0.4.0
   * @private
   */
  private getName (): string {
    const hash = createHash('md5');

    // paragraph properties
    hash.update(this.paragraphProperties.getHorizontalAlignment());
    hash.update((this.paragraphProperties as any).shouldBreakPageBefore ? 'pb' : '');
    hash.update((this.paragraphProperties as any).shouldKeepTogether ? 'kt' : '');
    this.paragraphProperties.getTabStops().forEach((tabStop: TabStop) => {
      hash.update(`${tabStop.getPosition()}${tabStop.getType()}`);
    });

    // text properties
    const color = this.textProperties.getColor();
    hash.update(color !== undefined ? color.toHex() : '');
    hash.update(this.textProperties.getFontName() || '');
    hash.update(this.textProperties.getFontSize().toString());
    hash.update(this.textProperties.getTextTransformation());
    hash.update(this.textProperties.getTypeface().toString());

    return hash.digest('hex');
  }

  /**
   * Checks if a style with the given name already exists.
   *
   * @param {Document} document The document to search in
   * @param {string} styleName The name of the style to look for
   * @returns {boolean} Returns whether the style with the given name already exists
   * @private
   */
  private existsStyle (document: Document, styleName: string): boolean {
    const automaticStylesElement = StyleHelper.getAutomaticStylesElement(document);

    if (automaticStylesElement.childNodes.length > 0) {
      /* tslint:disable-next-line:prefer-for-of*/
      for (let i = 0; i < automaticStylesElement.childNodes.length; i++) {
        const existingStyleElement = automaticStylesElement.childNodes[i] as Element;
        const nameAttribute = existingStyleElement.attributes.getNamedItem(OdfAttributeName.StyleName);
        if (nameAttribute !== null && nameAttribute.value === styleName) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Creates a style element with the given name.
   *
   * @param {Document} document The document to create the element in
   * @param {string} styleName The name of the style to create
   * @returns {Element} The newly created style element
   * @private
   */
  private createStyleElement (document: Document, styleName: string): Element {
    const automaticStylesElement = StyleHelper.getAutomaticStylesElement(document);

    const styleElement = document.createElement(OdfElementName.StyleStyle);
    automaticStylesElement.appendChild(styleElement);
    styleElement.setAttribute(OdfAttributeName.StyleFamily, 'paragraph');
    styleElement.setAttribute(OdfAttributeName.StyleName, styleName);

    return styleElement;
  }
}
