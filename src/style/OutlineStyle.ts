import { IOutlineLevelStyle } from "./IOutlineLevelStyle";
import { IOutlineStyle } from "./IOutlineStyle";
import { OutlineLevelStyle } from "./OutlineLevelStyle";

export class OutlineStyle implements IOutlineStyle {
  private outlineLevelStyles: Map<number, OutlineLevelStyle>;

  public constructor() {
    this.outlineLevelStyles = new Map();

    for (let level = 1; level <= 10; level++) {
      this.outlineLevelStyles.set(level, new OutlineLevelStyle(level));
    }
  }

  /** @inheritDoc */
  public getOutlineLevelStyle(level: number): IOutlineLevelStyle | undefined {
    return this.outlineLevelStyles.get(level);
  }

  /**
   * Transforms the style element into Open Document Format.
   *
   * @param {Document} document The XML document
   * @param {Element} parent The parent node in the DOM (`office:styles`)
   * @since 0.6.0
   */
  public toXml(document: Document, parent: Element): void {
    const outlineStyleElement = document.createElement("text:outline-style");
    parent.appendChild(outlineStyleElement);

    outlineStyleElement.setAttribute("style:name", "Outline");

    for (let level = 1; level <= 10; level++) {
      const outlineLevelStyle = this.outlineLevelStyles.get(level);

      if (outlineLevelStyle === undefined) {
        continue;
      }

      outlineLevelStyle.toXml(document, outlineStyleElement);
    }
  }
}
