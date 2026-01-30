/**
 * Checks if a given string is empty or contains only whitespace.
 *
 * @param str - The string to be checked. This parameter cannot be `undefined`.
 * @throws Error if the `str` parameter is `undefined`.
 * @returns `true` if the string is either empty or consists only of whitespace characters; otherwise, `false`.
 *
 * @example
 * ```typescript
 * isEmpty("   "); // returns true
 * isEmpty(""); // returns true
 * isEmpty("hello"); // returns false
 * ```
 */
export function isEmpty(str: string | undefined): boolean {
    if (str === undefined) throw new Error('str can\'t be undefined.');
    return str.trim().length == 0;
}

/**
 * Checks if a given string is not empty and contains non-whitespace characters.
 *
 * @param str - The string to be checked. This parameter cannot be `undefined`.
 * @throws Error if the `str` parameter is `undefined`.
 * @returns `true` if the string contains non-whitespace characters; otherwise, `false`.
 *
 * @example
 * ```typescript
 * isNotEmpty("   "); // returns false
 * isNotEmpty(""); // returns false
 * isNotEmpty("hello"); // returns true
 * ```
 */
export function isNotEmpty(str: string | undefined): boolean {
    if (str === undefined) throw new Error('str can\'t be undefined.');
    return str.trim().length > 0;
}

/**
 * Checks if a given string exceeds a specified maximum length.
 *
 * @param str - The string to be checked. This parameter cannot be `undefined`.
 * @param max - The maximum allowed length for the string.
 * @throws Error if the `str` parameter is `undefined`.
 * @returns `true` if the string's length is greater than the specified maximum length; otherwise, `false`.
 *
 * @example
 * ```typescript
 * isMaxLength("Hello, world!", 10); // returns true
 * isMaxLength("Short", 10); // returns false
 * isMaxLength("", 0); // returns false
 * ```
 */
export function isMaxLength(str: string | undefined, max: number): boolean {
    if (str === undefined) throw new Error('str can\'t be undefined.');
    return str.length > max;
}

/**
 * Checks if a given string is shorter than a specified minimum length.
 *
 * @param str - The string to be checked. This parameter cannot be `undefined`.
 * @param min - The minimum required length for the string.
 * @throws Error if the `str` parameter is `undefined`.
 * @returns `true` if the string's length is less than the specified minimum length; otherwise, `false`.
 *
 * @example
 * ```typescript
 * isMinLength("Hello", 10); // returns true
 * isMinLength("Short", 3); // returns false
 * isMinLength("", 1); // returns true
 * ```
 */
export function isMinLength(str: string | undefined, min: number): boolean {
    if (str === undefined) throw new Error('str can\'t be undefined.');
    return str.length < min;
}

/**
 * Checks if a given string's length is outside a specified range (i.e., either below the minimum length or above the maximum length).
 *
 * @param str - The string to be checked. This parameter cannot be `undefined`.
 * @param min - The minimum allowed length for the string.
 * @param max - The maximum allowed length for the string.
 * @throws Error if the `str` parameter is `undefined`.
 * @returns `true` if the string's length is less than the specified minimum length or greater than the specified maximum length; otherwise, `false`.
 *
 * @example
 * ```typescript
 * isMinMaxLength("Hello", 1, 10); // returns false (length is within range)
 * isMinMaxLength("Hi", 3, 10); // returns true (length is less than minimum)
 * isMinMaxLength("This is a long string", 1, 10); // returns true (length is greater than maximum)
 * isMinMaxLength("", 1, 5); // returns true (length is less than minimum)
 * ```
 */
export function isMinMaxLength(str: string | undefined, min: number, max: number): boolean {
    if (str === undefined) throw new Error('str can\'t be undefined.');
    return str.length < min || str.length > max;
}

/**
 * Checks if a given string matches a specified regular expression pattern.
 *
 * @param str - The string to be checked. This parameter cannot be `undefined`.
 * @param pattern - The regular expression pattern to test against the string.
 * @throws Error if the `str` parameter is `undefined`.
 * @returns `true` if the string matches the regular expression pattern; otherwise, `false`.
 *
 * @example
 * ```typescript
 * const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 * matchesRegex("test@example.com", emailPattern); // returns true
 * matchesRegex("invalid-email", emailPattern); // returns false
 * matchesRegex("1234", /^\d+$/); // returns true
 * matchesRegex("abcd", /^\d+$/); // returns false
 * ```
 */
export function matchesRegex(str: string | undefined, pattern: RegExp): boolean {
    if (str === undefined) throw new Error('str can\'t be undefined.');
    return pattern.test(str);
}

/**
 * Normalizes whitespace in a given string by trimming leading and trailing whitespace and reducing multiple consecutive spaces to a single space.
 *
 * @param str - The string to be normalized. This parameter cannot be `undefined`.
 * @throws Error if the `str` parameter is `undefined`.
 * @returns A string with excess whitespace removed and multiple spaces reduced to a single space.
 *
 * @example
 * ```typescript
 * normalizeWhitespace("   Hello    world!   "); // returns "Hello world!"
 * normalizeWhitespace("   This   is  a   test.   "); // returns "This is a test."
 * normalizeWhitespace("NoExtraSpaces"); // returns "NoExtraSpaces"
 * ```
 */
export function normalizeWhitespace(str: string | undefined): string {
    if (str === undefined) throw new Error('str can\'t be undefined.');
    return str.trim().replace(/\s\s+/g, ' ');
}

/**
 * Computes a simple hash for a given string.
 *
 * This function takes a string as input and returns a 32-bit integer that represents
 * the hash of the string. The algorithm uses bitwise operations to generate a unique
 * hash quickly. It is not suitable for cryptographic purposes, but it is ideal for
 * situations where a simple and fast hash function is needed, such as generating
 * keys for hash tables.
 *
 * @param str - The string to hash.
 * @returns A 32-bit integer representing the hash of the string.
 *
 * @example
 * ```
 * const hash = simpleHash("hello");
 * console.log(hash); // Prints an integer representing the hash of the string "hello"
 * ```
 *
 * @remarks
 * The generated hash is deterministic, meaning that the same string will always produce
 * the same hash. The bitwise operation `hash |= 0` ensures that the hash is converted
 * to a signed 32-bit integer. This function is mainly useful in scenarios where performance
 * is a priority and a high level of hash security is not required.
 */
export function simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0;
    }
    return hash.toString(16);
}
