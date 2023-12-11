"""
    * 행렬 곱셈 : A(m x k) x B(k x n) = AB(m x n)
    * 계산 : $\sum_{x=1}^{k} A_{ix}B_{xj} = AB_{ij}$
"""
# 정석 풀이
def solution(A, B):
    m, k, n = len(A), len(B), len(B[0])
    answer = [[0] * n for i in range(m)]
    for i in range(m):
        for j in range(n):
            for x in range(k):
                answer[i][j] += A[i][x] * B[x][j]
    return answer

# zip()과 unpacking(*)을 이용한 풀이
def solution(A, B):
    return [[sum(a * b for a, b in zip(A_row, B_col)) for B_col in zip(*B)] for A_row in A] # zip(*B)로 B를 unpacking 후 다시 zip으로 묶어서 열로 나타냄