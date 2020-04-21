import { ListStyle, ParagraphStyle } from '../style';
import { CommonStyles } from './CommonStyles';

describe(CommonStyles.name, () => {
  const testStyleName = 'some style name';

  let commonStyles: CommonStyles;

  beforeEach(() => {
    commonStyles = new CommonStyles();
  });

  it('should create and return a new list style', () => {
    const style = commonStyles.createListStyle(testStyleName);

    expect(style).toBeInstanceOf(ListStyle);
    expect(style.getDisplayName()).toBe(testStyleName);
  });

  it('should create a list style only once', () => {
    const style1 = commonStyles.createListStyle(testStyleName);
    const style2 = commonStyles.createListStyle(testStyleName);
    const styles = commonStyles.getAll();

    expect(style1).toBe(style2);
    expect(styles.length).toBe(1);
    expect(styles[0]).toBe(style1);
  });

  it('should create and return a new paragraph style', () => {
    const style = commonStyles.createParagraphStyle(testStyleName);

    expect(style).toBeInstanceOf(ParagraphStyle);
    expect(style.getDisplayName()).toBe(testStyleName);
  });

  it('should create a paragraph style only once', () => {
    const style1 = commonStyles.createParagraphStyle(testStyleName);
    const style2 = commonStyles.createParagraphStyle(testStyleName);
    const styles = commonStyles.getAll();

    expect(style1).toBe(style2);
    expect(styles.length).toBe(1);
    expect(styles[0]).toBe(style1);
  });

  it('should return the name of previously created style', () => {
    const style = commonStyles.createParagraphStyle(testStyleName);
    const styleName = commonStyles.getName(testStyleName);

    expect(styleName).toBe(style.getName());
  });

  it('should return undefined if the name of an unknown style is requested', () => {
    commonStyles.createParagraphStyle(testStyleName);

    const styleName = commonStyles.getName('unknownStyleName');

    expect(styleName).toBeUndefined();
  });
});
