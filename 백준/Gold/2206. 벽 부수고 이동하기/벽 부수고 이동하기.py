# import os
import sys
from collections import deque
# sys.stdin = open(os.getcwd()+"\\input.txt", "rt")
input = sys.stdin.readline

row, col = map(int, input().split())

#  board 추출
board = []
for i in range(row):
  tmp = list(map(int, input().rstrip()))
  board.append(tmp)

# 풀이 코드 
def check(x_, y_):
  if 0 <= x_ < row and 0 <= y_ < col:
    return True
  else:
    return False

dx = [-1, 0, 1, 0]
dy = [0, 1, 0, -1]

#  3차원 거리 배열 -> 벽 부수고 이동한 적 있는 경우 : distance[1][x][y], 벽 부수지 않고 이동하는 경우 : distance[0][x][y]
distance = [[[float("inf")]*col for _ in range(row)] for _ in range(2)]
distance[0][0][0] = 1 # 문제에서 요구하는 최단거리 -> 시작하는 칸과 끝나는 칸도 포함하므로, 시작점 거리를 1로 초기화
distance[1][0][0] = 1

def BFS():
  dq = deque()
  dq.append((0, 0, 0)); # [x좌표, y좌표, 벽부수고 이동한적 있는지 없는지 파악하는 flag]

  while dq:
    x, y, brokenWall = dq.popleft()

    for i in range(4):
      x_ = x + dx[i]
      y_ = y + dy[i]
      if brokenWall == 0:
        #  아직 벽부수고 이동한 적이 없는 경우에만(brokenWall===0), 벽 부수고 이동하는 경우의 좌표를 q에 추가
        if check(x_, y_) and distance[1][x_][y_] > distance[0][x][y] + 1 and board[x_][y_] == 1:
          distance[1][x_][y_] = distance[0][x][y] + 1
          dq.append((x_, y_, 1))

      if check(x_, y_) and distance[brokenWall][x_][y_] > distance[brokenWall][x][y] + 1 and board[x_][y_] == 0:
        distance[brokenWall][x_][y_] = distance[brokenWall][x][y] + 1
        dq.append((x_, y_, brokenWall))

BFS()

dis1, dis2 = distance[0][row - 1][col - 1], distance[1][row - 1][col - 1]
if dis1 == float("inf") and dis2 == float("inf"):
  print(-1)
else:
  print(min(dis1, dis2))