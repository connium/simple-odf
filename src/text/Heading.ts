import { OdfAttributeName } from "../OdfAttributeName";
import { Paragraph } from "./Paragraph";
import { TextElementName } from "./TextElementName";

/**
 * This class represents a heading.
 *
 * @since 0.1.0
 */
export class Heading extends Paragraph {
  public static DEFAULT_LEVEL = 1;

  /**
   * Creates a heading
   *
   * @param {string} [text] The text content of the heading
   * @param {number} [level] The heading level; defaults to 1 if omitted
   * @since 0.1.0
   */
  public constructor(text?: string, private level = Heading.DEFAULT_LEVEL) {
    super(text);

    this.setLevel(level);
  }

  /**
   * Sets the level of this heading.
   *
   * @param {number} level The heading level
   * @since 0.1.0
   */
  public setLevel(level: number): void {
    this.level = level > Heading.DEFAULT_LEVEL ? level : Heading.DEFAULT_LEVEL;
  }

  /**
   * Returns the level of this heading.
   *
   * @returns {number} The heading level
   * @since 0.1.0
   */
  public getLevel(): number {
    return this.level;
  }

  /** @inheritDoc */
  protected createElement(document: Document): Element {
    const heading = document.createElement(TextElementName.TextHeading);
    heading.setAttribute(OdfAttributeName.TextOutlineLevel, this.level.toString(10));

    return heading;
  }
}
