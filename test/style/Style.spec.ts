import { HorizontalAlignment } from "../../src/style/HorizontalAlignment";
import { Style } from "../../src/style/Style";
import { TabStop } from "../../src/style/TabStop";
import { TabStopType } from "../../src/style/TabStopType";
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

      const testStyle3 = new Style();
      testStyle3.setHorizontalAlignment(HorizontalAlignment.Center);
      testStyle3.setPageBreakBefore();
      testStyle3.addTabStop(new TabStop(23));

      expect(testStyle1.getName()).not.toEqual(testStyle2.getName());
      expect(testStyle2.getName()).not.toEqual(testStyle3.getName());
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

  describe("#addTabStop", () => {
    it("add new item to the list of tab stops by position and return the added tab stop", () => {
      const testTabStop = new TabStop(23);

      const addedTabStop = testStyle.addTabStop(23, TabStopType.Left);

      expect(addedTabStop).toEqual(testTabStop);
      expect(testStyle.getTabStops()[0]).toEqual(testTabStop);
    });

    it("add new item to the list of tab stops and return the added tab stop", () => {
      const testTabStop = new TabStop(23);

      const addedTabStop = testStyle.addTabStop(testTabStop);

      expect(addedTabStop).toEqual(testTabStop);
      expect(testStyle.getTabStops()).toContain(testTabStop);
    });

    it("order tab stops by position", () => {
      const testTabStop1 = new TabStop(42);
      const testTabStop2 = new TabStop(23);

      testStyle.addTabStop(testTabStop1);
      testStyle.addTabStop(testTabStop2);

      expect(testStyle.getTabStops()).toEqual([testTabStop2, testTabStop1]);
    });

    it("not add new tab stop if a tab stop with the same position already is defined", () => {
      const testTabStop1 = new TabStop(23, TabStopType.Left);
      const testTabStop2 = new TabStop(23, TabStopType.Right);

      const addedTabStop1 = testStyle.addTabStop(testTabStop1);
      const addedTabStop2 = testStyle.addTabStop(testTabStop2);

      expect(addedTabStop1).toEqual(testTabStop1);
      expect(addedTabStop2).toBeUndefined();
      expect(testStyle.getTabStops()).toEqual([testTabStop1]);
    });

    it("add tab stop elements to the paragraph style", () => {
      testStyle.addTabStop(23, TabStopType.Left);
      paragraph.setStyle(testStyle);

      /* tslint:disable-next-line:max-line-length */
      expect(document.toString()).toMatch(/<style:style style:family="paragraph" style:name="([a-z0-9]+)"><style:paragraph-properties><style:tab-stops><style:tab-stop style:position="23cm"\/><\/style:tab-stops><\/style:paragraph-properties><\/style:style>/);
    });
  });

  describe("#getTabStops", () => {
    it("return the items in order", () => {
      const testTabStop1 = new TabStop(23);
      const testTabStop2 = new TabStop(42);

      testStyle.addTabStop(testTabStop1);
      testStyle.addTabStop(testTabStop2);

      expect(testStyle.getTabStops()).toEqual([testTabStop1, testTabStop2]);
    });
  });

  describe("#clearTabStops", () => {
    beforeEach(() => {
      testStyle.addTabStop(new TabStop(23));
      testStyle.addTabStop(new TabStop(42));
    });

    it("remove all items from the list", () => {
      testStyle.clearTabStops();

      expect(testStyle.getTabStops().length).toBe(0);
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

      testStyle = new Style();
      testStyle.setPageBreakBefore();

      expect(testStyle.isDefault()).toBe(false);

      testStyle = new Style();
      testStyle.addTabStop(new TabStop(23));

      expect(testStyle.isDefault()).toBe(false);
    });
  });
});
