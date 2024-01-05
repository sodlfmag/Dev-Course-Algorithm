import sys
from collections import deque
input = sys.stdin.readline

# 풀이 코드 
k = int(input())
col, row = map(int, input().split())

board = []
for i in range(row):
  board.append(list(map(int, input().split())))

dx = [-1, 0, 1, 0]
dy = [0, 1, 0, -1]
move = [[[float("inf")]*col for _ in range(row)] for _ in range(k+1)]
horse = [(-1, -2),(-2, -1),(-2, 1),(-1, 2),(1, 2),(2, 1),(2, -1),(1, -2)] # 말이 이동 가능한 좌표

def check(x, y):
  if 0 <=x < row and 0 <=  y < col: 
    return True
  else:
    return False

def BFS():
  dq = deque()
  dq.append((0, 0, 0)) # [x좌표, y좌표, 말 좌표 이동 횟수]
  move[0][0][0] = 0
  while dq:
    x, y, cnt = dq.popleft()
    if x == row - 1 and y == col - 1: return

    # 일반 이동 -> cnt 그대로
    for i in range(4):
      x_ = x + dx[i]
      y_ = y + dy[i]
      if check(x_, y_) and board[x_][y_] == 0 and move[cnt][x_][y_] > move[cnt][x][y] + 1:
        move[cnt][x_][y_] = move[cnt][x][y] + 1
        dq.append((x_, y_, cnt))

    if cnt < k:
      # k횟수가 남은 경우에는 말의 좌표 위치로 이동시킴 -> cnt + 1
      for i in range(8):
        xx_ = x + horse[i][0]
        yy_ = y + horse[i][1]

        if  check(xx_, yy_) and board[xx_][yy_] == 0 and move[cnt + 1][xx_][yy_] > move[cnt][x][y] + 1:
          move[cnt + 1][xx_][yy_] = move[cnt][x][y] + 1
          dq.append([xx_, yy_, cnt + 1])

BFS()
res = float("inf")
for i in range(k+1):
  res = min(res, move[i][row-1][col-1])
if res != float("inf"):
  print(res)
else:
  print(-1)
