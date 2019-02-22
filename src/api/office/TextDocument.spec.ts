import { readFile, unlink } from 'fs';
import { promisify } from 'util';
import { Meta } from '../meta/Meta';
import { FontFaceDeclarations } from './FontFaceDeclarations';
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
    it('return a font face declarations object', () => {
      const fontFaceDeclarations = document.getFontFaceDeclarations();

      expect(fontFaceDeclarations).toBeInstanceOf(FontFaceDeclarations);
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
