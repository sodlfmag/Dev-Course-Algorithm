/* 입력 */
let fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : __dirname + "\\input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

// T 추출
let T = Number(input[0]);

let idx = 1;
while (T--) {
  // n, 시작위치, 도착위치 추출
  const n = Number(input[idx++]);
  const [start_x, start_y] = input[idx++].trim().split(" ").map(Number);
  const [dest_x, dest_y] = input[idx++].trim().split(" ").map(Number);

  // 풀이 코드
  const check = (x_, y_) => {
    if (0 <= x_ && x_ < n && 0 <= y_ && y_ < n) return true;
    return false;
  };

  const BFS = () => {
    const visited = Array.from(new Array(n), () => new Array(n).fill(false));
    const q = [];
    const dt = [
      // 현재 위치에서 이동 가능한 좌표
      [-2, 1],
      [-1, 2],
      [1, 2],
      [2, 1],
      [2, -1],
      [1, -2],
      [-1, -2],
      [-2, -1],
    ];

    visited[start_x][start_y] = true;
    q.push([start_x, start_y, 0]);

    while (q.length > 0) {
      const [x, y, cnt] = q.shift();
      if (x === dest_x && y === dest_y) {
        return cnt;
      }

      for (let i = 0; i < dt.length; i++) {
        let x_ = x + dt[i][0];
        let y_ = y + dt[i][1];
        if (check(x_, y_) && !visited[x_][y_]) {
          visited[x_][y_] = true;
          q.push([x_, y_, cnt + 1]);
        }
      }
    }
  };
  console.log(BFS());
}
