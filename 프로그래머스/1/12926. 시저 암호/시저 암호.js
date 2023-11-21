/*
 * Key Idea
 *  - Unicode code mapping function (charCodeAt, fromCharCode)
 *      - Don't know the related functions -> create a dictionary
 *  - calculate shifted position (# of alphabets = 26)
 */
function solution(s, n) {
    return [...s].map((k, v) => {
        if (k === ' ') {
            return k;
        }
        const base = k === k.toUpperCase() ? 'A'.charCodeAt() : 'a'.charCodeAt();
        return String.fromCharCode((k.charCodeAt() + n - base) % 26 + base);
    }).join('');
}