/* 입력 */
let fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : __dirname + "\\input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

// row, col, h 추출
const [col, row, h] = input[0].trim().split(" ").map(Number);

// 3차원 tomato배열 추출
const tomato = [];
const q = []; // 익은 토마토 위치 담는 큐

for (let k = 0; k < h; k++) {
  const box = [];
  for (let i = 1 + row * k; i <= row + row * k; i++) {
    const tmp = input[i].trim().split(" ").map(Number);
    box.push(tmp);
    if (tmp.includes(1)) {
      let j = tmp.indexOf(1);
      while (j !== -1) {
        q.push([k, i - 1 - row * k, j, 0]); // z좌표(높이), x좌표, y좌표, 시간
        j = tmp.indexOf(1, j + 1);
      }
    }
  }
  tomato.push(box);
}

/* 풀이 코드 */
if (!tomato.flat().flat().includes(1)) console.log(-1);
else {
  const check = (x, y, z) => {
    if (0 <= x && x < row && 0 <= y && y < col && 0 <= z && z < h) return true;
    else return false;
  };

  const BFS = () => {
    const dx = [-1, 0, 1, 0, 0, 0]; // 12시, 3시, 6시 9시, 위, 아래
    const dy = [0, 1, 0, -1, 0, 0]; // 12시, 3시, 6시 9시, 위, 아래
    const dz = [0, 0, 0, 0, 1, -1]; // 위, 아래
    let days = 0; // 모든 토마토가 익을때까지 걸린 날짜
    let idx = 0;
      
    while (idx < q.length) {
      const [z, x, y, t] = q[idx++];
      days = t;
      for (let a = 0; a < 6; a++) {
        let x_ = x + dx[a];
        let y_ = y + dy[a];
        let z_ = z + dz[a];

        if (check(x_, y_, z_) && tomato[z_][x_][y_] === 0) {
          tomato[z_][x_][y_] = 1; // 익은 토마토 표시 -> 방문처리
          q.push([z_, x_, y_, t + 1]);
        }
      }
    }
    return days;
  };

  let days = BFS();

  if (tomato.flat().flat().includes(0)) console.log(-1);
  else console.log(days);
}
