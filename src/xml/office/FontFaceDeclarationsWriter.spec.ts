import { DOMImplementation, XMLSerializer } from 'xmldom';
import { FontFaceDeclarations } from '../../api/office';
import { FontPitch } from '../../api/style';
import { OdfElementName } from '../OdfElementName';
import { FontFaceDeclarationsWriter } from './FontFaceDeclarationsWriter';

describe(FontFaceDeclarationsWriter.name, () => {
  describe('#write', () => {
    let fontFaceDeclarationsWriter: FontFaceDeclarationsWriter;
    let testDocument: Document;
    let testRoot: Element;
    let fontFaceDeclarations: FontFaceDeclarations;

    beforeEach(() => {
      testDocument = new DOMImplementation().createDocument('someNameSpace', OdfElementName.OfficeDocument, null);
      testRoot = testDocument.firstChild as Element;
      fontFaceDeclarations = new FontFaceDeclarations();

      fontFaceDeclarationsWriter = new FontFaceDeclarationsWriter();
    });

    it('do nothing if no font face is defined', () => {
      fontFaceDeclarationsWriter.write(fontFaceDeclarations, testDocument, testRoot);
      const documentAsString = new XMLSerializer().serializeToString(testDocument);

      expect(documentAsString).not.toMatch(/office:font-face-decls/);
    });

    it('add font declaration to document', () => {
      fontFaceDeclarations.create('Springfield', 'Springfield', FontPitch.Variable);

      fontFaceDeclarationsWriter.write(fontFaceDeclarations, testDocument, testRoot);
      const documentAsString = new XMLSerializer().serializeToString(testDocument);

      expect(documentAsString).toMatch(/<office:font-face-decls><style:font-face style:name="Springfield" svg:font-family="Springfield" style:font-pitch="variable"\/><\/office:font-face-decls>/);
    });

    it('add font declaration to document and wrap font family if it contains spaces', () => {
      fontFaceDeclarations.create('Homer Simpson', 'Homer Simpson', FontPitch.Fixed);

      fontFaceDeclarationsWriter.write(fontFaceDeclarations, testDocument, testRoot);
      const documentAsString = new XMLSerializer().serializeToString(testDocument);

      expect(documentAsString).toMatch(/<office:font-face-decls><style:font-face style:name="Homer Simpson" svg:font-family="'Homer Simpson'" style:font-pitch="fixed"\/><\/office:font-face-decls>/);
    });
  });
});
