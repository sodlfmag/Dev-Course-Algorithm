const isPrime = (n) => {
    if (n < 2) return false;
    for (let i = 2; i <= Math.floor(n**0.5); i++) {
        if (n % i === 0) return false;
    }
    return true;
}

// 자바스크립트는 순열 함수를 직접 구현해야 함
const getPermutations = (arr, n) => {
    if (n === 1) return arr.map(e => [e]);  // 1개 일 때는 순서가 의미 없으므로 그대로 반환하면 됨 (종료 조건)
    const results = [];
    arr.forEach((fixed, i, origin) => {
        const rest = [...origin.slice(0, i), ...origin.slice(i + 1)];   // 고정한 부분을 제외한 나머지
        const permutations = getPermutations(rest, n - 1);  // 나머지 부분에 대한 순열 구하기
        const concatenated = permutations.map(e => [fixed, ...e]);  // 고정한 fixed 값에 구한 순열 붙이기
        results.push(...concatenated);
    });
    return results;
}

function solution(numbers) {
    const nums = [];
    let answer = 0;
    numbers = numbers.split('');
    for (let i = 1; i <= numbers.length; i++) {
        nums.push(...getPermutations(numbers, i).map(e => e.join('')).map(e => parseInt(e)));
    }
    for (const n of new Set(nums)) {
        if (isPrime(n)) answer++;
    }
    return answer;
}