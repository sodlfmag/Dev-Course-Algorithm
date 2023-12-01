# 단순 구현 O(n)
def solution(input_string):
    answer = {} # alphabet : is_loner(True/False)
    prev = ''
    for alphabet in input_string:
        if alphabet in answer and alphabet != prev: answer[alphabet] = True # 이전 알파벳과 다른 이미 나온 알파벳
        elif alphabet not in answer: answer[alphabet] = False   # 처음 나온 알파벳
        prev = alphabet
    return ''.join(sorted([k for k, v in answer.items() if v])) or 'N'