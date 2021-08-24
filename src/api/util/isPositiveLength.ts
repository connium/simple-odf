/**
 * The `isPositiveLength` method returns whether the given value is a positive number.
 *
 * ([0-9]*[1-9][0-9]*(\.[0-9]*)?|0+\.[0-9]*[1-9][0-9]*|\.[0-9]*[1-9][0-9]*)((cm)|(mm)|(in)|(pt)|(pc)|(px))
 *
 * @param {unknown} value The value that is to be checked
 * @returns {boolean} `true` if the given value is a positive number, `false` otherwise
 * @private
 */
export function isPositiveLength(value: unknown): boolean {
  return typeof value === 'number' && value >= 0;
}
