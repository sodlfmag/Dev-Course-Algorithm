/*
 * JavaScript에는 Python과 달리 순열/조합과 관련한 기본으로 내장된 라이브러리가 없어서 직접 구현해야 한다.
 */
function solution(numbers) {
    return [...new Set(getCombinations(numbers, 2).map(sum))].sort((a, b) => a - b);  // 합을 구하고 Set으로 중복 제거 후 정렬
}

/*
 * 우리가 일반적으로 경우의 수를 구하듯이 앞쪽부터 고정시키면서 구한다.
 */
function getCombinations(arr, n) {
    if (n === 1) return arr.map(e => [e]);
    const results = [];
    for (let i = 0; i <= arr.length - n; i++) { // 모든 요소를 다 한번 씩 fix할 필요는 없다. 예를 들어 [1, 2, 3, 4, 5]에서 3개 뽑기는 3까지만 fix하면 된다.
        const fixed = arr[i];
        const rest = arr.slice(i + 1);    // 고정한 부분을 제외한 나머지 뒤쪽
        const combinations = getCombinations(rest, n - 1);    // 나머지 부분에 대해 조합 구하기
        const concatenated = combinations.map(e => [fixed, ...e]);   // 구한 조합에 고정한 fixed 값 붙이기
        results.push(...concatenated);
    }
    return results;
}

function sum(arr) {
  return arr.reduce((acc, curr) => acc + curr, 0);
}