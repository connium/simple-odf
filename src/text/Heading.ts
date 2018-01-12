import { OdfAttributeName } from "../OdfAttributeName";
import { OdfElementName } from "../OdfElementName";
import { Paragraph } from "./Paragraph";

/**
 * This class represents a heading.
 *
 * @since 0.1.0
 */
export class Heading extends Paragraph {
  public static DEFAULT_LEVEL = 1;
  private outlineLevel: number;

  /**
   * Creates a heading
   *
   * @param {string} [text] The optional text content of the heading
   * @param {number} headingLevel The outline level of this heading
   * @since 0.1.0
   */
  public constructor(text?: string, headingLevel = Heading.DEFAULT_LEVEL) {
    super(text);

    this.setHeadingLevel(headingLevel);
  }

  /**
   * Sets the outline level of this heading.
   *
   * @param {number} headingLevel The outline level
   * @since 0.1.0
   */
  public setHeadingLevel(headingLevel: number): void {
    if (headingLevel > Heading.DEFAULT_LEVEL) {
      this.outlineLevel = headingLevel;
    } else {
      this.outlineLevel = Heading.DEFAULT_LEVEL;
    }
  }

  /**
   * Returns the outline level of this heading.
   *
   * @returns {number} The outline level
   * @since 0.1.0
   */
  public getHeadingLevel(): number {
    return this.outlineLevel;
  }

  /** @inheritDoc */
  protected createElement(document: Document): Element {
    const heading = document.createElement(OdfElementName.TextHeading);
    heading.setAttribute(OdfAttributeName.TextOutlineLevel, this.outlineLevel.toString(10));

    return heading;
  }
}
