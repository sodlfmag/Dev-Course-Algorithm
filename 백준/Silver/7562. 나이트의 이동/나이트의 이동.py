# import os
import sys
# sys.stdin = open(os.getcwd()+"\\input.txt", "rt")
from collections import deque
input = sys.stdin.readline

T = int(input())
while T:
  T -= 1
  n = int(input())
  start_x, start_y = map(int, input().split())
  dest_x, dest_y = map(int, input().split())

  def check(x_, y_):
    if 0 <= x_ < n and 0 <=  y_ < n: 
      return True
    else:
      return False

  def BFS():
    visited = [[False]*n for _ in range(n)]
    dq = deque()
    dt = [(-2, 1),(-1, 2),(1, 2),(2, 1),(2, -1),(1, -2),(-1, -2),(-2, -1)] # 현재 위치에서 이동 가능한 좌표

    visited[start_x][start_y] = True
    dq.append((start_x, start_y, 0))

    while dq:
      x, y, cnt = dq.popleft()
      if x == dest_x and y == dest_y:
        return cnt

      for i in range(len(dt)):
        x_ = x + dt[i][0]
        y_ = y + dt[i][1]
        if check(x_, y_) and not visited[x_][y_]:
          visited[x_][y_] = True
          dq.append([x_, y_, cnt + 1])
  print(BFS())
  