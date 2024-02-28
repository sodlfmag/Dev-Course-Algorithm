from heapq import heapify, heappush, heappop
# min heap 사용: O(nlogn)
def solution(ability, number):
    heapify(ability)
    for _ in range(number):
        min1 = heappop(ability)
        min2 = heappop(ability)
        heappush(ability, min1 + min2)
        heappush(ability, min1 + min2)
    return sum(ability)