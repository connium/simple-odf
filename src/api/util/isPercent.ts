/**
 * The `isPercent` method returns whether the given value is a percentage.
 *
 * -?([0-9]+(\.[0-9]*)?|\.[0-9]+)%
 *
 * @param {any} value The value that is to be checked
 * @returns {boolean} `true` if the given value is a percentage, `false` otherwise
 * @private
 */
export function isPercent (value: any): boolean {
  return typeof value === 'string' && /^-?([0-9]+(\.[0-9]*)?|\.[0-9]+)%$/.test(value);
}
