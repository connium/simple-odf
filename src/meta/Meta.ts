import { userInfo } from "os";
import { OdfElementName } from "../OdfElementName";
import { IMeta } from "./IMeta";
import { MetaElementName } from "./MetaElementName";

/**
 * This class represents the meta data of a document.
 *
 * @implements {IMeta}
 * @since 0.6.0
 */
export class Meta implements IMeta {
  private creationDate: number;
  private creator: string;
  private description: string | undefined;
  private language: string | undefined;
  private subject: string | undefined;
  private title: string | undefined;

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
    this.creator = userInfo().username;
  }

  /** @inheritDoc */
  public setCreator(creator: string): void {
    this.creator = creator.length > 0 ? creator : userInfo().username;
  }

  /** @inheritDoc */
  public getCreator(): string {
    return this.creator;
  }

  /** @inheritDoc */
  public setDescription(description: string | undefined): void {
    this.description = description;
  }

  /** @inheritDoc */
  public getDescription(): string | undefined {
    return this.description;
  }

  /** @inheritDoc */
  public setLanguage(language: string | undefined): void {
    if (language !== undefined && /^[a-z]{2}(-[A-Z]{2})?$/.test(language) === false) {
      return;
    }

    this.language = language;
  }

  /** @inheritDoc */
  public getLanguage(): string | undefined {
    return this.language;
  }

  /** @inheritDoc */
  public setSubject(subject: string | undefined): void {
    this.subject = subject;
  }

  /** @inheritDoc */
  public getSubject(): string | undefined {
    return this.subject;
  }

  /** @inheritDoc */
  public setTitle(title: string | undefined): void {
    this.title = title;
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
    const metaElement = document.createElement(OdfElementName.OfficeMeta);
    root.appendChild(metaElement);

    this.setCreatorElement(document, metaElement);
    this.setDateElement(document, metaElement);
    this.setDescriptionElement(document, metaElement);
    this.setLanguageElement(document, metaElement);
    this.setSubjectElement(document, metaElement);
    this.setTitleElement(document, metaElement);
    this.setCreationDateElement(document, metaElement);
    this.setEditingCyclesElement(document, metaElement);
    this.setGeneratorElement(document, metaElement);
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
    dateElement.appendChild(document.createTextNode(new Date().toISOString()));
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
   * Sets the `meta:editing-cycles` element to 1.
   *
   * @param {Document} document The XML document
   * @param {Element} metaElement The meta element which will act as parent
   */
  private setEditingCyclesElement(document: Document, metaElement: Element): void {
    const editingCyclesElement = document.createElement(MetaElementName.MetaEditingCycles);
    metaElement.appendChild(editingCyclesElement);
    editingCyclesElement.appendChild(document.createTextNode("1"));
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
    const packageJson = require("../../package.json");
    generatorElement.appendChild(document.createTextNode(`${packageJson.name}/${packageJson.version}`));
  }
}
