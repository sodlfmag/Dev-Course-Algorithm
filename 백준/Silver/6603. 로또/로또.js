let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");

for (let i = 0; i < input.length; i++) {
  let data = input[i].split(" ").map(Number);
  if (data[0] == 0) break;
  else {
    let k = data[0];
    let arr = data.slice(1); //index 1부터 추출하여 arr이라는 새로운 배열 생성
    let visited = new Array(k).fill(false);
    let selected = []; // 선택된 수의 위치(index)
    answer = "";
    dfs(arr, 0, 0);
    console.log(answer);

    function dfs(arr, depth, start) {
      // 원소가 k개인 집합 S에서 6개 고르기
      if (depth == 6) {
        let result = [];
        for (let i of selected) result.push(arr[i]);
        for (let x of result) answer += x + " ";
        answer += "\n";
        return;
      }
      // start를 설정하여 중복 확인 X
      for (let i = start; i < k; i++) {
        if (visited[i]) continue;
        selected.push(i);
        visited[i] = true;
        dfs(arr, depth + 1, i + 1);
        selected.pop();
        visited[i] = false;
      }
    }
  }
}
