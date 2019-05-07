import { Heading, Paragraph } from '../api/text';
import { AutomaticStyles } from '../api/office';
import { ParagraphStyle } from '../api/style';
import { AutomaticStyleVisitor } from './AutomaticStyleVisitor';

describe(AutomaticStyleVisitor.name, () => {
  describe('#visit', () => {
    const testText = 'some text';
    const testStyleName = 'someStyleName';

    let automaticStyleVisitor: AutomaticStyleVisitor;
    let automaticStyles: AutomaticStyles;

    beforeEach(() => {
      automaticStyles = new AutomaticStyles();
      jest.spyOn(automaticStyles, 'add');
      jest.spyOn(automaticStyles, 'getAll');
      jest.spyOn(automaticStyles, 'getName');

      automaticStyleVisitor = new AutomaticStyleVisitor(automaticStyles);
    });

    describe('#visitHeading', () => {
      let heading: Heading;

      beforeEach(() => {
        heading = new Heading(testText, 2);
      });

      it('skip heading without any style', () => {
        automaticStyleVisitor.visit(heading);

        expect(automaticStyles.add).not.toHaveBeenCalled();
      });

      it('skip heading with common style', () => {
        heading.setStyleName(testStyleName);

        automaticStyleVisitor.visit(heading);

        expect(automaticStyles.add).not.toHaveBeenCalled();
      });

      it('handle heading with automatic style', () => {
        const testStyle = new ParagraphStyle();
        heading.setStyle(testStyle);

        automaticStyleVisitor.visit(heading);

        expect(automaticStyles.add).toHaveBeenCalledWith(testStyle);
      });
    });

    describe('#visitParagraph', () => {
      let paragraph: Paragraph;

      beforeEach(() => {
        paragraph = new Paragraph(testText);
      });

      it('skip paragraph without any style', () => {
        automaticStyleVisitor.visit(paragraph);

        expect(automaticStyles.add).not.toHaveBeenCalled();
      });

      it('skip paragraph with common style', () => {
        paragraph.setStyleName(testStyleName);

        automaticStyleVisitor.visit(paragraph);

        expect(automaticStyles.add).not.toHaveBeenCalled();
      });

      it('handle paragraph with automatic style', () => {
        const testStyle = new ParagraphStyle();
        paragraph.setStyle(testStyle);

        automaticStyleVisitor.visit(paragraph);

        expect(automaticStyles.add).toHaveBeenCalledWith(testStyle);
      });
    });
  });
});
