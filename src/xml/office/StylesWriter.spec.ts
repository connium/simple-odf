import { DOMImplementation, XMLSerializer } from 'xmldom';
import { CommonStyles, AutomaticStyles } from '../../api/office';
import { Color, HorizontalAlignment, PageBreak, ParagraphStyle, TextTransformation, Typeface } from '../../api/style';
// tslint:disable-next-line:no-duplicate-imports
import { TabStop, TabStopType, VerticalAlignment } from '../../api/style';
import { OdfElementName } from '../OdfElementName';
import { StylesWriter } from './StylesWriter';

describe(StylesWriter.name, () => {
  describe('#write', () => {
    let stylesWriter: StylesWriter;
    let testDocument: Document;
    let testRoot: Element;
    let commonStyles: CommonStyles;

    beforeEach(() => {
      testDocument = new DOMImplementation().createDocument('someNameSpace', OdfElementName.OfficeDocument, null);
      testRoot = testDocument.firstChild as Element;
      commonStyles = new CommonStyles();

      stylesWriter = new StylesWriter();
    });

    it('do nothing if no style is defined', () => {
      stylesWriter.write(commonStyles, testDocument, testRoot);
      const documentAsString = new XMLSerializer().serializeToString(testDocument);

      expect(documentAsString).not.toMatch(/office:styles/);
    });

    it('add common style', () => {
      commonStyles.createParagraphStyle('Summary');

      stylesWriter.write(commonStyles, testDocument, testRoot);
      const documentAsString = new XMLSerializer().serializeToString(testDocument);

      /* tslint:disable-next-line:max-line-length */
      expect(documentAsString).toMatch(/<office:styles><style:style style:name="Summary" style:display-name="Summary" style:family="paragraph">.*<\/style:style><\/office:styles>/);
    });

    it('add automatic style', () => {
      const automaticStyles = new AutomaticStyles();
      automaticStyles.add(new ParagraphStyle());

      stylesWriter.write(automaticStyles, testDocument, testRoot);
      const documentAsString = new XMLSerializer().serializeToString(testDocument);

      /* tslint:disable-next-line:max-line-length */
      expect(documentAsString).toMatch(/<office:automatic-styles><style:style style:name="P1" style:family="paragraph">.*<\/style:style><\/office:automatic-styles>/);
    });

    it('add style and set class', () => {
      commonStyles.createParagraphStyle('Summary')
        .setClass('someClass');

      stylesWriter.write(commonStyles, testDocument, testRoot);
      const documentAsString = new XMLSerializer().serializeToString(testDocument);

      /* tslint:disable-next-line:max-line-length */
      expect(documentAsString).toMatch(/<office:styles><style:style style:name="Summary" style:display-name="Summary" style:family="paragraph" style:class="someClass">.*<\/style:style><\/office:styles>/);
    });

    it('add paragraph style', () => {
      commonStyles.createParagraphStyle('Summary');

      stylesWriter.write(commonStyles, testDocument, testRoot);
      const documentAsString = new XMLSerializer().serializeToString(testDocument);

      /* tslint:disable-next-line:max-line-length */
      expect(documentAsString).toMatch(/<office:styles><style:style style:name="Summary" style:display-name="Summary" style:family="paragraph"><style:paragraph-properties\/><style:text-properties\/><\/style:style><\/office:styles>/);
    });

    describe('paragraph properties', () => {
      let testStyle: ParagraphStyle;

      beforeEach(() => {
        testStyle = commonStyles.createParagraphStyle('Summary');
      });

      it('set background color', () => {
        testStyle.setBackgroundColor(Color.fromRgb(1, 2, 3));

        stylesWriter.write(commonStyles, testDocument, testRoot);
        const documentAsString = new XMLSerializer().serializeToString(testDocument);

        expect(documentAsString).toMatch(/<style:paragraph-properties fo:background-color="#010203"\/>/);
      });

      it('set horizontal alignment', () => {
        testStyle.setHorizontalAlignment(HorizontalAlignment.Center);

        stylesWriter.write(commonStyles, testDocument, testRoot);
        const documentAsString = new XMLSerializer().serializeToString(testDocument);

        expect(documentAsString).toMatch(/<style:paragraph-properties fo:text-align="center"\/>/);
      });

      it('set keep together', () => {
        testStyle.setKeepTogether(true);

        stylesWriter.write(commonStyles, testDocument, testRoot);
        const documentAsString = new XMLSerializer().serializeToString(testDocument);

        expect(documentAsString).toMatch(/<style:paragraph-properties fo:keep-together="always"\/>/);
      });

      it('set keep with next', () => {
        testStyle.setKeepWithNext(true);

        stylesWriter.write(commonStyles, testDocument, testRoot);
        const documentAsString = new XMLSerializer().serializeToString(testDocument);

        expect(documentAsString).toMatch(/<style:paragraph-properties fo:keep-with-next="always"\/>/);
      });

      it('set line height as fix value', () => {
        testStyle.setLineHeight(23);

        stylesWriter.write(commonStyles, testDocument, testRoot);
        const documentAsString = new XMLSerializer().serializeToString(testDocument);

        expect(documentAsString).toMatch(/<style:paragraph-properties fo:line-height="23mm"\/>/);
      });

      it('set line height as percentage', () => {
        testStyle.setLineHeight('42%');

        stylesWriter.write(commonStyles, testDocument, testRoot);
        const documentAsString = new XMLSerializer().serializeToString(testDocument);

        expect(documentAsString).toMatch(/<style:paragraph-properties fo:line-height="42%"\/>/);
      });

      it('set line height at least', () => {
        testStyle.setLineHeightAtLeast(23);

        stylesWriter.write(commonStyles, testDocument, testRoot);
        const documentAsString = new XMLSerializer().serializeToString(testDocument);

        expect(documentAsString).toMatch(/<style:paragraph-properties style:line-height-at-least="23mm"\/>/);
      });

      it('set orphans', () => {
        testStyle.setOrphans(23);

        stylesWriter.write(commonStyles, testDocument, testRoot);
        const documentAsString = new XMLSerializer().serializeToString(testDocument);

        expect(documentAsString).toMatch(/<style:paragraph-properties fo:orphans="23"\/>/);
      });

      it('set page break before', () => {
        testStyle.setPageBreak(PageBreak.Before);

        stylesWriter.write(commonStyles, testDocument, testRoot);
        const documentAsString = new XMLSerializer().serializeToString(testDocument);

        expect(documentAsString).toMatch(/<style:paragraph-properties fo:break-before="page"\/>/);
      });

      it('set page break after', () => {
        testStyle.setPageBreak(PageBreak.After);

        stylesWriter.write(commonStyles, testDocument, testRoot);
        const documentAsString = new XMLSerializer().serializeToString(testDocument);

        expect(documentAsString).toMatch(/<style:paragraph-properties fo:break-after="page"\/>/);
      });

      it('set vertical alignment', () => {
        testStyle.setVerticalAlignment(VerticalAlignment.Middle);

        stylesWriter.write(commonStyles, testDocument, testRoot);
        const documentAsString = new XMLSerializer().serializeToString(testDocument);

        expect(documentAsString).toMatch(/<style:paragraph-properties style:vertical-align="middle"\/>/);
      });

      it('set widows', () => {
        testStyle.setWidows(23);

        stylesWriter.write(commonStyles, testDocument, testRoot);
        const documentAsString = new XMLSerializer().serializeToString(testDocument);

        expect(documentAsString).toMatch(/<style:paragraph-properties fo:widows="23"\/>/);
      });

      it('set tab stops', () => {
        testStyle.addTabStop(new TabStop(2, TabStopType.Center));
        testStyle.addTabStop(new TabStop(4, TabStopType.Char));
        testStyle.addTabStop(new TabStop(6, TabStopType.Left));
        testStyle.addTabStop(new TabStop(8, TabStopType.Right));

        stylesWriter.write(commonStyles, testDocument, testRoot);
        const documentAsString = new XMLSerializer().serializeToString(testDocument);

        expect(documentAsString).toMatch(/<style:tab-stop style:position="2mm" style:type="center"\/>/);
        expect(documentAsString).toMatch(/<style:tab-stop style:position="4mm" style:type="char"\/>/);
        expect(documentAsString).toMatch(/<style:tab-stop style:position="6mm"\/>/);
        expect(documentAsString).toMatch(/<style:tab-stop style:position="8mm" style:type="right"\/>/);
      });
    });

    describe('text properties', () => {
      let testStyle: ParagraphStyle;

      beforeEach(() => {
        testStyle = commonStyles.createParagraphStyle('Summary');
      });

      it('set color', () => {
        testStyle.setColor(Color.fromRgb(1, 2, 3));

        stylesWriter.write(commonStyles, testDocument, testRoot);
        const documentAsString = new XMLSerializer().serializeToString(testDocument);

        expect(documentAsString).toMatch(/<style:text-properties fo:color="#010203"\/>/);
      });

      it('set font name', () => {
        testStyle.setFontName('someFontName');

        stylesWriter.write(commonStyles, testDocument, testRoot);
        const documentAsString = new XMLSerializer().serializeToString(testDocument);

        expect(documentAsString).toMatch(/<style:text-properties style:font-name="someFontName"\/>/);
      });

      it('set font size', () => {
        testStyle.setFontSize(23);

        stylesWriter.write(commonStyles, testDocument, testRoot);
        const documentAsString = new XMLSerializer().serializeToString(testDocument);

        expect(documentAsString).toMatch(/<style:text-properties fo:font-size="23pt"\/>/);
      });

      it('set text transformation', () => {
        testStyle.setTextTransformation(TextTransformation.Capitalize);

        stylesWriter.write(commonStyles, testDocument, testRoot);
        const documentAsString = new XMLSerializer().serializeToString(testDocument);

        expect(documentAsString).toMatch(/<style:text-properties fo:text-transform="capitalize"\/>/);
      });

      it('set the font-style for italic', () => {
        testStyle.setTypeface(Typeface.Italic);

        stylesWriter.write(commonStyles, testDocument, testRoot);
        const documentAsString = new XMLSerializer().serializeToString(testDocument);

        expect(documentAsString).toMatch(/<style:text-properties fo:font-style="italic"\/>/);
      });

      it('set the font-style for oblique', () => {
        testStyle.setTypeface(Typeface.Oblique);

        stylesWriter.write(commonStyles, testDocument, testRoot);
        const documentAsString = new XMLSerializer().serializeToString(testDocument);

        expect(documentAsString).toMatch(/<style:text-properties fo:font-style="oblique"\/>/);
      });

      it('set the font-weight for bold', () => {
        testStyle.setTypeface(Typeface.Bold);

        stylesWriter.write(commonStyles, testDocument, testRoot);
        const documentAsString = new XMLSerializer().serializeToString(testDocument);

        expect(documentAsString).toMatch(/<style:text-properties fo:font-weight="bold"\/>/);
      });

      it('set the font-style and font-weight for bold-italic', () => {
        testStyle.setTypeface(Typeface.BoldItalic);

        stylesWriter.write(commonStyles, testDocument, testRoot);
        const documentAsString = new XMLSerializer().serializeToString(testDocument);

        expect(documentAsString).toMatch(/<style:text-properties fo:font-style="italic" fo:font-weight="bold"\/>/);
      });

      it('set the font-style and font-weight for bold-oblique', () => {
        testStyle.setTypeface(Typeface.BoldOblique);

        stylesWriter.write(commonStyles, testDocument, testRoot);
        const documentAsString = new XMLSerializer().serializeToString(testDocument);

        expect(documentAsString).toMatch(/<style:text-properties fo:font-style="oblique" fo:font-weight="bold"\/>/);
      });
    });
  });
});
