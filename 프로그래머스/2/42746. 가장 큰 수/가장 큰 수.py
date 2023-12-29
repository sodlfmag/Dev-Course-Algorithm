# 입력 크기가 10만이기 때문에 모든 경우의 수를 순열로 구한 후 max로 최댓값을 구하면 O(n!)이므로 시간 초과
from functools import cmp_to_key

def naive_solution(numbers):
    numbers = list(map(str, numbers))
    numbers.sort(key=cmp_to_key(lambda x, y: int(y + x) - int(x + y)))  # descending
    # "0000.." 예외를 "0"으로 반환하기 위한 형변환 str -> int -> str은 좋지 않음
    return str(int(''.join(numbers)))

def solution(numbers):
    numbers = list(map(str, numbers))
    # numbers의 원소는 0 이상 1,000 이하이므로 3번 반복해서 길이 맞추기 & descending
    numbers.sort(key=lambda x: x * 3, reverse=True)
    answer = ''.join(numbers)
    return "0" if answer == "0" * len(answer) else answer