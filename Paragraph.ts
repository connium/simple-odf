import { createHash } from 'crypto';
import { Font } from './Font';
import { OdfElement } from './OdfElement';
import { OdfElementName } from './OdfElementName';

interface Style {
  // TODO add toXML()
  // TODO add getStyleName()
  font: Font | undefined;
  shouldBreakPage: boolean;
}

/**
 * This class represents an empty ODF text document.
 */
export class Paragraph extends OdfElement {
  private text: string;
  private headingLevel: number;
  private style: Style;

  public constructor(text?: string) {
    super();

    this.text         = text;
    this.headingLevel = 0;
    this.style        = {
      font:            undefined,
      shouldBreakPage: false,
    };
  }

  public appendTextContent(text: string): void {
    if (this.text === undefined) {
      this.text = text;
      return;
    }

    this.text += text;
  }

  /**
   * Returns whether the paragraph is heading.
   *
   * @returns {boolean} TRUE if the paragraph is a heading, FALSE otherwise
   */
  public isHeading(): boolean {
    return this.headingLevel > 0;
  }

  /**
   *
   * @returns {number}
   */
  public getHeadingLevel(): number {
    return this.headingLevel;
  }

  public applyHeading(isHeading = true, level = 1): void {
    if (isHeading === false) {
      this.headingLevel = 0;
      return;
    }

    this.headingLevel = level > 0 ? level : 0;
  }

  public setFont(font: Font): void {
    this.style.font = font;
  }

  public addPageBreak(): void {
    this.style.shouldBreakPage = true;
  }

  /** @inheritDoc */
  protected toXML(document: Document, parent: Element): void {
    let paragraph: Element;
    if (this.isHeading() === true) {
      paragraph = document.createElement('text:h');
      paragraph.setAttribute('text:outline-level', this.getHeadingLevel().toString(10));
    } else {
      paragraph = document.createElement('text:p');
    }

    this.appendStyle(document, paragraph);
    this.appendText(document, paragraph);

    parent.appendChild(paragraph);

    super.toXML(document, paragraph);
  }

  private appendStyle(document: Document, paragraph: Element): void {
    if (this.style.font === undefined && this.style.shouldBreakPage === false) {
      return;
    }

    const styleName = Paragraph.getStyleName(this.style);

    const rootNode = <Element>document.firstChild;
    rootNode.setAttribute('xmlns:style', 'urn:oasis:names:tc:opendocument:xmlns:style:1.0');
    rootNode.setAttribute('xmlns:fo', 'urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0');
    const automaticStyles = rootNode.getElementsByTagName(OdfElementName.OFFICE_AUTOMATIC_STYLES)[0];

    for (let i = 0; i < automaticStyles.childNodes.length; i++) {
      const style = automaticStyles.childNodes[i];
      const name  = style.attributes.getNamedItem('style:name');
      if (name.name === styleName) {
        console.log('found style with name', styleName);
        return;
      }
    }

    // TODO declare fonts
    // TODO http://docs.oasis-open.org/office/v1.2/os/OpenDocument-v1.2-os-part1.html#property-style_font-name
    // <office:font-face-decls>
    // <style:font-face style:font-family-generic="roman" style:font-pitch="variable" style:name="Times New Roman" svg:font-family="'Times New Roman'"/>
    //   <style:font-face style:font-family-generic="system" style:font-pitch="variable" style:name="Lucida Sans Unicode" svg:font-family="'Lucida Sans Unicode'"/>
    //   <style:font-face style:font-family-generic="system" style:font-pitch="variable" style:name="Tahoma" svg:font-family="Tahoma"/>
    //   <style:font-face style:name="Arial" svg:font-family="Arial"/>
    //   </office:font-face-decls>

    const style = document.createElement(OdfElementName.STYLE_STYLE);
    style.setAttribute('style:family', 'paragraph');
    style.setAttribute('style:name', styleName);
    automaticStyles.appendChild(style);

    if (this.style.shouldBreakPage === true) {
      const paragraphProperties = document.createElement(OdfElementName.STYLE_PARAGRAPH_PROPERTIES);
      paragraphProperties.setAttribute('fo:break-before', 'page');
      style.appendChild(paragraphProperties);
    }

    if (this.style.font !== undefined) {
      const textProperties = document.createElement(OdfElementName.STYLE_TEXT_PROPERTIES);
      textProperties.setAttribute('style:font-name', this.style.font.name);
      textProperties.setAttribute('fo:font-weight', this.style.font.style.toString());
      textProperties.setAttribute('fo:font-size', `${this.style.font.size} pt`);
      textProperties.setAttribute('fo:color', this.style.font.color);
      style.appendChild(textProperties);
    }

    paragraph.setAttribute('text:style-name', styleName);
  }

  /**
   * Appends the text of the paragraph.
   * Newlines will be replaced with line breaks.
   *
   * @param {Document} document The XML document
   * @param {Element} paragraph The paragraph the text belongs to
   */
  private appendText(document: Document, paragraph: Element): void {
    if (this.text === undefined) {
      return;
    }

    (<Element>document.firstChild).setAttribute('xmlns:text', 'urn:oasis:names:tc:opendocument:xmlns:text:1.0');

    const lines = this.text.split('\n');

    for (let i = 0; i < lines.length; i++) {
      if (i > 0) {
        const lineBreak = document.createElement('text:line-break');
        paragraph.appendChild(lineBreak);
      }

      const textNode = document.createTextNode(lines[i]);
      paragraph.appendChild(textNode);
    }
  }

  private static getStyleName(style: Style): string {
    const hash = createHash('md5');

    if (style.font !== undefined) {
      hash.update(style.font.name);
      hash.update(style.font.style);
      hash.update(style.font.size.toString());
      hash.update(style.font.color);
    }

    hash.update(style.shouldBreakPage ? '1' : '0');
    return hash.digest('hex');
  }
}
