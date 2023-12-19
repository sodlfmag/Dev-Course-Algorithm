const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split('\n');

const n = input.shift();
let answer = 0;
let result = [];
const perMin = input.shift().split(' ').map(x => +x).sort((a, b) => a - b);

for (let i = 0; i < n; i++) {
    result.push(answer += perMin[i]);
}

console.log(result.reduce((a, b) => a + b));
