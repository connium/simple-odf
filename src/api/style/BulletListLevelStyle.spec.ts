import { BulletListLevelStyle } from './BulletListLevelStyle';

describe(BulletListLevelStyle.name, () => {
  const level = 3;
  const prefixOrSuffix = '§';
  const relativeBulletSize = '23%';

  let bulletListLevelStyle: BulletListLevelStyle;

  beforeEach(() => {
    bulletListLevelStyle = new BulletListLevelStyle(level);
  });

  it('should return initial bullet character', () => {
    expect(bulletListLevelStyle.getBulletChar()).toBe('\u2022');
  });

  it('should return previously set bullet character', () => {
    bulletListLevelStyle.setBulletChar('\u2714');

    expect(bulletListLevelStyle.getBulletChar()).toBe('\u2714');
  });

  it('should ignore empty bullet character', () => {
    bulletListLevelStyle.setBulletChar('');

    expect(bulletListLevelStyle.getBulletChar()).toBe('\u2022');
  });

  it('should return initial level', () => {
    expect(bulletListLevelStyle.getLevel()).toBe(level);
  });

  it('should have no number prefix by default', () => {
    expect(bulletListLevelStyle.getNumberPrefix()).toBeUndefined();
  });

  it('should return previously set number prefix', () => {
    bulletListLevelStyle.setNumberPrefix(prefixOrSuffix);

    expect(bulletListLevelStyle.getNumberPrefix()).toBe(prefixOrSuffix);
  });

  it('should reset previously set number prefix', () => {
    bulletListLevelStyle.setNumberPrefix(prefixOrSuffix);

    bulletListLevelStyle.setNumberPrefix(undefined);

    expect(bulletListLevelStyle.getNumberPrefix()).toBeUndefined();
  });

  it('should have no number suffix by default', () => {
    expect(bulletListLevelStyle.getNumberSuffix()).toBeUndefined();
  });

  it('should return previously set number suffix', () => {
    bulletListLevelStyle.setNumberSuffix(prefixOrSuffix);

    expect(bulletListLevelStyle.getNumberSuffix()).toBe(prefixOrSuffix);
  });

  it('should reset previously set number suffix', () => {
    bulletListLevelStyle.setNumberSuffix(prefixOrSuffix);

    bulletListLevelStyle.setNumberSuffix(undefined);

    expect(bulletListLevelStyle.getNumberSuffix()).toBeUndefined();
  });

  it('should have no relative bullet size by default', () => {
    expect(bulletListLevelStyle.getRelativeBulletSize()).toBeUndefined();
  });

  it('should return previously set relative bullet size', () => {
    bulletListLevelStyle.setRelativeBulletSize(relativeBulletSize);

    expect(bulletListLevelStyle.getRelativeBulletSize()).toBe(
      relativeBulletSize
    );
  });

  it('should reset previously set relative bullet size', () => {
    bulletListLevelStyle.setRelativeBulletSize(relativeBulletSize);

    bulletListLevelStyle.setRelativeBulletSize(undefined);

    expect(bulletListLevelStyle.getRelativeBulletSize()).toBeUndefined();
  });

  it('should ignore invalid values for relative bullet size', () => {
    bulletListLevelStyle.setRelativeBulletSize(relativeBulletSize);

    bulletListLevelStyle.setRelativeBulletSize('42px');

    expect(bulletListLevelStyle.getRelativeBulletSize()).toBe(
      relativeBulletSize
    );
  });
});
