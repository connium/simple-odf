import { join } from "path";
import { Image } from "../draw/Image";
import { TextDocument } from "../TextDocument";
import { AnchorType } from "./AnchorType";
import { ImageStyle } from "./ImageStyle";

describe(ImageStyle.name, () => {
  let document: TextDocument;
  let testStyle: ImageStyle;

  beforeEach(() => {
    document = new TextDocument();
    testStyle = new ImageStyle();
  });

  describe("#getAnchorType", () => {
    it("return `Paragraph` as default", () => {
      expect(testStyle.getAnchorType()).toBe(AnchorType.Paragraph);
    });

    it("return the current anchor type", () => {
      testStyle.setAnchorType(AnchorType.AsChar);

      expect(testStyle.getAnchorType()).toBe(AnchorType.AsChar);
    });
  });

  describe("#setHeight", () => {
    it("set a minimum height", () => {
      testStyle.setHeight(-23);

      expect(testStyle.getHeight()).toBe(1);
    });
  });

  describe("#getHeight", () => {
    it("return `undefined` as default", () => {
      expect(testStyle.getHeight()).toBeUndefined();
    });

    it("return the current height", () => {
      testStyle.setHeight(23);

      expect(testStyle.getHeight()).toBe(23);
    });
  });

  describe("#setWidth", () => {
    it("set a minimum width", () => {
      testStyle.setWidth(-42);

      expect(testStyle.getWidth()).toBe(1);
    });
  });

  describe("#getWidth", () => {
    it("return `undefined` as default", () => {
      expect(testStyle.getWidth()).toBeUndefined();
    });

    it("return the current width", () => {
      testStyle.setWidth(42);

      expect(testStyle.getWidth()).toBe(42);
    });
  });

  describe("#setSize", () => {
    it("set width and height", () => {
      testStyle.setSize(42, 23);

      expect(testStyle.getWidth()).toBe(42);
      expect(testStyle.getHeight()).toBe(23);
    });
  });

  describe("toXml", () => {
    let image: Image;

    beforeEach(() => {
      image = document.getBody().addParagraph().addImage(join(__dirname, "..", "..", "test", "data", "ODF.png"));
    });

    it("set the anchor type", () => {
      image.getStyle().setAnchorType(AnchorType.AsChar);

      expect(document.toString()).toMatch(/<draw:frame text:anchor-type="as-char">/);
    });

    it("set the height", () => {
      image.getStyle().setHeight(23);

      expect(document.toString()).toMatch(/<draw:frame text:anchor-type="paragraph" svg:height="23mm">/);
    });

    it("set the width", () => {
      image.getStyle().setWidth(42);

      expect(document.toString()).toMatch(/<draw:frame text:anchor-type="paragraph" svg:width="42mm">/);
    });
  });
});
