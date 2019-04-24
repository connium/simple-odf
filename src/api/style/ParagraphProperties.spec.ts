import { HorizontalAlignment } from './HorizontalAlignment';
import { ParagraphProperties } from './ParagraphProperties';
import { TabStop } from './TabStop';
import { TabStopType } from './TabStopType';

describe(ParagraphProperties.name, () => {
  let properties: ParagraphProperties;

  beforeEach(() => {
    properties = new ParagraphProperties();
  });

  describe('horizontal alignment', () => {
    it('return `Default` by default', () => {
      expect(properties.getHorizontalAlignment()).toBe(HorizontalAlignment.Default);
    });

    it('return previously set alignment', () => {
      properties.setHorizontalAlignment(HorizontalAlignment.Center);

      expect(properties.getHorizontalAlignment()).toBe(HorizontalAlignment.Center);
    });
  });

  describe('keep together', () => {
    it('return false by default', () => {
      expect(properties.getKeepTogether()).toBe(false);
    });

    it('return previously set state', () => {
      properties.setKeepTogether();

      expect(properties.getKeepTogether()).toBe(true);

      properties.setKeepTogether(false);

      expect(properties.getKeepTogether()).toBe(false);
    });
  });

  describe('page break', () => {
    it('return false by default', () => {
      expect(properties.getPageBreakBefore()).toBe(false);
    });

    it('return previously set state', () => {
      properties.setPageBreakBefore();

      expect(properties.getPageBreakBefore()).toBe(true);

      properties.setPageBreakBefore(false);

      expect(properties.getPageBreakBefore()).toBe(false);
    });
  });

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
});
