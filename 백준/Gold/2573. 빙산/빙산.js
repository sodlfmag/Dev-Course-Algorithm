/* 입력 */
let fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : __dirname + "\\input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

// n, k 추출
const [row, col] = input[0].trim().split(" ").map(Number);
let board = [];
const q = [];
for (let i = 1; i <= row; i++) {
  const arr = input[i].trim().split(" ").map(Number);
  board.push(arr);
  for (let j = 0; j < col; j++) {
    if (board[i - 1][j] > 0) {
      q.push([i - 1, j, 0]);
    }
  }
}

const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];

/* 풀이 코드 */
const check = (x, y) => {
  if (0 <= x && x < row && 0 <= y && y < col) return true;
  return false;
};

const massCntBFS = (i, j, visited) => {
  const q2 = [];
  q2.push([i, j]);
  visited[i][j] = true;

  while (q2.length) {
    const [x, y] = q2.shift();

    for (let i = 0; i < 4; i++) {
      let x_ = x + dx[i];
      let y_ = y + dy[i];
      if (check(x_, y_) && board[x_][y_] > 0 && !visited[x_][y_]) {
        visited[x_][y_] = true;
        q2.push([x_, y_]);
      }
    }
  }
};

const glacierBFS = () => {
  let preDay = 0;
  const copyBoard = board.map((arr) => [...arr]);
  while (q.length > 0) {
    const [x, y, day] = q.shift();

    if (preDay < day) {
      board = copyBoard.map((arr) => [...arr]);
      let cnt = 0;
      const visited = Array.from({ length: row }, () => new Array(col).fill(false));
      for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
          if (!visited[i][j] && board[i][j] > 0) {
            cnt += 1;
            massCntBFS(i, j, visited);
            if (cnt >= 2) return day;
          }
        }
      }
    }

    preDay = day;
    for (let i = 0; i < 4; i++) {
      let x_ = x + dx[i];
      let y_ = y + dy[i];
      if (check(x_, y_) && board[x_][y_] === 0 && copyBoard[x][y] > 0) {
        copyBoard[x][y] -= 1;
      }
      if (i === 3 && copyBoard[x][y] > 0) {
        q.push([x, y, day + 1]);
      }
    }
  }
  return 0;
};

console.log(glacierBFS());
