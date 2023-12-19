/* 입력 */
let fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : __dirname + "\\input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

// n, k 추출
const [n, k] = input[0].trim().split(" ").map(Number); // 수빈이 위치: n, 동생 위치: k

/* sol 2) 가중치가 다른 문제이므로 다익스트라로 구현해야함. 하지만, js에서는 최소힙이나 우선순위큐를 직접 구현해야함..
따라서, 우선순위가 가장 높은 경우 -> now*2(걸린시간 : 0초) 를 먼저 처리해준다.
(우선순위가 높은 node부터 queue에 차곡차곡 넣어짐 -> 걸린시간이 최소가 되는 node 부터 빼낼 수 있음)*/
const BFS2 = () => {
  const q = [];
  const time = new Array(100001).fill(Infinity);
  time[n] = 0; // 출발점에서의 시간 = 0
  q.push([0, n]); // [걸린시간, 위치]

  while (q.length > 0) {
    const [t, now] = q.shift();

    if (t > time[now]) continue;

    if (now === k) return time[k];

    const dt = [now * 2, now - 1, now + 1]; // 우선순위가 높은 now * 2를 가장 먼저 방문함
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

console.log(BFS2());