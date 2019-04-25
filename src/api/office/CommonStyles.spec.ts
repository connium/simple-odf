import { ParagraphStyle } from '../style';
import { CommonStyles } from './CommonStyles';

describe(CommonStyles.name, () => {
  const testStyleName = 'some style name';

  let commonStyles: CommonStyles;

  beforeEach(() => {
    commonStyles = new CommonStyles();
  });

  describe('styles', () => {
    it('create a style only once', () => {
      const style1 = commonStyles.createParagraphStyle(testStyleName);
      const style2 = commonStyles.createParagraphStyle(testStyleName);
      const styles = commonStyles.getAll();

      expect(style1).toBe(style2);
      expect(styles.length).toBe(1);
      expect(styles[0]).toBe(style1);
    });

    it('get name of previously created style', () => {
      const style = commonStyles.createParagraphStyle(testStyleName);
      const styleName = commonStyles.getName(testStyleName);

      expect(styleName).toBe(style.getName());
    });

    it('return undefined if unknown style is requested', () => {
      commonStyles.createParagraphStyle(testStyleName);

      const styleName = commonStyles.getName('unknownStyleName');

      expect(styleName).toBeUndefined();
    });
  });

  describe('paragraph style', () => {
    it('create and return a new paragraph style', () => {
      const style = commonStyles.createParagraphStyle(testStyleName);

      expect(style).toBeInstanceOf(ParagraphStyle);
      expect(style.getDisplayName()).toBe(testStyleName);
      expect(style.getFamily()).toBe('paragraph');
    });
  });
});
