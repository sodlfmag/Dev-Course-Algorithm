let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')
let k = Number(input[0])

// 부등호 넣기
let inequality = input[1].split(' ')

// 0~9까지 방문 처리할 배열 만들기
let visited = new Array(10).fill(false)

let result = []
let maxValue = ""
let minValue = ""

// 부등호 만족할 때, 최댓값, 최솟값 출력
function dfs(depth) {
    if(depth == k + 1) {
        let check = true // 부등호 만족하는지 확인
        for(let i = 0; i < k; i++) {
            if (inequality[i] == "<") {
                if(result[i] > result[i + 1]) check = false
            } else if(inequality[i] == ">") {
                if(result[i] < result[i + 1]) check = false
            }            
        }
        if(check) { // 모든 수가 부등호 만족한다면
            maxValue = ""
            for(let x of result) maxValue += x + ""
            if(minValue == "") minValue = maxValue 
        }
        return
    }
    for(let i = 0; i < 10; i++) {
        if(visited[i]) continue
        visited[i] = true
        result.push(i)
        dfs(depth + 1)
        visited[i] = false
        result.pop()
    }
}

dfs(0)
console.log(maxValue + "\n" + minValue)


