import { unlink } from 'fs';
import { join } from 'path';
import { promisify } from 'util';
import { AnchorType } from '../src/api/draw';
import { TextBody, TextDocument } from '../src/api/office';
import { Color, FontPitch, HorizontalAlignment, PageBreak, ParagraphStyle, TabStop } from '../src/api/style';
import { TabStopType, TextTransformation, Typeface } from '../src/api/style';

const FILEPATH = './integration.fodt';

xdescribe('integration', () => {
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

    it('keep with next', () => {
      const style = new ParagraphStyle();
      style.setKeepWithNext();

      const heading = body.addParagraph('Keep together with next paragraph');
      heading.setStyle(style);
    });

    it('keep together', () => {
      const style = new ParagraphStyle();
      style.setKeepTogether();

      const heading = body.addParagraph('Do\nnot\nsplit\nthis\nparagraph');
      heading.setStyle(style);
    });

    it('align text', () => {
      const style = new ParagraphStyle();
      style.setHorizontalAlignment(HorizontalAlignment.Center);

      const paragraph = body.addParagraph('Some centered text');
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
    list.addItem('first item');
    list.addItem('second item');
  });

  it('save document', async (done) => {
    await document.saveFlat(FILEPATH);

    // TODO use snapshot testing

    done();
  });
});
