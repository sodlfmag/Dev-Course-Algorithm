let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

// 자연수 n과 깊이 m 설정
let [n, m] = input[0].split(' ').map(Number)

// 1~n까지의 수를 배열에 넣어주기
let arr = []
for(let i = 1; i <= n; i++) arr.push(i)
// 선택된 수의 인덱스
let selected = []

let answer = ""
function dfs(arr, depth, start) {
    // 길이가 m인 선택된 자연수들을 출력하기
    if(depth == m) {
        let result = []
        for(let i of selected) result.push(arr[i])
        for(let x of result) answer += x + " "
        answer += "\n"
        return
    }
    // 재귀함수에 start 값을 설정해줌으로써 선택되는 값이 현재 값 이상이 되도록 설정
    for(let i = start; i <arr.length; i++) {
        selected.push(i)
        dfs(arr, depth + 1, i)
        selected.pop()
    }
}

dfs(arr, 0 , 0)
console.log(answer)