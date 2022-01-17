import { Hyperlink } from './Hyperlink';

describe(Hyperlink.name, () => {
  const testText = 'some text';
  const testUri = 'http://example.org/';

  let hyperlink: Hyperlink;

  beforeEach(() => {
    hyperlink = new Hyperlink(testText, testUri);
  });

  describe('text', () => {
    it('return initial text', () => {
      expect(hyperlink.getText()).toBe(testText);
    });
  });

  describe('URI', () => {
    it('return initial URI', () => {
      expect(hyperlink.getURI()).toBe(testUri);
    });

    it('return previous set URI', () => {
      hyperlink.setURI('localhost');

      expect(hyperlink.getURI()).toBe('localhost');
    });

    it('ignore invalid input', () => {
      hyperlink.setURI('');

      expect(hyperlink.getURI()).toBe(testUri);

      hyperlink.setURI(null as unknown as string);

      expect(hyperlink.getURI()).toBe(testUri);
    });
  });
});
