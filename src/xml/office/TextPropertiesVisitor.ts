import { ITextProperties } from '../../api/style/ITextProperties';
import {
  FontVariant,
  TextTransformation,
  Typeface,
  ParagraphStyle,
} from '../../api/style';
import { OdfAttributeName } from '../OdfAttributeName';
import { OdfElementName } from '../OdfElementName';

export class TextPropertiesVisitor {
  public visit(
    textProperties: ITextProperties,
    document: Document,
    parent: Element
  ): Element {
    const textPropertiesElement = document.createElement(
      OdfElementName.StyleTextProperties
    );
    parent.appendChild(textPropertiesElement);

    const fontVariant = textProperties.getFontVariant();
    if (fontVariant !== FontVariant.Normal) {
      textPropertiesElement.setAttribute(
        OdfAttributeName.FormatFontVariant,
        fontVariant
      );
    }

    const textTransformation = textProperties.getTextTransformation();
    if (textTransformation !== TextTransformation.None) {
      textPropertiesElement.setAttribute(
        OdfAttributeName.FormatTextTransform,
        textTransformation
      );
    }

    const color = textProperties.getColor();
    if (color !== undefined) {
      textPropertiesElement.setAttribute(
        OdfAttributeName.FormatColor,
        color.toHex()
      );
    }

    const fontName = textProperties.getFontName();
    if (fontName !== undefined) {
      textPropertiesElement.setAttribute(
        OdfAttributeName.StyleFontName,
        fontName
      );
    }

    const fontSize = textProperties.getFontSize();
    if (fontSize !== 12) {
      textPropertiesElement.setAttribute(
        OdfAttributeName.FormatFontSize,
        fontSize + 'pt'
      );
    }

    const typeface = textProperties.getTypeface();
    if (typeface === Typeface.Italic || typeface === Typeface.BoldItalic) {
      textPropertiesElement.setAttribute(
        OdfAttributeName.FormatFontStyle,
        'italic'
      );
    }

    if (typeface === Typeface.Oblique || typeface === Typeface.BoldOblique) {
      textPropertiesElement.setAttribute(
        OdfAttributeName.FormatFontStyle,
        'oblique'
      );
    }

    if (
      typeface === Typeface.Bold ||
      typeface === Typeface.BoldItalic ||
      typeface === Typeface.BoldOblique
    ) {
      textPropertiesElement.setAttribute(
        OdfAttributeName.FormatFontWeight,
        'bold'
      );
    }

    const backgroundColor = textProperties.getBackgroundColor();
    if (
      backgroundColor !== undefined &&
      !(textProperties instanceof ParagraphStyle)
    ) {
      textPropertiesElement.setAttribute(
        OdfAttributeName.FormatBackgroundColor,
        backgroundColor.toHex()
      );
    }

    return textPropertiesElement;
  }
}
