// s의 길이는 최대 100만이므로 시간 복잡도는 O(nlogn) 미만 (가급적 O(n) 정도로)
function solution(s) {
    const dict = new Map();
    s = s.slice(2, -2).split("},{").sort((a, b) => a.length - b.length);    // O(nlogn)
    s.forEach(tuples => tuples.split(",").forEach(element => {if (!dict.has(Number(element))) dict.set(Number(element), 0)}));
    return Array.from(dict.keys());
}