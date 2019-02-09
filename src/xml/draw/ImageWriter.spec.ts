import { join } from "path";
import { TextDocument } from "../../TextDocument";
import { ImageWriter } from "./ImageWriter";

describe(ImageWriter.name, () => {
  describe("#write", () => {
    let document: TextDocument;

    beforeEach(() => {
      document = new TextDocument();
      document.getBody().addParagraph().addImage(join(__dirname, "..", "..", "..", "test", "data", "ODF.png"));
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
