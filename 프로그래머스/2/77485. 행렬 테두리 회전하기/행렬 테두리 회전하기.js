function solution(rows, columns, queries) {
    let min_nums = [];
    let matrix = Array(rows).fill().map((_, i) => Array(columns).fill().map((_, j) => i * columns + j + 1));
                                                        // index는 0부터 시작하기 때문에 1을 빼야함
    queries.forEach(([x1, y1, x2, y2]) => min_nums.push(rotate(x1-1, y1-1, x2-1, y2-1, matrix)));
    return min_nums;
}
/*
 * IDEA: 반대로 생각하기
 *  
 *    —[1]->     * [1] -> [2] -> [3] -> [4] : 시계방향으로 rotate
 *   ↑      |         현재 값이 다음 값을 덮어버려서 이전 값을 기억 못함
 *  [4]    [2]
 *   |      ↓    * [4] -> [3] -> [2] -> [1] : 역방향으로 rotate
 *    <—[3]—          처음 값만 기억하고 있으면 됨!
 */
function rotate(x1, y1, x2, y2, matrix) {
    let min_value = first = matrix[x1][y1];
    for (let x = x1; x < x2; x++) {
        matrix[x][y1] = matrix[x+1][y1];
        min_value = Math.min(min_value, matrix[x+1][y1]);
    }
    for (let y = y1; y < y2; y++) {
        matrix[x2][y] = matrix[x2][y+1];
        min_value = Math.min(min_value, matrix[x2][y+1]);
    }
    for (let x = x2; x > x1; x--) {
        matrix[x][y2] = matrix[x-1][y2];
        min_value = Math.min(min_value, matrix[x-1][y2]);
    }
    for (let y = y2; y > y1 + 1; y--) {
        matrix[x1][y] = matrix[x1][y-1];
        min_value = Math.min(min_value, matrix[x1][y-1]);
    }
    matrix[x1][y1+1] = first;
    return min_value;
}