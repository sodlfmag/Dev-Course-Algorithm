# import os
import sys
# sys.stdin = open(os.getcwd()+"\\input.txt", "rt")
input = sys.stdin.readline
sys.setrecursionlimit(10**6)

T = int(input())

# 풀이 코드 
while T:
  T -= 1
  n = int(input())
  student = list(map(int, input().split(" ")))
  student.insert(0, 0)
  visited = [False] * (n+1)
  recStack = [False] * (n+1)
  cycleMemberCnt =  0

  def DFS(v):
    global cycleMemberCnt
    visited[v]= True
    recStack[v] = True
    team.append(v)
    next = student[v]
    if not visited[next]:
      DFS(next)
    elif recStack[next]:
      idx = team.index(next)
      cycleMemberCnt += len(team[idx:])
    recStack[v] = False

  for i in range(1, n+1):
    if not visited[i]:
      team = []
      DFS(i)
  
  print(n - cycleMemberCnt)