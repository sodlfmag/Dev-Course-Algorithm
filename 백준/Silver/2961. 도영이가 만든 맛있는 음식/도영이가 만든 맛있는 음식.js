let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");

let n = Number(input[0]);
let taste = [];
for (let i = 1; i <= n; i++) {
  let [sourTaste, bitterTaste] = input[i].split(" ").map(Number);
  taste.push([sourTaste, bitterTaste]);
}

let visited = new Array(n).fill(false);
let result = []; // 조합 길이에 따른 결과값
let answer = 1e9;

function dfs(depth) {
  // 모든 길이, 모든 조합 중 최솟값을 구하라
  if (depth >= 1) {
    let totalSourTaste = 1;
    let totalBitterTaste = 0;
    for (let i of result) {
      let [sourTaste, bitterTaste] = taste[i];
      totalSourTaste *= sourTaste;
      totalBitterTaste += bitterTaste;
    }
    answer = Math.min(answer, Math.abs(totalSourTaste - totalBitterTaste));
  }
  for (let i = 0; i < n; i++) {
    if (visited[i]) continue;
    visited[i] = true;
    result.push(i);
    dfs(depth + 1);
    visited[i] = false;
    result.pop();
  }
}

dfs(0);
console.log(answer);
