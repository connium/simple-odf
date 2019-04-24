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
  public constructor (private path: string) {
    super();

    this.anchorType = DEFAULT_ANCHOR_TYPE;
  }

  /**
   * Sets the anchor type setting of this image.
   *
   * @param {AnchorType} anchorType The anchor type setting
   * @since 0.9.0
   */
  public setAnchorType (anchorType: AnchorType): Image {
    this.anchorType = anchorType;

    return this;
  }

  /**
   * Returns the anchor type setting of this image.
   *
   * @returns {AnchorType} The anchor type setting
   * @since 0.9.0
   */
  public getAnchorType (): AnchorType {
    return this.anchorType;
  }

  /**
   * Sets the target height of the image.
   *
   * @param {number} height The target height of the image in millimeter
   * @since 0.9.0
   */
  public setHeight (height: number): Image {
    this.height = Math.max(height, MINIMAL_SIZE);

    return this;
  }

  /**
   * Returns the target height of the image or `undefined` if no height was set.
   *
   * @returns {number | undefined} The target height of the image in millimeter or `undefined` if no height was set
   * @since 0.9.0
   */
  public getHeight (): number | undefined {
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
  public getPath (): string {
    return this.path;
  }

  /**
   * Sets the target size of the image.
   *
   * @param {number} width The target width of the image in millimeter
   * @param {number} height The target height of the image in millimeter
   * @since 0.9.0
   */
  public setSize (width: number, height: number): Image {
    this.setWidth(width);
    this.setHeight(height);

    return this;
  }

  /**
   * Sets the target width of the image.
   *
   * @param {number} width The target width of the image in millimeter
   * @since 0.9.0
   */
  public setWidth (width: number): Image {
    this.width = Math.max(width, MINIMAL_SIZE);

    return this;
  }

  /**
   * Returns the target width of the image or `undefined` if no width was set.
   *
   * @returns {number | undefined} The target width of the image in millimeter or `undefined` if no width was set
   * @since 0.9.0
   */
  public getWidth (): number | undefined {
    return this.width;
  }
}
