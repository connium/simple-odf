import { OdfElement } from '../api/OdfElement';
import { AutomaticStyles } from '../api/office';
import { Style } from '../api/style';
import { Heading, Paragraph, List } from '../api/text';

export class AutomaticStyleVisitor {
  public constructor(private automaticStyles: AutomaticStyles) {}

  public visit(odfElement: OdfElement): void {
    if (odfElement instanceof Heading) {
      this.visitHeading(odfElement, this.automaticStyles);
    } else if (odfElement instanceof List) {
      this.visitList(odfElement, this.automaticStyles);
    } else if (odfElement instanceof Paragraph) {
      this.visitParagraph(odfElement, this.automaticStyles);
    }

    odfElement.getAll().forEach((odfChildElement) => {
      this.visit(odfChildElement);
    });
  }

  private visitHeading(
    heading: Heading,
    automaticStyles: AutomaticStyles
  ): void {
    this.addStyle(heading.getStyle(), automaticStyles);
  }

  private visitList(list: List, automaticStyles: AutomaticStyles): void {
    this.addStyle(list.getStyle(), automaticStyles);
  }

  private visitParagraph(
    paragraph: Paragraph,
    automaticStyles: AutomaticStyles
  ): void {
    this.addStyle(paragraph.getStyle(), automaticStyles);
  }

  private addStyle(
    style: Style | undefined,
    automaticStyles: AutomaticStyles
  ): void {
    if (style === undefined) {
      return;
    }

    automaticStyles.add(style);
  }
}
