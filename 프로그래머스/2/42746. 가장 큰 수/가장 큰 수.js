// 입력 크기가 10만이기 때문에 모든 경우의 수를 순열로 구한 후 max로 최댓값을 구하면 O(n!)이므로 시간 초과
function solution(numbers) {
    const answer = numbers.map(String).sort((a, b) => (b + a) - (a + b)).join('');
    return answer === "0".repeat(answer.length) ? "0" : answer;
}