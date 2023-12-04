let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

for(let i = 0; i < input.length; i++) {
    let data = input[i].split(' ').map(Number)
    if(data[0] == 0) break
    else {
        let k = data[0]
        let arr = data.slice(1) //index 1부터 추출하여 arr이라는 새로운 배열 생성
        let visited = new Array(k).fill(false)
        let selected = []
        answer = ""
        function dfs(depth, start) {
            if(depth == 6) {
                let result = []
                for(let i of selected) result.push(arr[i])
                for(let x of result) answer += x + " "
                answer += "\n"
                return
            }
            for(let i = start; i < k; i++) {
                if(visited[i]) continue
                selected.push(i)
                visited[i] = true
                dfs(depth + 1, i + 1)
                selected.pop()
                visited[i] = false
            }
        }
        dfs(0, 0)
        console.log(answer)
    }
}