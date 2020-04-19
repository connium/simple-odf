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

    listLevelStyleElement.setAttribute(
      OdfAttributeName.TextBulletChar,
      listLevelStyle.getBulletChar()
    );

    const numberPrefix = listLevelStyle.getNumberPrefix();
    if (numberPrefix !== undefined) {
      listLevelStyleElement.setAttribute(
        OdfAttributeName.StyleNumPrefix,
        numberPrefix
      );
    }

    const numberSuffix = listLevelStyle.getNumberSuffix();
    if (numberSuffix !== undefined) {
      listLevelStyleElement.setAttribute(
        OdfAttributeName.StyleNumSuffix,
        numberSuffix
      );
    }

    const relativeBulletSize = listLevelStyle.getRelativeBulletSize();
    if (relativeBulletSize !== undefined) {
      listLevelStyleElement.setAttribute(
        OdfAttributeName.TextBulletRelativeSize,
        relativeBulletSize
      );
    }

    return listLevelStyleElement;
  }
}
