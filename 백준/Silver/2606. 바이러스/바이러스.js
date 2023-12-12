let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");
let n = Number(input[0]);
let m = Number(input[1]);
let graph = [];
for (let i = 1; i <= n; i++) graph[i] = [];
// 현재 노드와 인접한 노드들을 그래프로 표현
for (let i = 2; i <= m + 1; i++) {
  let [currentNode, nextNode] = input[i].split(" ").map(Number);
  graph[currentNode].push(nextNode);
  graph[nextNode].push(currentNode);
}

let cnt = 0;
let visited = new Array(n + 1).fill(false);
function dfs(currentNode) {
  visited[currentNode] = true; // 현재 노드 방문 처리
  cnt++;
  // 현재 노드와 연결된 다른 노드 방문
  for (nextNode of graph[currentNode]) {
    if (!visited[nextNode]) dfs(nextNode);
  }
}
dfs(1);
console.log(cnt - 1); // 1번 노드를 제외한 수
