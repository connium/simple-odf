import { join } from "path";
import { TextDocument } from "../../src/TextDocument";

describe(Image.name, () => {
  let document: TextDocument;

  beforeEach(() => {
    document = new TextDocument();
  });

  describe("#addImage", () => {
    beforeEach(() => {
      document.addParagraph().addImage(join(__dirname, "..", "data", "ODF.png"));
    });

    it("add draw namespace", () => {
      expect(document.toString()).toMatch(/xmlns:draw="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0"/);
    });

    it("append a draw frame with image and base64 encoded image", () => {
      const regex = new RegExp("<draw:frame text:anchor-type=\"paragraph\">"
        + "<draw:image>"
        + "<office:binary-data>"
        + ".*"
        + "</office:binary-data>"
        + "</draw:image>"
        + "</draw:frame>");
      expect(document.toString()).toMatch(regex);
    });
  });
});
