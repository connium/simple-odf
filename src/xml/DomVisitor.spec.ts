/* tslint:disable:max-line-length */
import { join } from 'path';
import { DOMImplementation, XMLSerializer } from 'xmldom';
import { Image } from '../api/draw';
import { Heading, Hyperlink, List, Paragraph } from '../api/text';
import { ParagraphStyle } from '../style/ParagraphStyle';
import { DomVisitor } from './DomVisitor';
import { OdfElementName } from './OdfElementName';

fdescribe(DomVisitor.name, () => {
  describe('#visit', () => {
    const testText = 'some text';

    let domVisitor: DomVisitor;
    let testDocument: Document;
    let testRoot: Element;

    beforeEach(() => {
      testDocument = new DOMImplementation().createDocument('someNameSpace', OdfElementName.OfficeDocument, null);
      testRoot = testDocument.firstChild as Element;

      domVisitor = new DomVisitor();
    });

    describe('#visitHeading', () => {
      let heading: Heading;

      beforeEach(() => {
        heading = new Heading(testText, 2);
      });

      it('add a heading with level 2 and the text', () => {
        domVisitor.visit(heading, testDocument, testRoot);

        const documentAsString = new XMLSerializer().serializeToString(testDocument);
        expect(documentAsString).toMatch(/<text:h text:outline-level="2">some text<\/text:h>/);
      });

      it('call `toXml` on a style if a style is set', () => {
        const testStyle = new ParagraphStyle();
        const styleToXmlSpy = jest.spyOn(testStyle, 'toXml');

        heading.setStyle(testStyle);

        domVisitor.visit(heading, testDocument, testRoot);

        expect(styleToXmlSpy).toHaveBeenCalledWith(testDocument, expect.any(Object));
      });
    });

    describe('#visitHyperlink', () => {
      let hyperlink: Hyperlink;

      beforeEach(() => {
        hyperlink = new Hyperlink(testText, 'http://example.org/');
      });

      it('add a linked text', () => {
        domVisitor.visit(hyperlink, testDocument, testRoot);

        const documentAsString = new XMLSerializer().serializeToString(testDocument);
        expect(documentAsString).toMatch(/<text:a xlink:type="simple" xlink:href="http:\/\/example.org\/">some text<\/text:a>/);
      });
    });

    describe('#visitImage', () => {
      let image: Image;

      beforeEach(() => {
        image = new Image(join(__dirname, '..', '..', 'test', 'data', 'ODF.png'));
      });

      it('add a draw frame with image and base64 encoded image', () => {
        domVisitor.visit(image, testDocument, testRoot);

        const documentAsString = new XMLSerializer().serializeToString(testDocument);
        expect(documentAsString).toMatch(/<draw:frame text:anchor-type="paragraph"><draw:image><office:binary-data>.*<\/office:binary-data><\/draw:image><\/draw:frame>/);
      });
    });

    describe('#visitList', () => {
      let list: List;

      beforeEach(() => {
        list = new List();
      });

      it('NOT insert an empty list', () => {
        domVisitor.visit(list, testDocument, testRoot);

        const documentAsString = new XMLSerializer().serializeToString(testDocument);
        expect(documentAsString).not.toMatch(/<text:list/);
      });

      it('insert a list with a list item', () => {
        list.addItem('first');

        domVisitor.visit(list, testDocument, testRoot);

        const documentAsString = new XMLSerializer().serializeToString(testDocument);
        expect(documentAsString).toMatch(/<text:list><text:list-item><text:p>first<\/text:p><\/text:list-item><\/text:list>/);
      });
    });

    describe('visitOdfText', () => {
      let paragraph: Paragraph;

      beforeEach(() => {
        paragraph = new Paragraph();
      });

      it('replace newline with line break', () => {
        paragraph.setText('some text\nsome more text');

        domVisitor.visit(paragraph, testDocument, testRoot);

        const documentAsString = new XMLSerializer().serializeToString(testDocument);
        expect(documentAsString).toMatch(/<text:p>some text<text:line-break\/>some more text<\/text:p>/);
      });

      it('replace tab with tabulation', () => {
        paragraph.setText('some\ttabbed\t\ttext');

        domVisitor.visit(paragraph, testDocument, testRoot);

        const documentAsString = new XMLSerializer().serializeToString(testDocument);
        expect(documentAsString).toMatch(/<text:p>some<text:tab\/>tabbed<text:tab\/><text:tab\/>text<\/text:p>/);
      });

      it('replace sequence of spaces with space node', () => {
        paragraph.setText(' some  spacey   text    ');

        domVisitor.visit(paragraph, testDocument, testRoot);

        const documentAsString = new XMLSerializer().serializeToString(testDocument);
        /* tslint:disable-next-line:max-line-length */
        expect(documentAsString).toMatch(/<text:p> some <text:s\/>spacey <text:s c="2"\/>text <text:s c="3"\/><\/text:p>/);
      });

      it('ignore carriage return character', () => {
        paragraph.setText('some text\r\nsome\r more text');

        domVisitor.visit(paragraph, testDocument, testRoot);

        const documentAsString = new XMLSerializer().serializeToString(testDocument);
        expect(documentAsString).toMatch(/<text:p>some text<text:line-break\/>some more text<\/text:p>/);
      });
    });

    describe('#visitParagraph', () => {
      let paragraph: Paragraph;

      beforeEach(() => {
        paragraph = new Paragraph(testText);
      });

      it('add an empty paragraph', () => {
        paragraph.setText('');

        domVisitor.visit(paragraph, testDocument, testRoot);

        const documentAsString = new XMLSerializer().serializeToString(testDocument);
        expect(documentAsString).toMatch(/<text:p\/>/);
      });

      it('add a paragraph with specified text', () => {
        domVisitor.visit(paragraph, testDocument, testRoot);

        const documentAsString = new XMLSerializer().serializeToString(testDocument);
        expect(documentAsString).toMatch(/<text:p>some text<\/text:p>/);
      });

      it('call `toXml` on a style if a style is set', () => {
        const testStyle = new ParagraphStyle();
        const styleToXmlSpy = jest.spyOn(testStyle, 'toXml');

        paragraph.setStyle(testStyle);

        domVisitor.visit(paragraph, testDocument, testRoot);

        expect(styleToXmlSpy).toHaveBeenCalledWith(testDocument, expect.any(Object));
      });
    });
  });
});
