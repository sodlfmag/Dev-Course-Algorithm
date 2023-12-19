const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split(' ').map(x => +x);

const [month, day] = input;

const whatDay = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const whatMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let cal = 0;

for (let i = 0; i < month - 1; i++) {
    cal += whatMonth[i];
}

console.log(whatDay[(cal + (day - 1)) % 7]);
