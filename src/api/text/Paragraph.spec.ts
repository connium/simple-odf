import { Image } from '../draw';
import { ParagraphStyle, TextTransformation } from '../style';
import { Hyperlink } from './Hyperlink';
import { Paragraph } from './Paragraph';

describe(Paragraph.name, () => {
  const testText = 'some text';

  let paragraph: Paragraph;

  beforeEach(() => {
    paragraph = new Paragraph(testText);
  });

  describe('text', () => {
    it('return initial text', () => {
      expect(paragraph.getText()).toBe(testText);
    });

    it('return empty text if initial text is not set', () => {
      paragraph = new Paragraph();

      expect(paragraph.getText()).toBe('');
    });

    it('append the text', () => {
      paragraph.addText(' some more text');

      expect(paragraph.getText()).toEqual('some text some more text');
    });

    it('replace existing text with specified text', () => {
      paragraph.setText('some other text');

      expect(paragraph.getText()).toEqual('some other text');
    });

    it('return the text', () => {
      paragraph.setText('some text');
      paragraph.addText(' some\nmore   text');
      paragraph.addHyperlink(' link', 'http://example.org/');
      paragraph.addText(' even more text');

      expect(paragraph.getText()).toEqual('some text some\nmore   text link even more text');
    });
  });

  describe('hyperlink', () => {
    it('return a hyperlink', () => {
      const hyperlink = paragraph.addHyperlink('some linked text', 'http://example.org/');

      expect(hyperlink).toBeInstanceOf(Hyperlink);
      expect(hyperlink.getText()).toEqual('some linked text');
      expect(hyperlink.getURI()).toEqual('http://example.org/');
    });
  });

  describe('image', () => {
    it('return an image', () => {
      const image = paragraph.addImage('someImagePath');

      expect(image).toBeInstanceOf(Image);
      expect(image.getPath()).toEqual('someImagePath');
    });
  });

  describe('style', () => {
    let testStyle: ParagraphStyle;

    beforeEach(() => {
      testStyle = new ParagraphStyle();
    });

    it('return undefined by default', () => {
      expect(paragraph.getStyle()).toBeUndefined();
    });

    it('return previous set style', () => {
      testStyle.setTextTransformation(TextTransformation.Uppercase);

      paragraph.setStyle(testStyle);

      expect(paragraph.getStyle()).toBe(testStyle);
    });
  });

  describe('style name', () => {
    const testStyleName = 'someStyleName';

    it('return undefined by default', () => {
      expect(paragraph.getStyleName()).toBeUndefined();
    });

    it('return previous set style name', () => {
      paragraph.setStyleName(testStyleName);

      expect(paragraph.getStyleName()).toBe(testStyleName);
    });
  });
});
