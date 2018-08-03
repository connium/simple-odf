import { userInfo } from "os";
import { OdfElementName } from "../OdfElementName";
import { IMeta } from "./IMeta";
import { MetaElementName } from "./MetaElementName";

/**
 * This class represents the metadata of a document.
 *
 * @implements {IMeta}
 * @since 0.6.0
 */
export class Meta implements IMeta {
  /**
   * Trims the given text and replaces it with the specified default value if it is `undefined` or empty.
   *
   * @param {string | undefined} text The text to sanitize
   * @param {string} defaultValue The default value to use if the given text is `undefined` or empty
   * @returns {string} The sanitized string
   */
  private static sanitizeString(text: string | undefined, defaultValue: string): string {
    if (text === undefined) {
      return defaultValue;
    }

    const trimmedText = text.trim();

    return trimmedText.length > 0 ? trimmedText : defaultValue;
  }

  /**
   * Trims the given text and returns `undefined` if it is `undefined` or empty.
   *
   * @param {string | undefined} text The text to sanitize
   * @returns {string | undefined} The sanitized string or `undefined` if the given text is empty
   */
  private static sanitizeOptionalString(text: string | undefined): string | undefined {
    if (text === undefined) {
      return undefined;
    }

    const trimmedText = text.trim();

    return trimmedText.length > 0 ? trimmedText : undefined;
  }

  private creationDate: number;
  private creator: string;
  private date: number;
  private description: string | undefined;
  private editingCycles: number;
  private generator: string;
  private initialCreator: string;
  private keywords: string[];
  private language: string | undefined;
  private subject: string | undefined;
  private title: string | undefined;
  // private printedBy: string;
  // private printDate: number;
  // private template: any;
  // private hyperlinkBehaviour: any;
  // private autoReload: any;
  // private editingDuration: any;

  /**
   * Constructor.
   *
   * Initializes the creation date with the current time stamp
   * and sets username of the currently effective user as creator.
   *
   * @since 0.6.0
   */
  public constructor() {
    this.creationDate = Date.now();
    this.creator = this.getCurrentUser();
    this.date = Date.now();
    this.editingCycles = 1;

    const packageJson = require("../../package.json");
    this.generator = `${packageJson.name}/${packageJson.version}`;
    this.initialCreator = this.getCurrentUser();
    this.keywords = [];
  }

  /** @inheritDoc */
  public setCreator(creator: string): IMeta {
    this.creator = Meta.sanitizeString(creator, this.getCurrentUser());

    return this;
  }

  /** @inheritDoc */
  public getCreator(): string {
    return this.creator;
  }

  /** @inheritDoc */
  public setDescription(description: string | undefined): IMeta {
    this.description = Meta.sanitizeOptionalString(description);

    return this;
  }

  /** @inheritDoc */
  public getDescription(): string | undefined {
    return this.description;
  }

  /** @inheritDoc */
  public addKeyword(keyword: string): IMeta {
    const sanitizedKeyword = Meta.sanitizeOptionalString(keyword);

    if (sanitizedKeyword !== undefined) {
      this.keywords.push(sanitizedKeyword);
    }

    return this;
  }

  /** @inheritDoc */
  public removeKeyword(keyword: string): IMeta {
    this.keywords = this.keywords.filter((existingKeyword: string) => existingKeyword !== keyword);

    return this;
  }

  /** @inheritDoc */
  public getKeywords(): string[] {
    return Array.from(this.keywords);
  }

  /** @inheritDoc */
  public setLanguage(language: string | undefined): IMeta {
    if (language === undefined || /^[a-z]{2}(-[A-Z]{2})?$/.test(language) === false) {
      this.language = language;
    }

    return this;
  }

  /** @inheritDoc */
  public getLanguage(): string | undefined {
    return this.language;
  }

  /** @inheritDoc */
  public setSubject(subject: string | undefined): IMeta {
    this.subject = Meta.sanitizeOptionalString(subject);

    return this;
  }

  /** @inheritDoc */
  public getSubject(): string | undefined {
    return this.subject;
  }

  /** @inheritDoc */
  public setTitle(title: string | undefined): IMeta {
    this.title = Meta.sanitizeOptionalString(title);

    return this;
  }

  /** @inheritDoc */
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
    this.date = Date.now();

    const metaElement = document.createElement(OdfElementName.OfficeMeta);
    root.appendChild(metaElement);

    this.setInitialCreatorElement(document, metaElement);
    this.setCreationDateElement(document, metaElement);

    this.setCreatorElement(document, metaElement);
    this.setDateElement(document, metaElement);
    this.setEditingCyclesElement(document, metaElement);

    this.setTitleElement(document, metaElement);
    this.setSubjectElement(document, metaElement);
    this.setKeywordElements(document, metaElement);
    this.setDescriptionElement(document, metaElement);
    this.setLanguageElement(document, metaElement);

    this.setGeneratorElement(document, metaElement);
  }

  /**
   * Returns the user name of the current active user.
   *
   * @returns {string} The name of the current active user
   */
  private getCurrentUser(): string {
    return userInfo().username;
  }

  /**
   * Sets the `meta:initial-creator` element to the current user.
   *
   * @param {Document} document The XML document
   * @param {Element} metaElement The meta element which will act as parent
   */
  private setInitialCreatorElement(document: Document, metaElement: Element): void {
    const creatorElement = document.createElement(MetaElementName.MetaInitialCreator);
    metaElement.appendChild(creatorElement);
    creatorElement.appendChild(document.createTextNode(this.initialCreator));
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
    const creatorElement = document.createElement(MetaElementName.DcCreator);
    metaElement.appendChild(creatorElement);
    creatorElement.appendChild(document.createTextNode(this.creator));
  }

  /**
   * Sets the `dc:date` element to the current date and time.
   *
   * @param {Document} document The XML document
   * @param {Element} metaElement The meta element which will act as parent
   */
  private setDateElement(document: Document, metaElement: Element): void {
    const dateElement = document.createElement(MetaElementName.DcDate);
    metaElement.appendChild(dateElement);
    dateElement.appendChild(document.createTextNode(new Date(this.date).toISOString()));
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
}
