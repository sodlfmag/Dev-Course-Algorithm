/*
 * Radix Conversion example (base 10 -> base 3)
 *
 *    3 | 45
 *       ————         ↑
 *    3 | 15  ··· 0   |
 *       ————         |
 *    3 |  5  ··· 0   |
 *       ————         |
 *         1  ··· 2   |
 *         ___________|
 *
 *    => 45(10) = 1200(3)
 *
 * Or use built-in method & function
 *  - num.toString(n)  : base 10 -> base n
 *  - parseInt(num, n) : base n -> base 10
 */
function solution(n) {
    return parseInt([...n.toString(3)].reverse().join(''), 3);
}