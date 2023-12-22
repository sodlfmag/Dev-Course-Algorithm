let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");

let [n, m] = input[0].split(" ").map(Number);

// 전체 도시의 좌표 중 집과 치킨집의 좌표를 따로 배열에 넣어주기
let house = [];
let chicken = [];

for (let i = 1; i <= n; i++) {
  let line = input[i].split(" ").map(Number);
  for (let j = 0; j < n; j++) {
    if (line[j] == 1) house.push([i, j]);
    if (line[j] == 2) chicken.push([i, j]);
  }
}

// 치킨 집 방문 처리 배열
let visited = new Array(chicken.length).fill(false);
// 선택된 치킨 집들의 좌표 인덱스
let selected = [];
// 정답 초기 값 설정
let answer = 1e9;
dfs(0, 0);
console.log(answer);

// 치킨 집들 중에서 m개를 고른 후, m개의 조합들 중 도시 치킨 거리가 가장 작은 최솟값 구하기
function dfs(depth, start) {
  if (depth == m) {
    let result = []; // 조합들의 치킨집 좌표 넣을 곳
    for (let i of selected) result.push(chicken[i]);
    let sum = 0;
    // 치킨 거리들의 합(치킨 도시 거리) 중 최소값 구하기
    for (let [hx, hy] of house) {
      let temp = 1e9;
      // 집에서 치킨 집까지의 거리들 중 최소 거리 구하기(치킨 거리)
      for (let [cx, cy] of result) {
        temp = Math.min(temp, Math.abs(hx - cx) + Math.abs(hy - cy));
      }
      sum += temp;
    }
    answer = Math.min(answer, sum);
    return;
  }
  for (let i = start; i < chicken.length; i++) {
    if (visited[i]) continue;
    visited[i] = true;
    selected.push(i);
    dfs(depth + 1, i + 1);
    visited[i] = false;
    selected.pop();
  }
}
