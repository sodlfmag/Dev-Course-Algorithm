let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let [n, m] = input[0].split(' ').map(Number) // 도시의 크기 N(행), 치킨 집 수(M)

let chicken = [] // 치킨집 위치 배열
let house = [] // 집 위치 배열

// 전체 도시 정보 중 치킨집과 집의 위치를 배열에 넣어주기
for(let i = 1; i <= n; i++) {
    let line = input[i].split(' ').map(Number)
    for(let j = 0; j < n; j++) {
        if(line[j] == 1) house.push([i, j])
        if(line[j] == 2) chicken.push([i, j])
    }
}

let visited = new Array(chicken.length).fill(false) // 치킨집 방문 여부 확인
let selected = [] // m개의 치킨집의 좌표 인덱스

let answer = 1e9
dfs(0, 0)
console.log(answer)

function dfs(depth, start) {
    if(depth == m) {
        let result = [] // 선택된 m개의 치킨 집의 좌표 넣기
        for(let i of selected) result.push(chicken[i])
        let sum = 0 // 치킨 거리(집과 치킨 집과의 최소 거리)의 합
        for(let [hx, hy] of house) {
            let temp = 1e9
            for(let [cx, cy] of result) {
                temp = Math.min(temp, Math.abs(hx - cx) + Math.abs(hy - cy))
            }
            sum += temp
        }
        answer = Math.min(answer, sum) // 도시 치킨 거리의 최솟값 구하기
        return
    }
    // start 지점부터 하나씩 원소 인덱스 확인
    for(let i = start; i < chicken.length; i++) {
        if(visited[i]) continue
        selected.push(i)
        visited[i] = true
        dfs(depth + 1, i + 1)
        selected.pop()
        visited[i] = false
    }
}