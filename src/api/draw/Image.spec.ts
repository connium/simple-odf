import { AnchorType } from '../../style/AnchorType';
import { ImageStyle } from '../../style/ImageStyle';
import { Image } from './Image';

describe(Image.name, () => {
  const testImagePath = '/some/image.path.png';

  let image: Image;

  beforeEach(() => {
    image = new Image(testImagePath);
  });

  describe('path', () => {
    it('return initial path', () => {
      expect(image.getPath()).toBe(testImagePath);
    });
  });

  describe('style', () => {
    let testStyle: ImageStyle;

    beforeEach(() => {
      testStyle = new ImageStyle();
    });

    it('return style by default', () => {
      expect(image.getStyle()).toBeInstanceOf(ImageStyle);
    });

    it('return previous set style', () => {
      testStyle.setAnchorType(AnchorType.AsChar);

      image.setStyle(testStyle);

      expect(image.getStyle()).toBe(testStyle);
    });

    it('ignore invalid input', () => {
      image.setStyle(testStyle);
      image.setStyle(null as any);

      expect(image.getStyle()).toBe(testStyle);
    });
  });
});
