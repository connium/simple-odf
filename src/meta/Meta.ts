import { userInfo } from "os";
import { OdfElementName } from "../OdfElementName";
import { MetaElementName } from "./MetaElementName";

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
export class Meta {
  private generator: string;
  private title: string | undefined;
  private description: string | undefined;
  private subject: string | undefined;
  private keywords: string[];
  private initialCreator: string | undefined;
  private creator: string | undefined;
  private printedBy: string | undefined;
  private creationDate: Date;
  private date: Date | undefined;
  private printDate: Date | undefined;
  // private template: any | undefined;
  // private autoReload: any | undefined;
  // private hyperlinkBehaviour: any | undefined;
  private language: string | undefined;
  private editingCycles: number; // nonNegativeInteger
  // private editingDuration: number | undefined;
  // private document-statistic: any | undefined;
  // private userDefined: any | undefined;

  /**
   * Creates a `Meta` instance that represents the metadata of a document.
   *
   * Initializes the creation date with the current time stamp
   * and sets the username of the currently effective user as initial creator.
   *
   * @example
   * const meta = new Meta();
   *
   * @since 0.6.0
   */
  public constructor() {
    const packageJson = require("../../package.json");

    this.generator = `${packageJson.name}/${packageJson.version}`;
    this.keywords = [];
    this.initialCreator = userInfo().username;
    this.creationDate = new Date();
    this.editingCycles = 1;
  }

  /**
   * The `setCreator()` method sets the name of the person who last modified the document.
   *
   * @example
   * const meta = new Meta();
   * meta.setCreator('Lisa Simpson'); // 'Lisa Simpson'
   * meta.setCreator(undefined);      // undefined
   *
   * @param {string | undefined} creator The name of the person who last modified a document
   *                                     or `undefined` to unset the creator
   * @returns {Meta} The `Meta` object
   * @since 0.6.0
   */
  public setCreator(creator: string | undefined): Meta {
    if (creator === undefined || typeof creator === "string") {
      this.creator = creator;
    }

    return this;
  }

  /**
   * The `getCreator()` method returns the name of the person who last modified the document.
   *
   * @example
   * const meta = new Meta();
   * meta.getCreator();               // undefined
   * meta.setCreator('Lisa Simpson');
   * meta.getCreator();               // 'Lisa Simpson'
   *
   * @returns {string | undefined} The name of the person who last modified the document
   *                               or `undefined` if the creator is not set
   * @since 0.6.0
   */
  public getCreator(): string | undefined {
    return this.creator;
  }

  /**
   * The `getCreationDate()` method returns the UTC timestamp specifying the date and time when a document was created.
   *
   * The creation date is initialized with the UTC timestamp of the moment the `Meta` instance was created.
   *
   * @example
   * const meta = new Meta(); // 2020-04-01 12:00:00
   * meta.getCreationDate();  // 1585742400000
   *
   * @returns {Date} A `Date` instance specifying the date and time when a document was created
   * @since 0.6.0
   */
  public getCreationDate(): Date {
    return this.creationDate;
  }

  /**
   * The `setDate()` method sets the date and time when the document was last modified.
   *
   * @example
   * const meta = new Meta();
   * meta.setDate(new Date()); // 2020-07-23 13:37:00
   *
   * @param {Date | undefined} date A `Date` instance specifying the date and time when the document was last modified
   *                                or `undefined` to unset the date
   * @returns {Meta} The `Meta` object
   * @since 0.6.0
   */
  public setDate(date: Date | undefined): Meta {
    if (date === undefined || (date instanceof Date && date.getTime() >= Date.now())) {
      this.date = date;
    }

    return this;
  }

  /**
   * The `getDate()` method returns the date and time when the document was last modified.
   *
   * @example
   * const meta = new Meta();
   * meta.getDate();           // undefined
   * meta.setDate(new Date()); // 2020-07-23 13:37:00
   * meta.getDate();           // 1595511420000
   *
   * @returns {Date | undefined} A `Date` instance specifying the date and time when the document was last modified
   *                             or `undefined` if the date is not set
   * @since 0.6.0
   */
  public getDate(): Date | undefined {
    return this.date;
  }

  /**
   * The `setDescription()` method sets the description of the document.
   *
   * @example
   * const meta = new Meta();
   * meta.setDescription('Memoirs of the yellow man wearing blue trousers');
   *
   * @param {string | undefined} description The description of the document or `undefined` to unset the description
   * @returns {Meta} The `Meta` object
   * @since 0.6.0
   */
  public setDescription(description: string | undefined): Meta {
    if (description === undefined || typeof description === "string") {
      this.description = description;
    }

    return this;
  }

