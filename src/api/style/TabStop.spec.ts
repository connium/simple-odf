import { Color } from './Color';
import { TabStop } from './TabStop';
import { TabStopLeaderStyle } from './TabStopLeaderStyle';
import { TabStopType } from './TabStopType';

describe(TabStop.name, () => {
  const testPosition = 23;
  const testType = TabStopType.Center;

  let tabStop: TabStop;

  beforeEach(() => {
    tabStop = new TabStop(testPosition);
  });

  describe('#constructor', () => {
    it('create a new tab stop with given position and default type', () => {
      const tabStop = new TabStop(testPosition);

      expect(tabStop.getPosition()).toBe(testPosition);
      expect(tabStop.getType()).toBe(TabStopType.Left);
    });

    it('create a new tab stop with given position and type', () => {
      const tabStop = new TabStop(testPosition, testType);

      expect(tabStop.getPosition()).toBe(testPosition);
      expect(tabStop.getType()).toBe(testType);
    });

    it('create a new tab stop and set position to 0 if it is negative', () => {
      const tabStop = new TabStop(-42);

      expect(tabStop.getPosition()).toBe(0);
    });
  });

  describe('char', () => {
    const testCharacter = '*';

    it('return undefined by default', () => {
      expect(tabStop.getChar()).toBeUndefined();
    });

    it('return previous set character', () => {
      tabStop.setChar(testCharacter);

      expect(tabStop.getChar()).toBe(testCharacter);
    });

    it('return undefined if undefined is set', () => {
      tabStop.setChar(testCharacter);
      tabStop.setChar(undefined);

      expect(tabStop.getChar()).toBeUndefined();
    });

    it('ignore invalid input', () => {
      tabStop.setChar(testCharacter);
      tabStop.setChar('foo');

      expect(tabStop.getChar()).toBe(testCharacter);
    });
  });

  describe('leader color', () => {
    const testLeaderColor = Color.fromRgb(1,2,3);

    it('return undefined by default', () => {
      expect(tabStop.getLeaderColor()).toBeUndefined();
    });

    it('return previous set leader color', () => {
      tabStop.setLeaderColor(testLeaderColor);

      expect(tabStop.getLeaderColor()).toBe(testLeaderColor);

      tabStop.setLeaderColor(undefined);

      expect(tabStop.getLeaderColor()).toBeUndefined();
    });
  });

  describe('leader style', () => {
    const testLeaderStyle = TabStopLeaderStyle.Dotted;

    it('return None by default', () => {
      expect(tabStop.getLeaderStyle()).toBe(TabStopLeaderStyle.None);
    });

    it('return previous set leader style', () => {
      tabStop.setLeaderStyle(testLeaderStyle);

      expect(tabStop.getLeaderStyle()).toBe(testLeaderStyle);
    });
  });

  describe('position', () => {
    it('return initial position', () => {
      expect(tabStop.getPosition()).toBe(testPosition);
    });

    it('return previous set position', () => {
      tabStop.setPosition(42);

      expect(tabStop.getPosition()).toBe(42);
    });

    it('set position to 0 if a negative value is given', () => {
      tabStop.setPosition(-42);

      expect(tabStop.getPosition()).toBe(0);
    });
  });

  describe('type', () => {
    it('return Left by default', () => {
      expect(tabStop.getType()).toBe(TabStopType.Left);
    });

    it('return previous set type', () => {
      tabStop.setType(testType);

      expect(tabStop.getType()).toBe(testType);
    });
  });
});
