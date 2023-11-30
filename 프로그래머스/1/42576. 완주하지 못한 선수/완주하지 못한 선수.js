/*
 *   완주 못한 사람 1명 But 동명이인이 있을 수 있음에 유의하자.
 *   참여한 선수의 수가 최대 10만명이므로 시간 복잡도가 O(nlogn) 이하여야 한다.
 *
 *   - 가장 처음 떠오른 방식 : 단순히 순회하여 찾기
 *       1. participant에서 completion에 존재하지 않는 선수 찾기 (O(n^2) : 효율성 테스트 통과 X)
 *       2. participant와 completion을 sort한 후 순회하여 비교 (O(nlogn) : 효율성 테스트 통과 O)
 *
 *   - 효율적인 방식 : 해시(Hash) 이용하기!
 *       1. Map 만들어서 세기 (O(n) : 효율성 테스트 통과 O) <- solution 함수 참고
 *       2. 해시 값이 unique하다는 점을 이용해 완주 못한 선수 해시 값 = 참가자의 해시 값의 합 - 완주자의 해시 값의 합 (O(n) : 효율성 테스트 통과 O)
 */
function solution(participant, completion) {
    const dict = new Map();
    for (let i = 0; i < participant.length; i++) {
        let part = participant[i];
        let comp = completion[i];
        // dict.set(part, dict.get(part) ? dict.get(part) + 1 : 1);
        dict.set(part, (dict.get(part) || 0) + 1);
        // dict.set(comp, dict.get(comp) ? dict.get(comp) - 1 : -1);
        dict.set(comp, (dict.get(comp) || 0) - 1);
    }
    for (let [k, v] of dict) {
        if (v) return k;
    }
}