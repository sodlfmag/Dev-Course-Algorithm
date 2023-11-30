"""
    완주 못한 사람 1명 But 동명이인이 있을 수 있음에 유의하자.
    참여한 선수의 수가 최대 10만명이므로 시간 복잡도가 O(nlogn) 이하여야 한다.
    
    * 가장 처음 떠오른 방식 : 단순히 순회하여 찾기
        1. participant에서 completion에 존재하지 않는 선수 찾기 (O(n^2) : 효율성 테스트 통과 X)
            for p in participant:
                if p in completion:
                    completion.remove(p)
                else:
                    return p
        2. participant와 completion을 sort한 후 순회하여 비교 (O(nlogn) : 효율성 테스트 통과 O)
            participant.sort()
            completion.sort()
            for p, c in zip(participant, completion):
                if p != c:
                    return p
            return participant[-1]
    
    * 효율적인 방식 : 해시(Hash) 이용하기!
        1. dictionary 만들어서 세기 (O(n) : 효율성 테스트 통과 O)
            answer = {}
            for p in participant:   # 참가자 세기 (동명이인이 있으므로 1을 더하는 방식으로)
                answer[p] = answer.get(p, 0) + 1
            for c in completion:    # 완주자 빼기
                answer[c] -= 1
            for a in answer:        # 값이 남아있는 사람이 완주하지 못한 사람
                if answer[a] : return a
        2. 해시 값 활용하기 (O(n) : 효율성 테스트 통과 O)
            해시 값이 unique하다는 점을 이용해 참가자의 해시 값을 모두 더하고 완주자의 해시 값을 여기서 모두 빼주면 완주하지 못한 사람의 해시 값만 남게 된다.
            solution 함수 참고
"""
def solution(participant, completion):
    hash_val = 0
    answer = {}
    for p in participant:
        answer[hash(p)] = p
        hash_val += hash(p) # python에서는 hash 함수가 존재 (물론 직접 정의해도 됨)
    for c in completion:
        hash_val -= hash(c) # 남는 값이 완주하지 못한 사람의 해시 값
    return answer[hash_val]