import { Heading, List, Paragraph } from '../api/text';
import { AutomaticStyles } from '../api/office';
import { ListStyle, ParagraphStyle } from '../api/style';
import { AutomaticStyleVisitor } from './AutomaticStyleVisitor';

describe(AutomaticStyleVisitor.name, () => {
  const testText = 'some text';
  const testStyleName = 'someStyleName';

  let automaticStyleVisitor: AutomaticStyleVisitor;
  let automaticStyles: AutomaticStyles;
  let heading: Heading;
  let list: List;
  let paragraph: Paragraph;

  beforeEach(() => {
    heading = new Heading(testText, 2);
    list = new List();
    paragraph = new Paragraph(testText);

    automaticStyles = new AutomaticStyles();
    jest.spyOn(automaticStyles, 'add');
    jest.spyOn(automaticStyles, 'getAll');
    jest.spyOn(automaticStyles, 'getName');

    automaticStyleVisitor = new AutomaticStyleVisitor(automaticStyles);
  });

  it('should skip heading without any style', () => {
    automaticStyleVisitor.visit(heading);

    expect(automaticStyles.add).not.toHaveBeenCalled();
  });

  it('should skip heading with common style', () => {
    heading.setStyleName(testStyleName);

    automaticStyleVisitor.visit(heading);

    expect(automaticStyles.add).not.toHaveBeenCalled();
  });

  it('should add automatic style for heading with custom style', () => {
    const testStyle = new ParagraphStyle();
    heading.setStyle(testStyle);

    automaticStyleVisitor.visit(heading);

    expect(automaticStyles.add).toHaveBeenCalledWith(testStyle);
  });

  it('should skip list without any style', () => {
    automaticStyleVisitor.visit(list);

    expect(automaticStyles.add).not.toHaveBeenCalled();
  });

  it('should skip list with common style', () => {
    list.setStyleName(testStyleName);

    automaticStyleVisitor.visit(list);

    expect(automaticStyles.add).not.toHaveBeenCalled();
  });

  it('should add automatic style for list with custom style', () => {
    const testStyle = new ListStyle();
    list.setStyle(testStyle);

    automaticStyleVisitor.visit(list);

    expect(automaticStyles.add).toHaveBeenCalledWith(testStyle);
  });

  it('should skip paragraph without any style', () => {
    automaticStyleVisitor.visit(paragraph);

    expect(automaticStyles.add).not.toHaveBeenCalled();
  });

  it('should skip paragraph with common style', () => {
    paragraph.setStyleName(testStyleName);

    automaticStyleVisitor.visit(paragraph);

    expect(automaticStyles.add).not.toHaveBeenCalled();
  });

  it('should add automatic style for paragraph with custom style', () => {
    const testStyle = new ParagraphStyle();
    paragraph.setStyle(testStyle);

    automaticStyleVisitor.visit(paragraph);

    expect(automaticStyles.add).toHaveBeenCalledWith(testStyle);
  });
});
