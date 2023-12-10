/* 입력 */
let fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : __dirname + "\\input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

// T 추출
let T = Number(input[0]);

let idx = 1;
while (T--) {
  // row, col 추출
  const [col, row] = input[idx++].trim().split(" ").map(Number);

  // board 추출, 상근이 위치와 불이 있는 위치 찾기
  const board = [];
  let sang = [];
  const fire = [];
  for (let i = 0; i < row; i++) {
    const tmp = input[idx++].trim().split("");
    board.push(tmp);
    if (tmp.includes("@")) {
      let j = tmp.indexOf("@");
      sang = [i, j];
    }
    if (tmp.includes("*")) {
      let j = tmp.indexOf("*");
      // 맞왜틀 조심.. 불의 갯수가 하나의 row에 여러개 있는 경우, 모든 index를 구해야함
      while (j !== -1) {
        fire.push([i, j]);
        j = tmp.indexOf("*", j + 1);
      }
    }
  }

  // 풀이 코드
  const check = (x_, y_) => {
    if (0 <= x_ && x_ < row && 0 <= y_ && y_ < col) return true;
    return false;
  };

  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];

  const fireTime = Array.from(new Array(row), () =>
    new Array(col).fill(Infinity)
  );
  const fireBFS = () => {
    const q = [];
    fire.forEach(([a, b]) => {
      fireTime[a][b] = 0;
      q.push([a, b]);
    });

    let idx = 0;
    while (idx < q.length) {
      const [x, y] = q[idx++]; // shift()메서드 -> 시간초과

      for (let i = 0; i < 4; i++) {
        let x_ = x + dx[i];
        let y_ = y + dy[i];
        if (
          check(x_, y_) &&
          fireTime[x_][y_] > fireTime[x][y] + 1 &&
          board[x_][y_] !== "#"
        ) {
          fireTime[x_][y_] = fireTime[x][y] + 1;
          q.push([x_, y_]);
        }
      }
    }
  };

  const sangBFS = () => {
    const q = [];
    q.push([...sang, 0]);
    board[sang[0]][sang[1]] = "visited";

    let idx = 0;
    while (idx < q.length) {
      const [x, y, t] = q[idx++]; // shift()메서드 -> 시간초과
      if (x === 0 || x === row - 1 || y === 0 || y === col - 1) {
        return t + 1;
      }

      for (let i = 0; i < 4; i++) {
        let x_ = x + dx[i];
        let y_ = y + dy[i];
        if (
          check(x_, y_) &&
          fireTime[x_][y_] > t + 1 &&
          board[x_][y_] === "."
        ) {
          board[x_][y_] = "visited";
          q.push([x_, y_, t + 1]);
        }
      }
    }
    return "IMPOSSIBLE";
  };
  fireBFS();
  console.log(sangBFS());
}
