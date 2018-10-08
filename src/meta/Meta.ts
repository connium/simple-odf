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
  private creationDate: number;
  private date: number | undefined;
  private printDate: number | undefined;
  // private template: any | undefined;
  // private autoReload: any | undefined;
  // private hyperlinkBehaviour: any | undefined;
  private language: string | undefined;
  private editingCycles: number; // nonNegativeInteger
  // private editingDuration: number | undefined;
  // private document-statistic: any | undefined;
  // private userDefined: any | undefined;

  /**
   * Constructor.
   *
   * Initializes the creation date with the current time stamp
   * and sets the username of the currently effective user as creator.
   *
   * @since 0.6.0
   */
  public constructor() {
    const packageJson = require("../../package.json");
    const currentUsername = userInfo().username;

    this.generator = `${packageJson.name}/${packageJson.version}`;
    this.keywords = [];
    this.initialCreator = currentUsername;
    this.creator = currentUsername;
    this.creationDate = Date.now();
    this.date = Date.now();
    this.editingCycles = 1;
  }

  /**
   * The `setCreator()` method sets the name of the person who last modified the document.
   *
   * The creator is initialized with the username of the currently effective user.
   *
   * @param {string | undefined} creator The name of the person who last modified a document
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
   * @returns {string | undefined}
   * @since 0.6.0
   */
  public getCreator(): string | undefined {
    return this.creator;
  }

  /**
   * @returns {number}
   * @since 0.6.0
   */
  public getCreationDate(): number {
    return this.creationDate;
  }

  /**
   * @param {number | undefined} date
   * @returns {Meta} The `Meta` object
   * @since 0.6.0
   */
  public setDate(date: number | undefined): Meta {
    if (date === undefined || (typeof date === "number" && date >= Date.now())) {
      this.date = date;
    }

    return this;
  }

  /**
   * @returns {number | undefined}
   * @since 0.6.0
   */
  public getDate(): number | undefined {
    return this.date;
  }

  /**
   * @param {string | undefined} description
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
   * @returns {string | undefined}
   * @since 0.6.0
   */
  public getDescription(): string | undefined {
    return this.description;
  }

  /**
   * @returns {number}
   * @since 0.6.0
   */
  public getEditingCycles(): number {
    return this.editingCycles;
  }

  /**
   * @returns {string}
   * @since 0.6.0
   */
  public getGenerator(): string {
    return this.generator;
  }

  /**
   * @param {string | undefined} initialCreator
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
   * @returns {string | undefined}
   * @since 0.6.0
   */
  public getInitialCreator(): string | undefined {
    return this.initialCreator;
  }

  /**
   * @param {string} keyword
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
   * @returns {string[]}
   * @since 0.6.0
   */
  public getKeywords(): string[] {
    return Array.from(this.keywords);
  }

  /**
   * @param {string} keyword
   * @returns {Meta} The `Meta` object
   * @since 0.6.0
   */
  public removeKeyword(keyword: string): Meta {
    this.keywords = this.keywords.filter((existingKeyword: string) => existingKeyword !== keyword);

    return this;
  }

  /**
   * @returns {Meta} The `Meta` object
   * @since 0.6.0
   */
  public clearKeywords(): Meta {
    this.keywords = [];

    return this;
  }

  /**
   * @param {string | undefined} language
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
   * @returns {string | undefined}
   * @since 0.6.0
   */
  public getLanguage(): string | undefined {
    return this.language;
  }

  /**
   * @param {number | undefined} printDate
   * @returns {Meta} The `Meta` object
   * @since 0.6.0
   */
  public setPrintDate(printDate: number | undefined): Meta {
    if (printDate === undefined || (typeof printDate === "number" && printDate >= Date.now())) {
      this.printDate = printDate;
    }

    return this;
  }

  /**
   * @returns {number | undefined}
   * @since 0.6.0
   */
  public getPrintDate(): number | undefined {
    return this.printDate;
  }

  /**
   * @param {string | undefined} printedBy
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
   * @returns {string | undefined}
   * @since 0.6.0
   */
  public getPrintedBy(): string | undefined {
    return this.printedBy;
  }

  /**
   * @param {string | undefined} subject
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
   * @returns {string | undefined}
   * @since 0.6.0
   */
  public getSubject(): string | undefined {
    return this.subject;
  }

  /**
   * @param {string | undefined} title
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
   * @returns {string | undefined}
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
   */
  private setCreationDateElement(document: Document, metaElement: Element): void {
    const creationDateElement = document.createElement(MetaElementName.MetaCreationDate);
    metaElement.appendChild(creationDateElement);
    creationDateElement.appendChild(document.createTextNode(new Date(this.creationDate).toISOString()));
  }

  /**
   * Sets the `dc:creator` element if creator is set.
   *
   * @param {Document} document The XML document
   * @param {Element} metaElement The meta element which will act as parent
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
   */
  private setDateElement(document: Document, metaElement: Element): void {
    if (this.date === undefined) {
      return;
    }

    const dateElement = document.createElement(MetaElementName.DcDate);
    metaElement.appendChild(dateElement);
    dateElement.appendChild(document.createTextNode(new Date(this.date).toISOString()));
  }

  /**
   * Sets the `dc:description` element if description is set.
   *
   * @param {Document} document The XML document
   * @param {Element} metaElement The meta element which will act as parent
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
   */
  private setPrintDateElement(document: Document, metaElement: Element): void {
    if (this.printDate === undefined) {
      return;
    }

    const printDateElement = document.createElement(MetaElementName.MetaPrintDate);
    metaElement.appendChild(printDateElement);
    printDateElement.appendChild(document.createTextNode(new Date(this.printDate).toISOString()));
  }

  /**
   * Sets the `meta:printed-by` element if printing name is set.
   *
   * @param {Document} document The XML document
   * @param {Element} metaElement The meta element which will act as parent
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
