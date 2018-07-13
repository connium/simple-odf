import { OutlineStyle } from "../../src/style/OutlineStyle";
import { StyleFactory } from "../../src/style/StyleFactory";

describe(StyleFactory.name, () => {
  let styleFactory: StyleFactory;

  beforeEach(() => {
    styleFactory = new StyleFactory();
  });

  describe("#createOutlineStyle", () => {
    it("return color instance", () => {
      const outlineStyle = styleFactory.createOutlineStyle();

      expect(outlineStyle).toBeInstanceOf(OutlineStyle);
    });
  });
});
