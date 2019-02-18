import { FontPitch } from './FontPitch';

export class FontFace {
  private name: string;
  private fontFamily: string;
  private fontPitch: FontPitch;

  public constructor (name: string, fontFamily: string, fontPitch: FontPitch) {
    this.name = name;
    this.fontFamily = fontFamily;
    this.fontPitch = fontPitch;
  }

  public getFontFamily (): string {
    return this.fontFamily;
  }

  public getFontPitch (): FontPitch {
    return this.fontPitch;
  }

  public getName (): string {
    return this.name;
  }
}
