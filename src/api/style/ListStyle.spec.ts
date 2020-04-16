import { ListStyle } from './ListStyle';

describe(ListStyle.name, () => {
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
});
