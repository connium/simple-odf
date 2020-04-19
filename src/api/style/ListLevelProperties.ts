import { IListLevelProperties } from './IListLevelProperties';

/**
 * @todo document
 * @since 0.11.0
 */
export class ListLevelProperties implements IListLevelProperties {
  private labelFollwedBy: 'listtab' | 'space' | 'nothing';
  private listTabStopPosition: number | undefined;
  private marginLeft: number | undefined;
  private textIndent: number | undefined;

  /**
   * @todo document
   * @since 0.11.0
   */
  public constructor() {
    this.labelFollwedBy = 'listtab';
  }

  /** @inheritdoc */
  public getListLevelPositionAndSpaceMode(): string {
    return 'label-alignment';
  }

  /** @inheritdoc */
  public getLabelFollwedBy(): string {
    return this.labelFollwedBy;
  }

  /** @inheritdoc */
  public setLabelFollwedBy(value: 'listtab' | 'space' | 'nothing'): this {
    this.labelFollwedBy = value;

    return this;
  }

  /** @inheritdoc */
  public getListTabStopPosition(): number | undefined {
    return this.listTabStopPosition;
  }

  /** @inheritdoc */
  public setListTabStopPosition(position: number | undefined): this {
    this.listTabStopPosition = position;

    return this;
  }

  /** @inheritdoc */
  public getTextIndent(): number | undefined {
    return this.textIndent;
  }

  /** @inheritdoc */
  public setTextIndent(indent: number | undefined): this {
    this.textIndent = indent;
    return this;
  }

  /** @inheritdoc */
  public getMarginLeft(): number | undefined {
    return this.marginLeft;
  }

  /** @inheritdoc */
  public setMarginLeft(margin: number | undefined): this {
    this.marginLeft = margin;
    return this;
  }
}
