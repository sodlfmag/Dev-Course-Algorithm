let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')
let testCases = Number(input[0])
let line = 1;
while(testCases--) {
    let [m, n, k] = input[line].split(' ').map(Number)
    let graph = []
    for(let i = 0; i < n; i++) graph[i] = new Array(m)
    for(let i = 1; i <= k; i++) {
        let [row, column] = input[line + i].split(' ').map(Number)
        graph[column][row] = 1
    }
    let answer = 0
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < m; j++) {
            if(dfs(graph, n, m, i, j)) answer++
        }
    }
    console.log(answer)
    line += k + 1

}

    function dfs(graph, n, m, column, row) {
        if(column < 0 || column >= n || row < 0 || row >= m){
            return false
        }
        if(graph[column][row] == 1) {
            graph[column][row] = -1 // 방문 처리
            dfs(graph, n, m, column - 1, row) // 상
            dfs(graph, n, m, column + 1, row) // 하
            dfs(graph, n, m, column, row - 1) // 좌
            dfs(graph, n, m, column, row + 1) // 우
            return true
        }
        return false
    }    

