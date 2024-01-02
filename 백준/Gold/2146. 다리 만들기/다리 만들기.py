import sys
from collections import deque
input = sys.stdin.readline

# 풀이 코드 
n = int(input())
board = []
for i in range(n):
  board.append(list(map(int, input().split())))

dx = [-1, 0, 1, 0]
dy = [0, 1, 0, -1]

def check(x, y):
  if 0 <= x < n and 0 <= y < n: 
    return True
  else:
    return False

def islandCntBFS(i, j):
  global visited, islandCnt, borderSet
  dq = deque()
  visited[i][j] = True
  board[i][j] = islandCnt
  dq.append((i, j))
  
  while dq:
    x, y = dq.popleft()

    for i in range(4):
      x_ = x + dx[i]
      y_ = y + dy[i]
      if check(x_, y_) and not visited[x_][y_]:
        if board[x_][y_] == 1:
          board[x_][y_] = islandCnt
          visited[x_][y_] = True
          dq.append((x_, y_))
        elif board[x_][y_] == 0:
          borderSet.add((x, y))

visited = [[False]*n for _ in range(n)]
islandCnt = 1
borderSet = set()
for i in range(n):
  for j in range(n):
    if not visited[i][j] and board[i][j] == 1:
      islandCntBFS(i, j)
      islandCnt += 1

def findMinDistBFS():
  res = float("inf")
  borderDq = deque(borderSet)
  while borderDq:
    x, y = borderDq.popleft()
    for i in range(4):
      x_ = x + dx[i]
      y_ = y + dy[i]
      if check(x_, y_):
        if not board[x_][y_]:
          # 인접한 곳이 바다일 경우
          board[x_][y_] = board[x][y]
          distance[x_][y_] = distance[x][y] + 1
          borderDq.append((x_, y_))
        elif board[x_][y_] != board[x][y]:
          # 인접한 곳이 다른 섬일 경우
          res = min(res, distance[x_][y_] + distance[x][y])
  print(res)

distance = [[0]*n for _ in range(n)]
findMinDistBFS()
