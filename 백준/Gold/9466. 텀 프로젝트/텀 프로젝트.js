let file = require('fs').readFileSync('/dev/stdin');
let input = file.toString().split('\n');

let testCase = Number(input[0]);
let line = 1;

for (let t = 0; t < testCase; t++) {
    let n = Number(input[line]);
    // graph = [0, 3, 1, 3, 7, 3, 4, 6]
    let graph = [0, ...input[line + 1].split(' ').map(Number)];

    let visited = new Array(n + 1).fill(false);
    let finished = new Array(n + 1).fill(false);
    let result = [];

    for (let x = 1; x <= n; x++) {
        if (!visited[x]) dfs(x, graph, visited, finished, result);
    }

    line += 2;
    console.log(n - result.length);
}

function dfs(currentNode, graph, visited, finished, result) {
    visited[currentNode] = true;
    let nextNode = graph[currentNode]; // 다음 노드
    // 다음 노드를 아직 방문하지 않았다면
    if (!visited[nextNode]) {
        dfs(nextNode, graph, visited, finished, result);
        /* 
        다음 노드를 방문한 적 있고, 처리가 완료되지 않았다면
        사이클이 발생한 것. 사이클에 포함된 노드 저장
        */
    } else if (!finished[nextNode]) {
        while (nextNode != currentNode) {
            result.push(nextNode);
            nextNode = graph[nextNode];
        }
        result.push(currentNode);
    }
    finished[currentNode] = true; // 현재 노드 처리 완료
}
