import { OdfElement } from "../OdfElement";

/**
 * This class represents text in a paragraph.
 *
 * @since 0.3.0
 * @private
 */
export class OdfTextElement extends OdfElement {
  /**
   * Creates a text
   *
   * @param {string} text The text content
   * @since 0.3.0
   */
  public constructor(private text: string) {
    super();
  }

  /**
   * Sets the new text content.
   *
   * @param {string} text The new text content
   * @since 0.3.0
   */
  public setText(text: string): void {
    this.text = text;
  }

  /**
   * Returns the text content.
   *
   * @returns {string} The text content
   * @since 0.3.0
   */
  public getText(): string {
    return this.text;
  }
}
