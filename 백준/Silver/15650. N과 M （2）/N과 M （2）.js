let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

// 1. n, m 설정
let [n, m] = input[0].split(' ').map(Number)

// 2. 1~n까지 배열에 넣기
let arr = []
for(let i = 1; i <= n; i++) arr.push(i)

// 3. 1~n까지 각 원소의 방문 여부 확인
let visited = new Array(n).fill(false)
let selected = []

let answer = ""
function dfs(arr, depth, start) {
    if(depth == m) {
        let result = []
        for(let i of selected) result.push(arr[i])
        for(let x of result) answer += x + " "
        answer +="\n"
        return
    }
    for(let i = start; i < arr.length; i++) {
        if(visited[i]) continue // 이미 방문했다면 넘어가기
        selected.push(i) // 방문하지 않았다면 선택하기 
        visited[i] = true // 선택한 요소를 방문 처리 하기
        dfs(arr, depth + 1, i + 1) // 재귀함수를 이용하여 다음 요소의 인덱스 호출하기
        selected.pop()
        visited[i] = false
    }
}

dfs(arr, 0 , 0)
console.log(answer)
