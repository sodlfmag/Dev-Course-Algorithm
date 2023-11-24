/* 입력 */
let fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : __dirname + "\\input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

// row, col 추출
const [col, row] = input[0].trim().split(" ").map(Number);

// tomato 배열 추출
const tomato = [];
for (let i = 1; i <= row; i++) {
  tomato.push(input[i].trim().split(" ").map(Number));
}

//모든 토마토가 익어있는 상태로 입력받은 경우 -> 0 출력
if (tomato.every((arr) => !arr.includes(0))) {
  console.log(0);
} else {
  // tomato 배열의 요소 값이 1인 idx 찾기
  const q = [];
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (tomato[i][j] === 1) {
        q.push([i, j]);
      }
    }
  }

  const check = (x_, y_, row, col) => {
    if (0 <= x_ && x_ < row && 0 <= y_ && y_ < col) return true;
    else false;
  };

  const BFS = () => {
    const dx = [-1, 0, 1, 0];
    const dy = [0, 1, 0, -1];
    let days = 0;
    let idx = 0;

    while (idx < q.length) {
      const [x, y] = q[idx++];

      for (let i = 0; i < 4; i++) {
        let x_ = x + dx[i];
        let y_ = y + dy[i];

        if (check(x_, y_, row, col) && tomato[x_][y_] === 0) {
          tomato[x_][y_] = tomato[x][y] + 1;
          days = tomato[x][y] + 1;
          q.push([x_, y_]);
          // console.log(tomato, days);
        }
      }
    }
    return days - 1;
  };

  let res = BFS();
  if (tomato.flat().includes(0)) console.log(-1);
  else console.log(res);
}
