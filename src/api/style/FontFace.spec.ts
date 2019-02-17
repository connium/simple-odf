import { FontFace } from "./FontFace";
import { FontPitch } from "./FontPitch";

describe(FontFace.name, () => {
  const testFamily = "someFontFamily";
  const testFontPitch = FontPitch.Variable;
  const testName = "someFontName";

  let fontFace: FontFace;

  beforeEach(() => {
    fontFace = new FontFace(testName, testFamily, testFontPitch);
  });

  describe("font family", () => {
    it("return initial font family", () => {
      expect(fontFace.getFontFamily()).toBe(testFamily);
    });
  });

  describe("font pitch", () => {
    it("return initial font pitch", () => {
      expect(fontFace.getFontPitch()).toBe(testFontPitch);
    });
  });

  describe("name", () => {
    it("return initial name", () => {
      expect(fontFace.getName()).toBe(testName);
    });
  });
});
