import { createHash } from 'crypto';
import { Style, StyleFamily, ParagraphStyle } from '../style';
import { IStyles } from './IStyles';

interface IStyleInformation {
  style: Style;
  name: string;
}

export class AutomaticStyles implements IStyles {
  private styles: Map<string, IStyleInformation>;
  private paragraphStyleCounter: number;

  public constructor () {
    this.styles = new Map();
    this.paragraphStyleCounter = 0;
  }

  public add (style: Style): void {
    const hash = this.getHash(style);

    if (this.styles.has(hash)) {
      return;
    }

    this.styles.set(hash, { style: style, name: `P${++this.paragraphStyleCounter}` });
  }

  public getName (style: Style): string {
    const hash = this.getHash(style);
    const styleInformation = this.styles.get(hash);

    if (styleInformation === undefined) {
      throw new Error(`Unknown style [${style}}]`);
    }

    return styleInformation.name;
  }

  /** @inheritdoc */
  public getAll (): Style[] {
    return Array.from(this.styles.values())
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((styleInformation) => styleInformation.style);
  }

  private getHash (style: Style): string {
    const hash = createHash('md5');

    hash.update(style.getClass() || '');
    hash.update(style.getFamily());

    if (style.getFamily() === StyleFamily.Paragraph) {
      const paragraphStyle = style as ParagraphStyle;

      // paragraph properties
      hash.update(paragraphStyle.getHorizontalAlignment());
      hash.update(paragraphStyle.getKeepTogether() ? 'kt' : '');
      hash.update(paragraphStyle.getPageBreakBefore() ? 'pbb' : '');
      paragraphStyle.getTabStops().forEach((tabStop) => {
        hash.update(`tab${tabStop.getPosition()}${tabStop.getType()}`);
      });

      // text properties
      const color = paragraphStyle.getColor();
      hash.update(color !== undefined ? color.toHex() : '');
      hash.update(paragraphStyle.getFontName() || '');
      hash.update(paragraphStyle.getFontSize().toString());
      hash.update(paragraphStyle.getTextTransformation());
      hash.update(paragraphStyle.getTypeface().toString());
    }

    return hash.digest('hex');
  }
}
