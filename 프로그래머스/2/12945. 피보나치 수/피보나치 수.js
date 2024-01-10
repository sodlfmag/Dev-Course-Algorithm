// 재귀로 풀어도 되지만 이전 값들을 가지고 있을 필요가 없으니까 그냥 반복문으로 구현
// 값이 너무 커질 수 있기 때문에 미리 나눠주기
function solution(n) {
    let [fn2, fn1] = [0, 1];
    const modulo = 1234567;
    for (let i = 0; i < n - 1; i++) {
        [fn2, fn1] = [fn1, (fn1 + fn2) % modulo];
    }
    return fn1;
}