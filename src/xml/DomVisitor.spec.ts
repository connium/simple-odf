import { join } from 'path';
import { DOMImplementation, XMLSerializer } from 'xmldom';
import { Image, AnchorType } from '../api/draw';
import { Heading, Hyperlink, List, Paragraph } from '../api/text';
import { DomVisitor } from './DomVisitor';
import { OdfElementName } from './OdfElementName';
import { AutomaticStyles, CommonStyles } from '../api/office';
import { ParagraphStyle } from '../api/style';

class AutomaticStylesMock extends AutomaticStyles {
  public getName (): string {
    return 'P23';
  }
}

class CommonStylesMock extends CommonStyles {
  public getName (): string {
    return 'encodedTestStyleName';
  }
}

describe(DomVisitor.name, () => {
  describe('#visit', () => {
    const testText = 'some text';

    let domVisitor: DomVisitor;
    let testDocument: Document;
    let testRoot: Element;
    let commonStyles: CommonStylesMock;
    let automaticStyles: AutomaticStylesMock;

    beforeEach(() => {
      testDocument = new DOMImplementation().createDocument('someNameSpace', OdfElementName.OfficeDocument, null);
      testRoot = testDocument.firstChild as Element;

      commonStyles = new CommonStylesMock();
      automaticStyles = new AutomaticStylesMock();

      domVisitor = new DomVisitor(commonStyles, automaticStyles);
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

      it('add a heading with a common style', () => {
        heading.setStyleName('testStyleName');

        domVisitor.visit(heading, testDocument, testRoot);

        const documentAsString = new XMLSerializer().serializeToString(testDocument);
        expect(documentAsString).toMatch(/<text:h text:outline-level="2" text:style-name="encodedTestStyleName">some text<\/text:h>/);
      });

      it('add a heading with an automatic style', () => {
        heading.setStyle(new ParagraphStyle());

        domVisitor.visit(heading, testDocument, testRoot);

        const documentAsString = new XMLSerializer().serializeToString(testDocument);
        expect(documentAsString).toMatch(/<text:h text:outline-level="2" text:style-name="P23">some text<\/text:h>/);
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
        image = new Image(join(__dirname, '..', '..', 'test', 'data', 'ODF.png'))
          .setAnchorType(AnchorType.AsChar);
      });

      it('add a draw frame with image and base64 encoded image', () => {
        domVisitor.visit(image, testDocument, testRoot);

        const documentAsString = new XMLSerializer().serializeToString(testDocument);
        expect(documentAsString).toMatch(/<draw:frame text:anchor-type="as-char"><draw:image><office:binary-data>.*<\/office:binary-data><\/draw:image><\/draw:frame>/);
      });

      it('add a draw frame with image and set height', () => {
        image.setHeight(23);

        domVisitor.visit(image, testDocument, testRoot);

        const documentAsString = new XMLSerializer().serializeToString(testDocument);
        expect(documentAsString).toMatch(/<draw:frame text:anchor-type="as-char" svg:height="23mm"><draw:image><office:binary-data>.*<\/office:binary-data><\/draw:image><\/draw:frame>/);
      });

      it('add a draw frame with image and set width', () => {
        image.setWidth(42);

        domVisitor.visit(image, testDocument, testRoot);

        const documentAsString = new XMLSerializer().serializeToString(testDocument);
        expect(documentAsString).toMatch(/<draw:frame text:anchor-type="as-char" svg:width="42mm"><draw:image><office:binary-data>.*<\/office:binary-data><\/draw:image><\/draw:frame>/);
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

      it('insert a list with a list item and a nested heading', () => {
        list.addItem().addHeading(testText, 2);

        domVisitor.visit(list, testDocument, testRoot);

        const documentAsString = new XMLSerializer().serializeToString(testDocument);
        expect(documentAsString).toMatch(/<text:list><text:list-item><text:h text:outline-level="2">some text<\/text:h><\/text:list-item><\/text:list>/);
      });

      it('insert a list with a list item and a nested paragraph', () => {
        list.addItem().addParagraph(testText);

        domVisitor.visit(list, testDocument, testRoot);

        const documentAsString = new XMLSerializer().serializeToString(testDocument);
        expect(documentAsString).toMatch(/<text:list><text:list-item><text:p>some text<\/text:p><\/text:list-item><\/text:list>/);
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

      it('add a paragraph with a common style', () => {
        paragraph.setStyleName('testStyleName');

        domVisitor.visit(paragraph, testDocument, testRoot);

        const documentAsString = new XMLSerializer().serializeToString(testDocument);
        expect(documentAsString).toMatch(/<text:p text:style-name="encodedTestStyleName">some text<\/text:p>/);
      });

      it('add a paragraph with an automatic style', () => {
        paragraph.setStyle(new ParagraphStyle());

        domVisitor.visit(paragraph, testDocument, testRoot);

        const documentAsString = new XMLSerializer().serializeToString(testDocument);
        expect(documentAsString).toMatch(/<text:p text:style-name="P23">some text<\/text:p>/);
      });
    });
  });
});
