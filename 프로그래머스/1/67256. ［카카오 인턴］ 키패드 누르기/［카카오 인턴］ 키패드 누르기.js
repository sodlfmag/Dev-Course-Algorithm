// 문제대로 구현
function solution(numbers, hand) {
    /*
        keypad = [[1, 2, 3],
                  [4, 5, 6],
                  [7, 8, 9],
                  ['*', 0, '#']]
     */
    const pos = { 'L': [3, 0], 'R': [3, 2] }; // 시작 위치 (왼손 : *, 오른손 : #)
    const dist = (target, pos) => Math.abs(target[0] - pos[0]) + Math.abs(target[1] - pos[1])
    let answer = [];
    numbers.forEach(n => {
        let press = 'L';
        const target = n === 0 ? [3, 1] : [Math.floor((n - 1) / 3), (n - 1) % 3];
        switch (target[1]) {
            case 0: break;
            case 2:
                press = 'R'; break;
            default:
                const l_dist = dist(target, pos['L']);
                const r_dist = dist(target, pos['R']);
                if (l_dist > r_dist || l_dist === r_dist && hand == "right") press = 'R'; break;
        }
        answer.push(press);
        pos[press] = target;
    })
    return answer.join('');
}