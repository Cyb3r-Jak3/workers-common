/**
 * Returns boolean if value is either "true" or "false" else the value as it is.
 *
 * @param {string | boolean} value The value to parse.
 * @returns {boolean | undefined } The parsed value.
 */
export declare const ParseBoolean: (value: string | boolean) => boolean | undefined;
/**
 * Parse string to array of strings.
 *
 * @param {string} str The string to parse.
 * @param {delimiter} str Character to split string by
 * @returns {string[]} The array of strings.
 */
export declare const ParseStringArray: (str: string, delimiter?: string) => string[];
/**
 * Clamp the given number between the given range.
 *
 * @param {number | string} number The number to clamp.
 * @param {number} min The minimum value.
 * @param {number} max The maximum value.
 * returns {number} The clamped number.
 */
export declare const ClampValue: (number: number | string, min: number, max: number) => number;
//# sourceMappingURL=tools.d.ts.map