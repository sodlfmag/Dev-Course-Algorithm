"""
    다음과 같은 모양으로 생각하고 풀기
    [ 1 ]
    [ 2 ][ 9 ]
    [ 3 ][1 0][ 8 ]
    [ 4 ][ 5 ][ 6 ][ 7 ]
"""
def solution(n):
    snail = [[0] * (i+1) for i in range(n)]
    drdc = [[1,0], [0,1], [-1,-1]]
    row, col, direction = 0, 0, 0
    for i in range(1, n * (n+1) // 2 + 1):
        snail[row][col] = i
        nr = row + drdc[direction][0]
        nc = col + drdc[direction][1]
        if 0 < nr < n and nc < n and snail[nr][nc] == 0:
            row, col = nr, nc
        else:
            direction = (direction + 1) % 3
            row += drdc[direction][0]
            col += drdc[direction][1]
    return [i for s in snail for i in s]