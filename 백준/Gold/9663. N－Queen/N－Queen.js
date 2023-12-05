let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");

let n = Number(input[0]);
// 퀸을 둔 좌표를 넣을 배열 만들기
let queens = [];
// 퀸이 같은 행, 열, 대각선에 위치해 있다면, false를 반환하는 함수 만들기
function possible(x, y) {
  for (let [row, column] of queens) {
    if (row == x || column == y) return false;
    if (Math.abs(row - x) == Math.abs(column - y)) return false;
  }
  return true;
}
// N x N 체스판에 N개의 퀸을 두는 모든 경우의 수를 카운트하는 함수 만들기
let cnt = 0;
function dfs(row) {
  if (row == n) {
    cnt += 1;
    return;
  }
  for (let column = 0; column < n; column++) {
    if (!possible(row, column)) continue;
    queens.push([row, column]); // 퀸을 놓을 수 있다면, 퀸을 둔 좌표 배열에 넣기
    dfs(row + 1);
    queens.pop();
  }
}
dfs(0);
console.log(cnt);
