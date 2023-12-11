/* 입력 */
let fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : __dirname + "\\input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

// row, col 추출
const [row, col] = input[0].trim().split(" ").map(Number);

// board 추출
const board = [];
for (let i = 1; i <= row; i++) {
  const tmp = input[i].trim().split("").map(Number);
  board.push(tmp);
}

/* 풀이 코드 */
const check = (x_, y_) => {
  if (0 <= x_ && x_ < row && 0 <= y_ && y_ < col) return true;
  return false;
};

const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];

// 3차원 거리 배열 -> 벽 부수고 이동한 적 있는 경우 : distance[1][x][y], 벽 부수지 않고 이동하는 경우 : distance[0][x][y]
const distance = Array.from({ length: 2 }, () =>
  Array.from({ length: row }, () => new Array(col).fill(Infinity))
);

distance[0][0][0] = 1; // 문제에서 요구하는 최단거리 -> 시작하는 칸과 끝나는 칸도 포함하므로, 시작점 거리를 1로 초기화
distance[1][0][0] = 1;

const BFS = () => {
  const q = [];
  q.push([0, 0, 0]); // [x좌표, y좌표, 벽부수고 이동한적 있는지 없는지 파악하는 flag]

  let idx = 0;
  while (idx < q.length) {
    const [x, y, brokenWall] = q[idx++];

    for (let i = 0; i < 4; i++) {
      let x_ = x + dx[i];
      let y_ = y + dy[i];
      if (brokenWall === 0) {
        // 아직 벽부수고 이동한 적이 없는 경우에만(brokenWall===0), 벽 부수고 이동하는 경우의 좌표를 q에 추가
        if (
          check(x_, y_) &&
          distance[1][x_][y_] > distance[0][x][y] + 1 &&
          board[x_][y_] === 1
        ) {
          distance[1][x_][y_] = distance[0][x][y] + 1;
          q.push([x_, y_, 1]);
        }
      }

      if (
        check(x_, y_) &&
        distance[brokenWall][x_][y_] > distance[brokenWall][x][y] + 1 &&
        board[x_][y_] === 0
      ) {
        distance[brokenWall][x_][y_] = distance[brokenWall][x][y] + 1;
        q.push([x_, y_, brokenWall]);
      }
    }
  }
};

BFS();

const dis1 = distance[0][row - 1][col - 1],
  dis2 = distance[1][row - 1][col - 1];
if (dis1 === Infinity && dis2 === Infinity) {
  console.log(-1);
} else {
  console.log(Math.min(dis1, dis2));
}

/* 프로그래머스 유사 문제 -> PCCP 모의고사 2회_4번문제(보물지도) : https://school.programmers.co.kr/learn/courses/15009/lessons/121690 */
