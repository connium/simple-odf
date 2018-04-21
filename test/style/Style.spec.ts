import { HorizontalAlignment } from "../../src/style/HorizontalAlignment";
import { Style } from "../../src/style/Style";
import { Paragraph } from "../../src/text/Paragraph";
import { TextDocument } from "../../src/TextDocument";

describe(Style.name, () => {
  let document: TextDocument;
  let paragraph: Paragraph;
  let testStyle: Style;

  beforeEach(() => {
    document = new TextDocument();
    paragraph = document.addParagraph();
    testStyle = new Style();
  });

  it("set a style", () => {
    testStyle.setPageBreakBefore();

    paragraph.setStyle(testStyle);

    expect(document.toString()).toMatch(/<style:style style:family="paragraph" style:name="([a-z0-9]+)">/);
  });

  it("not set a style if it is default", () => {
    paragraph.setStyle(testStyle);

    expect(document.toString()).not.toMatch(/<style:style style:family="paragraph" style:name="([a-z0-9]+)">/);
  });

  describe("#getName", () => {
    it("return same name for equal styles", () => {
      const testStyle1 = new Style();
      const testStyle2 = new Style();

      expect(testStyle1.getName()).toEqual(testStyle2.getName());

      testStyle1.setHorizontalAlignment(HorizontalAlignment.Center);
      testStyle2.setHorizontalAlignment(HorizontalAlignment.Center);

      expect(testStyle1.getName()).toEqual(testStyle2.getName());
    });

    it("return different names for different styles", () => {
      const testStyle1 = new Style();
      testStyle1.setPageBreakBefore();

      const testStyle2 = new Style();
      testStyle2.setHorizontalAlignment(HorizontalAlignment.Center);
      testStyle2.setPageBreakBefore();

      expect(testStyle1.getName()).not.toEqual(testStyle2.getName());
    });
  });

  describe("#setHorizontalAlignment", () => {
    it("set the horizontal alignment", () => {
      testStyle.setHorizontalAlignment(HorizontalAlignment.Center);
      paragraph.setStyle(testStyle);

      /* tslint:disable-next-line:max-line-length */
      expect(document.toString()).toMatch(/<style:style style:family="paragraph" style:name="([a-z0-9]+)"><style:paragraph-properties fo:text-align="center"\/><\/style:style>/);
    });
  });

  describe("#getHorizontalAlignment", () => {
    it("return the current horizontal alignment", () => {
      testStyle.setHorizontalAlignment(HorizontalAlignment.Center);

      expect(testStyle.getHorizontalAlignment()).toBe(HorizontalAlignment.Center);
    });
  });

  describe("#setPageBreakBefore", () => {
    it("set the page break property to the paragraph style", () => {
      testStyle.setPageBreakBefore();
      paragraph.setStyle(testStyle);

      /* tslint:disable-next-line:max-line-length */
      expect(document.toString()).toMatch(/<style:style style:family="paragraph" style:name="([a-z0-9]+)"><style:paragraph-properties fo:break-before="page"\/><\/style:style>/);
    });
  });

  describe("#isDefault", () => {
    it("return true if the style equals the default style", () => {
      expect(testStyle.isDefault()).toBe(true);

      testStyle.setHorizontalAlignment(HorizontalAlignment.Center);
      testStyle.setHorizontalAlignment(HorizontalAlignment.Default);

      expect(testStyle.isDefault()).toBe(true);
    });

    it("return false if any property of the style differs from the default style", () => {
      testStyle.setHorizontalAlignment(HorizontalAlignment.Center);

      expect(testStyle.isDefault()).toBe(false);

      testStyle.setHorizontalAlignment(HorizontalAlignment.Default);
      testStyle.setPageBreakBefore();

      expect(testStyle.isDefault()).toBe(false);
    });
  });
});
