import { Hyperlink } from "./Hyperlink";

describe(Hyperlink.name, () => {
  const testText = "some text";
  const testUri = "http://example.org/";

  let hyperlink: Hyperlink;

  beforeEach(() => {
    hyperlink = new Hyperlink(testText, testUri);
  });

  describe("URI", () => {
    it("return initial URI", () => {
      expect(hyperlink.getURI()).toBe(testUri);
    });

    it("return previous set URI", () => {
      hyperlink.setURI("localhost");

      expect(hyperlink.getURI()).toBe("localhost");
    });

    it("ignore invalid input", () => {
      hyperlink.setURI("");

      expect(hyperlink.getURI()).toBe(testUri);

      hyperlink.setURI(<any>null);

      expect(hyperlink.getURI()).toBe(testUri);
    });
  });
});
