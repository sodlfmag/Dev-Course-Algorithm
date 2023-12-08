/*
 *   - 대기실 고정 = 5x5
 *   - 거리두기 지키지 않는 경우
 *       1. [P][P] or [P]
 *                    [P]
 *                       [P]
 *       2. [P][O][P] or [O]
 *                       [P]
 *       3. [P][O] or [O][P] (적어도 하나가 O, 즉 둘 다 X만 아니면 됨)
 *          [O][P]    [P][O]
 */
function check(place) {
    for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
            if (place[r][c] !== 'P') continue;
            // PP case
            if (c != 4 && place[r][c + 1] === 'P') return 0;
            if (r != 4 && place[r + 1][c] === 'P') return 0;
            // POP case
            if (c < 3 && place[r][c + 1] === 'O' && place[r][c + 2] === 'P') return 0;
            if (r < 3 && place[r + 1][c] === 'O' && place[r + 2][c] === 'P') return 0;
            // !PX\XP case
            if (c != 4 && r != 4 && place[r + 1][c + 1] === 'P' && place[r][c + 1] + place[r + 1][c] !== "XX") return 0;
            // !XP\PX case
            if (c != 0 && r != 4 && place[r + 1][c - 1] === 'P' && place[r][c - 1] + place[r + 1][c] !== "XX") return 0;
        }
    }
    return 1;
}
function solution(places) {
    return Array(5).fill().map((_, i) => check(places[i]));
}