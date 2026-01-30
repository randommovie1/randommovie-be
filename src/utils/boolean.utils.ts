import assert from "assert";

/**
 * Converts a numeric value to a boolean.
 *
 * The function only accepts values `0` or `1`. If the provided value is neither `0` nor `1`, an error is thrown.
 *
 * @param value - The numeric value to convert to a boolean. Must be either `0` or `1`.
 * @returns `true` if the value is `1`, otherwise `false`.
 *
 * @throws Error if the value is not `0` or `1`.
 */
export function numberToBoolean(value: number | undefined): boolean | undefined {
    if (value == null) return undefined;
    assert(value === 0 || value === 1, 'Only 0,1 are accepted.');
    return value !== 0;
}

/**
 * Converts a string or undefined to its boolean equivalent.
 *
 * This function takes a string or undefined as input and parses it into a boolean value using `JSON.parse`.
 * If the input is `undefined`, the function defaults it to `"false"`.
 * The input string must represent a valid JSON boolean, such as `"true"` or `"false"`.
 *
 * @param {string | undefined} str - The string to be converted to a boolean, or undefined.
 *
 * @returns {boolean} - The boolean equivalent of the input string.
 *
 * @throws {SyntaxError} - Will throw an error if the input string is not a valid JSON boolean value.
 *
 * @example
 * // Returns true
 * stringToBoolean("true");
 *
 * @example
 * // Returns false
 * stringToBoolean("false");
 *
 * @example
 * // Returns false
 * stringToBoolean(undefined);
 *
 * @example
 * // Throws SyntaxError
 * stringToBoolean("not a boolean");
 */
export function stringToBoolean(str: string | undefined = "false"): boolean {
    return JSON.parse(str);
}
