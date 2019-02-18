import { OdfTextElement } from './OdfTextElement';

/**
 * This class represents a hyperlink in a paragraph.
 *
 * @example
 * document.getBody()
 *   .addParagraph('This is a ')
 *   .addHyperlink('link', 'https://example.com/');
 *
 * @since 0.3.0
 */
export class Hyperlink extends OdfTextElement {
  /**
   * Creates a hyperlink
   *
   * @example
   * new Hyperlink('My website', 'https://example.com/');
   *
   * @param {string} text The text content of the hyperlink
   * @param {string} uri The target URI of the hyperlink
   * @since 0.3.0
   */
  public constructor (text: string, private uri: string) {
    super(text);
  }

  /**
   * The `setURI()` method sets the target URI for this hyperlink.
   * If an illegal value is provided, the value will be ignored.
   *
   * @example
   * const hyperlink = new Hyperlink('My website', 'https://example.com/');
   * hyperlink.setURI('https://github.com'); // https://github.com
   * hyperlink.setURI('');                   // https://github.com
   *
   * @param {string} uri The target URI of this hyperlink
   * @returns {Hyperlink} The `Hyperlink` object
   * @since 0.3.0
   */
  public setURI (uri: string): Hyperlink {
    if (typeof uri === 'string' && uri.trim().length > 0) {
      this.uri = uri;
    }

    return this;
  }

  /**
   * The `getURI()` method returns the target URI of this hyperlink.
   *
   * @example
   * const hyperlink = new Hyperlink('My website', 'https://example.com/');
   * hyperlink.getURI();                     // https://example.com
   * hyperlink.setURI('https://github.com');
   * hyperlink.getURI();                     // https://github.com
   *
   * @returns {string} The target URI of this hyperlink
   * @since 0.3.0
   */
  public getURI (): string {
    return this.uri;
  }
}
