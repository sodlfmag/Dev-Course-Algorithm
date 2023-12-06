let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");

let [r, c] = input[0].split(" ").map(Number);
let board = [];
for (let i = 1; i <= r; i++) {
    board[i-1] = input[i].split('');
}

let visited = new Array(26).fill(false);

let dx = [-1, 1, 0, 0];
let dy = [0, 0, -1, 1];
let maxDepth = 0;

function dfs(depth, x, y) {
  maxDepth = Math.max(maxDepth, depth);
  for (let i = 0; i < 4; i++) {
    let nx = x + dx[i];
    let ny = y + dy[i];
//    if (nx < 0 || nx >= r || ny < 0 || ny >= c) continue;
//    if (visited[board[nx][ny].charCodeAt() - 65] == true) continue;
//    visited[board[nx][ny].charCodeAt() - 65] = false;
//    dfs(depth + 1, nx, ny);
//    visited[board[nx][ny].charCodeAt() - 65] = true;
    if(nx >= 0 && nx < r && ny >= 0 && ny < c) {
        if(visited[board[nx][ny].charCodeAt() - 65] == false) {
            visited[board[nx][ny].charCodeAt() - 65] = true
            dfs(depth + 1, nx, ny)
            visited[board[nx][ny].charCodeAt() - 65] = false
        }
    }
  }
}
visited[board[0][0].charCodeAt() - 65] = true;
dfs(1, 0, 0);
console.log(maxDepth);