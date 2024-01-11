let file = require('fs').readFileSync('/dev/stdin');
let input = file.toString().split('\n');

let n = Number(input[0]);
let graph = [0];

// graph = [0, 3, 1, 1, 5, 5, 4, 6]
for (let i = 1; i <= n; i++) {
    graph.push(Number(input[i]));
}

let visited = new Array(n + 1).fill(false);
let finished = new Array(n + 1).fill(false);

let result = [];

for (let currentNode = 1; currentNode <= n; currentNode++) {
    if (!visited[currentNode]) dfs(currentNode, graph, visited, finished, result);
}

console.log(result.length);
result.sort((a, b) => a - b);
for (let x of result) console.log(x);

function dfs(currentNode, graph, visited, finished, result) {
    visited[currentNode] = true;
    let nextNode = graph[currentNode];
    // 다음 노드를 아직 방문하지 않았다면,
    if (!visited[nextNode]) dfs(nextNode, graph, visited, finished, result);
    // 다음 노드를 방문한 적 있고, 처리 완료되지 않았다면
    else if (!finished[nextNode]) {
        // 사이클 발생. 사이클에 포함된 노드 result에 저장
        while (nextNode != currentNode) {
            result.push(nextNode);
            nextNode = graph[nextNode];
        }
        result.push(nextNode);
    }
    finished[currentNode] = true;
}
