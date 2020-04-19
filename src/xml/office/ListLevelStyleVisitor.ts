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

    this.setListLevelProperties(
      listLevelStyle,
      document,
      listLevelStyleElement
    );

    return listLevelStyleElement;
  }

  private setListLevelProperties(
    listLevelStyle: BulletListLevelStyle,
    document: Document,
    parent: Element
  ): void {
    const listLevelPropertiesElement = document.createElement(
      OdfElementName.StyleListLevelProperties
    );
    parent.appendChild(listLevelPropertiesElement);

    listLevelPropertiesElement.setAttribute(
      OdfAttributeName.TextListLevelPositionAndSpaceMode,
      listLevelStyle.getListLevelPositionAndSpaceMode()
    );

    const listLevelLabelAlignmentElement = document.createElement(
      OdfElementName.StyleListLevelLabelAlignment
    );
    listLevelPropertiesElement.appendChild(listLevelLabelAlignmentElement);

    listLevelLabelAlignmentElement.setAttribute(
      OdfAttributeName.TextLabelFollowedBy,
      listLevelStyle.getLabelFollwedBy()
    );

    const tabStopPosition = listLevelStyle.getListTabStopPosition();
    if (tabStopPosition !== undefined) {
      listLevelLabelAlignmentElement.setAttribute(
        OdfAttributeName.TextListTabStopPosition,
        `${tabStopPosition}mm`
      );
    }

    const textIndent = listLevelStyle.getTextIndent();
    if (textIndent !== undefined) {
      listLevelLabelAlignmentElement.setAttribute(
        OdfAttributeName.FormatTextIndent,
        `${textIndent}mm`
      );
    }

    const marginLeft = listLevelStyle.getMarginLeft();
    if (marginLeft !== undefined) {
      listLevelLabelAlignmentElement.setAttribute(
        OdfAttributeName.FormatMarginLeft,
        `${marginLeft}mm`
      );
    }
  }
}
