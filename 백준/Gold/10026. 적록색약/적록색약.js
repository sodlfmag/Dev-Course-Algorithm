let file = require('fs').readFileSync('/dev/stdin');
let input = file.toString().split('\n');

let n = Number(input[0]); // 전체 맵 크기(N x N)

let map = [];
for (let i = 1; i <= n; i++) map.push(input[i].split(''));

// 상, 하, 좌, 우
let dx = [-1, 1, 0, 0];
let dy = [0, 0, -1, 1];

function dfs(x, y) {
    if (!visited[x][y]) {
        visited[x][y] = true;
        // 인접한 영역 하나씩 확인
        for (let i = 0; i < 4; i++) {
            let nx = x + dx[i];
            let ny = y + dy[i];
            if (nx < 0 || ny < 0 || nx >= n || ny >= n) continue; // 맵을 벗어나는 경우 무시
            if (map[x][y] == map[nx][ny]) dfs(nx, ny); // 같은 색상이라면 재귀 호출하여 방문처리
        }
        return true;
    }
    return false;
}

// 일반사람들이 보는 색의 구역 세기
let result1 = 0;
let visited = [];
for (let i = 0; i < n; i++) visited.push(new Array(n).fill(false));
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        if (dfs(i, j)) result1++;
    }
}

// R -> G로 변환
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        if (map[i][j] == 'R') map[i][j] = 'G';
    }
}

// 적록색약 사람들이 보는 색의 구역 세기
let result2 = 0;
visited = []; // 방문처리 초기화
for (let i = 0; i < n; i++) visited.push(new Array(n).fill(false));
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        if (dfs(i, j)) result2++;
    }
}

console.log(result1 + ' ' + result2);
