/* 입력 */
let fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : __dirname + "\\input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

// n 추출, board 추출
const n = Number(input[0]);
let board = [];
for (let i = 1; i <= n; i++) {
  board.push(input[i].trim().split(" ").map(Number));
}

const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];

/* 풀이 코드 */
const check = (x, y) => {
  if (0 <= x && x < n && 0 <= y && y < n) return true;
  return false;
};

// 현재 분리되어 있는 섬 구분하기 -> board 배열에 각각 분리되어 있는 섬을 구분하기 위해 islandCnt변수를 사용하여 서로 다른값을 저장함
// ex) 현재 2개로 분리된 섬이 있다면, 첫번째 BFS에서는 board[i][j] = 1을 저장(islandCnt = 1인 상태)하여 1번섬을 구분하고,
//     두번째 BFS에서는 board[i][j] = 2를 저장(islandCnt = 2인 상태)하여 2번섬을 구분한다.
const islandCntBFS = (i, j) => {
  const q = [];
  visited[i][j] = true;
  board[i][j] = islandCnt;
  q.push([i, j]);
  while (q.length > 0) {
    const [x, y] = q.shift();

    for (let i = 0; i < 4; i++) {
      const x_ = x + dx[i];
      const y_ = y + dy[i];
      if (check(x_, y_) && !visited[x_][y_]) {
        if (board[x_][y_] === 1) {
          board[x_][y_] = islandCnt;
          visited[x_][y_] = true;
          q.push([x_, y_]);
        } else if (board[x_][y_] === 0 && !isPushed[x][y]) {
          isPushed[x][y] = true;
          borderQ.push([x, y]);
        }
      }
    }
  }
};

const visited = Array.from({ length: n }, () => new Array(n).fill(false));
const isPushed = Array.from({ length: n }, () => new Array(n).fill(false));
let islandCnt = 1;
const borderQ = [];
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (!visited[i][j] && board[i][j] === 1) {
      islandCntBFS(i, j);
      islandCnt += 1;
    }
  }
}

const findMinDistBFS = () => {
  let res = Infinity;
  while (borderQ.length > 0) {
    const [x, y] = borderQ.shift();
    for (let i = 0; i < 4; i++) {
      let x_ = x + dx[i];
      let y_ = y + dy[i];
      if (check(x_, y_)) {
        if (!board[x_][y_]) {
          // 인접한 곳이 바다일 경우
          board[x_][y_] = board[x][y];
          distance[x_][y_] = distance[x][y] + 1;
          borderQ.push([x_, y_]);
        } else if (board[x_][y_] !== board[x][y]) {
          // 인접한 곳이 다른 섬일 경우
          res = Math.min(res, distance[x_][y_] + distance[x][y]);
        }
      }
    }
  }
  console.log(res);
};

const distance = Array.from({ length: n }, () => new Array(n).fill(0));
findMinDistBFS();
