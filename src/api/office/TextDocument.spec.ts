import { readFile, unlink } from 'fs';
import { promisify } from 'util';
import { Meta } from '../meta';
import { CommonStyles } from './CommonStyles';
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

  describe('common styles', () => {
    it('return a common styles object', () => {
      const commonStyles = document.getCommonStyles();

      expect(commonStyles).toBeInstanceOf(CommonStyles);
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

  describe('mime type', () => {
    it('return the mime type', () => {
      expect(document.getMimeType()).toContain('opendocument.text');
    });
  });

  describe('office version', () => {
    it('return version 1.2', () => {
      expect(document.getOfficeVersion()).toBe('1.2');
    });
  });

  describe('#saveFlat', () => {
    afterEach(async () => {
      const unlinkAsync = promisify(unlink);

      await unlinkAsync(FILEPATH);
    });

    it('write a flat document', async () => {
      const readFileAsync = promisify(readFile);

      await document.saveFlat(FILEPATH);

      const fileContents = await readFileAsync(FILEPATH, 'utf8');

      expect(fileContents).toEqual(XML_DECLARATION + '??');
    });
  });

  describe('#toString', () => {
    it('return the basis document', () => {
      const result = document.toString();

      expect(result).toEqual(XML_DECLARATION + '??');
    });
  });
});
