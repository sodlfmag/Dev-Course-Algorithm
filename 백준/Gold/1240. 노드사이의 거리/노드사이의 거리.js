let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");

// 노드의 개수(n) A노드에서 B노드까지의 거리를 알고싶은 질의 수(m)
let [n, m] = input[0].split(" ").map(Number);

// x노드에서 y노드까지의 거리 넣을 그래프 만들기
let graph = [];
for (let i = 1; i <= n; i++) graph[i] = [];
for (let i = 1; i < n; i++) {
  let [x, y, cost] = input[i].split(" ").map(Number);
  graph[x].push([y, cost]);
  graph[y].push([x, cost]);
}

// x노드에서 y노드까지 거리를 계산해줄 재귀 함수 만들기
function dfs(x, dist) {
  if (visited[x]) return;
  visited[x] = true;
  distance[x] = dist;
  for (let [y, cost] of graph[x]) dfs(y, dist + cost);
}

// 질의 m개 만큼 호출하기
for (let i = 0; i < m; i++) {
  let [x, y] = input[n + i].split(" ").map(Number);
  visited = new Array(n + 1).fill(false); // 질의 호출할 때 마다 방문 처리 초기화
  distance = new Array(n + 1).fill(0); // 질의 호출할 때 마다 거리 초기화
  dfs(x, 0);
  console.log(distance[y]);
}