  /**
   * The `getDescription()` method returns the description of the document.
   *
   * @example
   * const meta = new Meta();
   * meta.getDescription(); // undefined
   * meta.setDescription('Memoirs of the yellow man wearing blue trousers');
   * meta.getDescription(); // 'Memoirs of the yellow man wearing blue trousers'
   *
   * @returns {string | undefined} The description of the document or `undefined` if the description is not set
   * @since 0.6.0
   */
  public getDescription(): string | undefined {
    return this.description;
  }

  /**
   * The `getEditingCycles()` method returns the number of times the document has been edited.
   *
   * When the `Meta` instance is being created, the value is set to `1`.
   *
   * @example
   * const meta = new Meta();
   * meta.getEditingCycles(); // 1
   *
   * @returns {number} The number of times a document has been edited
   * @since 0.6.0
   */
  public getEditingCycles(): number {
    return this.editingCycles;
  }

  /**
   * The `getGenerator()` method returns a string that identifies **simple-odf** as the OpenDocument producer
   * that was used to create the document.
   * The string matches the definition for user-agents as defined in [RFC2616](http://www.ietf.org/rfc/rfc2616.txt).
   *
   * @example
   * const meta = new Meta();
   * meta.getGenerator(); // simple-odf/0.6.0
   *
   * @returns {string} A string that identifies **simple-odf** as the OpenDocument producer of this document
   * @since 0.6.0
   */
  public getGenerator(): string {
    return this.generator;
  }

  /**
   * The `setInitialCreator()` method sets the name of the initial creator of the document.
   *
   * The initial creator is initialized with the username of the currently effective user.
   *
   * @example
   * const meta = new Meta();                // 'Homer Simpson'
   * meta.setInitialCreator('Bart Simpson'); // 'Bart Simpson'
   * meta.setInitialCreator(undefined);      // undefined
   *
   * @param {string | undefined} initialCreator The name of the initial creator of the document
   *                                            or `undefined` to unset the initial creator
   * @returns {Meta} The `Meta` object
   * @since 0.6.0
   */
  public setInitialCreator(initialCreator: string | undefined): Meta {
    if (initialCreator === undefined || typeof initialCreator === "string") {
      this.initialCreator = initialCreator;
    }

    return this;
  }

  /**
   * The `getInitialCreator()` method returns the name of the initial creator of the document.
   *
   * @example
   * const meta = new Meta();
   * meta.getInitialCreator();               // 'Homer Simpson'
   * meta.setInitialCreator('Bart Simpson');
   * meta.getInitialCreator();               // 'Bart Simpson'
   *
   * @returns {string | undefined} The name of the initial creator of the document
   *                               or `undefined` if the initial creator is not set
   * @since 0.6.0
   */
  public getInitialCreator(): string | undefined {
    return this.initialCreator;
  }

  /**
   * The `addKeyword()` method adds a keyword pertaining to a document to the end of the keyword list.
   * If the given string includes comma characters, the string will be split and added as multiple key words.
   *
   * @example
   * const meta = new Meta();                       // []
   * meta.addKeyword('memoirs');                    // ['memoirs']
   * meta.addKeyword('Simpson,family,Springfield'); // ['memoirs', 'Simpson', 'family', 'Springfield']
   *
   * @param {string} keyword The keyword to add to the end of the keyword list
   * @returns {Meta} The `Meta` object
   * @since 0.6.0
   */
  public addKeyword(keyword: string): Meta {
    if (typeof keyword === "string") {
      this.keywords.push(...keyword.split(","));
    }

    return this;
  }

  /**
   * The `getKeywords()` method returns a new `Array` object that contains the keywords of the document.
   *
   * @example
   * const meta = new Meta();
   * meta.getKeywords();                     // []
   * meta.addKeyword('Simpson,Springfield');
   * meta.getKeywords();                     // ['Simpson', 'Springfield']
   *
   * @returns {string[]} A new `Array` object that contains the keywords of the document
   * @since 0.6.0
   */
  public getKeywords(): string[] {
    return Array.from(this.keywords);
  }

  /**
   * The `removeKeyword()` method removes the specified keyword from the keyword list.
   *
   * @example
   * const meta = new Meta();
   * meta.addKeyword('Simpson,Springfield'); // ['Simpson', 'Springfield']
   * meta.removeKeyword('Simpson');          // ['Springfield']
   *
   * @param {string} keyword The keyword to remove from the keyword list
   * @returns {Meta} The `Meta` object
   * @since 0.6.0
   */
  public removeKeyword(keyword: string): Meta {
    this.keywords = this.keywords.filter((existingKeyword: string) => existingKeyword !== keyword);

    return this;
  }

