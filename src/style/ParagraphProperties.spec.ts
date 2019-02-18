import { TextDocument } from '../api/office';
import { Paragraph } from '../api/text';
import { HorizontalAlignment } from './HorizontalAlignment';
import { ParagraphProperties } from './ParagraphProperties';
import { ParagraphStyle } from './ParagraphStyle';
import { TabStop } from './TabStop';
import { TabStopType } from './TabStopType';

describe(ParagraphProperties.name, () => {
  let properties: ParagraphProperties;
  let document: TextDocument;
  let paragraph: Paragraph;
  let testStyle: ParagraphStyle;

  beforeEach(() => {
    properties = new ParagraphProperties();

    document = new TextDocument();
    paragraph = document.getBody().addParagraph();
    testStyle = new ParagraphStyle();
  });

  describe('#getHorizontalAlignment', () => {
    it('return `Default` as default', () => {
      expect(properties.getHorizontalAlignment()).toBe(HorizontalAlignment.Default);
    });

    it('return the current horizontal alignment', () => {
      properties.setHorizontalAlignment(HorizontalAlignment.Center);

      expect(properties.getHorizontalAlignment()).toBe(HorizontalAlignment.Center);
    });
  });

  // setPageBreakBefore

  // setKeepTogether

  describe('#addTabStop', () => {
    it('add new item to the list of tab stops by position and return the added tab stop', () => {
      const testTabStop = new TabStop(23);

      const addedTabStop = properties.addTabStop(23, TabStopType.Left);

      expect(addedTabStop).toEqual(testTabStop);
      expect(properties.getTabStops()[0]).toEqual(testTabStop);
    });

    it('add new item to the list of tab stops and return the added tab stop', () => {
      const testTabStop = new TabStop(23);

      const addedTabStop = properties.addTabStop(testTabStop);

      expect(addedTabStop).toEqual(testTabStop);
      expect(properties.getTabStops()).toContain(testTabStop);
    });

    it('order tab stops by position', () => {
      const testTabStop1 = new TabStop(42);
      const testTabStop2 = new TabStop(23);

      properties.addTabStop(testTabStop1);
      properties.addTabStop(testTabStop2);

      expect(properties.getTabStops()).toEqual([testTabStop2, testTabStop1]);
    });

    it('not add new tab stop if a tab stop with the same position already is defined', () => {
      const testTabStop1 = new TabStop(23, TabStopType.Left);
      const testTabStop2 = new TabStop(23, TabStopType.Right);

      const addedTabStop1 = properties.addTabStop(testTabStop1);
      const addedTabStop2 = properties.addTabStop(testTabStop2);

      expect(addedTabStop1).toEqual(testTabStop1);
      expect(addedTabStop2).toBeUndefined();
      expect(properties.getTabStops()).toEqual([testTabStop1]);
    });
  });

  describe('#getTabStops', () => {
    it('return the items in order', () => {
      const testTabStop1 = new TabStop(23);
      const testTabStop2 = new TabStop(42);

      properties.addTabStop(testTabStop1);
      properties.addTabStop(testTabStop2);

      expect(properties.getTabStops()).toEqual([testTabStop1, testTabStop2]);
    });
  });

  describe('#clearTabStops', () => {
    beforeEach(() => {
      properties.addTabStop(new TabStop(23));
      properties.addTabStop(new TabStop(42));
    });

    it('remove all items from the list', () => {
      properties.clearTabStops();

      expect(properties.getTabStops().length).toBe(0);
    });
  });

  describe('#isDefault', () => {
    it('return true if no property was set', () => {
      expect(properties.isDefault()).toBe(true);
    });

    it('return false if horizontal alignment was set', () => {
      properties.setHorizontalAlignment(HorizontalAlignment.Center);

      expect(properties.isDefault()).toBe(false);
    });

    it('return false if page break was set', () => {
      properties.setPageBreakBefore();

      expect(properties.isDefault()).toBe(false);
    });

    it('return false if keep together was set', () => {
      properties.setKeepTogether();

      expect(properties.isDefault()).toBe(false);
    });

    it('return false if a tab stop was set', () => {
      properties.addTabStop(23, TabStopType.Right);

      expect(properties.isDefault()).toBe(false);
    });
  });

  describe('toXml', () => {
    it('not add paragraph properties if no property was set', () => {
      testStyle.setFontSize(23);
      paragraph.setStyle(testStyle);

      expect(document.toString()).not.toMatch(/<style:paragraph-properties/);
    });

    it('set the horizontal alignment', () => {
      testStyle.setHorizontalAlignment(HorizontalAlignment.Center);
      paragraph.setStyle(testStyle);

      /* tslint:disable-next-line:max-line-length */
      expect(document.toString()).toMatch(/<style:style style:family="paragraph" style:name="([a-z0-9]+)"><style:paragraph-properties fo:text-align="center"\/><\/style:style>/);
    });

    it('set the page break property to the paragraph style', () => {
      testStyle.setPageBreakBefore();
      paragraph.setStyle(testStyle);

      /* tslint:disable-next-line:max-line-length */
      expect(document.toString()).toMatch(/<style:style style:family="paragraph" style:name="([a-z0-9]+)"><style:paragraph-properties fo:break-before="page"\/><\/style:style>/);
    });

    it('add tab stop elements to the paragraph style', () => {
      testStyle.addTabStop(23, TabStopType.Left);
      paragraph.setStyle(testStyle);

      /* tslint:disable-next-line:max-line-length */
      expect(document.toString()).toMatch(/<style:style style:family="paragraph" style:name="([a-z0-9]+)"><style:paragraph-properties><style:tab-stops><style:tab-stop style:position="23mm"\/><\/style:tab-stops><\/style:paragraph-properties><\/style:style>/);
    });
  });
});
