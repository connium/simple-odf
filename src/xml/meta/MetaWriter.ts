import { OdfElementName } from "../../OdfElementName";
import { MetaElementName } from "./MetaElementName";
import { Meta } from "../../api/meta/Meta";

export class MetaWriter {
  /**
   * Transforms the text style into Open Document Format.
   *
   * @param {Document} document The XML document
   * @param {Element} root The root node in the DOM
   * @since 0.6.0
   */
  public toXml(meta: Meta, document: Document, root: Element): void {
    const metaElement = document.createElement(OdfElementName.OfficeMeta);
    root.appendChild(metaElement);

    this.setGeneratorElement(meta, document, metaElement);
    this.setTitleElement(meta, document, metaElement);
    this.setDescriptionElement(meta, document, metaElement);
    this.setSubjectElement(meta, document, metaElement);
    this.setKeywordElements(meta, document, metaElement);
    this.setInitialCreatorElement(meta, document, metaElement);
    this.setCreatorElement(meta, document, metaElement);
    this.setPrintedByElement(meta, document, metaElement);
    this.setCreationDateElement(meta, document, metaElement);
    this.setDateElement(meta, document, metaElement);
    this.setPrintDateElement(meta, document, metaElement);
    this.setLanguageElement(meta, document, metaElement);
    this.setEditingCyclesElement(meta, document, metaElement);
  }

  /**
   * Sets the `meta:creation-date` element to the date and time this class was constructed.
   *
   * @param {Document} document The XML document
   * @param {Element} metaElement The meta element which will act as parent
   * @private
   */
  private setCreationDateElement(meta: Meta, document: Document, metaElement: Element): void {
    const creationDateElement = document.createElement(MetaElementName.MetaCreationDate);
    metaElement.appendChild(creationDateElement);
    creationDateElement.appendChild(document.createTextNode(meta.getCreationDate().toISOString()));
  }

  /**
   * Sets the `dc:creator` element if creator is set.
   *
   * @param {Document} document The XML document
   * @param {Element} metaElement The meta element which will act as parent
   * @private
   */
  private setCreatorElement(meta: Meta, document: Document, metaElement: Element): void {
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
   * @private
   */
  private setDateElement(meta: Meta, document: Document, metaElement: Element): void {
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
   * @private
   */
  private setDescriptionElement(meta: Meta, document: Document, metaElement: Element): void {
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
   * @private
   */
  private setEditingCyclesElement(meta: Meta, document: Document, metaElement: Element): void {
    const editingCyclesElement = document.createElement(MetaElementName.MetaEditingCycles);
    metaElement.appendChild(editingCyclesElement);
    editingCyclesElement.appendChild(document.createTextNode(meta.getEditingCycles().toString()));
  }

  /**
   * Sets the `meta:generator` element to the name and version of this library (`simple-odf/x.y.z`).
   *
   * @param {Document} document The XML document
   * @param {Element} metaElement The meta element which will act as parent
   * @private
   */
  private setGeneratorElement(meta: Meta, document: Document, metaElement: Element): void {
    const generatorElement = document.createElement(MetaElementName.MetaGenerator);
    metaElement.appendChild(generatorElement);
    generatorElement.appendChild(document.createTextNode(meta.getGenerator()));
  }

  /**
   * Sets the `meta:initial-creator` element to the current user.
   *
   * @param {Document} document The XML document
   * @param {Element} metaElement The meta element which will act as parent
   * @private
   */
  private setInitialCreatorElement(meta: Meta, document: Document, metaElement: Element): void {
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
   * @private
   */
  private setKeywordElements(meta: Meta, document: Document, metaElement: Element): void {
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
   * @private
   */
  private setLanguageElement(meta: Meta, document: Document, metaElement: Element): void {
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
   * @private
   */
  private setPrintDateElement(meta: Meta, document: Document, metaElement: Element): void {
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
   * @private
   */
  private setPrintedByElement(meta: Meta, document: Document, metaElement: Element): void {
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
   * @private
   */
  private setSubjectElement(meta: Meta, document: Document, metaElement: Element): void {
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
   * @private
   */
  private setTitleElement(meta: Meta, document: Document, metaElement: Element): void {
    const title = meta.getTitle();
    if (title === undefined || title.length === 0) {
      return;
    }

    const titleElement = document.createElement(MetaElementName.DcTitle);
    metaElement.appendChild(titleElement);
    titleElement.appendChild(document.createTextNode(title));
  }
}