  /**
   * The `clearKeywords()` method removes all elements from the keyword list.
   *
   * @example
   * const meta = new Meta();
   * meta.addKeyword('Simpson,Springfield'); // ['Simpson', 'Springfield']
   * meta.clearKeywords();                   // []
   *
   * @returns {Meta} The `Meta` object
   * @since 0.6.0
   */
  public clearKeywords(): Meta {
    this.keywords = [];

    return this;
  }

  /**
   * The `setLanguage()` method sets default language of the document.
   * A language is a natural language identifier as defined by [RFC5646](http://www.ietf.org/rfc/rfc5646.txt).
   * If an illegal value is provided, the value will be ignored.
   *
   * @example
   * const meta = new Meta();     // undefined
   * meta.setLanguage('en-US');   // 'en-US'
   * meta.setLanguage('illegal'); // 'en-US'
   *
   * @param {string | undefined} language The default language of the document
   *                                      or `undefined` to unset the default language
   * @returns {Meta} The `Meta` object
   * @since 0.6.0
   */
  public setLanguage(language: string | undefined): Meta {
    if (language === undefined || /^[a-z]{2}(-[A-Z]{2})?$/.test(language) === true) {
      this.language = language;
    }

    return this;
  }

  /**
   * The `getLanguage()` method returns the default language of the document.
   *
   * @example
   * const meta = new Meta();
   * meta.getLanguage();        // undefined
   * meta.setLanguage('en-US');
   * meta.getLanguage();        // 'en-US'
   *
   * @returns {string | undefined} The default language of the document
   *                               or `undefined` if the default language is not set
   * @since 0.6.0
   */
  public getLanguage(): string | undefined {
    return this.language;
  }

  /**
   * The `setPrintDate()` method sets the date and time when the document was last printed.
   *
   * @example
   * const meta = new Meta();
   * meta.setPrintDate(new Date()); // 2020-07-23 13:37:00
   *
   * @param {Date | undefined} printDate A `Date` instance specifying the date and time when the document was last
   *                                     printed or `undefined` to unset the print date
   * @returns {Meta} The `Meta` object
   * @since 0.6.0
   */
  public setPrintDate(printDate: Date | undefined): Meta {
    if (printDate === undefined || (printDate instanceof Date && printDate.getTime() >= Date.now())) {
      this.printDate = printDate;
    }

    return this;
  }

  /**
   * The `getPrintDate()` method returns the date and time when the document was last printed.
   *
   * @example
   * const meta = new Meta();
   * meta.getPrintDate();           // undefined
   * meta.setPrintDate(new Date()); // 2020-07-23 13:37:00
   * meta.getPrintDate();           // 1595511420000
   *
   * @returns {Date | undefined} A `Date` instance specifying the date and time when the document was last printed
   *                             or `undefined` if the print date is not set
   * @since 0.6.0
   */
  public getPrintDate(): Date | undefined {
    return this.printDate;
  }

  /**
   * The `setPrintedBy()` method sets the name of the last person who printed the document.
   *
   * @example
   * const meta = new Meta();
   * meta.setPrintedBy('Marge Simpson'); // 'Marge Simpson'
   * meta.setPrintedBy(undefined);       // undefined
   *
   * @param {string | undefined} printedBy The name of the last person who printed the document
   *                                       or `undefined` to unset the name of the person
   * @returns {Meta} The `Meta` object
   * @since 0.6.0
   */
  public setPrintedBy(printedBy: string | undefined): Meta {
    if (printedBy === undefined || typeof printedBy === "string") {
      this.printedBy = printedBy;
    }

    return this;
  }

  /**
   * The `getPrintedBy()` method returns the name of the last person who printed the document.
   *
   * @example
   * const meta = new Meta();
   * meta.getPrintedBy();                // undefined
   * meta.setPrintedBy('Marge Simpson');
   * meta.getPrintedBy();                // 'Marge Simpson'
   *
   * @returns {string | undefined} The name of the last person who printed the document
   *                               or `undefined` if the name of the person is not set
   * @since 0.6.0
   */
  public getPrintedBy(): string | undefined {
    return this.printedBy;
  }

  /**
   * The `setSubject()` method sets the subject of the document.
   *
   * @example
   * const meta = new Meta();
   * meta.setSubject('Simpsons'); // 'Simpsons'
   * meta.setSubject(undefined);  // undefined
   *
   * @param {string | undefined} subject The subject of the document or `undefined` to unset the subject
   * @returns {Meta} The `Meta` object
   * @since 0.6.0
   */
  public setSubject(subject: string | undefined): Meta {
    if (subject === undefined || typeof subject === "string") {
      this.subject = subject;
    }

    return this;
  }

