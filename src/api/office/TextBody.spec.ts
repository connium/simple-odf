import { Heading } from "../../text/Heading";
import { List } from "../../text/List";
import { Paragraph } from "../../text/Paragraph";
import { TextBody } from "./TextBody";

describe(TextBody.name, () => {
  let textBody: TextBody;

  beforeEach(() => {
    textBody = new TextBody();
  });

  describe("#addHeading", () => {
    it("return a heading", () => {
      const heading = textBody.addHeading();

      expect(heading).toBeInstanceOf(Heading);
    });
  });

  describe("#addList", () => {
    it("return a list", () => {
      const list = textBody.addList();

      expect(list).toBeInstanceOf(List);
    });
  });

  describe("#addParagraph", () => {
    it("return a paragraph", () => {
      const paragraph = textBody.addParagraph();

      expect(paragraph).toBeInstanceOf(Paragraph);
    });
  });
});
