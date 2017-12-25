export enum FontName {
  ARIAL = 'Arial',
}

export enum FontStyle {
  NORMAL = 'normal',
  BOLD   = 'bold',
  ITALIC = 'italic',
}

export enum Color {
  BLACK   = '#000000',
  GRAY    = '#808080',
  MC_BLUE = '#0098da',
}

export class Font {
  // TODO add toXML()
  public name: string;
  public style: FontStyle;
  public size: number;
  public color: string;

  public constructor(name: string, style: FontStyle, size: number, color: string) {
    this.name  = name;
    this.style = style;
    this.size  = size;
    this.color = color;
  }
}
