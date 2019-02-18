import { readFile, unlink } from 'fs';
import { promisify } from 'util';
import { Meta } from '../meta/Meta';
import { FontFace } from '../style';
import { FontPitch } from '../style/FontPitch';
import { TextBody } from './TextBody';
import { TextDocument, XML_DECLARATION } from './TextDocument';

const FILEPATH = './test.fodt';

jest.mock('../../xml/TextDocumentWriter');

describe(TextDocument.name, () => {
  let document: TextDocument;

  beforeEach(() => {
    document = new TextDocument();
  });

  describe('body', () => {
    it('return a text body object', () => {
      const body = document.getBody();

      expect(body).toBeInstanceOf(TextBody);
    });
  });

  describe('font', () => {
    it('return an empty list of fonts by default', () => {
      const fonts = document.getFonts();

      expect(fonts).toEqual([]);
    });

    it('return a font face object', () => {
      const font = document.declareFont('Springfield', 'Springfield', FontPitch.Variable);

      expect(font).toBeInstanceOf(FontFace);
    });

    it('add font face to list of fonts', () => {
      document.declareFont('Springfield', 'Springfield', FontPitch.Variable);

      const fonts = document.getFonts();

      expect(fonts).toEqual([new FontFace('Springfield', 'Springfield', FontPitch.Variable)]);
    });
  });

  describe('meta', () => {
    it('return a meta object', () => {
      expect(document.getMeta()).toBeInstanceOf(Meta);
    });
  });

  describe('#saveFlat', () => {
    afterEach(async (done) => {
      const unlinkAsync = promisify(unlink);

      await unlinkAsync(FILEPATH);

      done();
    });

    it('write a flat document', async (done) => {
      const readFileAsync = promisify(readFile);

      await document.saveFlat(FILEPATH);

      const fileContents = await readFileAsync(FILEPATH, 'utf8');

      expect(fileContents).toEqual(XML_DECLARATION + '??');
      done();
    });
  });

  describe('#toString', () => {
    it('return the basis document', () => {
      const result = document.toString();

      expect(result).toEqual(XML_DECLARATION + '??');
    });
  });
});
