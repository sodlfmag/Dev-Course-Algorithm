let file = require('fs').readFileSync('/dev/stdin');
let input = file.toString().split('\n');

let n = Number(input[0]);

let arr = input[1].split(' ').map(Number);
let visited = new Array(n).fill(false); // 방문 처리 배열

let result = [];
let maxValue = 0;

dfs(0);
console.log(maxValue);

function dfs(depth) {
    if (depth == n) {
        let currentValue = 0;
        for (let i = 0; i < n - 1; i++) currentValue += Math.abs(result[i] - result[i + 1]);
        maxValue = Math.max(maxValue, currentValue);
    }
    for (let i = 0; i < n; i++) {
        if (visited[i]) continue;
        visited[i] = true;
        result.push(arr[i]);
        dfs(depth + 1);
        result.pop();
        visited[i] = false;
    }
}
