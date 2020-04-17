import { BulletListLevelStyle } from './BulletListLevelStyle';
import { Style } from './Style';
import { StyleFamily } from './StyleFamily';

/**
 * This class represents a list style.
 *
 * List styles are used to specify the formatting of a list and its items.
 * A list style contains a set of style elements for each list level (@see ListLevelStyle).
 * If a list style is applied to a list but does not contain a list level specification for a specific level, the list level style of the next lower level is used.
 *
 * @example
 * document.getStyleManager().createListStyle('Contents');
 * document.getBody()
 *   .addList()
 *   .setStyleName('Contents);
 *
 * @since 0.11.0
 */
export class ListStyle extends Style {
  private isConsecutiveNumbering: boolean;
  private listLevelStyles: BulletListLevelStyle[];

  /**
   * Creates a `ListStyle` instance that represents the formatting of a list.
   *
   * @example
   * const style = new ListStyle('Contents');
   *
   * @param {string} displayName The unique display name for the style
   *
   * @since 0.11.0
   */
  public constructor(displayName: string = Style.UNNAMED) {
    // TODO: ListStyle has no style family
    super(displayName, StyleFamily.Text);

    this.isConsecutiveNumbering = false;
    this.listLevelStyles = [];
  }

  /**
   * The `getConsecutiveNumbering()` method returns whether the style uses consecutive numbering for all list levels or whether each list level restarts the numbering.
   *
   * @example
   * const style = new ListStyle('Contents');
   * style.getConsecutiveNumbering();     // false
   * style.setConsecutiveNumbering(true);
   * style.getConsecutiveNumbering();     // true
   *
   * @returns {boolean} `true` if consecutive numbering is used for all list levels or `false` if each list level restarts numbering
   * @since 0.11.0
   */
  public getConsecutiveNumbering(): boolean {
    return this.isConsecutiveNumbering;
  }

  /**
   * The `setConsecutiveNumbering()` method sets returns whether the style uses consecutive numbering for all list levels or whether each list level restarts the numbering.
   *
   * @example
   * const style = new ListStyle('Contents');
   * style.setConsecutiveNumbering(true); // true
   *
   * @param {boolean} consecutiveNumbering `true` if consecutive numbering is used for all list levels or `false` if each list level restarts numbering
   * @returns {ListStyle} The `ListStyle` object
   * @since 0.11.0
   */
  public setConsecutiveNumbering(consecutiveNumbering: boolean): ListStyle {
    this.isConsecutiveNumbering = consecutiveNumbering;

    return this;
  }

  /**
   * The `createBulletListLevelStyle()` method creates a new `BulletListLevelStyle` instance for the given list level.
   * If a list level style for this level already exists, the existing style will be overwritten.
   *
   * @example
   * const style = new ListStyle('Contents');
   * style.createBulletListLevelStyle(3);
   *
   * @param {number} level The level of the list style, starting with `1`
   * @returns {BulletListLevelStyle} A new `BulletListLevelStyle` instance with the specified level
   * @since 0.11.0
   */
  public createBulletListLevelStyle(level: number): BulletListLevelStyle {
    const bulletListLevelStyle = new BulletListLevelStyle(level);
    this.removeListLevelStyle(level);
    this.listLevelStyles.push(bulletListLevelStyle);

    return bulletListLevelStyle;
  }

  /**
   * The `getListLevelStyle()` method returns the list level style for the given list level.
   * If a list level style for this level already exists, the existing style will be overwritten.
   *
   * @example
   * const style = new ListStyle('Contents');
   * style.getListLevelStyle(3);
   *
   * @param {number} level The level of the list style, starting with `1`
   * @returns {BulletListLevelStyle | undefined} The list level style for the specified level or `undefined` if no list level style is defined for the specified level
   * @since 0.11.0
   */
  public getListLevelStyle(level: number): BulletListLevelStyle | undefined {
    return this.listLevelStyles.find((listLevelStyle) => {
      return listLevelStyle.getLevel() === level;
    });
  }

  /**
   * The `getListLevelStyles()` method returns a new `Array` object that contains all list level styles of a list style.
   *
   * @example
   * const style = new ListStyle('Contents');
   * style.createBulletListLevelStyle(1);
   * style.createBulletListLevelStyle(2);
   * styles.getListLevelStyles();
   *
   * @returns {BulletListLevelStyle[]} A new `Array` object that contains the list level styles of a list style
   * @since 0.11.0
   */
  public getListLevelStyles(): BulletListLevelStyle[] {
    return [...this.listLevelStyles];
  }

  /**
   * The `removeListLevelStyle()` method removes the list level style for the given list level.
   *
   * @example
   * const style = new ListStyle('Contents');
   * style.createBulletListLevelStyle(3);
   * style.removeListLevelStyle(3);
   * styles.getListLevelStyles();             // []
   *
   * @param {number} level The level of the list style, starting with `1`
   * @returns {ListStyle} The `ListStyle` object
   * @since 0.11.0
   */
  public removeListLevelStyle(level: number): ListStyle {
    this.listLevelStyles = this.listLevelStyles.filter((listLevelStyle) => {
      return listLevelStyle.getLevel() !== level;
    });

    return this;
  }
}

/*
<define name="text-list-style">
	<element name="text:list-style">
		<ref name="text-list-style-attr"/><!-- DONE -->
		<zeroOrMore>
			<ref name="text-list-style-content"/>
		</zeroOrMore>
	</element>
</define>


<define name="text-list-style-content">
	<choice>
		<element name="text:list-level-style-number">
			<ref name="text-list-level-style-attr"/>
			<ref name="text-list-level-style-number-attr"/>
			<optional>
				<ref name="style-list-level-properties"/>
			</optional>
			<optional>
				<ref name="style-text-properties"/>
			</optional>
		</element>
		<element name="text:list-level-style-bullet">
			<ref name="text-list-level-style-attr"/>
			<ref name="text-list-level-style-bullet-attr"/>
			<optional>
				<ref name="style-list-level-properties"/>
			</optional>
			<optional>
				<ref name="style-text-properties"/>
			</optional>
		</element>
		<element name="text:list-level-style-image">
			<ref name="text-list-level-style-attr"/>
			<ref name="text-list-level-style-image-attr"/>
			<optional>
				<ref name="style-list-level-properties"/>
			</optional>
		</element>
	</choice>
</define>
*/
