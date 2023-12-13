const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const N = +input[0];
const X = input[1].split(' ').map(Number);
const set = new Set([...X].sort((a, b) => a - b)); // set 객체를 쓴 이유 : 중복제거
const sortedX = [...set];
const idxMap = new Map();

sortedX.forEach((x, idx) => {
  idxMap.set(x, idx); // 좌표값, 인덱스 번호 저장
})

function solution() {
  let answer = [];
  X.forEach((x, idx)=>{
    answer[idx] = idxMap.get(x);
  })
  return answer.join(' ');
}  

console.log(solution());