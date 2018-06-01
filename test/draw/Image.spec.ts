import { join } from "path";
import { Image } from "../../src/draw/Image";
import { AnchorType } from "../../src/style/AnchorType";
import { ImageStyle } from "../../src/style/ImageStyle";
import { TextDocument } from "../../src/TextDocument";

describe(Image.name, () => {
  let document: TextDocument;

  beforeEach(() => {
    document = new TextDocument();
  });

  describe("#setHeight", () => {
    it("set a minimum height", () => {
      const image = new Image("somePath");
      image.setHeight(-23);

      expect(image.getHeight()).toBe(1);
    });
  });

  describe("#getHeight", () => {
    it("return `undefined` as default", () => {
      const image = new Image("somePath");

      expect(image.getHeight()).toBeUndefined();
    });

    it("return the current height", () => {
      const image = new Image("somePath");

      image.setHeight(23);

      expect(image.getHeight()).toBe(23);
    });
  });

  describe("#setWidth", () => {
    it("set a minimum width", () => {
      const image = new Image("somePath");
      image.setWidth(-42);

      expect(image.getWidth()).toBe(1);
    });
  });

  describe("#getWidth", () => {
    it("return `undefined` as default", () => {
      const image = new Image("somePath");

      expect(image.getWidth()).toBeUndefined();
    });

    it("return the current width", () => {
      const image = new Image("somePath");

      image.setWidth(42);

      expect(image.getWidth()).toBe(42);
    });
  });

  describe("#setSize", () => {
    it("set width and height", () => {
      const image = new Image("somePath");
      image.setSize(42, 23);

      expect(image.getWidth()).toBe(42);
      expect(image.getHeight()).toBe(23);
    });
  });

  describe("#setStyle", () => {
    it("set text anchor attribute on frame", () => {
      document.addParagraph().addImage(join(__dirname, "..", "data", "ODF.png"));

      expect(document.toString()).toMatch(/<draw:frame text:anchor-type="paragraph">/);
    });
  });

  describe("#getStyle", () => {
    let image: Image;

    beforeEach(() => {
      image = new Image("somePath");
    });

    it("return style by default", () => {
      expect(image.getStyle()).toBeInstanceOf(ImageStyle);
    });

    it("return previous set style", () => {
      const testStyle = new ImageStyle();
      testStyle.setAnchorType(AnchorType.AsChar);

      image.setStyle(testStyle);

      expect(image.getStyle()).toBe(testStyle);
    });
  });

  describe("#toXml", () => {
    let image: Image;

    beforeEach(() => {
      image = document.addParagraph().addImage(join(__dirname, "..", "data", "ODF.png"));
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

    it("set the height", () => {
      image.setHeight(23);

      expect(document.toString()).toMatch(/<draw:frame text:anchor-type="paragraph" svg:height="23mm">/);
    });

    it("set the width", () => {
      image.setWidth(42);

      expect(document.toString()).toMatch(/<draw:frame text:anchor-type="paragraph" svg:width="42mm">/);
    });
  });
});
