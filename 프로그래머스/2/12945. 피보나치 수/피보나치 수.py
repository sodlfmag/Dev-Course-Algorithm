# 재귀로 풀어도 되지만 이전 값들을 가지고 있을 필요가 없으니까 그냥 반복문으로
def solution(n):
    fn2, fn1 = 0, 1
    for _ in range(n - 1):
        fn2, fn1 = fn1, fn1 + fn2
    return fn1 % 1234567