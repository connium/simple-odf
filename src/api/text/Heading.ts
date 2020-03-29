import { Paragraph } from './Paragraph';

/**
 * This class represents a heading in a document.
 *
 * It is used to structure a document into multiple sections.
 * A chapter or section begins with a heading and extends to the next heading at the same or higher level.
 *
 * @example
 * document.getBody().addHeading('First Headline', 1);
 *
 * @example
 * document.getBody().addHeading()
 *   .setText('Second Headline')
 *   .setLevel(2);
 *
 * @extends {Paragraph}
 * @since 0.1.0
 */
export class Heading extends Paragraph {
  public static DEFAULT_LEVEL = 1;

  /**
   * Creates a `Heading` instance that represents a heading in a document.
   *
   * @example
   * new Heading('First Headline', 1);
   * new Heading('First Headline');
   * new Heading();
   *
   * @param {string} [text=''] The text content of the heading; defaults to an empty string if omitted
   * @param {number} [level=1] The level of the heading, starting with `1`; defaults to `1` if omitted
   * @since 0.1.0
   */
  public constructor(text?: string, private level = Heading.DEFAULT_LEVEL) {
    super(text);

    this.setLevel(level);
  }

  /**
   * The `setLevel()` method sets the level of the heading, starting with `1`.
   * If an illegal value is provided, then the heading is assumed to be at level `1`.
   *
   * @param {number} level The level of the heading, starting with `1`
   * @returns {Heading} The `Heading` object
   * @since 0.1.0
   */
  public setLevel(level: number): Heading {
    this.level = level > Heading.DEFAULT_LEVEL ? level : Heading.DEFAULT_LEVEL;

    return this;
  }

  /**
   * The `getLevel()` method returns the level of the heading.
   *
   * @returns {number} The level of the heading
   * @since 0.1.0
   */
  public getLevel(): number {
    return this.level;
  }
}
