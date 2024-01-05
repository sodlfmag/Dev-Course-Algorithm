/* 입력 */
let fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : __dirname + "\\input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

// k, row, col 추출
const k = Number(input[0]);
const [col, row] = input[1].trim().split(" ").map(Number);

// board 추출
let board = [];
for (let i = 2; i < row + 2; i++) {
  board.push(input[i].trim().split(" ").map(Number));
}

const move = Array.from({ length: k + 1 }, () =>
  Array.from({ length: row }, () => new Array(col).fill(Infinity)),
); // 말의 좌표로 이동 가능한 횟수 만큼의 2차원 배열 생성(=3차원 배열)
const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];
const horse = [
  [-1, -2],
  [-2, -1],
  [-2, 1],
  [-1, 2],
  [1, 2],
  [2, 1],
  [2, -1],
  [1, -2],
]; // 말이 이동 가능한 좌표

/* 풀이 코드 */
const check = (x, y) => {
  if (0 <= x && x < row && 0 <= y && y < col) return true;
  return false;
};

const BFS = () => {
  const q = [];
  q.push([0, 0, 0]); // [x좌표, y좌표, 말 좌표 이동 횟수]
  move[0][0][0] = 0;
  while (q.length > 0) {
    const [x, y, cnt] = q.shift();
    if (x === row - 1 && y === col - 1) return;

    // 일반 이동 -> cnt 그대로
    for (let i = 0; i < 4; i++) {
      let x_ = x + dx[i];
      let y_ = y + dy[i];
      if (check(x_, y_) && board[x_][y_] === 0 && move[cnt][x_][y_] > move[cnt][x][y] + 1) {
        move[cnt][x_][y_] = move[cnt][x][y] + 1;
        q.push([x_, y_, cnt]);
      }
    }

    if (cnt < k) {
      // k횟수가 남은 경우에는 말의 좌표 위치로 이동시킴 -> cnt + 1
      for (let i = 0; i < 8; i++) {
        let xx_ = x + horse[i][0];
        let yy_ = y + horse[i][1];

        if (
          check(xx_, yy_) &&
          board[xx_][yy_] === 0 &&
          move[cnt + 1][xx_][yy_] > move[cnt][x][y] + 1
        ) {
          move[cnt + 1][xx_][yy_] = move[cnt][x][y] + 1;
          q.push([xx_, yy_, cnt + 1]);
        }
      }
    }
  }
};

BFS();
res = Math.min(...move.map((arr) => arr[row - 1][col - 1]));
res !== Infinity ? console.log(res) : console.log(-1);
