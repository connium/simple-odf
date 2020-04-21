import { ListStyle } from '../../api/style';
import { OdfAttributeName } from '../OdfAttributeName';

export class ListStyleVisitor {
  public visit(listStyle: ListStyle, parent: Element): Element {
    const consecutiveNumbering = listStyle.getConsecutiveNumbering();
    if (consecutiveNumbering === true) {
      parent.setAttribute(
        OdfAttributeName.TextConsecutiveNumbering,
        consecutiveNumbering.toString()
      );
    }

    return parent;
  }
}
