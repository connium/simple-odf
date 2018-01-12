import { List } from "../../src/text/List";
import { ListItem } from "../../src/text/ListItem";
import { TextDocument } from "../../src/TextDocument";

describe(List.name, () => {
  let document: TextDocument;
  let list: List;
  let testItem1: ListItem;
  let testItem2: ListItem;
  let testItem3: ListItem;

  beforeEach(() => {
    document = new TextDocument();
    list = document.addList();

    testItem1 = new ListItem("first");
    testItem2 = new ListItem("second");
    testItem3 = new ListItem("third");
  });

  it("NOT insert an empty list", () => {
    const documentAsString = document.toString();
    expect(documentAsString).not.toMatch(/<text:list/);
  });

  it("insert a list with a list item", () => {
    list.addItem("first");

    const documentAsString = document.toString();
    /* tslint:disable-next-line:max-line-length */
    expect(documentAsString).toMatch(/<text:list><text:list-item><text:p>first<\/text:p><\/text:list-item><\/text:list>/);
  });

  describe("#addItem", () => {
    beforeEach(() => {
      list.addItem("first");
    });

    it("create new item at the end of the list and return the added item", () => {
      const addedItem = list.addItem("second");

      expect(addedItem).toEqual(testItem2);
      expect(list.getItems()).toEqual([testItem1, testItem2]);
    });

    it("add new item to the end of the list and return the added item", () => {
      const addedItem = list.addItem(testItem2);

      expect(addedItem).toBe(testItem2);
      expect(list.getItems()).toEqual([testItem1, testItem2]);
    });
  });

  describe("#insertItem", () => {
    let itemToAdd: ListItem;

    beforeEach(() => {
      list.addItem(testItem1);
      list.addItem(testItem2);
      list.addItem(testItem3);

      itemToAdd = new ListItem("new");
    });

    it("insert item at the specified position and return the added item", () => {
      const addedItem = list.insertItem(2, "new");

      expect(addedItem).toEqual(itemToAdd);
      expect(list.getItems()).toEqual([testItem1, testItem2, itemToAdd, testItem3]);
    });

    it("add new items to the specified position and return the added item", () => {
      const addedItem = list.insertItem(2, itemToAdd);

      expect(addedItem).toBe(itemToAdd);
      expect(list.getItems()).toEqual([testItem1, testItem2, itemToAdd, testItem3]);
    });

    xit("insert item at the front of the list if position is negative", () => {
      list.insertItem(-2, itemToAdd);

      // TODO how to test? getItem(0)
    });

    xit("insert item at the end of the list if position is larger than the size of the list", () => {
      list.insertItem(10, itemToAdd);

      // TODO how to test? getItem(0)
    });
  });

  describe("#getItem", () => {
    beforeEach(() => {
      list.addItem(testItem1);
      list.addItem(testItem2);
      list.addItem(testItem3);
    });

    it("get the item at the specified position", () => {
      const item = list.getItem(1);

      expect(item).toEqual(testItem2);
    });

    xit("return undefined if the specified position is less then 0", () => {
      const item = list.getItem(-2);

      expect(item).toBeUndefined();
    });

    xit("return undefined if the specified position is larger than the list size", () => {
      const item = list.getItem(10);

      expect(item).toBeUndefined();
    });
  });

  describe("#getItems", () => {
    it("return the items in order", () => {
      list.addItem(testItem1);
      list.addItem(testItem2);
      list.addItem(testItem3);

      const items = list.getItems();

      expect(items).toEqual([testItem1, testItem2, testItem3]);
    });
  });

  describe("#setItem", () => {
    let itemToAdd: ListItem;

    beforeEach(() => {
      list.addItem(testItem1);
      list.addItem(testItem2);
      list.addItem(testItem3);

      itemToAdd = new ListItem("new");
    });

    it("replace the item at the specified position and return the previous item", () => {
      const addedItem = list.setItem(2, "new");

      expect(addedItem).toEqual(testItem3);
      expect(itemToAdd).toEqual(list.getItem(2));
    });

    it("replace the item at the specified position and return the previous item", () => {
      const addedItem = list.setItem(2, itemToAdd);

      expect(addedItem).toEqual(testItem3);
      expect(itemToAdd).toEqual(list.getItem(2));
    });
  });

  describe("#removeItem", () => {
    beforeEach(() => {
      list.addItem(testItem1);
      list.addItem(testItem2);
      list.addItem(testItem3);
    });

    it("remove the item at the specified position and return it", () => {
      const removedItem = list.removeItem(1);

      expect(removedItem).toEqual(testItem2);
      expect(list.getItems()).toEqual([testItem1, testItem3]);
    });

    xit("return undefined if the specified position is less then 0", () => {
      const removedItem = list.removeItem(-2);

      expect(removedItem).toBeUndefined();
    });

    xit("return undefined if the specified position is larger than the list size", () => {
      const removedItem = list.removeItem(10);

      expect(removedItem).toBeUndefined();
    });
  });

  describe("#clear", () => {
    beforeEach(() => {
      list.addItem(testItem1);
      list.addItem(testItem2);
      list.addItem(testItem3);
    });

    it("remove all items from the list", () => {
      list.clear();

      expect(list.size()).toBe(0);
    });
  });

  describe("#size", () => {
    beforeEach(() => {
      list.addItem(testItem1);
      list.addItem(testItem2);
      list.addItem(testItem3);
    });

    it("return the size of the list", () => {
      expect(list.size()).toBe(3);
    });
  });
});
