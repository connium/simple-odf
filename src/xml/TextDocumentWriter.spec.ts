import { XMLSerializer } from '@xmldom/xmldom';
import { TextDocument } from '../api/office';
import { TextDocumentWriter } from './TextDocumentWriter';

jest.mock('./meta/MetaWriter');
jest.mock('./office/FontFaceDeclarationsWriter');
jest.mock('./office/StylesWriter');
jest.mock('./AutomaticStyleVisitor');
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
      expect(documentAsString).toMatch(
        /xmlns:dc="http:\/\/purl.org\/dc\/elements\/1.1\/"/
      );
    });

    it('add draw namespace', () => {
      expect(documentAsString).toMatch(
        /xmlns:draw="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0"/
      );
    });

    it('add fo namespace', () => {
      expect(documentAsString).toMatch(
        /xmlns:fo="urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0"/
      );
    });

    it('add meta namespace', () => {
      expect(documentAsString).toMatch(
        /xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0"/
      );
    });

    it('add style namespace', () => {
      expect(documentAsString).toMatch(
        /xmlns:style="urn:oasis:names:tc:opendocument:xmlns:style:1.0"/
      );
    });

    it('add svg namespace', () => {
      expect(documentAsString).toMatch(
        /xmlns:svg="urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0"/
      );
    });

    it('add text namespace', () => {
      expect(documentAsString).toMatch(
        /xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0"/
      );
    });

    it('add xlink namespace', () => {
      expect(documentAsString).toMatch(
        /xmlns:xlink="http:\/\/www.w3.org\/1999\/xlink"/
      );
    });
  });
});
