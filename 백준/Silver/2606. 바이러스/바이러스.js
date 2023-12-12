let fs =require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')
let n = Number(input[0])
let m = Number(input[1]) // 6
let graph = []
// 컴퓨터 번호에 대한 인접리스트 생성 ex)1번 컴퓨터와 연결된 모든 컴퓨터 [2, 5]
for(let i = 1; i <=n; i++) graph[i] = []
for(let i = 2; i <= m + 1; i++) {
    let [x, y] = input[i].split(' ').map(Number)
    // ex)[x, y] 는 [1, 2], [1, 5] 이런 형태 즉, graph[1]에 y좌표만 넣는다
    graph[x].push(y)
    graph[y].push(x)
}
let cnt = 0
let visited = Array(n + 1).fill(false)
function dfs(x) {
    visited[x] = true
    cnt++
    for(y of graph[x]) {
        if(!visited[y]) dfs(y) 
    }
}

dfs(1)
console.log(cnt - 1)