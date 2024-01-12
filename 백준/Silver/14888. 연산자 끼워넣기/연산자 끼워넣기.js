let file = require('fs').readFileSync('/dev/stdin');
let input = file.toString().split('\n');

let n = Number(input[0]); // 값의 개수
let arr = input[1].split(' ').map(Number); // 연산 수행할 값 리스트
let [add, sub, mul, div] = input[2].split(' ').map(Number); // + - * / 연산자의 개수 넣기

let minValue = 1e9;
let maxValue = -1e9;

dfs(1, arr[0]);
console.log(maxValue);
console.log(minValue);

function dfs(index, value) {
    if (index == n) {
        minValue = Math.min(minValue, value);
        maxValue = Math.max(maxValue, value);
    }
    if (add > 0) {
        add--;
        dfs(index + 1, value + arr[index]);
        add++;
    }
    if (sub > 0) {
        sub--;
        dfs(index + 1, value - arr[index]);
        sub++;
    }
    if (mul > 0) {
        mul--;
        dfs(index + 1, value * arr[index]);
        mul++;
    }
    if (div > 0) {
        div--;
        dfs(index + 1, ~~(value / arr[index]));
        div++;
    }
}
