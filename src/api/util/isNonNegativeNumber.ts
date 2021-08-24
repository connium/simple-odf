/**
 * The `isNonNegativeNumber` method returns whether the given value is a non-negative number.
 *
 * ([0-9]+(\.[0-9]*)?|\.[0-9]+)((cm)|(mm)|(in)|(pt)|(pc)|(px))
 *
 * @param {unknown} value The value that is to be checked
 * @returns {boolean} `true` if the given value is a non-negative number, `false` otherwise
 * @private
 */
export function isNonNegativeNumber(value: unknown): boolean {
  return typeof value === 'number' && value > 0;
}
