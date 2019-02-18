import { Heading } from './Heading';

describe(Heading.name, () => {
  const testLevel = 2;
  const testText = 'some text';

  let heading: Heading;

  beforeEach(() => {
    heading = new Heading(testText, testLevel);
  });

  describe('level', () => {
    it('return initial level', () => {
      expect(heading.getLevel()).toBe(testLevel);
    });

    it('return default level if initial level is not set', () => {
      heading = new Heading(testText);

      expect(heading.getLevel()).toBe(Heading.DEFAULT_LEVEL);
    });

    it('return previous set level', () => {
      heading.setLevel(3);

      expect(heading.getLevel()).toBe(3);
    });

    it('use default level if invalid level is given', () => {
      heading.setLevel(-2);

      expect(heading.getLevel()).toBe(Heading.DEFAULT_LEVEL);

      heading.setLevel(null as any);

      expect(heading.getLevel()).toBe(Heading.DEFAULT_LEVEL);
    });
  });

  describe('text', () => {
    it('return initial text', () => {
      expect(heading.getText()).toBe(testText);
    });

    it('return empty text if initial text is not set', () => {
      heading = new Heading();

      expect(heading.getText()).toBe('');
    });
  });
});
