/*
 * 행렬 곱셈 : A(m x k) x B(k x n) = AB(m x n)
 * 계산 : $\sum_{n=1}^{k} A_{in}B_{nj} = AB_{ij}$
 */
function solution(A, B) {
    return A.map((A_row) => B[0].map((_, j) => A_row.reduce((acc, a, k) => acc + a * B[k][j], 0)));
}