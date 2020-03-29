import { Style } from '../style';

export interface IStyles {
  /**
   * The `getAll()` method returns a new `Array` object that contains the named or automatic styles of a document.
   *
   * @example
   * const styles = new CommonStyles();
   * styles.createParagraphStyle('Summary');
   * styles.createParagraphStyle('Final remark');
   * styles.getAll();                             // [Summary, Final remark]
   *
   * @returns {Style[]} A new `Array` object that contains the named or automatic styles of a document
   * @since 0.9.0
   */
  getAll(): Style[];
}
