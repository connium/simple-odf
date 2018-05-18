import { Color } from "../../src/style/Color";

describe(Color.name, () => {
  const expectedHex = "336699";

  describe("#fromHex", () => {
    it("return color instance", () => {
      let color = Color.fromHex(expectedHex);

      expect(color).toBeInstanceOf(Color);
      expect(color.toHex()).toEqual("#" + expectedHex);

      color = Color.fromHex("#" + expectedHex);

      expect(color).toBeInstanceOf(Color);
      expect(color.toHex()).toEqual("#" + expectedHex);
    });

    it("return undefined if string is too long", () => {
      const color = Color.fromHex("123456789");

      expect(color).toBeUndefined();
    });

    it("return undefined if string is too short", () => {
      const color = Color.fromHex("1234");

      expect(color).toBeUndefined();
    });

    it("return undefined if string contains non-hex characters", () => {
      const color = Color.fromHex("23fx42");

      expect(color).toBeUndefined();
    });
  });

  describe("#fromRgb", () => {
    it("return color instance", () => {
      const color = Color.fromRgb(0x33, 0x66, 0x99);

      expect(color).toBeInstanceOf(Color);
      expect(color.toHex()).toEqual("#" + expectedHex);
    });

    it("return undefined if red is out of range", () => {
      let color = Color.fromRgb(-1, 0x66, 0x99);

      expect(color).toBeUndefined();

      color = Color.fromRgb(256, 0x66, 0x99);

      expect(color).toBeUndefined();
    });

    it("return undefined if green is out of range", () => {
      let color = Color.fromRgb(0x33, -1, 0x99);

      expect(color).toBeUndefined();

      color = Color.fromRgb(0x33, 256, 0x99);

      expect(color).toBeUndefined();
    });

    it("return undefined if blue is out of range", () => {
      let color = Color.fromRgb(0x33, 0x66, -1);

      expect(color).toBeUndefined();

      color = Color.fromRgb(0x33, 0x66, 256);

      expect(color).toBeUndefined();
    });
  });

  describe("#toHex", () => {
    it("return hex code with leading #", () => {
      const color = Color.fromRgb(0x33, 0x66, 0x99);

      expect(color.toHex()).toEqual("#" + expectedHex);
    });

    it("return hex code with padded 0", () => {
      const color = Color.fromRgb(0x3, 0x6, 0x9);

      expect(color.toHex()).toEqual("#030609");
    });
  });
});
