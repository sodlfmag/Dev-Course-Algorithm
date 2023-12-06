/* 입력 */
let fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : __dirname + "\\input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

// n 추출
let n = Number(input[0]);
const board = [];
for (let i = 1; i <= n; i++) {
  board.push(input[i].trim().split(""));
}

/* 풀이 코드 */
const check = (x, y) => {
  if (0 <= x && x < n && 0 <= y && y < n) return true;
  else return false;
};

const BFS = (i, j, color, RGblindness) => {
  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];
  const q = [];
  q.push([i, j]);

  while (q.length > 0) {
    const [x, y] = q.shift();

    for (let a = 0; a < 4; a++) {
      let x_ = x + dx[a];
      let y_ = y + dy[a];
      if (RGblindness) {
        // 적록색약인 경우
        if (color === "B") {
          if (check(x_, y_) && board[x_][y_] === color && !visited[x_][y_]) {
            visited[x_][y_] = true; // 방문 처리
            q.push([x_, y_]);
          }
        } else {
          // "R" 또는 "G"구역은 동일한 구역으로 처리
          if (check(x_, y_) && board[x_][y_] !== "B" && !visited[x_][y_]) {
            visited[x_][y_] = true; // 방문 처리
            q.push([x_, y_]);
          }
        }
      } else {
        // 적록색약 아닌 사람인 경우
        if (check(x_, y_) && board[x_][y_] === color && !visited[x_][y_]) {
          visited[x_][y_] = true; // 방문 처리
          q.push([x_, y_]);
        }
      }
    }
  }
};

let rgb = 0; // 적록색약이 아닌 사람이 보는 구역의 갯수
let visited = Array.from(new Array(n), () => new Array(n).fill(false));
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (!visited[i][j]) {
      rgb += 1;
      visited[i][j] = true;
      BFS(i, j, board[i][j], false);
    }
  }
}

let rg = 0; // 적록색약이 보는 구역의 갯수
visited = Array.from(new Array(n), () => new Array(n).fill(false));
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (!visited[i][j]) {
      rg += 1;
      visited[i][j] = true;
      BFS(i, j, board[i][j], true);
    }
  }
}

console.log(rgb, rg);
