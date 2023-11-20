/* 입력 */
let fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : __dirname + "\\input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

// n, m 추출
let [n, m] = input[0].trim().split(" ").map(Number);

// board 추출
const board = [];
for (let i = 1; i <= n; i++) {
  board.push(input[i].trim().split("").map(Number));
}

/* 풀이 코드 */
const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];
const check = (x, y, n, m) => {
  if (0 <= x && x < n && 0 <= y && y < m) return true;
  else return false;
};
const bfs = () => {
  const q = [];
  q.push([0, 0, 1]);
  let idx = 0;

  while (q.length > 0) {
    let [x, y, d] = q.shift();

    if (x === n - 1 && y === m - 1) return board[x][y];

    for (let i = 0; i < 4; i++) {
      let x_ = x + dx[i];
      let y_ = y + dy[i];
      if (check(x_, y_, n, m) && board[x_][y_] === 1) {
        board[x_][y_] = d + 1; // 방문 처리 & 거리 갱신
        q.push([x_, y_, d + 1]);
      }
    }
  }
  return board[n - 1][m - 1];
};

console.log(bfs());
