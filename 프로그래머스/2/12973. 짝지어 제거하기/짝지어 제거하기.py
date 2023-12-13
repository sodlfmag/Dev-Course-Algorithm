# 문자열 길이가 100만 이하의 자연수이므로 시간 복잡도는 O(nlogn) 미만 (가급적 O(n) 정도로)
def solution(s):
    stack = []  # 괄호 제거하듯이 stack 사용
    for alphabet in s:  # O(n)
        if stack and stack[-1] == alphabet: stack.pop()
        else: stack.append(alphabet)
    return 0 if stack else 1