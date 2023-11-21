let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let [n, m] = input[0].split(' ').map(Number)

// 1~n까지 수 배열에 넣기
let arr = []
for(let i = 1; i <= n; i++) arr.push(i)
// 선택된 수의 인덱스
let selected = []

let answer = ""
function dfs(arr, depth) {
    if(depth == m) {
        let result = []
        for(let i of selected) result.push(arr[i]) // 선택된 인덱스에 해당하는 수를 배열에 넣은 후 
        for(let x of result) answer += x + " " // 차례대로 출력
        answer += "\n"
        return
    }
    for(let i = 0; i < arr.length; i++) { // 중복된 수도 포함
        selected.push(i)
        dfs(arr, depth + 1)
        selected.pop()
    }
}

dfs(arr, 0)
console.log(answer)