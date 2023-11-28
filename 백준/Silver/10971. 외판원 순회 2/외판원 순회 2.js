let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let n = Number(input[0])

// i도시에서 j도시로 가는 비용 인접 행렬로 표현
let graph = []
for(let i = 0; i <= n; i++) graph.push([0])
for(let i = 1; i <= n; i++) {
   let expense = input[i].split(' ').map(Number)
   for(let j = 0; j < n; j++) graph[i].push(expense[j])
}
/* graph = [방문을 첫번째 도시부터 하도록 0번째를 비워둠
            [0],
            [0, 10, 15, 20], graph[1][0]이 1번째 도시에서 1번째 도시로의 이동이다
            [5, 0, 9, 10],
            [6, 13, 0, 12],
            [8, 8, 9, 0]
           ] */
let visited = new Array(11).fill(false) // 0~10까지의 위치
let selectedCity = []
let minValue = 1e9

function dfs(depth) {
    // 어떤 노드에서 시작하던 다시 시작한 노드로 돌아가야하니 그 전까지의 값만 먼저 구하기
    if(depth == n - 1) {
        let totalCost = 0; // 전체 비용
        let curCity = 1; // 현재 도시 설정
        for(let i = 0; i < n - 1; i++) {
            let nextCity = selectedCity[i] // 다음 도시 설정
            let cost = graph[curCity][nextCity]
            if(cost == 0) return
            totalCost += cost
            curCity = nextCity
        }
        // 마지막 도시는 시작한 도시인 1로 가기
        let cost = graph[curCity][1]
        if(cost == 0) return
        totalCost += cost
        // 1~N도시까지의 순회 비용 중 가장 작은 것
        minValue = Math.min(minValue, totalCost)
    }
    for(let i = 2; i <= n; i++) {
        if(visited[i]) continue
        selectedCity.push(i)
        visited[i] = true
        dfs(depth + 1)
        selectedCity.pop()
        visited[i] = false
    }
}

dfs(0)
console.log(minValue)
