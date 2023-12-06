def solution(rows, columns, queries):
    min_nums = []
    matrix = [[row * columns + col + 1 for col in range(columns)] for row in range(rows)]
    
    for x1, y1, x2, y2 in queries:
        min_nums.append(rotate(x1-1, y1-1, x2-1, y2-1, matrix)) # index는 0부터 시작하기 때문에 1을 빼야함
        
    return min_nums

"""
    반대로 생각하는 것이 핵심
    
        —[1]->     * [1] -> [2] -> [3] -> [4] : 시계방향으로 rotate
       ↑      |         현재 값이 다음 값을 덮어버려서 이전 값을 기억 못함
      [4]    [2]
       |      ↓    * [4] -> [3] -> [2] -> [1] : 역방향으로 rotate
        <—[3]—          처음 값만 기억하고 있으면 됨!
"""
def rotate(x1, y1, x2, y2, matrix):
    min_value = first = matrix[x1][y1]
    
    for x in range(x1, x2):
        matrix[x][y1] = matrix[x+1][y1]
        min_value = min(min_value, matrix[x+1][y1])
    for y in range(y1, y2):
        matrix[x2][y] = matrix[x2][y+1]
        min_value = min(min_value, matrix[x2][y+1])
    for x in range(x2, x1, -1):
        matrix[x][y2] = matrix[x-1][y2]
        min_value = min(min_value, matrix[x-1][y2])
    for y in range(y2, y1+1, -1):
        matrix[x1][y] = matrix[x1][y-1]
        min_value = min(min_value, matrix[x1][y-1])
    matrix[x1][y1+1] = first
    
    return min_value