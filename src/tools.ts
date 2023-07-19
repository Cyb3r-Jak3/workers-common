// Taken from https://github.com/anuraghazra/github-readme-stats/blob/master/src/common/utils.js

/**
 * Returns boolean if value is either "true" or "false" else the value as it is.
 *
 * @param {string | boolean} value The value to parse.
 * @returns {boolean | undefined } The parsed value.
 */
export const ParseBoolean = (value: string | boolean): boolean | undefined => {
    if (typeof value === 'boolean') return value

    if (typeof value === 'string') {
        if (value.toLowerCase() === 'true') {
            return true
        } else if (value.toLowerCase() === 'false') {
            return false
        }
    }
    return undefined
}

/**
 * Parse string to array of strings.
 *
 * @param {string} str The string to parse.
 * @param {delimiter} str Character to split string by
 * @returns {string[]} The array of strings.
 */
export const ParseStringArray = (str: string, delimiter = ','): string[] => {
    if (!str) return []
    return str.split(delimiter)
}

/**
 * Clamp the given number between the given range.
 *
 * @param {number | string} number The number to clamp.
 * @param {number} min The minimum value.
 * @param {number} max The maximum value.
 * returns {number} The clamped number.
 */
export const ClampValue = (
    number: number | string,
    min: number,
    max: number
) => {
    if (typeof number === 'string') {
        number = parseInt(number)
    }
    if (Number.isNaN(number)) return min
    return Math.max(min, Math.min(number, max))
}

/**
 * Encode string as HTML.
 *
 * @see https://stackoverflow.com/a/48073476/10629172
 *
 * @param {string} str String to encode.
 * @returns {string} Encoded string.
 */
export const EncodeHTML = (str: string): string => {
    return str.replace(/[\u00A0-\u9999<>&](?!#)/gimu, (i) => {
        return `&#${i.charCodeAt(0)};`
    })
}

/**
 * Checks if a string is a valid hex color.
 *
 * @param {string} hexColor String to check.
 * @returns {boolean} True if the given string is a valid hex color.
 */
export const IsValidHexColor = (hexColor: string): boolean => {
    return new RegExp(
        /^([A-Fa-f0-9]{8}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}|[A-Fa-f0-9]{4})$/
    ).test(hexColor)
}
/**
 * Function to replace ${key} in a string with the value of key in the keys object
 *
 * Thanks to Leo in the Cloudflare Developer Discord for this function
 * @param str The string to format
 * @param keys The keys to format the string with
 * @returns The formatted string
 */
export function Formatter(
    str: string,
    keys: { [key: string]: string }
): string {
    return str.replace(
        /\${([a-zA-Z\d]+)}/g,
        (_, name) => keys[name] ?? str.match(/\${([a-zA-Z\d]+)}/g)[0] ?? ''
    )
}
