export const EMAIL_REGEX: RegExp = new RegExp('^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
export const PASSWORD_REGEX: RegExp = new RegExp('^[a-zA-Z0-9!@#$%^&*()_+=.-]+$')

/**
 * Checks if a given value is neither `null` nor `undefined`.
 *
 * @param obj - The value to be checked.
 * @returns `true` if the value is not `null` and not `undefined`; otherwise, `false`.
 *
 * @example
 * ```typescript
 * exists(null); // returns false
 * exists(undefined); // returns false
 * exists(0); // returns true
 * exists(""); // returns true
 * exists({}); // returns true
 * ```
 */
export function exists(obj: any): boolean {
    return obj != null;
}

/**
 * Checks if a given value is either `null` or `undefined`.
 *
 * @param obj - The value to be checked.
 * @returns `true` if the value is `null` or `undefined`; otherwise, `false`.
 *
 * @example
 * ```typescript
 * notExists(null); // returns true
 * notExists(undefined); // returns true
 * notExists(0); // returns false
 * notExists(""); // returns false
 * notExists({}); // returns false
 * ```
 */
export function notExists(obj: any): boolean {
    return obj == null;
}
