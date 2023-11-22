function solution(s) {
    return Boolean(s.match(/^(\d{4}|\d{6})$/g)); // 괄호(group) 주의
}