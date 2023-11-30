// 문자열 뺄셈은 안되기 때문에 비교하여 순서를 정해준다.
function solution(strings, n) {
    return strings.sort((a, b) => a[n] < b[n] ? -1 : a[n] > b[n] ? 1 : a < b ? -1 : a > b ? 1 : 0);
    // 문자열 비교 method localeCompare 사용
    return strings.sort((a, b) => a[n] === b[n] ? a.localeCompare(b) : a[n].localeCompare(b[n]))
}