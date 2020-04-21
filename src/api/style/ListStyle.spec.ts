import { BulletListLevelStyle } from './BulletListLevelStyle';
import { ListStyle } from './ListStyle';

describe(ListStyle.name, () => {
  const level = 3;

  let listStyle: ListStyle;

  beforeEach(() => {
    listStyle = new ListStyle();
  });

  it('should not set consecutive numbering by default', () => {
    expect(listStyle.getConsecutiveNumbering()).toBe(false);
  });

  it('should return previously set consecutive numbering', () => {
    listStyle.setConsecutiveNumbering(true);

    expect(listStyle.getConsecutiveNumbering()).toBe(true);
  });

  it('should have no list level styles by default', () => {
    const listLevelStyles = listStyle.getListLevelStyles();

    expect(listLevelStyles.length).toBe(0);
  });

  it('should create new BulletListLevelStyle', () => {
    const bulletListLevelStyle = listStyle.createBulletListLevelStyle(level);

    expect(bulletListLevelStyle).toBeInstanceOf(BulletListLevelStyle);
    expect(bulletListLevelStyle.getLevel()).toBe(level);
  });

  it('should overwrite existing list level style with same level', () => {
    const listLevelStylesBefore = listStyle.createBulletListLevelStyle(level);

    expect(listStyle.getListLevelStyle(level)).toBe(listLevelStylesBefore);

    const listLevelStylesAfter = listStyle.createBulletListLevelStyle(level);

    expect(listStyle.getListLevelStyle(level)).toBe(listLevelStylesAfter);
  });

  it('should throw an error if the level is not an integer', () => {
    expect(() => listStyle.createBulletListLevelStyle(1.23)).toThrowError();
  });

  it('should throw an error if the level is smaller than 1', () => {
    expect(() => listStyle.createBulletListLevelStyle(0)).toThrowError();
  });

  it('should throw an error if the level is greater then 10', () => {
    expect(() => listStyle.createBulletListLevelStyle(11)).toThrowError();
  });

  it('should return list level style for requested level', () => {
    listStyle.createBulletListLevelStyle(level);

    const bulletListLevelStyle = listStyle.getListLevelStyle(level);

    expect(bulletListLevelStyle).toBeInstanceOf(BulletListLevelStyle);
    if (bulletListLevelStyle) {
      expect(bulletListLevelStyle.getLevel()).toBe(level);
    }
  });

  it('should return undefined if no list level style is set for the requested level', () => {
    listStyle.createBulletListLevelStyle(level);

    const bulletListLevelStyle = listStyle.getListLevelStyle(level + 1);

    expect(bulletListLevelStyle).toBeUndefined();
  });

  it('should remove the list level style for the requested level', () => {
    listStyle.createBulletListLevelStyle(level);

    const listLevelStylesBefore = listStyle.getListLevelStyles();
    expect(listLevelStylesBefore.length).toBe(1);

    listStyle.removeListLevelStyle(level);

    const listLevelStylesAfter = listStyle.getListLevelStyles();
    expect(listLevelStylesAfter.length).toBe(0);
  });
});
