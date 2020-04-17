import { BulletListLevelStyle } from '../../api/style';
import { OdfElementName } from '../OdfElementName';
import { OdfAttributeName } from '../OdfAttributeName';

export class ListLevelStyleVisitor {
  public visit(
    listLevelStyle: BulletListLevelStyle,
    document: Document,
    parent: Element
  ): Element {
    const listLevelStyleElement = document.createElement(
      OdfElementName.TextListLevelStyleBullet
    );
    parent.appendChild(listLevelStyleElement);

    listLevelStyleElement.setAttribute(
      OdfAttributeName.TextLevel,
      `${listLevelStyle.getLevel()}`
    );

    return listLevelStyleElement;
  }
}
