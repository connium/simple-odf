import { BulletListLevelStyle } from './BulletListLevelStyle';

describe(BulletListLevelStyle.name, () => {
  const level = 3;

  let bulletListLevelStyle: BulletListLevelStyle;

  beforeEach(() => {
    bulletListLevelStyle = new BulletListLevelStyle(level);
  });

  it('should return initial level', () => {
    expect(bulletListLevelStyle.getLevel()).toBe(level);
  });
});
