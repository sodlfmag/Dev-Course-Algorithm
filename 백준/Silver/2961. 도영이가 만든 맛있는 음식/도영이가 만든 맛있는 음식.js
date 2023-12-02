let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");

let n = Number(input[0]);
let taste = [];
for (let i = 1; i <= n; i++) {
  let [sourTaste, bitterTaste] = input[i].split(" ").map(Number);
  taste.push([sourTaste, bitterTaste]);
}

let visited = new Array(n).fill(false);
let result = []; // 조합 결과
let answer = 1e9;

function dfs(depth, start) {
  // 모든 길이의 모든 조합 중 최솟값을 구하라
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
  /*
    새로운 조합을 찾을 때마다, 선택한 맛 이후의 맛만 고려
    start를 사용하면 프로그램이 이미 선택한 것 이후의 것만 살펴보며 조합하여 
    중복 없이 효율적으로 원하는 결과를 얻을 수 있다
  */
  for (let i = start; i < n; i++) {
    if (visited[i]) continue;
    visited[i] = true;
    result.push(i);
    dfs(depth + 1, i + 1);
    visited[i] = false;
    result.pop();
  }
}

dfs(0, 0);
console.log(answer);
