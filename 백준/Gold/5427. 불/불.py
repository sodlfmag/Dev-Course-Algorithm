# import os
import sys
from collections import deque
# sys.stdin = open(os.getcwd()+"\\input.txt", "rt")
input = sys.stdin.readline

T = int(input())
while T:
  T -= 1
  col, row = map(int, input().split())
  board = []
  sang = []
  fire = []
  for i in range(row):
    tmp = list(input().rstrip())
    board.append(tmp)
    if "@" in tmp:
      j = tmp.index("@")
      sang = [i, j]
    
    if "*" in tmp:
      j = "".join(tmp).find("*")
      while j != -1 :
        fire.append((i, j))
        j = "".join(tmp).find("*", j + 1)
  
  def check(x_, y_):
    if 0 <= x_ < row and 0 <=  y_ < col: 
      return True
    else:
      return False

  dx = [-1, 0, 1, 0]
  dy = [0, 1, 0, -1]

  fireTime = [[float("inf")]*col for _ in range(row)] 
  def fireBFS():
    dq= deque()
    for (a, b) in fire:
      fireTime[a][b] = 0
      dq.append((a, b))

    while dq:
      x, y = dq.popleft()

      for i in range(4):
        x_ = x + dx[i]
        y_ = y + dy[i]
        if check(x_, y_) and fireTime[x_][y_] > fireTime[x][y] + 1 and board[x_][y_] != "#":
          fireTime[x_][y_] = fireTime[x][y] + 1
          dq.append((x_, y_))

  def sangBFS():
    dq = deque()
    dq.append((sang[0], sang[1], 0))
    board[sang[0]][sang[1]] = "visited"

    while dq:
      x, y, t = dq.popleft() 
      if x == 0 or x == row - 1 or y == 0 or y == col - 1:
        return t + 1

      for i in range(4):
        x_ = x + dx[i]
        y_ = y + dy[i]
        if check(x_, y_) and fireTime[x_][y_] > t + 1 and board[x_][y_] == ".":
          board[x_][y_] = "visited"
          dq.append((x_, y_, t + 1))
    return "IMPOSSIBLE"
  
  fireBFS()
  print(sangBFS())
