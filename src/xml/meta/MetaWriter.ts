import { Meta } from "../../api/meta/Meta";
import { OdfElementName } from "../../OdfElementName";
import { IWriter } from "../IWriter";
import { MetaElementName } from "./MetaElementName";

/**
 * XML writer for {@link Meta} elements
 *
 * @implements {IWriter}
 * @since 0.7.0
 */
export class MetaWriter implements IWriter<Meta> {
  /**
   * @inheritdoc
   * @since 0.7.0
   */
  public write(document: Document, root: Element, meta: Meta): void {
    const metaElement = document.createElement(OdfElementName.OfficeMeta);
    root.appendChild(metaElement);

    this.setGeneratorElement(document, metaElement, meta);
    this.setTitleElement(document, metaElement, meta);
    this.setDescriptionElement(document, metaElement, meta);
    this.setSubjectElement(document, metaElement, meta);
    this.setKeywordElements(document, metaElement, meta);
    this.setInitialCreatorElement(document, metaElement, meta);
    this.setCreatorElement(document, metaElement, meta);
    this.setPrintedByElement(document, metaElement, meta);
    this.setCreationDateElement(document, metaElement, meta);
    this.setDateElement(document, metaElement, meta);
    this.setPrintDateElement(document, metaElement, meta);
    this.setLanguageElement(document, metaElement, meta);
    this.setEditingCyclesElement(document, metaElement, meta);
  }

  /**
   * Sets the `meta:creation-date` element to the date and time this class was constructed.
   *
   * @param {Document} document The XML document
   * @param {Element} metaElement The meta element which will act as parent
   * @param {Meta} meta The metadata
   * @private
   */
  private setCreationDateElement(document: Document, metaElement: Element, meta: Meta): void {
    const creationDateElement = document.createElement(MetaElementName.MetaCreationDate);
    metaElement.appendChild(creationDateElement);
    creationDateElement.appendChild(document.createTextNode(meta.getCreationDate().toISOString()));
  }

  /**
   * Sets the `dc:creator` element if creator is set.
   *
   * @param {Document} document The XML document
   * @param {Element} metaElement The meta element which will act as parent
   * @param {Meta} meta The metadata
   * @private
   */
  private setCreatorElement(document: Document, metaElement: Element, meta: Meta): void {
    const creator = meta.getCreator();
    if (creator === undefined || creator.length === 0) {
      return;
    }

    const creatorElement = document.createElement(MetaElementName.DcCreator);
    metaElement.appendChild(creatorElement);
    creatorElement.appendChild(document.createTextNode(creator));
  }

  /**
   * Sets the `dc:date` element if date is set.
   *
   * @param {Document} document The XML document
   * @param {Element} metaElement The meta element which will act as parent
   * @param {Meta} meta The metadata
   * @private
   */
  private setDateElement(document: Document, metaElement: Element, meta: Meta): void {
    const date = meta.getDate();
    if (date === undefined) {
      return;
    }

    const dateElement = document.createElement(MetaElementName.DcDate);
    metaElement.appendChild(dateElement);
    dateElement.appendChild(document.createTextNode(date.toISOString()));
  }

  /**
   * Sets the `dc:description` element if description is set.
   *
   * @param {Document} document The XML document
   * @param {Element} metaElement The meta element which will act as parent
   * @param {Meta} meta The metadata
   * @private
   */
  private setDescriptionElement(document: Document, metaElement: Element, meta: Meta): void {
    const description = meta.getDescription();
    if (description === undefined || description.length === 0) {
      return;
    }

    const descriptionElement = document.createElement(MetaElementName.DcDescription);
    metaElement.appendChild(descriptionElement);
    descriptionElement.appendChild(document.createTextNode(description));
  }

  /**
   * Sets the `meta:editing-cycles` element to 1.
   *
   * @param {Document} document The XML document
   * @param {Element} metaElement The meta element which will act as parent
   * @param {Meta} meta The metadata
   * @private
   */
  private setEditingCyclesElement(document: Document, metaElement: Element, meta: Meta): void {
    const editingCyclesElement = document.createElement(MetaElementName.MetaEditingCycles);
    metaElement.appendChild(editingCyclesElement);
    editingCyclesElement.appendChild(document.createTextNode(meta.getEditingCycles().toString()));
  }

