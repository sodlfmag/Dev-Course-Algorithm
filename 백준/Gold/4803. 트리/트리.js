let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");

let line = 0;
let testCase = 1;

let graph = [];
let visited = [];

while (true) {
  let [n, m] = input[line].split(" ").map(Number);
  if (n == 0 && m == 0) break;
  // 그래프에 연결된 노드 입력
  graph = []; // 그래프 초기화
  for (let i = 1; i <= n; i++) graph[i] = [];
  for (let i = 1; i <= m; i++) {
    let [currentNode, nextNode] = input[line + i].split(" ").map(Number);
    graph[currentNode].push(nextNode);
    graph[nextNode].push(currentNode);
  }
  // 방문 처리 배열 초기화
  visited = new Array(n + 1).fill(false);
  let cnt = 0;
  // 노드에 방문하지 않았고 사이클이 아니라면,
  for (let i = 1; i <= n; i++) {
    if (!visited[i]) {
      if (!isCycle(i, 0)) cnt++;
    }
  }
  if (cnt == 0) console.log(`Case ${testCase}: No trees.`);
  else if (cnt == 1) console.log(`Case ${testCase}: There is one tree.`);
  else console.log(`Case ${testCase}: A forest of ${cnt} trees.`);

  line += m + 1;
  testCase++;
}

// 사이클 여부 확인 함수
function isCycle(currentNode, previousNode) {
  // 현재 노드 방문 처리
  visited[currentNode] = true;
  // 현재 노드와 연결된 다음 노드들 중
  for (let nextNode of graph[currentNode]) {
    // 다음 노드가 방문하지 않은 노드라면,
    if (!visited[nextNode]) {
      // 재귀함수를 호출하여 방문 처리 후
      // 만약 사이클이라면, true
      if (isCycle(nextNode, currentNode)) return true;
    }
    // 방문한 적 있는 노드지만, 직전 노드가 아니라면, 사이클
    else if (nextNode != previousNode) return true;
  }
  return false;
}
