// tslint:disable:no-duplicate-imports
import { unlink } from 'fs';
import { join } from 'path';
import { promisify } from 'util';
import { AnchorType } from '../src/api/draw';
import { TextBody, TextDocument } from '../src/api/office';
import { BorderStyle, Color, FontPitch, FontVariant, HorizontalAlignment } from '../src/api/style';
import { HorizontalAlignmentLastLine, PageBreak, ParagraphStyle, TabStop, TabStopType } from '../src/api/style';
import { TextTransformation, Typeface, VerticalAlignment } from '../src/api/style';

const FILEPATH = './integration.fodt';

describe('integration', () => {
  let document: TextDocument;
  let body: TextBody;

  beforeAll(() => {
    document = new TextDocument();
    body = document.getBody();
  });

  afterAll(async (done) => {
    const unlinkAsync = promisify(unlink);

    await unlinkAsync(FILEPATH);

    done();
  });

  it('metadata', () => {
    document.getMeta()
      .setInitialCreator('Marge Simpson')
      .setCreator('Homer Simpson')
      .setLanguage('en-US')
      .setTitle('simple-odf')
      .setSubject('ODF document creation')
      .setDescription('ODF text document created with Node.js powered by simple-odf')
      .addKeyword('Simpson').addKeyword('Springfield');
  });

  it('image', () => {
    const style = new ParagraphStyle();
    style.setHorizontalAlignment(HorizontalAlignment.Center);

    const paragraph = body.addParagraph();
    paragraph.setStyle(style);

    const image = paragraph.addImage(join(__dirname, 'data', 'ODF.png'));
    image.setAnchorType(AnchorType.AsChar);
    image.setSize(29.4, 36.5);
  });

  it('add heading', () => {
    body.addHeading('First heading');
    body.addHeading('Second heading', 2);

    const para = body.addParagraph('The quick, brown fox jumps over a lazy dog.');
    para.addText('\nSome more text');
  });

  describe('paragraph formatting', () => {
    it('page break', () => {
      const style = new ParagraphStyle();
      style.setPageBreak(PageBreak.Before);

      const heading = body.addHeading('Paragraph Formatting', 2);
      heading.setStyle(style);
    });

    it('background color', () => {
      const style = new ParagraphStyle();
      style.setBackgroundColor(Color.fromRgb(0, 255, 0));

      const paragraph = body.addParagraph('Some text with green colored background');
      paragraph.setStyle(style);
    });

    it('border', () => {
      const style = new ParagraphStyle();
      style.setBorderTop(1, BorderStyle.Dashed, Color.fromRgb(0, 0, 0));
      style.setBorderBottom(2, BorderStyle.Dotted, Color.fromRgb(255, 0, 0));
      style.setBorderLeft(3, BorderStyle.Double, Color.fromRgb(0, 255, 0));
      style.setBorderRight(4, BorderStyle.Solid, Color.fromRgb(0, 0, 255));

      const paragraph = body.addParagraph('Some text with different borders on all sides');
      paragraph.setStyle(style);
    });

    it('align text', () => {
      const style = new ParagraphStyle();
      style.setHorizontalAlignment(HorizontalAlignment.Center);

      const paragraph = body.addParagraph('Some centered text');
      paragraph.setStyle(style);
    });

    it('align text of last line', () => {
      const style = new ParagraphStyle();
      style.setHorizontalAlignment(HorizontalAlignment.Justify);
      style.setHorizontalAlignmentLastLine(HorizontalAlignmentLastLine.Center);

      const paragraph = body.addParagraph('Some justified text'
        + ' (with a lot of text to make sure it does not fit into a single line) with a centered last line');
      paragraph.setStyle(style);
    });

    it('keep together', () => {
      const style = new ParagraphStyle();
      style.setKeepTogether();

      const paragraph = body.addParagraph('Do\nnot\nsplit\nthis\nparagraph');
      paragraph.setStyle(style);
    });

    it('keep with next', () => {
      const style = new ParagraphStyle();
      style.setKeepWithNext();

      const paragraph = body.addParagraph('Keep together with next paragraph');
      paragraph.setStyle(style);
    });

    it('line height', () => {
      const style = new ParagraphStyle();
      style.setLineHeight('120%');

      const paragraph = body.addParagraph('Some text with 120% line height');
      paragraph.setStyle(style);
    });

    it('line height at least', () => {
      const style = new ParagraphStyle();
      style.setLineHeightAtLeast(40);

      const paragraph = body.addParagraph('Some text with minimum line height of 40 mm');
      paragraph.setStyle(style);
    });

    it('line spacing', () => {
      const style = new ParagraphStyle();
      style.setLineSpacing(20);

      const paragraph = body.addParagraph('Some text with line spacinh of 20 mm');
      paragraph.setStyle(style);
    });

    it('margin', () => {
      const style1 = new ParagraphStyle();
      style1.setMarginLeft(10);
      style1.setMarginRight(20);
      style1.setMarginTop(30);
      style1.setMarginBottom(40);

      const paragraph1 = body.addParagraph('Some text with margins on all four sides');
      paragraph1.setStyle(style1);

      const style2 = new ParagraphStyle();
      style2.setMargin(10, 20, 30, 40);

      const paragraph2 = body.addParagraph('Some other text with margins on all four sides but set at the same time');
      paragraph2.setStyle(style2);
    });

    it('orphans', () => {
      const style = new ParagraphStyle();
      style.setOrphans(2);

      const paragraph = body.addParagraph('Break paragraph after 2 lines of text at the earliest');
      paragraph.setStyle(style);
    });

    it('padding', () => {
      const style1 = new ParagraphStyle();
      style1.setPaddingLeft(10);
      style1.setPaddingRight(20);
      style1.setPaddingTop(30);
      style1.setPaddingBottom(40);

      const paragraph1 = body.addParagraph('Some text with padding on all four sides');
      paragraph1.setStyle(style1);

      const style2 = new ParagraphStyle();
      style2.setPadding(10, 20, 30, 40);

      const paragraph2 = body.addParagraph('Some other text with padding on all four sides but set at the same time');
      paragraph2.setStyle(style2);
    });

    it('text indent', () => {
      const style = new ParagraphStyle();
      style.setTextIndent(23);

      const paragraph = body.addParagraph('First line is indented\nwhile the others are not');
      paragraph.setStyle(style);
    });

    it('vertical align text', () => {
      const style = new ParagraphStyle();
      style.setVerticalAlignment(VerticalAlignment.Middle);

      const paragraph = body.addParagraph('Some vertically centered text');
      paragraph.setStyle(style);
    });

    it('widows', () => {
      const style = new ParagraphStyle();
      style.setWidows(2);

      const paragraph = body.addParagraph('Write at least 2 lines of text after a break of the paragraph');
      paragraph.setStyle(style);
    });

    it('tab stops', () => {
      const style = new ParagraphStyle();
      style.addTabStop(new TabStop(40));
      style.addTabStop(new TabStop(120, TabStopType.Right));

      const paragraph = body.addParagraph('first\tsecond\tthird');
      paragraph.setStyle(style);
    });
  });

  describe('text formatting', () => {
    beforeAll(() => {
      const style = new ParagraphStyle();
      style.setPageBreak(PageBreak.Before);

      const heading = body.addHeading('Text Formatting', 2);
      heading.setStyle(style);
    });

    it('color', () => {
      const style = new ParagraphStyle();
      style.setColor(Color.fromRgb(62, 180, 137));

      const paragraph = body.addParagraph('Some mint-colored text');
      paragraph.setStyle(style);
    });

    it('font name', () => {
      document.getFontFaceDeclarations().create('Open Sans', 'Open Sans', FontPitch.Variable);

      const style = new ParagraphStyle();
      style.setFontName('Open Sans');

      const paragraph = body.addParagraph('Open Sans');
      paragraph.setStyle(style);
    });

    it('font size', () => {
      const style = new ParagraphStyle();
      style.setFontSize(8);

      const paragraph = body.addParagraph('Some small text');
      paragraph.setStyle(style);
    });

    it('font variant', () => {
      const style = new ParagraphStyle();
      style.setFontVariant(FontVariant.SmallCaps);

      const paragraph = body.addParagraph('Some text using small-caps');
      paragraph.setStyle(style);
    });

    it('text transformation', () => {
      const style = new ParagraphStyle();
      style.setTextTransformation(TextTransformation.Uppercase);

      const paragraph = body.addParagraph('Some uppercase text');
      paragraph.setStyle(style);
    });

    it('typeface', () => {
      const style = new ParagraphStyle();
      style.setTypeface(Typeface.Bold);

      const paragraph = body.addParagraph('Some bold text');
      paragraph.setStyle(style);
    });
  });

  it('hyperlink', () => {
    const style = new ParagraphStyle();
    style.setPageBreak(PageBreak.Before);

    const heading = body.addHeading('Hyperlink', 2);
    heading.setStyle(style);

    const paragraph = body.addParagraph('This is just an ');
    paragraph.addHyperlink('example', 'http://example.org');
    paragraph.addText('.');
  });

  it('list', () => {
    const style = new ParagraphStyle();
    style.setPageBreak(PageBreak.Before);

    const heading = body.addHeading('List', 2);
    heading.setStyle(style);

    const list = body.addList();
    list.addItem().addHeading('list item heading', 3);
    list.addItem().addParagraph('first item');
    list.addItem().addParagraph('second item');

    const sublist = list.addItem().addList();
    sublist.addItem().addHeading('sublist item heading', 3);
    sublist.addItem().addParagraph('first subitem');
    sublist.addItem().addParagraph('second subitem');
  });

  it('save document', async (done) => {
    await document.saveFlat(FILEPATH);

    // TODO use snapshot testing

    done();
  });
});
