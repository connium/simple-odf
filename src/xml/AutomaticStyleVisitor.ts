import { OdfElement } from '../api/OdfElement';
import { AutomaticStyles } from '../api/office';
import { Heading, Paragraph } from '../api/text';

export class AutomaticStyleVisitor {
  public constructor(private automaticStyles: AutomaticStyles) {}

  public visit(odfElement: OdfElement): void {
    if (odfElement instanceof Heading) {
      this.visitHeading(odfElement, this.automaticStyles);
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
    const style = heading.getStyle();

    if (style === undefined) {
      return;
    }

    automaticStyles.add(style);
  }

  private visitParagraph(
    paragraph: Paragraph,
    automaticStyles: AutomaticStyles
  ): void {
    const style = paragraph.getStyle();

    if (style === undefined) {
      return;
    }

    automaticStyles.add(style);
  }
}
