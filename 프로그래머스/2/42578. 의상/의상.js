// 경우의 수 문제
function solution(clothes) {
    clothType = new Map();
    clothes.forEach(([cloth, type]) => clothType.set(type, (clothType.get(type) || 0) + 1));
    return Array.from(clothType.values()).reduce((acc, curr) => acc * (curr + 1), 1) - 1;
}