/* 입력 */
let fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : __dirname + "\\input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

// row, col 추출
const [row, col] = input[0].trim().split(" ").map(Number);

// fire 배열 추출 & 지훈이와 불의 처음 위치 [x좌표, y좌표] 구하기
const maze = [];
let jihoon = [];
let fire = [];
for (let i = 1; i <= row; i++) {
  let tmp = input[i].trim().split("");
  maze.push(tmp);

  if (tmp.includes("J")) {
    let j = tmp.indexOf("J");
    jihoon = [i - 1, j];
  }
  if (tmp.includes("F")) {
    let j = tmp.indexOf("F");
    fire.push([i - 1, j]);
  }
}

const time = Array.from(Array(row), () => new Array(col).fill(Infinity));
const check = (x, y) => {
  if (0 <= x && x < row && 0 <= y && y < col) return true;
  else return false;
};

const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];

const fireBFS = () => {
  const q = [];
  fire.forEach((s) => {
    q.push(s);
    time[s[0]][s[1]] = 0;
  });

  while (q.length > 0) {
    let [x, y] = q.shift();
    for (let i = 0; i < 4; i++) {
      let x_ = x + dx[i];
      let y_ = y + dy[i];

      if (
        check(x_, y_) &&
        maze[x_][y_] !== "#" &&
        time[x_][y_] > time[x][y] + 1
      ) {
        time[x_][y_] = time[x][y] + 1;
        q.push([x_, y_]);
      }
    }
  }
};

const jihoonBFS = () => {
  const time_jihoon = Array.from(Array(row), () =>
    new Array(col).fill(Infinity)
  );
  const q = [];
  q.push([...jihoon]);
  time_jihoon[jihoon[0]][jihoon[1]] = 0;

  while (q.length > 0) {
    let [x, y] = q.shift();
    if (x === row - 1 || x === 0 || y === col - 1 || y === 0)
      return time_jihoon[x][y] + 1;

    for (let i = 0; i < 4; i++) {
      let x_ = x + dx[i];
      let y_ = y + dy[i];
      if (
        check(x_, y_) &&
        time[x_][y_] > time_jihoon[x][y] + 1 &&
        time_jihoon[x_][y_] > time_jihoon[x][y] + 1 &&
        maze[x_][y_] === "."
      ) {
        time_jihoon[x_][y_] = time_jihoon[x][y] + 1;
        q.push([x_, y_]);
      }
    }
  }
  return Infinity;
};

fireBFS();
let res = jihoonBFS();

console.log(res === Infinity ? "IMPOSSIBLE" : res);
