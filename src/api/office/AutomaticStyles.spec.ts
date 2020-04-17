import { ListStyle, ParagraphStyle, TabStopType } from '../style';
import { AutomaticStyles } from './AutomaticStyles';

describe(AutomaticStyles.name, () => {
  let automaticStyles: AutomaticStyles;
  let listStyle: ListStyle;
  let paragraphStyle1: ParagraphStyle;
  let paragraphStyle2: ParagraphStyle;

  beforeEach(() => {
    listStyle = new ListStyle();
    paragraphStyle1 = new ParagraphStyle();
    paragraphStyle2 = new ParagraphStyle().setFontSize(23);
    paragraphStyle2.addTabStop(42, TabStopType.Right);

    automaticStyles = new AutomaticStyles();
  });

  it('should add a list style and name it L1', () => {
    automaticStyles.add(listStyle);

    const styles = automaticStyles.getAll();
    expect(styles.length).toBe(1);
    expect(automaticStyles.getName(listStyle)).toBe('L1');
  });

  it('should add different list styles', () => {
    const listStyle2 = new ListStyle();
    listStyle2.setConsecutiveNumbering(true).createBulletListLevelStyle(1);

    automaticStyles.add(listStyle);
    automaticStyles.add(listStyle2);

    const styles = automaticStyles.getAll();
    expect(styles.length).toBe(2);
    expect(automaticStyles.getName(listStyle)).toBe('L1');
    expect(automaticStyles.getName(listStyle2)).toBe('L2');
  });

  it('should add a paragraph style and name it P1', () => {
    automaticStyles.add(paragraphStyle1);

    const styles = automaticStyles.getAll();
    expect(styles.length).toBe(1);
    expect(automaticStyles.getName(paragraphStyle1)).toBe('P1');
  });

  it('should add different paragraph styles', () => {
    automaticStyles.add(paragraphStyle1);
    automaticStyles.add(paragraphStyle2);

    const styles = automaticStyles.getAll();
    expect(styles.length).toBe(2);
    expect(automaticStyles.getName(paragraphStyle1)).toBe('P1');
    expect(automaticStyles.getName(paragraphStyle2)).toBe('P2');
  });

  it('should add similar styles only once', () => {
    automaticStyles.add(paragraphStyle1);
    automaticStyles.add(new ParagraphStyle());

    const styles = automaticStyles.getAll();
    expect(styles.length).toBe(1);
    expect(styles[0]).toEqual(paragraphStyle1);
  });

  it('should throw if the name of an unknown style is requested', () => {
    automaticStyles.add(paragraphStyle1);

    expect(() => {
      automaticStyles.getName(paragraphStyle2);
    }).toThrow();
  });
});
