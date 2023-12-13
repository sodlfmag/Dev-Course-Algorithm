let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");
let testCases = Number(input[0]);
let line = 1;

for (let t = 0; t < testCases; t++) {
  // 가로(M), 세로(N), 배추 개수(K)
  let [m, n, k] = input[line].split(" ").map(Number);

  // 배추의 위치
  let cabbageLocation = [];
  for (let i = 0; i < n; i++) cabbageLocation[i] = new Array(m);
  for (let i = 1; i <= k; i++) {
    let [row, column] = input[line + i].split(" ").map(Number);
    cabbageLocation[column][row] = 1;
  }

  let answer = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (dfs(cabbageLocation, n, m, i, j)) answer++; // 배추 있는곳에 흰지렁이 두기
    }
  }
  console.log(answer);
  line += k + 1;
}

// 하나의 배추흰지렁이가 이동할 수 있는 배추 확인 함수
function dfs(cabbageLocation, n, m, column, row) {
  if (column < 0 || column >= n || row < 0 || row >= m) {
    return false;
  }
  // 배추가 심어진 곳
  if (cabbageLocation[column][row] == 1) {
    cabbageLocation[column][row] = -1; // 방문 처리

    dfs(cabbageLocation, n, m, column - 1, row); // 상
    dfs(cabbageLocation, n, m, column + 1, row); // 하
    dfs(cabbageLocation, n, m, column, row - 1); // 좌
    dfs(cabbageLocation, n, m, column, row + 1); // 우 확인하면서 흰지렁이가 이동할 수 있는지 확인
    return true; // answer 카운트 할 수 있도록, true 반환
  }
  return false; // 배추가 심어지지 않았을 때, answer 카운트 할 수 없도록, false 반환
}
