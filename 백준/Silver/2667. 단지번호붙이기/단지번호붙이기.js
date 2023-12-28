let file = require('fs').readFileSync('/dev/stdin');
let input = file.toString().split('\n');

// 맵의 크기(N)
let n = Number(input[0]);

// 집의 위치가 담긴 지도
let map = [];
for (let i = 1; i <= n; i++) {
    map.push(input[i].split('').map(Number));
}

// 단지의 "집의 수" 넣을 배열
let answer = [];

// 지도의 좌표 확인하여 단지의 "집의 수" answer 배열에 넣기
for (let x = 0; x < n; x++) {
    for (let y = 0; y < n; y++) {
        let current = dfs(x, y);
        if (current > 0) answer.push(current);
    }
}

answer.sort((a, b) => a - b); // 오름 차순으로 출력하기 위해
console.log(answer.length + '\n' + answer.join('\n'));

// 상, 하, 좌, 우 확인하여 집이 있다면 단지의 "집의 수" 세기
function dfs(x, y) {
    if (x < 0 || x >= n || y < 0 || y >= n) return 0; // 지도 벗어 났을 때
    // 지도에서 집이 있는 좌표라면
    if (map[x][y] === 1) {
        map[x][y] = -1; // 방문 처리
        let result = 1;
        result += dfs(x - 1, y);
        result += dfs(x + 1, y);
        result += dfs(x, y - 1);
        result += dfs(x, y + 1);
        return result;
    }
    return 0;
}
