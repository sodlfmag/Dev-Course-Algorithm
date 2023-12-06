let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");

let [r, c] = input[0].split(" ").map(Number);

// 알파벳이 배치된 판 만들기
let board = [];
for (let i = 1; i <= r; i++) {
  board.push(input[i].split(""));
}

// 모든 알파벳에 방문 처리 배열
let visited = new Array(26).fill(false);

// 좌표 설정(상, 하, 좌, 우)
let rowChanges = [-1, 1, 0, 0];
let colChanges = [0, 0, -1, 1];
let maxDepth = 0;

function dfs(depth, currentRow, currentCol) {
  maxDepth = Math.max(maxDepth, depth);
  for (let i = 0; i < 4; i++) {
    let nextRow = currentRow + rowChanges[i];
    let nextCol = currentCol + colChanges[i];
    // 보드 판 위에 존재할 때
    if (nextRow >= 0 && nextRow < r && nextCol >= 0 && nextCol < c) {
      // 'A'의 유니코드 값은 65
      // visited[0]에서 A의 방문 여부를 확인 가능
      if (visited[board[nextRow][nextCol].charCodeAt() - 65] == false) {
        visited[board[nextRow][nextCol].charCodeAt() - 65] = true;
        dfs(depth + 1, nextRow, nextCol);
        visited[board[nextRow][nextCol].charCodeAt() - 65] = false;
      }
    }
  }
}
// 시작지점의 알파벳 방문 처리
visited[board[0][0].charCodeAt() - 65] = true;
// 시작지점 방문 처리했으므로 1부터 depth 1부터 시작
dfs(1, 0, 0);
console.log(maxDepth);