  /**
   * The `getSubject()` method returns the subject of the document.
   *
   * @example
   * const meta = new Meta();
   * meta.getSubject();           // undefined
   * meta.setSubject('Simpsons');
   * meta.getSubject();           // 'Simpsons'
   *
   * @returns {string | undefined} The subject of the document or `undefined` if the subject is not set
   * @since 0.6.0
   */
  public getSubject(): string | undefined {
    return this.subject;
  }

  /**
   * The `setTitle()` method sets the title of the document.
   *
   * @example
   * const meta = new Meta();
   * meta.setTitle('Memoirs of Homer Simpson'); // 'Memoirs of Homer Simpson'
   * meta.setTitle(undefined);                  // undefined
   *
   * @param {string | undefined} title The title of the document or `undefined` to unset the title
   * @returns {Meta} The `Meta` object
   * @since 0.6.0
   */
  public setTitle(title: string | undefined): Meta {
    if (title === undefined || typeof title === "string") {
      this.title = title;
    }

    return this;
  }

  /**
   * The `getTitle()` method returns the title of the document.
   *
   * @example
   * const meta = new Meta();
   * meta.getTitle();                           // undefined
   * meta.setTitle('Memoirs of Homer Simpson');
   * meta.getTitle();                           // 'Memoirs of Homer Simpson'
   *
   * @returns {string | undefined} The title of the document or `undefined` if the title is not set
   * @since 0.6.0
   */
  public getTitle(): string | undefined {
    return this.title;
  }

  /**
   * Transforms the text style into Open Document Format.
   *
   * @param {Document} document The XML document
   * @param {Element} root The root node in the DOM
   * @since 0.6.0
   */
  public toXml(document: Document, root: Element): void {
    const metaElement = document.createElement(OdfElementName.OfficeMeta);
    root.appendChild(metaElement);

    this.setGeneratorElement(document, metaElement);
    this.setTitleElement(document, metaElement);
    this.setDescriptionElement(document, metaElement);
    this.setSubjectElement(document, metaElement);
    this.setKeywordElements(document, metaElement);
    this.setInitialCreatorElement(document, metaElement);
    this.setCreatorElement(document, metaElement);
    this.setPrintedByElement(document, metaElement);
    this.setCreationDateElement(document, metaElement);
    this.setDateElement(document, metaElement);
    this.setPrintDateElement(document, metaElement);
    this.setLanguageElement(document, metaElement);
    this.setEditingCyclesElement(document, metaElement);
  }

  /**
   * Sets the `meta:creation-date` element to the date and time this class was constructed.
   *
   * @param {Document} document The XML document
   * @param {Element} metaElement The meta element which will act as parent
   * @private
   */
  private setCreationDateElement(document: Document, metaElement: Element): void {
    const creationDateElement = document.createElement(MetaElementName.MetaCreationDate);
    metaElement.appendChild(creationDateElement);
    creationDateElement.appendChild(document.createTextNode(this.creationDate.toISOString()));
  }

  /**
   * Sets the `dc:creator` element if creator is set.
   *
   * @param {Document} document The XML document
   * @param {Element} metaElement The meta element which will act as parent
   * @private
   */
  private setCreatorElement(document: Document, metaElement: Element): void {
    if (this.creator === undefined || this.creator.length === 0) {
      return;
    }

    const creatorElement = document.createElement(MetaElementName.DcCreator);
    metaElement.appendChild(creatorElement);
    creatorElement.appendChild(document.createTextNode(this.creator));
  }

  /**
   * Sets the `dc:date` element if date is set.
   *
   * @param {Document} document The XML document
   * @param {Element} metaElement The meta element which will act as parent
   * @private
   */
  private setDateElement(document: Document, metaElement: Element): void {
    if (this.date === undefined) {
      return;
    }

    const dateElement = document.createElement(MetaElementName.DcDate);
    metaElement.appendChild(dateElement);
    dateElement.appendChild(document.createTextNode(this.date.toISOString()));
  }

  /**
   * Sets the `dc:description` element if description is set.
   *
   * @param {Document} document The XML document
   * @param {Element} metaElement The meta element which will act as parent
   * @private
   */
  private setDescriptionElement(document: Document, metaElement: Element): void {
    if (this.description === undefined || this.description.length === 0) {
      return;
    }

    const descriptionElement = document.createElement(MetaElementName.DcDescription);
    metaElement.appendChild(descriptionElement);
    descriptionElement.appendChild(document.createTextNode(this.description));
  }

