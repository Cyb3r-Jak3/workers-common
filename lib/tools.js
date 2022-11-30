// Taken from https://github.com/anuraghazra/github-readme-stats/blob/master/src/common/utils.js
/**
 * Returns boolean if value is either "true" or "false" else the value as it is.
 *
 * @param {string | boolean} value The value to parse.
 * @returns {boolean | undefined } The parsed value.
 */
export var ParseBoolean = function (value) {
    if (typeof value === 'boolean')
        return value;
    if (typeof value === 'string') {
        if (value.toLowerCase() === 'true') {
            return true;
        }
        else if (value.toLowerCase() === 'false') {
            return false;
        }
    }
    return undefined;
};
/**
 * Parse string to array of strings.
 *
 * @param {string} str The string to parse.
 * @param {delimiter} str Character to split string by
 * @returns {string[]} The array of strings.
 */
export var ParseStringArray = function (str, delimiter) {
    if (delimiter === void 0) { delimiter = ','; }
    if (!str)
        return [];
    return str.split(delimiter);
};
/**
 * Clamp the given number between the given range.
 *
 * @param {number | string} number The number to clamp.
 * @param {number} min The minimum value.
 * @param {number} max The maximum value.
 * returns {number} The clamped number.
 */
export var ClampValue = function (number, min, max) {
    if (typeof number === 'string') {
        number = parseInt(number);
    }
    if (Number.isNaN(number))
        return min;
    return Math.max(min, Math.min(number, max));
};
//# sourceMappingURL=tools.js.map