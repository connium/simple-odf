import { IOutlineStyle } from "./IOutlineStyle";
import { OutlineStyle } from "./OutlineStyle";

/**
 * This factory creates any type of style
 *
 * @since 0.6.0
 */
export class StyleFactory {
  /**
   * Creates a new outline style instance.
   *
   * @returns {IOutlineStyle} A new instance of outline style
   * @since 0.6.0
   */
  public createOutlineStyle(): IOutlineStyle {
    return new OutlineStyle();
  }
}
