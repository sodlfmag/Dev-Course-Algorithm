"""
    * 행렬 곱셈 : A(m x k) x B(k x n) = AB(m x n)
    * 계산 : $\sum_{x=1}^{k} A_{ix}B_{xj} = AB_{ij}$
"""
def solution(arr1, arr2):
    m, k, n = len(arr1), len(arr2), len(arr2[0])
    answer = [[0] * n for _ in range(m)]
    for i in range(m):
        for j in range(n):
            for x in range(k):
                answer[i][j] += arr1[i][x] * arr2[x][j]
    return answer