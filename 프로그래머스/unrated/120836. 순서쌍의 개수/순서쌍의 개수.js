function solution(n) {
    let answer = 0;
    for (let i = 1; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            answer += (n == i ** 2 ? 0.5 : 1);
        }
    }
    return answer * 2;
}