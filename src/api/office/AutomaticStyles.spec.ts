import { ParagraphStyle, TabStopType } from '../style';
import { AutomaticStyles } from './AutomaticStyles';

describe(AutomaticStyles.name, () => {
  let automaticStyles: AutomaticStyles;
  let testStyle1: ParagraphStyle;
  let testStyle2: ParagraphStyle;

  beforeEach(() => {
    testStyle1 = new ParagraphStyle();
    testStyle2 = new ParagraphStyle().setFontSize(23);
    testStyle2.addTabStop(42, TabStopType.Right);

    automaticStyles = new AutomaticStyles();
  });

  describe('styles', () => {
    it('add similar styles only once', () => {
      automaticStyles.add(testStyle1);
      automaticStyles.add(new ParagraphStyle());
      const styles = automaticStyles.getAll();

      expect(styles.length).toBe(1);
      expect(styles[0]).toEqual(testStyle1);

      expect(automaticStyles.getName(testStyle1)).toBe('P1');
    });

    it('add different styles', () => {
      automaticStyles.add(testStyle1);
      automaticStyles.add(testStyle2);
      const styles = automaticStyles.getAll();

      expect(styles.length).toBe(2);

      expect(automaticStyles.getName(testStyle1)).toBe('P1');
      expect(automaticStyles.getName(testStyle2)).toBe('P2');
    });

    it('throw if the name of an unknown style is requested', () => {
      automaticStyles.add(testStyle1);

      expect(() => {
        automaticStyles.getName(testStyle2)
      }).toThrow();
    });
  });
});
