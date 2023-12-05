import math

def solution(n):
    answer = 0
    sqrt = int(math.sqrt(n))
    for i in range(1, sqrt+1):
        if n % i == 0:
            answer += 0.5 if n == i ** 2 else 1
    return answer * 2