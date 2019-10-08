import { Heading } from './Heading';
import { ListItem } from './ListItem';
import { Paragraph } from './Paragraph';

describe(ListItem.name, () => {
  let listItem: ListItem;

  beforeEach(() => {
    listItem = new ListItem();
  });

  describe('#addHeading', () => {
    it('return a heading', () => {
      const heading = listItem.addHeading();

      expect(heading).toBeInstanceOf(Heading);
    });
  });

  describe('#addParagraph', () => {
    it('return a paragraph', () => {
      const paragraph = listItem.addParagraph();

      expect(paragraph).toBeInstanceOf(Paragraph);
    });
  });
});
