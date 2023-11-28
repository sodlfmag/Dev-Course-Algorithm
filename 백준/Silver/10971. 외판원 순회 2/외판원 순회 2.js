let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let n = Number(input[0]) // 도시 수
let graph = [] // i에서 j도시까지의 비용 넣을 인접 행렬
for(let i = 0; i <= n; i++) graph.push([0])
for(let i = 1; i <= n; i++) {
    let line = input[i].split(' ').map(Number)
    for(let j = 0; j < n; j++) graph[i].push(line[j])
}

let visited = new Array(11).fill(false) // 방문 처리 배열
let selectedCity = [] // 방문하지 않은 도시
let minValue = 1e9 // 최소 값 설정

function dfs(depth) {
    if(depth == n - 1) {
        let totalCost = 0
        let currentCity = 1
        // 1. 마지막을 제외한 n-1까지의 비용 더하기
        for(let i = 0; i < n - 1; i++) {
            let nextCity = selectedCity[i]
            let cost = graph[currentCity][nextCity]
            if(cost == 0) return
            totalCost += cost
            currentCity = nextCity
        }
        // 2. 마지막으로 1로 되돌아가는 비용 더하기
        let cost = graph[currentCity][1]
        if(cost == 0) return
        totalCost += cost
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