/* 입력 */
let fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : __dirname + "\\input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

// T 추출, T 횟수만큼 반복
let T = Number(input[0].trim()); // 테스트케이스 횟수
let idx = 1; // 각 테케마다 [col, row, k]를 추출하는 idx를 저장

while (T--) {
  const [col, row, k] = input[idx].trim().split(" ").map(Number);

  const board = Array.from(new Array(row), () => new Array(col).fill(0));
  for (let i = idx + 1; i <= idx + k; i++) {
    const [y, x] = input[i].trim().split(" ").map(Number);
    board[x][y] = 1; // 배추가 존재하는 위치 = 1
  }

  /* 풀이 코드 */
  const check = (x, y) => {
    if (0 <= x && x < row && 0 <= y && y < col) return true;
    else return false;
  };

  const BFS = (i, j) => {
    const dx = [-1, 0, 1, 0];
    const dy = [0, 1, 0, -1];
    const q = [];

    board[i][j] = 0;
    q.push([i, j]);

    while (q.length > 0) {
      const [x, y] = q.shift();
      for (let a = 0; a < 4; a++) {
        let x_ = x + dx[a];
        let y_ = y + dy[a];
        if (check(x_, y_) && board[x_][y_] === 1) {
          board[x_][y_] = 0; // 방문 처리
          q.push([x_, y_]);
        }
      }
    }
  };

  let cnt = 0; // 배추 흰지렁이 갯수
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (board[i][j] === 1) {
        cnt += 1; // 배추 흰지렁이 갯수 + 1
        board[i][j] = 0;
        BFS(i, j);
      }
    }
  }
  console.log(cnt);
  idx += k + 1;
}
