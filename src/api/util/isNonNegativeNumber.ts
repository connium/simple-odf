/**
 * The `isNonNegativeNumber` method returns whether the given value is a non-negative number.
 *
 * ([0-9]+(\.[0-9]*)?|\.[0-9]+)((cm)|(mm)|(in)|(pt)|(pc)|(px))
 *
 * @param {any} value The value that is to be checked
 * @returns {boolean} `true` if the given value is a non-negative number, `false` otherwise
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isNonNegativeNumber(value: any): boolean {
  return typeof value === 'number' && value > 0;
}
