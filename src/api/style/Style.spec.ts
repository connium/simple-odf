import { Style } from './Style';
import { StyleFamily } from './StyleFamily';

describe(Style.name, () => {
  const testFamily = StyleFamily.Paragraph;
  const testName = 'Some style name';

  let style: Style;

  beforeEach(() => {
    style = new Style(testName, testFamily);
  });

  describe('class', () => {
    const testClass = 'text';

    it('return undefined by default', () => {
      expect(style.getClass()).toBeUndefined();
    });

    it('return previous set class', () => {
      style.setClass(testClass);

      expect(style.getClass()).toBe(testClass);
    });

    it('return undefined if undefined is set', () => {
      style.setClass(testClass);
      style.setClass(undefined);

      expect(style.getClass()).toBeUndefined();
    });

    it('ignore invalid input', () => {
      style.setClass(testClass);
      style.setClass(null as unknown as string);

      expect(style.getClass()).toBe(testClass);
    });
  });

  describe('display name', () => {
    it('return initial display name', () => {
      expect(style.getDisplayName()).toBe(testName);
    });
  });

  describe('family', () => {
    it('return initial family', () => {
      expect(style.getFamily()).toBe(testFamily);
    });
  });

  describe('name', () => {
    it('return encoded name', () => {
      expect(style.getName()).toBe('Some_20_style_20_name');
    });
  });
});
