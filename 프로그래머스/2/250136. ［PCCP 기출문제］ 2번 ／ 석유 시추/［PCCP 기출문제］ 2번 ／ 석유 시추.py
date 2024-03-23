from collections import deque

def solution(land):
    m, n = len(land[0]), len(land)
    direction = [
        [-1, 0],    # up
        [1, 0],     # down
        [0, -1],    # left
        [0, 1],     # right
    ]

    def range_check(nr, nc):
        return 0 <= nr < n and 0 <= nc < m

    def group_count(start_r, start_c, group_num):
        count = 0
        queue = deque([(start_r, start_c)])
        while queue:
            r, c = queue.popleft()
            if land[r][c] == 1 and oil_group[r][c] == 0:
                oil_group[r][c] = group_num
                count += 1
                for dr, dc in direction:
                    nr, nc = r + dr, c + dc
                    if range_check(nr, nc) and land[nr][nc] == 1 and oil_group[nr][nc] == 0:
                        queue.append((nr, nc))
        return count
    
    # grouping oils
    oil_group = [[0] * m for _ in range(n)]
    group_num = 1
    group_num_oil_dict = {}
    for row in range(n):
        for col in range(m):
            if land[row][col] == 1 and oil_group[row][col] == 0:
                group_num_oil_dict[group_num] = group_count(row, col, group_num)
                group_num += 1
    
    # drilling oils
    max_oil = 0
    for col in range(m):
        col_groups = set(oil_group[row][col] for row in range(n) if land[row][col] == 1)
        max_oil = max(max_oil, sum(group_num_oil_dict[group_num] for group_num in col_groups))

    return max_oil