let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");
let k = Number(input[0]);

// 부등호 배열에 넣기
let inequality = input[1].split(" ");

// 0~9까지 방문 처리 배열 만들기
let visited = new Array(10).fill(false);

// 순열, 최댓값, 최솟값 설정
let selected = [];
let maxValue = "";
let minValue = "";

function dfs(depth) {
  if (depth == k + 1) {
    let check = true;
    // 숫자가 부등호에 알맞게 배치되는지 확인
    for (let i = 0; i < k; i++) {
      if (inequality[i] == "<") {
        if (selected[i] > selected[i + 1]) check = false;
      } else if (inequality[i] == ">") {
        if (selected[i] < selected[i + 1]) check = false;
      }
    }
    // 알맞게 배치된다면
    if (check) {
      maxValue = "";
      for (let x of selected) maxValue += x + "";
      if (minValue == "") minValue = maxValue;
    }
    return;
  }
  for (let i = 0; i < 10; i++) {
    if (visited[i]) continue;
    visited[i] = true;
    selected.push(i);
    dfs(depth + 1);
    visited[i] = false;
    selected.pop();
  }
}

dfs(0);
console.log(`${maxValue}\n${minValue}`);
