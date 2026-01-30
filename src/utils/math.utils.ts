/**
 * Random number [0, n-1]
 * @param n
 */
export function getRandomNumber(n: number): number {
    return Math.floor(Math.random() * n);
}

export function _parseInt(value: string | undefined): number | undefined {
    if (value === undefined) {
        return undefined
    }
    return parseInt(value);
}