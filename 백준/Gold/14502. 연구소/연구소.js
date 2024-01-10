let file = require('fs').readFileSync('/dev/stdin')
let input = file.toString().split('\n')

let [n, m] = input[0].split(' ').map(Number)

let map = [] // 초기 맵
let buildedMap = [] // 벽을 설치한 뒤의 맵

for(let i = 1; i <= n; i++) {
    let line = input[i].split(' ').map(Number)
    map.push(line)
    buildedMap.push(new Array(m).fill(0))
}

let dx = [0, 0, -1, 1]
let dy = [-1, 1, 0, 0]

let result = 0

// 바이러스 사방으로 퍼지도록 하기
function virus(x, y) {
    for(let i = 0; i < 4; i++) {
        let nx = x + dx[i]
        let ny = y + dy[i]
        if(nx < 0 || nx >= n || ny < 0 || ny >= m) continue // 맵의 범위를 벗어났다면 무시
        // 상, 하, 좌, 우로 이동한 좌표가 안전 영역이라면
        if(buildedMap[nx][ny] == 0) {
            buildedMap[nx][ny] = 2
            virus(nx, ny)
        }
    }
}

// 현재 맵에서 안전 영역의 크기 계산
function getScore() {
    let score = 0
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < m; j ++) {
            if(buildedMap[i][j] == 0) score += 1
        }
    }
    return score
}

// 벽을 세운 후, 안전 영역의 최댓값 구하는 dfs
function dfs(count) {
    if(count == 3) {
        for(let i = 0; i < n; i++) {
            for(let j = 0; j < m; j++) {
                buildedMap[i][j] = map[i][j]
            }
        }
        for(let i = 0; i < n; i++) {
            for(let j = 0; j < m; j++) {
                if(buildedMap[i][j] == 2) virus(i, j)
            }
        }
        result = Math.max(result, getScore())
        return result
    }
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < m; j++) {
            if(map[i][j] == 0) {
                map[i][j] = 1
                dfs(count + 1)
                map[i][j] = 0
            }
        }
    }
}

dfs(0)
console.log(result)