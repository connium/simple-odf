import { OdfElement } from "../../OdfElement";
import { IImageStyle } from "../../style/IImageStyle";
import { ImageStyle } from "../../style/ImageStyle";
import { ImageWriter } from "../../xml/draw/ImageWriter";

/**
 * This class represents an image in a paragraph.
 *
 * It is used to embed image data in BASE64 encoding.
 *
 * @example
 * document.getBody()
 *   .addParagraph()
 *   .addImage("/home/homer/myself.png")
 *   .getStyle()
 *   .setSize(42, 23);
 *
 * @since 0.3.0
 */
export class Image extends OdfElement {
  private style: IImageStyle;

  /**
   * Creates an image
   *
   * @example
   * const image = new Image("/home/homer/myself.png");
   *
   * @param {string} path Path to the image file that should be embedded
   * @since 0.3.0
   */
  public constructor(private path: string) {
    super();

    this.style = new ImageStyle();
  }

  /**
   * The `getPath()` method returns the path to the image file that should be embedded.
   *
   * @example
   * const image = new Image("/home/homer/myself.png");
   * meta.getPath(); // '/home/homer/myself.png'
   *
   * @returns {string} The path to the image file
   * @since 0.7.0
   */
  public getPath(): string {
    return this.path;
  }

  /**
   * Sets the new style of this image.
   *
   * @example
   * const image = new Image("/home/homer/myself.png");
   * meta.setStyle(new ImageStyle());
   *
   * @param {IImageStyle} style The new style
   * @returns {Image} The `Image` object
   * @since 0.5.0
   */
  public setStyle(style: IImageStyle): Image {
    if (style instanceof ImageStyle) {
      this.style = style;
    }

    return this;
  }

  /**
   * Returns the style of this image.
   *
   * @example
   * const image = new Image("/home/homer/myself.png");
   * image.getStyle();                // default style
   * meta.setStyle(new ImageStyle());
   * image.getStyle();                // previously set style
   *
   * @returns {IImageStyle} The style of the image
   * @since 0.5.0
   */
  public getStyle(): IImageStyle {
    return this.style;
  }

  /** @inheritDoc */
  protected toXml(document: Document, parent: Element): void {
    new ImageWriter().write(document, parent, this);
  }
}
