/**
 * This class represents the metadata of a document.
 *
 * It is used to set descriptive information about the document.
 *
 * @example
 * const meta = document.getMeta();
 * meta.setCreator("Homer Simpson");
 * meta.setTitle("Node.js meets ODF");
 * meta.setSubject("ODF document creation");
 * meta.addKeyword("Node.js");
 * meta.addKeyword("Open Document Format");
 * meta.setDescription("ODF text document created with Node.js powered by simple-odf");
 * meta.setLanguage("en-US");
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
   * @since 0.6.0
   */
  setCreator(creator: string): void;

  getCreator(): string;

  setDescription(description: string | undefined): void;

  getDescription(): string | undefined;

  addKeyword(keyword: string): void;

  removeKeyword(keyword: string): void;

  getKeywords(): string[];

  setLanguage(language: string | undefined): void;

  getLanguage(): string | undefined;

  setSubject(subject: string | undefined): void;

  getSubject(): string | undefined;

  setTitle(title: string | undefined): void;

  getTitle(): string | undefined;
}
