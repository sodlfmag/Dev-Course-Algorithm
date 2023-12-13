// 문자열 길이가 100만 이하의 자연수이므로 시간 복잡도는 O(nlogn) 미만 (가급적 O(n) 정도로)
function solution(s)
{
    let stack = []; // 괄호 제거하듯이 stack 사용
    for (const alphabet of s) {
        if (stack.length && stack.at(-1) == alphabet) stack.pop();
        else stack.push(alphabet);
    };
    return stack.length ? 0 : 1;
}