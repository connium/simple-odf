import { OdfAttributeName } from "../OdfAttributeName";
import { OdfElementName } from "../OdfElementName";
import { Paragraph } from "./Paragraph";

/**
 * This class represents a headline.
 * @since 0.1.0
 */
export class Headline extends Paragraph {
  public static DEFAULT_LEVEL = 1;
  private outlineLevel: number;

  /**
   * TODO
   * @param text TODO
   * @param headingLevel TODO
   * @since 0.1.0
   */
  public constructor(text?: string, headingLevel = Headline.DEFAULT_LEVEL) {
    super(text);

    this.setHeadingLevel(headingLevel);
  }

  /**
   * Sets the outline level of this headline.
   *
   * @param {number} headingLevel The outline level
   * @since 0.1.0
   */
  public setHeadingLevel(headingLevel: number): void {
    if (headingLevel > Headline.DEFAULT_LEVEL) {
      this.outlineLevel = headingLevel;
    } else {
      this.outlineLevel = Headline.DEFAULT_LEVEL;
    }
  }

  /**
   * Returns the outline level of this headline.
   *
   * @returns {number} The outline level
   * @since 0.1.0
   */
  public getHeadingLevel(): number {
    return this.outlineLevel;
  }

  /** @inheritDoc */
  protected createElement(document: Document): Element {
    const headline = document.createElement(OdfElementName.TextHeadline);
    headline.setAttribute(OdfAttributeName.TextOutlineLevel, this.outlineLevel.toString(10));

    return headline;
  }
}
