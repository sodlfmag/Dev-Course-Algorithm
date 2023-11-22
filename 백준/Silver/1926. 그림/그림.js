/* 입력 */
let fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : __dirname + "\\input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

// row, col 추출
let [row, col] = input[0].trim().split(" ").map(Number);

// paper 추출
const paper = [];
for (let i = 1; i <= row; i++) {
  paper.push(input[i].trim().split(" ").map(Number));
}

/* 문제 풀이 */
let cnt = 0; // 총 그림 갯수
let maxSize = 0; // 가장 큰 그림 사이즈

const check = (x, y, row, col) => {
  if (0 <= x && x < row && 0 <= y && y < col) return true;
  else return false;
};

const BFS = (i, j) => {
  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];
  let size = 1; // 하나의 그림을 구성하는 종이 갯수
  const q = [];

  paper[i][j] = 0;
  q.push([i, j]);

  while (q.length > 0) {
    let [x, y] = q.shift();

    for (let k = 0; k < 4; k++) {
      let x_ = x + dx[k];
      let y_ = y + dy[k];

      if (check(x_, y_, row, col) && paper[x_][y_] === 1) {
        paper[x_][y_] = 0; // 방문 처리
        size += 1;
        q.push([x_, y_]);
      }
    }
  }
  return size;
};

for (let i = 0; i < row; i++) {
  for (let j = 0; j < col; j++) {
    if (paper[i][j] === 1) {
      cnt += 1;
      maxSize = Math.max(BFS(i, j), maxSize);
    }
  }
}

console.log(cnt);
console.log(maxSize);
