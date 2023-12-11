const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n').map(x=>x.split(' ').map(x=>+x));

const board = [];
const moderator = [];
for(let i=0; i<5; i++) {
  board.push(input[i]);
  moderator.push(input[i+5]);
}
let bingo = 0;

function checkVisited(num) {
  let i, j;
  outerFor: for(i=0; i<5; i++) {
    innerFor: for(j=0; j<5; j++) {
      if(board[i][j] === num) {
        board[i][j] = 0; // 해당 값을 찾아서 0으로 변경 (방문 표시)
        break outerFor;
      }
    }
  }
  return [i,j];
}

function checkBingo(r, c) {
  const colSum = board[r].reduce((acc, cur) => acc+=cur, 0);
  if(!colSum) bingo++;

  let rowSum = 0;
  for(let i=0; i<5; i++) {
    rowSum += board[i][c];
  }
  if(!rowSum) bingo++;

  let leftCrossSum = 0;
  if(r === c) { 
    for(let i=0; i<5; i++) {
      leftCrossSum += board[i][i];
    }
    if(!leftCrossSum) bingo++;
  }

  let rightCrossSum = 0;
  if(r+c === 4) {
    for(let i=0; i<5; i++) {
      rightCrossSum += board[i][4-i];
    }
    if(!rightCrossSum) bingo++;
  }
}

function solution() {
  let answer = 0;

  outerFor: for(let r=0; r<5; r++) {
    innerFor: for(let c=0; c<5; c++) {
      const [i, j] = checkVisited(moderator[r][c]); // 사회자가 부른 수를 하나씩 넣고 방문 처리
      checkBingo(i, j); // 방문 처리 후 빙고가 몇개인지 검사
      answer++;
      if(bingo >= 3) break outerFor;
    }
  }
  return answer;
}

console.log(solution());