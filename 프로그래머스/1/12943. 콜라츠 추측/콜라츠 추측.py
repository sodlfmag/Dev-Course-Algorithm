# Use Recursion
def collatz(num, cnt):
    if num == 1:
        return cnt
    if cnt == 500:
        return -1
    if num % 2 == 0:    # even
        return collatz(num/2, cnt + 1)
    else:               # odd
        return collatz(num * 3 + 1, cnt + 1)

def solution(num):
    return collatz(num, 0)