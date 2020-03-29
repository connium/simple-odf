import { OdfElement } from '../OdfElement';
import { AnchorType } from './AnchorType';

const DEFAULT_ANCHOR_TYPE = AnchorType.Paragraph;
const MINIMAL_SIZE = 1;

/**
 * This class represents an image in a paragraph.
 *
 * It is used to embed image data in BASE64 encoding.
 *
 * @example
 * document.getBody()
 *   .addParagraph()
 *   .addImage('/home/homer/myself.png')
 *   .setAnchorType(AnchorType.AsChar);
 *   .setSize(42, 23);
 *
 * @since 0.3.0
 */
export class Image extends OdfElement {
  private anchorType: AnchorType;
  private height: number | undefined;
  private width: number | undefined;

  /**
   * Creates an image
   *
   * @example
   * const image = new Image('/home/homer/myself.png');
   *
   * @param {string} path Path to the image file that should be embedded
   * @since 0.3.0
   */
  public constructor(private path: string) {
    super();

    this.anchorType = DEFAULT_ANCHOR_TYPE;
  }

  /**
   * The `setAnchorType()` method sets the anchor type setting of this image.
   *
   * @example
   * const image = new Image('/home/homer/myself.png');
   * image.setAnchorType(AnchorType.AsChar);
   *
   * @param {AnchorType} anchorType The anchor type setting
   * @returns {Image} The `Image` object
   * @since 0.9.0
   */
  public setAnchorType(anchorType: AnchorType): Image {
    this.anchorType = anchorType;

    return this;
  }

  /**
   * The `getAnchorType()` method returns the anchor type setting of this image.
   *
   * @example
   * const image = new Image('/home/homer/myself.png');
   * image.getAnchorType();                  // AnchorType.Paragraph
   * image.setAnchorType(AnchorType.AsChar);
   * image.getAnchorType();                  // AnchorType.AsChar
   *
   * @returns {AnchorType} The anchor type setting
   * @since 0.9.0
   */
  public getAnchorType(): AnchorType {
    return this.anchorType;
  }

  /**
   * The `setHeight` method sets the target height of the image in millimeter.
   *
   * If the provided value is too small, the height will be set to the minimal size `1`.
   *
   * @example
   * const image = new Image('/home/homer/myself.png');
   * image.setHeight(42);  // 42
   * image.setHeight(-23); // 1
   *
   * @param {number} height The target height of the image in millimeter
   * @returns {Image} The `Image` object
   * @since 0.9.0
   */
  public setHeight(height: number): Image {
    this.height = Math.max(height, MINIMAL_SIZE);

    return this;
  }

  /**
   * The `getHeight()` method returns the target height of the image or `undefined` if no height was set.
   *
   * @example
   * const image = new Image('/home/homer/myself.png');
   * image.getHeight();   // undefined
   * image.setHeight(42);
   * image.getHeight();   // 42
   *
   * @returns {number | undefined} The target height of the image in millimeter or `undefined` if no height was set
   * @since 0.9.0
   */
  public getHeight(): number | undefined {
    return this.height;
  }

  /**
   * The `getPath()` method returns the path to the image file that should be embedded.
   *
   * @example
   * const image = new Image('/home/homer/myself.png');
   * image.getPath(); // '/home/homer/myself.png'
   *
   * @returns {string} The path to the image file
   * @since 0.7.0
   */
  public getPath(): string {
    return this.path;
  }

  /**
   * The `setSize()` method sets the target width and height of the image.
   *
   * If any provided value is too small, it will be set to the minimal size `1`.
   *
   * @example
   * const image = new Image('/home/homer/myself.png');
   * image.setSize(42, 23);   // w:42, h:32
   * image.setWidth(42, -23); // w:42, h:1
   *
   * @param {number} width The target width of the image in millimeter
   * @param {number} height The target height of the image in millimeter
   * @returns {Image} The `Image` object
   * @since 0.9.0
   */
  public setSize(width: number, height: number): Image {
    this.setWidth(width);
    this.setHeight(height);

    return this;
  }

  /**
   * The `setWidth` method sets the target width of the image in millimeter.
   *
   * If the provided value is too small, the width will be set to the minimal size `1`.
   *
   * @example
   * const image = new Image('/home/homer/myself.png');
   * image.setWidth(42);  // 42
   * image.setWidth(-23); // 1
   *
   * @param {number} width The target width of the image in millimeter
   * @returns {Image} The `Image` object
   * @since 0.9.0
   */
  public setWidth(width: number): Image {
    this.width = Math.max(width, MINIMAL_SIZE);

    return this;
  }

  /**
   * The `getWidth()` method returns the target width of the image or `undefined` if no width was set.
   *
   * @example
   * const image = new Image('/home/homer/myself.png');
   * image.getWidth();   // undefined
   * image.setWidth(42);
   * image.getWidth();   // 42
   *
   * @returns {number | undefined} The target width of the image in millimeter or `undefined` if no width was set
   * @since 0.9.0
   */
  public getWidth(): number | undefined {
    return this.width;
  }
}
