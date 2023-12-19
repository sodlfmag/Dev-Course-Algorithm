/* 입력 */
let fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : __dirname + "\\input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

// n, k 추출
const [n, k] = input[0].trim().split(" ").map(Number); // 수빈이 위치: n, 동생 위치: k

/* 풀이 코드 */
const Dijkstra = () => {
  const q = [];
  const time = new Array(100001).fill(Infinity);
  time[n] = 0; // 출발점에서의 시간 = 0
  q.push([0, n]); // [걸린시간, 위치]

  while (q.length > 0) {
    const t = Math.min(...q.map((arr) => arr[0])); // 최소 시간 찾기 === 다익스트라의 최소힙에서 최솟값을 구하는 것
    const nowIdx = q.map((arr) => arr[0]).indexOf(t); // 최소시간을 가진 위치 idx 찾기
    const now = q[nowIdx][1]; // 현재 위치
    q.splice(nowIdx, 1); // 파이썬의 최소힙에서 heappop() 역할 -> 최소 시간을 pop

    if (t > time[now]) continue;

    if (now === k) return time[k];

    const dt = [now * 2, now - 1, now + 1]; // 이동가능한 다음 위치 배열
    dt.forEach((next) => {
      if (0 <= next && next <= 100000) {
        if (next === now * 2 && time[next] > t) {
          time[next] = t; // 현재 위치까지 오는데 걸리는 최소 시간 갱신 -> 순간이동할 때 걸리는 시간은 0초
          q.push([time[next], next]);
        } else if (next !== now * 2 && time[next] > t + 1) {
          time[next] = t + 1; // 현재 위치까지 오는데 걸리는 최소 시간 갱신 -> 나머지 경우에는 +1초
          q.push([time[next], next]);
        }
      }
    });
  }
};

console.log(Dijkstra());
