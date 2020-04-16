import { readFileSync } from 'fs';
import { Image } from '../api/draw';
import { OdfElement } from '../api/OdfElement';
import { AutomaticStyles, CommonStyles, TextBody } from '../api/office';
import {
  Heading,
  Hyperlink,
  List,
  ListItem,
  OdfTextElement,
  Paragraph,
} from '../api/text';
import { DrawElementName } from './DrawElementName';
import { OdfAttributeName } from './OdfAttributeName';
import { OdfElementName } from './OdfElementName';
import { OdfTextElementWriter } from './OdfTextElementWriter';
import { TextElementName } from './TextElementName';

const IMAGE_ENCODING = 'base64';
const HYPERLINK_LINK_TYPE = 'simple';

export class DomVisitor {
  public constructor(
    private commonStyles: CommonStyles,
    private automaticStyles: AutomaticStyles
  ) {}

  public visit(
    odfElement: OdfElement,
    document: Document,
    parent: Element
  ): void {
    let currentElement: Element;
    if (odfElement instanceof Heading) {
      currentElement = this.visitHeading(odfElement, document, parent);
    } else if (odfElement instanceof Hyperlink) {
      currentElement = this.visitHyperlink(odfElement, document, parent);
    } else if (odfElement instanceof Image) {
      currentElement = this.visitImage(odfElement, document, parent);
    } else if (odfElement instanceof List) {
      currentElement = this.visitList(odfElement, document, parent);
    } else if (odfElement instanceof ListItem) {
      currentElement = this.visitListItem(document, parent);
    } else if (odfElement instanceof OdfTextElement) {
      currentElement = this.visitOdfText(odfElement, document, parent);
    } else if (odfElement instanceof Paragraph) {
      currentElement = this.visitParagraph(odfElement, document, parent);
    } else if (odfElement instanceof TextBody) {
      currentElement = this.visitTextBody(document, parent);
    }

    odfElement.getAll().forEach((odfChildElement) => {
      this.visit(odfChildElement, document, currentElement);
    });
  }

  private visitHeading(
    heading: Heading,
    document: Document,
    parent: Element
  ): Element {
    const headingElement = document.createElement(TextElementName.TextHeading);
    headingElement.setAttribute(
      OdfAttributeName.TextOutlineLevel,
      heading.getLevel().toString(10)
    );
    parent.appendChild(headingElement);

    this.setStyleName(heading, headingElement);

    return headingElement;
  }

  private visitHyperlink(
    hyperlink: Hyperlink,
    document: Document,
    parent: Element
  ): Element {
    const hyperlinkElement = document.createElement(
      TextElementName.TextHyperlink
    );
    hyperlinkElement.setAttribute(
      OdfAttributeName.XlinkType,
      HYPERLINK_LINK_TYPE
    );
    hyperlinkElement.setAttribute(
      OdfAttributeName.XlinkHref,
      hyperlink.getURI()
    );
    parent.appendChild(hyperlinkElement);

    this.visitOdfText(hyperlink, document, hyperlinkElement);

    return hyperlinkElement;
  }

  private visitImage(
    image: Image,
    document: Document,
    parent: Element
  ): Element {
    const frameElement = document.createElement(DrawElementName.DrawFrame);
    frameElement.setAttribute(
      OdfAttributeName.TextAnchorType,
      image.getAnchorType()
    );

    const width = image.getWidth();
    if (width !== undefined) {
      frameElement.setAttribute(OdfAttributeName.SvgWidth, width + 'mm');
    }

    const height = image.getHeight();
    if (height !== undefined) {
      frameElement.setAttribute(OdfAttributeName.SvgHeight, height + 'mm');
    }

    parent.appendChild(frameElement);

    this.embedImage(document, frameElement, image);

    return frameElement;
  }

  private visitList(list: List, document: Document, parent: Element): Element {
    if (list.size() === 0) {
      return parent;
    }

    const listElement = document.createElement(TextElementName.TextList);
    parent.appendChild(listElement);

    this.setStyleName(list, listElement);

    return listElement;
  }

  private visitListItem(document: Document, parent: Element): Element {
    const listItemElement = document.createElement(
      TextElementName.TextListItem
    );
    parent.appendChild(listItemElement);

    return listItemElement;
  }

  private visitOdfText(
    odfText: OdfTextElement,
    document: Document,
    parent: Element
  ): Element {
    new OdfTextElementWriter().write(odfText, document, parent);
    return parent;
  }

  private visitParagraph(
    paragraph: Paragraph,
    document: Document,
    parent: Element
  ): Element {
    const paragraphElement = document.createElement(
      TextElementName.TextParagraph
    );
    parent.appendChild(paragraphElement);

    this.setStyleName(paragraph, paragraphElement);

    return paragraphElement;
  }

  private visitTextBody(document: Document, parent: Element): Element {
    const bodyElement = document.createElement(OdfElementName.OfficeBody);
    parent.appendChild(bodyElement);

    const textElement = document.createElement(OdfElementName.OfficeText);
    bodyElement.appendChild(textElement);

    return textElement;
  }

  private setStyleName(
    odfElement: Heading | List | Paragraph,
    domElement: Element
  ): void {
    let styleName = this.getAutomaticStyleName(odfElement);

    if (styleName === undefined) {
      styleName = this.getCommonStyleName(odfElement);
    }

    if (styleName !== undefined) {
      domElement.setAttribute(OdfAttributeName.TextStyleName, styleName);
    }
  }

  private getAutomaticStyleName(
    odfElement: Heading | List | Paragraph
  ): string | undefined {
    const style = odfElement.getStyle();

    return style !== undefined
      ? this.automaticStyles.getName(style)
      : undefined;
  }

  private getCommonStyleName(
    odfElement: Heading | List | Paragraph
  ): string | undefined {
    const styleName = odfElement.getStyleName();

    return styleName !== undefined
      ? this.commonStyles.getName(styleName)
      : undefined;
  }

  /**
   * Creates the image element and embeds the denoted image base64 encoded binary data.
   *
   * @param {Document} document The XML document
   * @param {Element} frameElement The parent node in the DOM (`draw:frame`)
   * @param {Image} image The image
   * @private
   */
  private embedImage(
    document: Document,
    frameElement: Element,
    image: Image
  ): void {
    const imageElement = document.createElement(DrawElementName.DrawImage);
    frameElement.appendChild(imageElement);

    const binaryData = document.createElement(OdfElementName.OfficeBinaryData);
    imageElement.appendChild(binaryData);

    const rawImage = readFileSync(image.getPath());
    const base64Image = rawImage.toString(IMAGE_ENCODING);
    const textNode = document.createTextNode(base64Image);
    binaryData.appendChild(textNode);
  }
}
