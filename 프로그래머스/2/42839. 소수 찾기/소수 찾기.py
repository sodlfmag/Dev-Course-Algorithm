from itertools import permutations

def is_prime(n):
    if n < 2: return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

def solution(numbers):
    nums = []
    answer = 0
    for i in range(1, len(numbers) + 1):
        nums.extend(map(int, map(''.join, permutations(numbers, i))))
    for n in set(nums):
        if is_prime(n): answer += 1
    return answer