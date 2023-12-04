/* 입력 */
let fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : __dirname + "\\input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

// n, k 추출
const [n, k] = input[0].trim().split(" ").map(Number); // 수빈이 위치: n, 동생 위치: k

/* 풀이 코드 */
const BFS = () => {
  const q = [];
  const time = new Array(200001).fill(Infinity);
  time[n] = 0; // 출발점에서의 시간 = 0
  q.push(n); // 현재 위치

  while (q.length > 0) {
    const now = q.shift();

    if (now === k) return time[k];

    const dt = [now * 2, now - 1, now + 1]; // 이동가능한 다음 위치 배열
    dt.forEach((next) => {
      if (0 <= next && next <= 200000 && time[next] === Infinity) {
        time[next] = time[now] + 1; // 현재 위치까지 오는데 걸리는 최소 시간 갱신
        q.push(next);
      }
    });
  }
};

console.log(BFS());