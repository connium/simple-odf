/**
 * This class represents the metadata of a document.
 *
 * It is used to set descriptive information about the document.
 *
 * @example
 * document.getMeta()
 *   .setCreator("Homer Simpson")
 *   .setTitle("Node.js meets ODF")
 *   .setSubject("ODF document creation")
 *   .addKeyword("Node.js")
 *   .addKeyword("Open Document Format")
 *   .setDescription("ODF text document created with Node.js powered by simple-odf")
 *   .setLanguage("en-US");
 *
 * @since 0.6.0
 */
export interface IMeta {
  /**
   * The `setCreator()` method sets the name of the person who last modified a document.
   *
   * The creator is initialized with the username of the currently effective user.
   *
   * If an empty string is given, `setCreator()` will set the creator to username of the currently effective user.
   *
   * @param {string} creator The name of the person who last modified a document
   * @returns {IMeta} The `IMeta` object
   * @since 0.6.0
   */
  setCreator(creator: string): IMeta;

  getCreator(): string;

  setDescription(description: string | undefined): IMeta;

  getDescription(): string | undefined;

  addKeyword(keyword: string): IMeta;

  removeKeyword(keyword: string): IMeta;

  getKeywords(): string[];

  setLanguage(language: string | undefined): IMeta;

  getLanguage(): string | undefined;

  setSubject(subject: string | undefined): IMeta;

  getSubject(): string | undefined;

  setTitle(title: string | undefined): IMeta;

  getTitle(): string | undefined;
}
