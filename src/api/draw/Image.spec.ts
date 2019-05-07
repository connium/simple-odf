import { AnchorType } from './AnchorType';
import { Image } from './Image';

describe(Image.name, () => {
  const testHeight = 23;
  const testPath = '/some/image.path.png';
  const testWidth = 42;

  let image: Image;

  beforeEach(() => {
    image = new Image(testPath);
  });

  describe('anchor type', () => {
    it('return `Paragraph` by default', () => {
      expect(image.getAnchorType()).toBe(AnchorType.Paragraph);
    });

    it('return previously set anchor type', () => {
      const testAnchorType = AnchorType.AsChar;

      image.setAnchorType(testAnchorType);

      expect(image.getAnchorType()).toBe(testAnchorType);
    });
  });

  describe('height', () => {
    it('return undefined by default', () => {
      expect(image.getHeight()).toBeUndefined();
    });

    it('return previously set height', () => {
      image.setHeight(testHeight);

      expect(image.getHeight()).toBe(testHeight);
    });

    it('set a minimum height', () => {
      image.setHeight(-23);

      expect(image.getHeight()).toBe(1);
    });
  });

  describe('path', () => {
    it('return initial path', () => {
      expect(image.getPath()).toBe(testPath);
    });
  });

  describe('size', () => {
    it('set width and height', () => {
      image.setSize(testWidth, testHeight);

      expect(image.getHeight()).toBe(testHeight);
      expect(image.getWidth()).toBe(testWidth);
    });
  });

  describe('width', () => {
    it('return undefined by default', () => {
      expect(image.getWidth()).toBeUndefined();
    });

    it('return previously set width', () => {
      image.setWidth(testWidth);

      expect(image.getWidth()).toBe(testWidth);
    });

    it('set a minimum width', () => {
      image.setWidth(-23);

      expect(image.getWidth()).toBe(1);
    });
  });
});
