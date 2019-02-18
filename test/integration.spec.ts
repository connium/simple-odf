import { unlink } from 'fs';
import { join } from 'path';
import { promisify } from 'util';
import { TextBody, TextDocument } from '../src/api/office';
import { FontPitch } from '../src/api/style';
import { AnchorType } from '../src/style/AnchorType';
import { Color } from '../src/style/Color';
import { HorizontalAlignment } from '../src/style/HorizontalAlignment';
import { ParagraphStyle } from '../src/style/ParagraphStyle';
import { TabStop } from '../src/style/TabStop';
import { TabStopType } from '../src/style/TabStopType';
import { TextTransformation } from '../src/style/TextTransformation';
import { Typeface } from '../src/style/Typeface';

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
      .setCreator('Homer Simpson')
      .setLanguage('en-US')
      .setTitle('simple-odf')
      .setSubject('ODF document creation')
      .setDescription('ODF text document created with Node.js powered by simple-odf');
  });

  it('image', () => {
    const paragraph = body.addParagraph();
    paragraph.setStyle(new ParagraphStyle());
    paragraph.getStyle().setHorizontalAlignment(HorizontalAlignment.Center);

    const image = paragraph.addImage(join(__dirname, 'data', 'ODF.png'));
    image.getStyle().setAnchorType(AnchorType.AsChar);
    image.getStyle().setSize(29.4, 36.5);
  });

  it('add heading', () => {
    body.addHeading('First heading');
    body.addHeading('Second heading', 2);

    const para = body.addParagraph('The quick, brown fox jumps over a lazy dog.');
    para.addText('\nSome more text');
  });

  describe('paragraph formatting', () => {
    it('page break', () => {
      const heading = body.addHeading('Paragraph Formatting', 2);
      heading.setStyle(new ParagraphStyle());
      heading.getStyle().setPageBreakBefore();
    });

    it('keep together', () => {
      const heading = body.addParagraph('Paragraph Formatting');
      heading.setStyle(new ParagraphStyle());
      heading.getStyle().setKeepTogether();
    });

    it('align text', () => {
      const paragraph = body.addParagraph('Some centered text');
      paragraph.setStyle(new ParagraphStyle());
      paragraph.getStyle().setHorizontalAlignment(HorizontalAlignment.Center);
    });

    it('tab stops', () => {
      const paragraph = body.addParagraph('first\tsecond\tthird');
      paragraph.setStyle(new ParagraphStyle());
      paragraph.getStyle().addTabStop(new TabStop(40));
      paragraph.getStyle().addTabStop(new TabStop(120, TabStopType.Right));
    });
  });

  describe('text formatting', () => {
    beforeAll(() => {
      const heading = body.addHeading('Text Formatting', 2);
      heading.setStyle(new ParagraphStyle());
      heading.getStyle().setPageBreakBefore();
    });

    it('color', () => {
      const paragraph = body.addParagraph('Some mint-colored text');
      paragraph.setStyle(new ParagraphStyle());
      paragraph.getStyle().setColor(Color.fromRgb(62, 180, 137));
    });

    it('font name', () => {
      document.declareFont('Open Sans', 'Open Sans', FontPitch.Variable);

      const paragraph = body.addParagraph('Open Sans');
      paragraph.setStyle(new ParagraphStyle());
      paragraph.getStyle().setFontName('Open Sans');
    });

    it('font size', () => {
      const paragraph = body.addParagraph('Some small text');
      paragraph.setStyle(new ParagraphStyle());
      paragraph.getStyle().setFontSize(8);
    });

    it('text transformation', () => {
      const paragraph = body.addParagraph('Some uppercase text');
      paragraph.setStyle(new ParagraphStyle());
      paragraph.getStyle().setTextTransformation(TextTransformation.Uppercase);
    });

    it('typeface', () => {
      const paragraph = body.addParagraph('Some bold text');
      paragraph.setStyle(new ParagraphStyle());
      paragraph.getStyle().setTypeface(Typeface.Bold);
    });
  });

  it('hyperlink', () => {
    const heading = body.addHeading('Hyperlink', 2);
    heading.setStyle(new ParagraphStyle());
    heading.getStyle().setPageBreakBefore();

    const paragraph = body.addParagraph('This is just an ');
    paragraph.addHyperlink('example', 'http://example.org');
    paragraph.addText('.');
  });

  it('list', () => {
    const heading = body.addHeading('List', 2);
    heading.setStyle(new ParagraphStyle());
    heading.getStyle().setPageBreakBefore();

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
