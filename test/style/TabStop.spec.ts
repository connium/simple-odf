import { ParagraphStyle } from "../../src/style/ParagraphStyle";
import { TabStop } from "../../src/style/TabStop";
import { TabStopType } from "../../src/style/TabStopType";
import { TextDocument } from "../../src/TextDocument";

describe(TabStop.name, () => {
  describe("#constructor", () => {
    it("create a new tab stop with given position and default type", () => {
      const tabStop = new TabStop(23);

      expect(tabStop.getPosition()).toBe(23);
      expect(tabStop.getType()).toBe(TabStopType.Left);
    });

    it("create a new tab stop with given position and type", () => {
      const tabStop = new TabStop(23, TabStopType.Right);

      expect(tabStop.getPosition()).toBe(23);
      expect(tabStop.getType()).toBe(TabStopType.Right);
    });

    it("create a new tab stop and set position to 0 if it is negative", () => {
      const tabStop = new TabStop(-42);

      expect(tabStop.getPosition()).toBe(0);
    });
  });

  describe("#setPosition", () => {
    let tabStop: TabStop;

    beforeEach(() => {
      tabStop = new TabStop(23);
    });

    it("set the position to the given value", () => {
      tabStop.setPosition(42);

      expect(tabStop.getPosition()).toBe(42);
    });

    it("set the position to 0 if a negative value is given", () => {
      tabStop.setPosition(-42);

      expect(tabStop.getPosition()).toBe(0);
    });
  });

  describe("#getPosition", () => {
    let tabStop: TabStop;

    beforeEach(() => {
      tabStop = new TabStop(23);
    });

    it("return the current position", () => {
      expect(tabStop.getPosition()).toBe(23);
    });
  });

  describe("#setType", () => {
    let tabStop: TabStop;

    beforeEach(() => {
      tabStop = new TabStop(23, TabStopType.Left);
    });

    it("set the type to the given value", () => {
      tabStop.setType(TabStopType.Center);

      expect(tabStop.getType()).toBe(TabStopType.Center);
    });
  });

  describe("#getType", () => {
    let tabStop: TabStop;

    beforeEach(() => {
      tabStop = new TabStop(23, TabStopType.Center);
    });

    it("return the current position", () => {
      expect(tabStop.getType()).toBe(TabStopType.Center);
    });
  });

  describe("#toXml", () => {
    it("return the current position", () => {
      const document = new TextDocument();
      const paragraph = document.addParagraph();
      const style = new ParagraphStyle();

      style.addTabStop(new TabStop(2, TabStopType.Center));
      style.addTabStop(new TabStop(4, TabStopType.Char));
      style.addTabStop(new TabStop(6, TabStopType.Left));
      style.addTabStop(new TabStop(8, TabStopType.Right));
      paragraph.setStyle(style);

      const documentAsString = document.toString();
      expect(document.toString()).toMatch(/<style:tab-stop style:position="2cm" style:type="center"\/>/);
      expect(document.toString()).toMatch(/<style:tab-stop style:position="4cm" style:type="char"\/>/);
      expect(document.toString()).toMatch(/<style:tab-stop style:position="6cm"\/>/);
      expect(document.toString()).toMatch(/<style:tab-stop style:position="8cm" style:type="right"\/>/);
    });
  });
});
