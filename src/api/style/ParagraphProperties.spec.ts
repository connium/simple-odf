import { Color } from './Color';
import { HorizontalAlignment } from './HorizontalAlignment';
import { HorizontalAlignmentLastLine } from './HorizontalAlignmentLastLine';
import { PageBreak } from './PageBreak';
import { ParagraphProperties } from './ParagraphProperties';
import { TabStop } from './TabStop';
import { TabStopType } from './TabStopType';
import { VerticalAlignment } from './VerticalAlignment';

describe(ParagraphProperties.name, () => {
  let properties: ParagraphProperties;

  beforeEach(() => {
    properties = new ParagraphProperties();
  });

  describe('background color', () => {
    it('return undefined by default', () => {
      expect(properties.getBackgroundColor()).toBeUndefined();
    });

    it('return previously set alignment', () => {
      const testColor = Color.fromRgb(1, 2, 3);

      properties.setBackgroundColor(testColor);

      expect(properties.getBackgroundColor()).toBe(testColor);
    });
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

  describe('horizontal alignment last line', () => {
    it('return `Default` by default', () => {
      expect(properties.getHorizontalAlignmentLastLine()).toBe(HorizontalAlignment.Default);
    });

    it('return previously set alignment', () => {
      properties.setHorizontalAlignmentLastLine(HorizontalAlignmentLastLine.Center);

      expect(properties.getHorizontalAlignmentLastLine()).toBe(HorizontalAlignmentLastLine.Center);
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

  describe('keep with next', () => {
    it('return false by default', () => {
      expect(properties.getKeepWithNext()).toBe(false);
    });

    it('return previously set state', () => {
      properties.setKeepWithNext();

      expect(properties.getKeepWithNext()).toBe(true);

      properties.setKeepWithNext(false);

      expect(properties.getKeepWithNext()).toBe(false);
    });
  });

  describe('line height', () => {
    const testLineHeightNumber = 23;
    const testLineHeightPercent = '42%';

    it('return undefined by default', () => {
      expect(properties.getLineHeight()).toBeUndefined();
    });

    it('return previously set state', () => {
      properties.setLineHeight(testLineHeightNumber);

      expect(properties.getLineHeight()).toBe(testLineHeightNumber);

      properties.setLineHeight(testLineHeightPercent);

      expect(properties.getLineHeight()).toBe(testLineHeightPercent);

      properties.setLineHeight(undefined);

      expect(properties.getLineHeight()).toBeUndefined();
    });

    it('ignore invalid value', () => {
      properties.setLineHeight(testLineHeightNumber);

      properties.setLineHeight(0);

      expect(properties.getLineHeight()).toBe(testLineHeightNumber);

      properties.setLineHeight('42$');

      expect(properties.getLineHeight()).toBe(testLineHeightNumber);
    });
  });

  describe('line height at least', () => {
    const testLineHeight = 23;

    it('return undefined by default', () => {
      expect(properties.getLineHeightAtLeast()).toBeUndefined();
    });

    it('return previously set state', () => {
      properties.setLineHeightAtLeast(testLineHeight);

      expect(properties.getLineHeightAtLeast()).toBe(testLineHeight);

      properties.setLineHeightAtLeast(undefined);

      expect(properties.getLineHeightAtLeast()).toBeUndefined();
    });

    it('ignore invalid value', () => {
      properties.setLineHeightAtLeast(testLineHeight);

      properties.setLineHeightAtLeast(0);

      expect(properties.getLineHeightAtLeast()).toBe(testLineHeight);
    });
  });

  describe('line spacing', () => {
    const testLineSpacing = 23;

    it('return undefined by default', () => {
      expect(properties.getLineSpacing()).toBeUndefined();
    });

    it('return previously set state', () => {
      properties.setLineSpacing(testLineSpacing);

      expect(properties.getLineSpacing()).toBe(testLineSpacing);

      properties.setLineSpacing(undefined);

      expect(properties.getLineSpacing()).toBeUndefined();
    });
  });

  describe('margin', () => {
    const testMarginBottom = 13.37;
    const testMarginLeft = 23.42;
    const testMarginRight = 12.34;
    const testMarginTop = 98.76;

    it('return 0 by default', () => {
      expect(properties.getMarginBottom()).toBe(0);
      expect(properties.getMarginLeft()).toBe(0);
      expect(properties.getMarginRight()).toBe(0);
      expect(properties.getMarginTop()).toBe(0);
    });

    it('return previously set margin', () => {
      properties.setMarginBottom(testMarginBottom);
      properties.setMarginLeft(testMarginLeft);
      properties.setMarginRight(testMarginRight);
      properties.setMarginTop(testMarginTop);

      expect(properties.getMarginBottom()).toBe(testMarginBottom);
      expect(properties.getMarginLeft()).toBe(testMarginLeft);
      expect(properties.getMarginRight()).toBe(testMarginRight);
      expect(properties.getMarginTop()).toBe(testMarginTop);
    });

    it('return previously set margin (set once)', () => {
      properties.setMargins(testMarginLeft, testMarginRight, testMarginTop, testMarginBottom);

      expect(properties.getMarginBottom()).toBe(testMarginBottom);
      expect(properties.getMarginLeft()).toBe(testMarginLeft);
      expect(properties.getMarginRight()).toBe(testMarginRight);
      expect(properties.getMarginTop()).toBe(testMarginTop);
    });

    it('ignore invalid value', () => {
      properties.setMarginBottom(testMarginBottom);
      properties.setMarginTop(testMarginTop);

      properties.setMarginBottom(0);
      properties.setMarginTop(0);

      expect(properties.getMarginBottom()).toBe(testMarginBottom);
      expect(properties.getMarginTop()).toBe(testMarginTop);
    });
  });

  describe('orphans', () => {
    const testOrphans = 23;

    it('return undefined by default', () => {
      expect(properties.getOrphans()).toBeUndefined();
    });

    it('return previously set state', () => {
      properties.setOrphans(testOrphans);

      expect(properties.getOrphans()).toBe(testOrphans);

      properties.setOrphans(undefined);

      expect(properties.getOrphans()).toBeUndefined();
    });

    it('use truncated value', () => {
      properties.setOrphans(23.42);

      expect(properties.getOrphans()).toBe(testOrphans);
    });

    it('ignore invalid value', () => {
      properties.setOrphans(testOrphans);

      properties.setOrphans(-23);

      expect(properties.getOrphans()).toBe(testOrphans);
    });
  });

  describe('padding', () => {
    const testPaddingBottom = 13.37;
    const testPaddingLeft = 23.42;
    const testPaddingRight = 12.34;
    const testPaddingTop = 98.76;

    it('return 0 by default', () => {
      expect(properties.getPaddingBottom()).toBe(0);
      expect(properties.getPaddingLeft()).toBe(0);
      expect(properties.getPaddingRight()).toBe(0);
      expect(properties.getPaddingTop()).toBe(0);
    });

    it('return previously set padding', () => {
      properties.setPaddingBottom(testPaddingBottom);
      properties.setPaddingLeft(testPaddingLeft);
      properties.setPaddingRight(testPaddingRight);
      properties.setPaddingTop(testPaddingTop);

      expect(properties.getPaddingBottom()).toBe(testPaddingBottom);
      expect(properties.getPaddingLeft()).toBe(testPaddingLeft);
      expect(properties.getPaddingRight()).toBe(testPaddingRight);
      expect(properties.getPaddingTop()).toBe(testPaddingTop);
    });

    it('return previously set padding (set once)', () => {
      properties.setPaddings(testPaddingLeft, testPaddingRight, testPaddingTop, testPaddingBottom);

      expect(properties.getPaddingBottom()).toBe(testPaddingBottom);
      expect(properties.getPaddingLeft()).toBe(testPaddingLeft);
      expect(properties.getPaddingRight()).toBe(testPaddingRight);
      expect(properties.getPaddingTop()).toBe(testPaddingTop);
    });

    it('ignore invalid value', () => {
      properties.setPaddingBottom(testPaddingBottom);
      properties.setPaddingLeft(testPaddingLeft);
      properties.setPaddingRight(testPaddingRight);
      properties.setPaddingTop(testPaddingTop);

      properties.setPaddingBottom(-1);
      properties.setPaddingLeft(-2);
      properties.setPaddingRight(-3);
      properties.setPaddingTop(-4);

      expect(properties.getPaddingBottom()).toBe(testPaddingBottom);
      expect(properties.getPaddingLeft()).toBe(testPaddingLeft);
      expect(properties.getPaddingRight()).toBe(testPaddingRight);
      expect(properties.getPaddingTop()).toBe(testPaddingTop);
    });
  });

  describe('page break', () => {
    it('return None by default', () => {
      expect(properties.getPageBreak()).toBe(PageBreak.None);
    });

    it('return previously set state', () => {
      properties.setPageBreak(PageBreak.Before);

      expect(properties.getPageBreak()).toBe(PageBreak.Before);

      properties.setPageBreak(PageBreak.After);

      expect(properties.getPageBreak()).toBe(PageBreak.After);
    });
  });

  describe('text indent', () => {
    it('return 0 by default', () => {
      expect(properties.getTextIndent()).toBe(0);
    });

    it('return previously set indent', () => {
      const testIndent = 23.42;

      properties.setTextIndent(testIndent);

      expect(properties.getTextIndent()).toBe(testIndent);
    });
  });

  describe('vertical alignment', () => {
    it('return Default by default', () => {
      expect(properties.getVerticalAlignment()).toBe(VerticalAlignment.Default);
    });

    it('return previously set alignment', () => {
      properties.setVerticalAlignment(VerticalAlignment.Middle);

      expect(properties.getVerticalAlignment()).toBe(VerticalAlignment.Middle);
    });
  });

  describe('widows', () => {
    const testWidows = 23;

    it('return undefined by default', () => {
      expect(properties.getWidows()).toBeUndefined();
    });

    it('return previously set state', () => {
      properties.setWidows(testWidows);

      expect(properties.getWidows()).toBe(testWidows);

      properties.setWidows(undefined);

      expect(properties.getWidows()).toBeUndefined();
    });

    it('use truncated value', () => {
      properties.setWidows(23.42);

      expect(properties.getWidows()).toBe(testWidows);
    });

    it('ignore invalid value', () => {
      properties.setWidows(testWidows);

      properties.setWidows(-23);

      expect(properties.getWidows()).toBe(testWidows);
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
