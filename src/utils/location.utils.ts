import CountryLocale from "country-locale-map";

/**
 * Returns the language associated with a given country code.
 *
 * This function uses the `CountryLocale.getLocaleByAlpha2` method to fetch the locale
 * for the specified country code. If a valid locale is found, it returns the language
 * in a standardized format with the underscore (`_`) replaced by a hyphen (`-`).
 * If no locale is found or the country code is invalid, it defaults to `'en-US'`.
 *
 * @param {string} countryCode - A two-letter country code (ISO 3166-1 alpha-2) representing the country.
 * @returns {string} - A language code in the format `language-region`, or `'en-US'` if no language is found.
 *
 * @example
 * getLanguageFromCountryCode('US'); // Returns: 'en-US'
 * getLanguageFromCountryCode('IT'); // Returns: 'it-IT'
 * getLanguageFromCountryCode('ZZ'); // Returns: 'en-US' (default)
 */
export function getLanguageFromCountryCode(countryCode: string): string {
    let language: string | undefined = CountryLocale.getLocaleByAlpha2(countryCode);
    return language?.replace('_', '-') ?? 'en-US';
}