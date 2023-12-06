/*
 *  다음과 같은 모양으로 생각하고 풀기 (n = 4)
 *  [ 1 ]
 *  [ 2 ][ 9 ]
 *  [ 3 ][1 0][ 8 ]
 *  [ 4 ][ 5 ][ 6 ][ 7 ]
 */
function solution(n) {
    const snail = Array(n).fill().map((_, i) => Array(i+1).fill(0));
    const drdc = [[1, 0], [0, 1], [-1, -1]]
    let row = col = direction = 0;
    for (let i = 1; i <= n * (n+1) / 2; i++) {
        snail[row][col] = i;
        const nr = row + drdc[direction][0];
        const nc = col + drdc[direction][1];
        if (0 < nr && nr < n && nc < n && snail[nr][nc] === 0) {
            [row, col] = [nr, nc];
        } else {
            direction = (direction + 1) % 3;
            row += drdc[direction][0];
            col += drdc[direction][1];
        }
    }
    return [].concat(...snail);
}