  /**
   * Sets the `meta:generator` element to the name and version of this library (`simple-odf/x.y.z`).
   *
   * @param {Document} document The XML document
   * @param {Element} metaElement The meta element which will act as parent
   * @param {Meta} meta The metadata
   * @private
   */
  private setGeneratorElement(document: Document, metaElement: Element, meta: Meta): void {
    const generatorElement = document.createElement(MetaElementName.MetaGenerator);
    metaElement.appendChild(generatorElement);
    generatorElement.appendChild(document.createTextNode(meta.getGenerator()));
  }

  /**
   * Sets the `meta:initial-creator` element to the current user.
   *
   * @param {Document} document The XML document
   * @param {Element} metaElement The meta element which will act as parent
   * @param {Meta} meta The metadata
   * @private
   */
  private setInitialCreatorElement(document: Document, metaElement: Element, meta: Meta): void {
    const initialCreator = meta.getInitialCreator();
    if (initialCreator === undefined || initialCreator.length === 0) {
      return;
    }

    const creatorElement = document.createElement(MetaElementName.MetaInitialCreator);
    metaElement.appendChild(creatorElement);
    creatorElement.appendChild(document.createTextNode(initialCreator));
  }

  /**
   * Sets the `meta:keyword` elements if any keyword is set.
   *
   * @param {Document} document The XML document
   * @param {Element} metaElement The meta element which will act as parent
   * @param {Meta} meta The metadata
   * @private
   */
  private setKeywordElements(document: Document, metaElement: Element, meta: Meta): void {
    meta.getKeywords().forEach((keyword: string) => {
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
   * @param {Meta} meta The metadata
   * @private
   */
  private setLanguageElement(document: Document, metaElement: Element, meta: Meta): void {
    const language = meta.getLanguage();
    if (language === undefined || language.length === 0) {
      return;
    }

    const languageElement = document.createElement(MetaElementName.DcLanguage);
    metaElement.appendChild(languageElement);
    languageElement.appendChild(document.createTextNode(language));
  }

  /**
   * Sets the `meta:print-date` element if print date is set.
   *
   * @param {Document} document The XML document
   * @param {Element} metaElement The meta element which will act as parent
   * @param {Meta} meta The metadata
   * @private
   */
  private setPrintDateElement(document: Document, metaElement: Element, meta: Meta): void {
    const printDate = meta.getPrintDate();
    if (printDate === undefined) {
      return;
    }

    const printDateElement = document.createElement(MetaElementName.MetaPrintDate);
    metaElement.appendChild(printDateElement);
    printDateElement.appendChild(document.createTextNode(printDate.toISOString()));
  }

  /**
   * Sets the `meta:printed-by` element if printing name is set.
   *
   * @param {Document} document The XML document
   * @param {Element} metaElement The meta element which will act as parent
   * @param {Meta} meta The metadata
   * @private
   */
  private setPrintedByElement(document: Document, metaElement: Element, meta: Meta): void {
    const printedBy = meta.getPrintedBy();
    if (printedBy === undefined || printedBy.length === 0) {
      return;
    }
    const printedByElement = document.createElement(MetaElementName.MetaPrintedBy);
    metaElement.appendChild(printedByElement);
    printedByElement.appendChild(document.createTextNode(printedBy));
  }

  /**
   * Sets the `dc:subject` element if subject is set.
   *
   * @param {Document} document The XML document
   * @param {Element} metaElement The meta element which will act as parent
   * @param {Meta} meta The metadata
   * @private
   */
  private setSubjectElement(document: Document, metaElement: Element, meta: Meta): void {
    const subject = meta.getSubject();
    if (subject === undefined || subject.length === 0) {
      return;
    }

    const subjectElement = document.createElement(MetaElementName.DcSubject);
    metaElement.appendChild(subjectElement);
    subjectElement.appendChild(document.createTextNode(subject));
  }

  /**
   * Sets the `dc:title` element if title is set.
   *
   * @param {Document} document The XML document
   * @param {Element} metaElement The meta element which will act as parent
   * @param {Meta} meta The metadata
   * @private
   */
  private setTitleElement(document: Document, metaElement: Element, meta: Meta): void {
    const title = meta.getTitle();
    if (title === undefined || title.length === 0) {
      return;
    }

    const titleElement = document.createElement(MetaElementName.DcTitle);
    metaElement.appendChild(titleElement);
    titleElement.appendChild(document.createTextNode(title));
  }
}
