import { userInfo } from 'os';
import { Meta } from './Meta';

describe(Meta.name, () => {
  const timeOffset = 100;

  let meta: Meta;

  beforeEach(() => {
    meta = new Meta();
  });

  describe('creation date', () => {
    it('return current date', () => {
      expect(meta.getCreationDate().getTime()).toBeGreaterThan(
        Date.now() - timeOffset
      );
    });
  });

  describe('creator', () => {
    const testCreator = 'Homer Simpson';

    it('return undefined by default', () => {
      expect(meta.getCreator()).toBeUndefined();
    });

    it('return previous set creator', () => {
      meta.setCreator(testCreator);

      expect(meta.getCreator()).toBe(testCreator);
    });

    it('return undefined if undefined is set', () => {
      meta.setCreator(testCreator);
      meta.setCreator(undefined);

      expect(meta.getCreator()).toBeUndefined();
    });

    it('ignore invalid input', () => {
      meta.setCreator(testCreator);
      meta.setCreator(null as any);

      expect(meta.getCreator()).toBe(testCreator);
    });
  });

  describe('date', () => {
    let testDate: Date;

    beforeEach(() => {
      testDate = new Date(2020, 3, 1, 12);
    });

    it('return undefined by default', () => {
      expect(meta.getDate()).toBeUndefined();
    });

    it('return previous set date', () => {
      meta.setDate(testDate);

      expect(meta.getDate()).toBe(testDate);
    });

    it('return undefined if undefined is set', () => {
      meta.setDate(testDate);
      meta.setDate(undefined);

      expect(meta.getDate()).toBeUndefined();
    });

    it('ignore invalid input', () => {
      meta.setDate(testDate);
      meta.setDate(null as any);

      expect(meta.getDate()).toBe(testDate);
    });
  });

  describe('description', () => {
    const testDescription = 'some test description';

    it('return undefined by default', () => {
      expect(meta.getDescription()).toBeUndefined();
    });

    it('return previous set description', () => {
      meta.setDescription(testDescription);

      expect(meta.getDescription()).toBe(testDescription);
    });

    it('return undefined if undefined is set', () => {
      meta.setDescription(testDescription);
      meta.setDescription(undefined);

      expect(meta.getDescription()).toBeUndefined();
    });

    it('ignore invalid input', () => {
      meta.setDescription(testDescription);
      meta.setDescription(null as any);

      expect(meta.getDescription()).toBe(testDescription);
    });
  });

  describe('editing cycles', () => {
    it('return 1', () => {
      expect(meta.getEditingCycles()).toBe(1);
    });
  });

  describe('generator', () => {
    it('return the module name and a version', () => {
      expect(meta.getGenerator()).toMatch(/simple-odf\/\d+\.\d+\.\d+/);
    });
  });

  describe('initial creator', () => {
    const testCreator = 'Homer Simpson';

    it('return current user by default', () => {
      expect(meta.getInitialCreator()).toBe(userInfo().username);
    });

    it('return previous set creator', () => {
      meta.setInitialCreator(testCreator);

      expect(meta.getInitialCreator()).toBe(testCreator);
    });

    it('return undefined if undefined is set', () => {
      meta.setInitialCreator(testCreator);
      meta.setInitialCreator(undefined);

      expect(meta.getInitialCreator()).toBeUndefined();
    });

    it('ignore invalid input', () => {
      meta.setInitialCreator(testCreator);
      meta.setInitialCreator(null as any);

      expect(meta.getInitialCreator()).toBe(testCreator);
    });
  });

  describe('keywords', () => {
    const testKeyword1 = 'some keyword';
    const testKeyword2 = 'some other keyword';

    it('return empty list by default', () => {
      expect(meta.getKeywords()).toEqual([]);
    });

    it('add key word to list', () => {
      meta.addKeyword(testKeyword1);

      expect(meta.getKeywords()).toEqual([testKeyword1]);

      meta.addKeyword(testKeyword2);

      expect(meta.getKeywords()).toEqual([testKeyword1, testKeyword2]);
    });

    it('split string by comma and add multiple keywords', () => {
      meta.addKeyword(' some , more, keywords ');

      expect(meta.getKeywords()).toEqual([' some ', ' more', ' keywords ']);
    });

    it('ignore invalid input', () => {
      meta.addKeyword(undefined as any);

      expect(meta.getKeywords()).toEqual([]);

      meta.addKeyword(null as any);

      expect(meta.getKeywords()).toEqual([]);
    });

    it('remove keyword from list', () => {
      meta.addKeyword(testKeyword1);
      meta.addKeyword(testKeyword2);
      meta.addKeyword(testKeyword1);

      expect(meta.getKeywords()).toEqual([
        testKeyword1,
        testKeyword2,
        testKeyword1,
      ]);

      meta.removeKeyword(testKeyword1);

      expect(meta.getKeywords()).toEqual([testKeyword2]);

      meta.removeKeyword(testKeyword1);

      expect(meta.getKeywords()).toEqual([testKeyword2]);
    });

    it('clear keyword list', () => {
      meta.addKeyword(testKeyword1);
      meta.addKeyword(testKeyword2);
      meta.addKeyword(testKeyword1);

      expect(meta.getKeywords()).toEqual([
        testKeyword1,
        testKeyword2,
        testKeyword1,
      ]);

      meta.clearKeywords();

      expect(meta.getKeywords()).toEqual([]);
    });
  });

  describe('language', () => {
    const testLanguage = 'zu';

    it('return undefined by default', () => {
      expect(meta.getLanguage()).toBeUndefined();
    });

    it('return previous set language', () => {
      meta.setLanguage(testLanguage);

      expect(meta.getLanguage()).toBe(testLanguage);
    });

    it('return undefined if undefined is set', () => {
      meta.setLanguage(testLanguage);
      meta.setLanguage(undefined);

      expect(meta.getLanguage()).toBeUndefined();
    });

    it('ignore invalid input', () => {
      meta.setLanguage(testLanguage);
      meta.setLanguage('invalid');

      expect(meta.getLanguage()).toBe(testLanguage);
    });
  });

  describe('print date', () => {
    const testDate = new Date(2020, 3, 1, 12);

    it('return undefined by default', () => {
      expect(meta.getPrintDate()).toBeUndefined();
    });

    it('return previous set date', () => {
      meta.setPrintDate(testDate);

      expect(meta.getPrintDate()).toBe(testDate);
    });

    it('return undefined if undefined is set', () => {
      meta.setPrintDate(testDate);
      meta.setPrintDate(undefined);

      expect(meta.getPrintDate()).toBeUndefined();
    });

    it('ignore invalid input', () => {
      meta.setPrintDate(testDate);
      meta.setPrintDate(null as any);

      expect(meta.getPrintDate()).toBe(testDate);
    });
  });

  describe('printed by', () => {
    const testUsername = 'Lisa Simpson';

    it('return undefined by default', () => {
      expect(meta.getPrintedBy()).toBeUndefined();
    });

    it('return previous set printed by', () => {
      meta.setPrintedBy(testUsername);

      expect(meta.getPrintedBy()).toBe(testUsername);
    });

    it('return undefined if undefined is set', () => {
      meta.setPrintedBy(testUsername);
      meta.setPrintedBy(undefined);

      expect(meta.getPrintedBy()).toBeUndefined();
    });

    it('return undefined if empty printed by is set', () => {
      meta.setPrintedBy(testUsername);
      meta.setPrintedBy(null as any);

      expect(meta.getPrintedBy()).toBe(testUsername);
    });
  });

  describe('subject', () => {
    const testSubject = 'some test subject';

    it('return undefined by default', () => {
      expect(meta.getSubject()).toBeUndefined();
    });

    it('return previous set subject', () => {
      meta.setSubject(testSubject);

      expect(meta.getSubject()).toBe(testSubject);
    });

    it('return undefined if undefined is set', () => {
      meta.setSubject(testSubject);
      meta.setSubject(undefined);

      expect(meta.getSubject()).toBeUndefined();
    });

    it('ignore invalid input', () => {
      meta.setSubject(testSubject);
      meta.setSubject(null as any);

      expect(meta.getSubject()).toBe(testSubject);
    });
  });

  describe('title', () => {
    const testTitle = 'some test title';

    it('return undefined by default', () => {
      expect(meta.getTitle()).toBeUndefined();
    });

    it('return previous set title', () => {
      meta.setTitle(testTitle);

      expect(meta.getTitle()).toBe(testTitle);
    });

    it('return undefined if undefined is set', () => {
      meta.setTitle(testTitle);
      meta.setTitle(undefined);

      expect(meta.getTitle()).toBeUndefined();
    });

    it('ignore invalid input', () => {
      meta.setTitle(testTitle);
      meta.setTitle(null as any);

      expect(meta.getTitle()).toBe(testTitle);
    });
  });
});
