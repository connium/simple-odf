import { XMLSerializer } from 'xmldom';
import { TextDocument } from '../api/office';
import { FontPitch } from '../api/style';
import { TextDocumentWriter } from './TextDocumentWriter';

jest.mock('./meta/MetaWriter');
jest.mock('./DomVisitor');

describe(TextDocumentWriter.name, () => {
  let documentWriter: TextDocumentWriter;
  let textDocument: TextDocument;

  beforeEach(() => {
    textDocument = new TextDocument();

    documentWriter = new TextDocumentWriter();
  });

  describe('namespace declaration', () => {
    let documentAsString: string;

    beforeEach(() => {
      const document = documentWriter.write(textDocument);
      documentAsString = new XMLSerializer().serializeToString(document);
    });

    it('add dc namespace', () => {
      expect(documentAsString).toMatch(/xmlns:dc="http:\/\/purl.org\/dc\/elements\/1.1"/);
    });

    it('add draw namespace', () => {
      expect(documentAsString).toMatch(/xmlns:draw="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0"/);
    });

    it('add fo namespace', () => {
      expect(documentAsString).toMatch(/xmlns:fo="urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0"/);
    });

    it('add meta namespace', () => {
      expect(documentAsString).toMatch(/xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0"/);
    });

    it('add style namespace', () => {
      expect(documentAsString).toMatch(/xmlns:style="urn:oasis:names:tc:opendocument:xmlns:style:1.0"/);
    });

    it('add svg namespace', () => {
      expect(documentAsString).toMatch(/xmlns:svg="urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0"/);
    });

    it('add text namespace', () => {
      expect(documentAsString).toMatch(/xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0"/);
    });

    it('add xlink namespace', () => {
      expect(documentAsString).toMatch(/xmlns:xlink="http:\/\/www.w3.org\/1999\/xlink"/);
    });
  });

  describe('font face declarations', () => {
    it('add font declaration to document', () => {
      textDocument.declareFont('Springfield', 'Springfield', FontPitch.Variable);

      const document = documentWriter.write(textDocument);
      const documentAsString = new XMLSerializer().serializeToString(document);

      /* tslint:disable-next-line:max-line-length */
      expect(documentAsString).toMatch(/<office:font-face-decls><style:font-face style:name="Springfield" svg:font-family="Springfield" style:font-pitch="variable"\/><\/office:font-face-decls>/);
    });

    it('add font declaration to document and wrap font family if it contains spaces', () => {
      textDocument.declareFont('Homer Simpson', 'Homer Simpson', FontPitch.Fixed);

      const document = documentWriter.write(textDocument);
      const documentAsString = new XMLSerializer().serializeToString(document);

      /* tslint:disable-next-line:max-line-length */
      expect(documentAsString).toMatch(/<office:font-face-decls><style:font-face style:name="Homer Simpson" svg:font-family="'Homer Simpson'" style:font-pitch="fixed"\/><\/office:font-face-decls>/);
    });
  });
});
