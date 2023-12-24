/* 입력 */
let fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : __dirname + "\\input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

// n, k 추출
let T = Number(input[0]);
let idx = 1; // input index

while (T--) {
  const n = Number(input[idx++]);
  const arr = input[idx++].trim().split(" ").map(Number);
  arr.unshift(0); // 인덱스(1~n)랑 학생들 번호(1~n) 일치해주기 위해 맨 앞에 0번 추가(더미 값) -> 1번 idx = 1번 학생이 선택한 학생번호

  /* 풀이 코드 -> 방향 그래프에서 사이클 판별하는 알고리즘 : DFS 사용 */
  const visited = new Array(n + 1).fill(false); // 방문 여부 체크
  const recStack = new Array(n + 1).fill(false); // 사이클 여부 체크
  let cycleMemberCnt = 0; // 사이클(팀)을 이루는 학생들의 수

  const DFS = (v, team) => {
    visited[v] = true;
    recStack[v] = true;
    team.push(v);
    let next = arr[v];

    if (!visited[next]) {
      // 다음에 방문할 번호가 아직 방문하지 않은 상태라면 계속 탐색 진행
      DFS(next, team);
    } else if (recStack[next]) {
      // 다음에 방문할 번호가 이미 방문한 상태지만, 이 번호가 아직 재귀 스택에 쌓여있는 상태라면 -> cycle 생성
      let startIdx = team.indexOf(next);
      cycleMemberCnt += team.slice(startIdx).length;
    }
    recStack[v] = false; // DFS 끝날때는 현재 방문 번호의 recStack을 false로 -> 즉, 이제 이 번호에서 더 이상 갈 곳이 없으므로 스택에 쌓인 번호가 빠져나간다.
  };

  for (let i = 1; i <= n; i++) {
    if (!visited[i]) {
      const team = [];
      DFS(i, team);
    }
  }
  console.log(n - cycleMemberCnt);
}