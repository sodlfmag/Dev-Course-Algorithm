const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split('-');

let result = input.map((x) => {
    let cal = x.split('+');
    return cal.reduce((a, b) => Number(a) + Number(b), 0);
});

console.log(result.reduce((a, b) => a - b));

// 먼저 '-'를 기준으로 문자열을 분리한다. 분리된 문자열을 다시 '+'를 기준으로 분리하여 값을 합산해준다.
// 마지막에 더해진 값을 빼준다. ('-'로 분리하면 '-' 뒤의 문자열이 가장 큰 숫자로 빼기가 가능하다. 최솟값 도출)
