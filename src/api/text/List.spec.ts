import { ListStyle } from '../style';
import { List } from './List';
import { ListItem } from './ListItem';

describe(List.name, () => {
  const styleName = 'someStyleName';

  let list: List;
  let listItem1: ListItem;
  let listItem2: ListItem;
  let listItem3: ListItem;
  let listStyle: ListStyle;

  beforeEach(() => {
    list = new List();

    listItem1 = new ListItem();
    listItem2 = new ListItem();
    listItem3 = new ListItem();

    listStyle = new ListStyle();

    list.addItem(listItem1);
    list.addItem(listItem2);
    list.addItem(listItem3);
  });

  it('should create new item at the end of the list and return the added item', () => {
    const addedItem = list.addItem();

    expect(addedItem).toBeInstanceOf(ListItem);
    expect(list.getItems().length).toBe(4);
    expect(list.getItem(3)).toBe(addedItem);
  });

  it('should add new item to the end of the list and return the added item', () => {
    const testItem = new ListItem();

    const addedItem = list.addItem(testItem);

    expect(addedItem).toBe(testItem);
    expect(list.getItems().length).toBe(4);
    expect(list.getItem(3)).toBe(testItem);
  });

  it('should insert item at the specified position and return the added item', () => {
    const testItem = new ListItem();

    const insertedItem = list.insertItem(2, testItem);

    expect(insertedItem).toEqual(testItem);
    expect(list.getItems()).toEqual([
      listItem1,
      listItem2,
      testItem,
      listItem3,
    ]);
  });

  it('should insert item at the front of the list if position is negative', () => {
    const testItem = new ListItem();

    const insertedItem = list.insertItem(-2, testItem);

    expect(insertedItem).toBe(testItem);
    expect(list.getItems()).toEqual([
      testItem,
      listItem1,
      listItem2,
      listItem3,
    ]);
  });

  it('should insert item at the end of the list if position is larger than the size of the list', () => {
    const testItem = new ListItem();

    const insertedItem = list.insertItem(10, testItem);

    expect(insertedItem).toBe(testItem);
    expect(list.getItems()).toEqual([
      listItem1,
      listItem2,
      listItem3,
      testItem,
    ]);
  });

  it('should return the item at the specified position', () => {
    const item = list.getItem(1);

    expect(item).toEqual(listItem2);
  });

  it('should return undefined if the specified position is less then 0', () => {
    const item = list.getItem(-2);

    expect(item).toBeUndefined();
  });

  it('should return undefined if the specified position is larger than the list size', () => {
    const item = list.getItem(10);

    expect(item).toBeUndefined();
  });

  it('should return the items in order', () => {
    const items = list.getItems();

    expect(items).toEqual([listItem1, listItem2, listItem3]);
  });

  it('should remove the item at the specified position and return it', () => {
    const removedItem = list.removeItemAt(1);

    expect(removedItem).toEqual(listItem2);
    expect(list.getItems()).toEqual([listItem1, listItem3]);
  });

  it('should not remove any item and return undefined if the specified position is less then 0', () => {
    const removedItem = list.removeItemAt(-2);

    expect(removedItem).toBeUndefined();
  });

  it('should not remove any item and return undefined if the specified position is larger than the list size', () => {
    const removedItem = list.removeItemAt(10);

    expect(removedItem).toBeUndefined();
  });

  it('should return undefined as style by default', () => {
    expect(list.getStyle()).toBeUndefined();
  });

  it('should return previous set style', () => {
    list.setStyle(listStyle);

    expect(list.getStyle()).toBe(listStyle);
  });

  it('should return undefined as style name by default', () => {
    expect(list.getStyleName()).toBeUndefined();
  });

  it('should return previous set style name', () => {
    list.setStyleName(styleName);

    expect(list.getStyleName()).toBe(styleName);
  });

  it('should remove all items from the list if it gets cleared', () => {
    list.clear();

    expect(list.size()).toBe(0);
  });

  it('should return the size of the list', () => {
    expect(list.size()).toBe(3);
  });
});
