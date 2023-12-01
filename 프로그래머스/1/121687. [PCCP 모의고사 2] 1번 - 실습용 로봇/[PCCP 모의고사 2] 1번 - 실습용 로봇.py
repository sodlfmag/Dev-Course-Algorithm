"""
    IDEA:
        가능한 path는 [0,1], [1,0], [0,-1], [-1, 0]의 네 가지
        처음 방향 direction을 0이라고 할 때 G 기준

                 0
                 ↑
            3 ←— + —→ 1
                 ↓
                 2

        R일 때 고르는 G path index = (direction + 1) % 4 = 1
        L일 때 고르는 G path index = (direction + 3) % 4 = 3
        (B는 G 값에 음수 취하면 됨)
"""
def solution(command):
    path = [[0,1], [1,0], [0,-1], [-1, 0]]
    robot = [0, 0]
    direction = 0
    for cmd in command:
        if cmd == 'R':
            direction = (direction + 1) % 4
        elif cmd == 'L':
            direction = (direction + 3) % 4
        elif cmd == 'G':
            robot[0] += path[direction][0]
            robot[1] += path[direction][1]
        elif cmd == 'B':
            robot[0] -= path[direction][0]
            robot[1] -= path[direction][1]
    return robot

"""
    IDEA:
        G와 B 명령어의 동작을 다음과 같이 생각하자.

                       Gx Gy Bx By
            초기 GB = [0, 1, 0, -1]
            R -> GB = [1, 0, -1, 0]

        R 명령어가 동작하면 마치 GB 배열이 왼쪽으로 한 칸 rotate된 것과 같다.
        L 명령어는 마찬가지로 GB 배열을 오른쪽으로 한 칸 rotate된 것과 같다.
"""
def solution2(command):
    #     Gx Gy Bx By
    GB = [0, 1, 0, -1]
    #        x, y
    robot = [0, 0]
    for cmd in command:
        if cmd == 'R':      # GB 배열을 왼쪽으로 한 칸 rotate
            GB = GB[1:] + GB[:1]
        elif cmd == 'L':    # GB 배열을 오른쪽으로 한 칸 rotate
            GB = GB[-1:] + GB[:-1]
        elif cmd == 'G':    # [Gx, Gy]만큼 이동
            robot[0] += GB[0]
            robot[1] += GB[1]
        elif cmd == 'B':    # [Bx, By]만큼 이동
            robot[0] += GB[2]
            robot[1] += GB[3]
    return robot