  /**
   * Sets the `meta:editing-cycles` element to 1.
   *
   * @param {Document} document The XML document
   * @param {Element} metaElement The meta element which will act as parent
   * @private
   */
  private setEditingCyclesElement(document: Document, metaElement: Element): void {
    const editingCyclesElement = document.createElement(MetaElementName.MetaEditingCycles);
    metaElement.appendChild(editingCyclesElement);
    editingCyclesElement.appendChild(document.createTextNode(this.editingCycles.toString()));
  }

  /**
   * Sets the `meta:generator` element to the name and version of this library (`simple-odf/x.y.z`).
   *
   * @param {Document} document The XML document
   * @param {Element} metaElement The meta element which will act as parent
   * @private
   */
  private setGeneratorElement(document: Document, metaElement: Element): void {
    const generatorElement = document.createElement(MetaElementName.MetaGenerator);
    metaElement.appendChild(generatorElement);
    generatorElement.appendChild(document.createTextNode(this.generator));
  }

  /**
   * Sets the `meta:initial-creator` element to the current user.
   *
   * @param {Document} document The XML document
   * @param {Element} metaElement The meta element which will act as parent
   * @private
   */
  private setInitialCreatorElement(document: Document, metaElement: Element): void {
    if (this.initialCreator === undefined || this.initialCreator.length === 0) {
      return;
    }

    const creatorElement = document.createElement(MetaElementName.MetaInitialCreator);
    metaElement.appendChild(creatorElement);
    creatorElement.appendChild(document.createTextNode(this.initialCreator));
  }

  /**
   * Sets the `meta:keyword` elements if any keyword is set.
   *
   * @param {Document} document The XML document
   * @param {Element} metaElement The meta element which will act as parent
   * @private
   */
  private setKeywordElements(document: Document, metaElement: Element): void {
    if (this.keywords.length === 0) {
      return;
    }

    this.keywords.forEach((keyword: string) => {
      const subjectElement = document.createElement(MetaElementName.MetaKeyword);
      metaElement.appendChild(subjectElement);
      subjectElement.appendChild(document.createTextNode(keyword));
    });
  }

  /**
   * Sets the `dc:language` element if language is set.
   *
   * @param {Document} document The XML document
   * @param {Element} metaElement The meta element which will act as parent
   * @private
   */
  private setLanguageElement(document: Document, metaElement: Element): void {
    if (this.language === undefined || this.language.length === 0) {
      return;
    }

    const languageElement = document.createElement(MetaElementName.DcLanguage);
    metaElement.appendChild(languageElement);
    languageElement.appendChild(document.createTextNode(this.language));
  }

  /**
   * Sets the `meta:print-date` element if print date is set.
   *
   * @param {Document} document The XML document
   * @param {Element} metaElement The meta element which will act as parent
   * @private
   */
  private setPrintDateElement(document: Document, metaElement: Element): void {
    if (this.printDate === undefined) {
      return;
    }

    const printDateElement = document.createElement(MetaElementName.MetaPrintDate);
    metaElement.appendChild(printDateElement);
    printDateElement.appendChild(document.createTextNode(this.printDate.toISOString()));
  }

  /**
   * Sets the `meta:printed-by` element if printing name is set.
   *
   * @param {Document} document The XML document
   * @param {Element} metaElement The meta element which will act as parent
   * @private
   */
  private setPrintedByElement(document: Document, metaElement: Element): void {
    if (this.printedBy === undefined || this.printedBy.length === 0) {
      return;
    }
    const printedByElement = document.createElement(MetaElementName.MetaPrintedBy);
    metaElement.appendChild(printedByElement);
    printedByElement.appendChild(document.createTextNode(this.printedBy));
  }

  /**
   * Sets the `dc:subject` element if subject is set.
   *
   * @param {Document} document The XML document
   * @param {Element} metaElement The meta element which will act as parent
   * @private
   */
  private setSubjectElement(document: Document, metaElement: Element): void {
    if (this.subject === undefined || this.subject.length === 0) {
      return;
    }

    const subjectElement = document.createElement(MetaElementName.DcSubject);
    metaElement.appendChild(subjectElement);
    subjectElement.appendChild(document.createTextNode(this.subject));
  }

  /**
   * Sets the `dc:title` element if title is set.
   *
   * @param {Document} document The XML document
   * @param {Element} metaElement The meta element which will act as parent
   * @private
   */
  private setTitleElement(document: Document, metaElement: Element): void {
    if (this.title === undefined || this.title.length === 0) {
      return;
    }

    const titleElement = document.createElement(MetaElementName.DcTitle);
    metaElement.appendChild(titleElement);
    titleElement.appendChild(document.createTextNode(this.title));
  }
}
