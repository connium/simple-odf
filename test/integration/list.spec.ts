import { unlink } from 'fs';
import { promisify } from 'util';
import { FontPitch, ListStyle, TextBody, TextDocument } from '../../src';

const FILEPATH = './integration-list.fodt';

xdescribe('list', () => {
  const styleName = 'List Content';
  let document: TextDocument;
  let body: TextBody;

  beforeEach(() => {
    document = new TextDocument();
    body = document.getBody();
    document
      .getFontFaceDeclarations()
      .create('FreeSans', 'FreeSans', FontPitch.Variable);
    document
      .getCommonStyles()
      .createParagraphStyle(styleName)
      .setFontName('FreeSans');
  });

  afterEach(async (done) => {
    const unlinkAsync = promisify(unlink);

    // if (Date.now() < 1) {
    await unlinkAsync(FILEPATH);
    // }

    done();
  });

  it('should create a document with a 10 level bullet list', async (done) => {
    const listStyle = new ListStyle();
    listStyle
      .createBulletListLevelStyle(1)
      .setBulletChar('\u2660')
      .setLabelFollowedBy('listtab')
      .setListTabStopPosition(10)
      .setMarginLeft(10)
      .setTextIndent(-5);
    listStyle
      .createBulletListLevelStyle(2)
      .setBulletChar('\u2663')
      .setLabelFollowedBy('listtab')
      .setListTabStopPosition(15)
      .setMarginLeft(15)
      .setTextIndent(-5);
    listStyle
      .createBulletListLevelStyle(3)
      .setBulletChar('\u2665')
      .setLabelFollowedBy('listtab')
      .setListTabStopPosition(20)
      .setMarginLeft(20)
      .setTextIndent(-5);
    listStyle
      .createBulletListLevelStyle(4)
      .setBulletChar('\u2666')
      .setLabelFollowedBy('listtab')
      .setListTabStopPosition(25)
      .setMarginLeft(25)
      .setTextIndent(-5);
    listStyle
      .createBulletListLevelStyle(5)
      .setBulletChar('\u2605')
      .setLabelFollowedBy('listtab')
      .setListTabStopPosition(30)
      .setMarginLeft(30)
      .setTextIndent(-5);
    listStyle
      .createBulletListLevelStyle(6)
      .setBulletChar('\u2605')
      .setLabelFollowedBy('listtab')
      .setListTabStopPosition(35)
      .setMarginLeft(35)
      .setRelativeBulletSize('50%')
      .setTextIndent(-5);
    listStyle
      .createBulletListLevelStyle(7)
      .setBulletChar('\u2714')
      .setLabelFollowedBy('listtab')
      .setListTabStopPosition(40)
      .setMarginLeft(40)
      .setNumberPrefix('§')
      .setTextIndent(-5);
    listStyle
      .createBulletListLevelStyle(8)
      .setBulletChar('\u2717')
      .setLabelFollowedBy('listtab')
      .setListTabStopPosition(45)
      .setMarginLeft(45)
      .setNumberSuffix('~')
      .setTextIndent(-5);
    listStyle
      .createBulletListLevelStyle(9)
      .setBulletChar('\u2022')
      .setLabelFollowedBy('listtab')
      .setListTabStopPosition(50)
      .setMarginLeft(50)
      .setTextIndent(-5);
    listStyle
      .createBulletListLevelStyle(10)
      .setBulletChar('\u2023')
      .setLabelFollowedBy('listtab')
      .setListTabStopPosition(55)
      .setMarginLeft(55)
      .setTextIndent(-5);

    const list = body.addList();
    list.setStyle(listStyle);

    const level1Item = list.addItem();
    level1Item.addParagraph('1st level').setStyleName(styleName);
    const level2Item = level1Item.addList().addItem();
    level2Item.addParagraph('2nd level').setStyleName(styleName);
    const level3Item = level2Item.addList().addItem();
    level3Item.addParagraph('3rd level').setStyleName(styleName);
    const level4Item = level3Item.addList().addItem();
    level4Item.addParagraph('4th level').setStyleName(styleName);
    const level5Item = level4Item.addList().addItem();
    level5Item.addParagraph('5th level').setStyleName(styleName);
    const level6Item = level5Item.addList().addItem();
    level6Item
      .addParagraph('6th level with small bullet')
      .setStyleName(styleName);
    const level7Item = level6Item.addList().addItem();
    level7Item
      .addParagraph('7th level with number prefix')
      .setStyleName(styleName);
    const level8Item = level7Item.addList().addItem();
    level8Item
      .addParagraph('8th level with number suffix')
      .setStyleName(styleName);
    const level9Item = level8Item.addList().addItem();
    level9Item.addParagraph('9th level').setStyleName(styleName);
    const level10Item = level9Item.addList().addItem();
    level10Item.addParagraph('10th level').setStyleName(styleName);

    await document.saveFlat(FILEPATH);

    // TODO use snapshot testing

    done();
  });
});
