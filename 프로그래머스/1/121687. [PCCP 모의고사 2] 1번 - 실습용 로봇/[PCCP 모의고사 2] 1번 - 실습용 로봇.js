/*
 * IDEA:
 *  가능한 path는 [0,1], [1,0], [0,-1], [-1, 0]의 네 가지
 *  처음 방향 direction을 0이라고 할 때 G 기준
 *
 *           0
 *           ↑
 *      3 ←— + —→ 1
 *           ↓
 *           2
 *
 *  R일 때 고르는 G path index = (direction + 1) % 4 = 1
 *  L일 때 고르는 G path index = (direction + 3) % 4 = 3
 *  (B는 G 값에 음수 취하면 됨)
 */
function solution(command) {
    const path =  [[0,1], [1,0], [0,-1], [-1, 0]];
    const robot = [0, 0];
    let direction = 0;
    command.split('').forEach(cmd => {
        switch (cmd) {
            case 'R':   // GB 배열을 왼쪽으로 한 칸 rotate
                direction = (direction + 1) % 4; break;
            case 'L':   // GB 배열을 오른쪽으로 한 칸 rotate
                direction = (direction + 3) % 4; break;
            case 'G':   // [Gx, Gy]만큼 이동
                robot[0] += path[direction][0]; robot[1] += path[direction][1]; break;
            case 'B':   // [Bx, By]만큼 이동
                robot[0] -= path[direction][0]; robot[1] -= path[direction][1]; break;
        }
    })
    return robot;
}

/*
 * IDEA:
 *  G와 B 명령어의 동작을 다음과 같이 생각하자.
 * 
 *              Gx Gy Bx By
 *    초기 GB = [0, 1, 0, -1]
 *    R -> GB = [1, 0, -1, 0]
 * 
 *  R 명령어가 동작하면 마치 GB 배열이 왼쪽으로 한 칸 rotate된 것과 같다.
 *  L 명령어는 마찬가지로 GB 배열을 오른쪽으로 한 칸 rotate된 것과 같다.
 */
function solution2(command) {
    //          Gx Gy Bx By
    const GB = [0, 1, 0, -1];
    //           x, y
    const robot = [0, 0];
    command.split('').forEach(cmd => {
        switch (cmd) {
            case 'R':   // GB 배열을 왼쪽으로 한 칸 rotate
                GB.push(GB.shift()); break;
            case 'L':   // GB 배열을 오른쪽으로 한 칸 rotate
                GB.unshift(GB.pop()); break;
            case 'G':   // [Gx, Gy]만큼 이동
                robot[0] += GB[0]; robot[1] += GB[1]; break;
            case 'B':   // [Bx, By]만큼 이동
                robot[0] += GB[2]; robot[1] += GB[3]; break;
        }
    })
    return robot;
}