"""
    * 대기실 고정 = 5x5
    * 거리두기 지키지 않는 경우
        1. [P][P] or [P]
                     [P]
                        [P]
        2. [P][O][P] or [O]
                        [P]
        3. [P][O] or [O][P] (적어도 하나가 O, 즉 둘 다 X만 아니면 됨)
           [O][P]    [P][O]
"""
def check(place):
    for idx_row, row in enumerate(place):
        for idx_col, cell in enumerate(row):
            if cell != 'P': continue
            is_col1_exist = idx_col != 4
            is_col2_exist = idx_col < 3
            is_row1_exist = idx_row != 4
            is_row2_exist = idx_row < 3
            is_not_col0 = idx_col != 0
            # PP case
            if is_col1_exist and place[idx_row][idx_col + 1] == 'P': return 0
            if is_row1_exist and place[idx_row + 1][idx_col] == 'P': return 0
            # POP case
            if is_col2_exist and place[idx_row][idx_col + 1] == 'O' and place[idx_row][idx_col + 2] == 'P': return 0
            if is_row2_exist and place[idx_row + 1][idx_col] == 'O' and place[idx_row + 2][idx_col] == 'P': return 0
            # !PX\XP case
            if is_col1_exist * is_row1_exist and place[idx_row + 1][idx_col + 1] == 'P' and place[idx_row][idx_col + 1] + place[idx_row + 1][idx_col] != "XX": return 0
            # !XP\PX case
            if is_not_col0 * is_row1_exist and place[idx_row + 1][idx_col - 1] == 'P' and place[idx_row][idx_col - 1] + place[idx_row + 1][idx_col] != "XX": return 0
    return 1

def solution(places):
    return [check(place) for place in places]