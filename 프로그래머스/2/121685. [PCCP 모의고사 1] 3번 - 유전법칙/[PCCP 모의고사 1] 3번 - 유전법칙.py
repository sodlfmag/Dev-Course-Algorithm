"""
    * 실제로 가계도를 다 만들면 시간초과 -> 거슬러 올라가기
    * index를 4로 나눈 몫이 부모 index, 나머지가 자식 index
    * 가계도 indexing 예시
                                 Rr
                _________________|_________________
               |           |           |           |
              RR          Rr          Rr          rr
              0           1           2           3
          ____|___    ____|___    ____|___    ____|___
         |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
        RR RR RR RR RR Rr Rr rr RR Rr Rr rr rr rr rr rr
        0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15
"""
def ascend(generation, index):
    if generation == 1: return "Rr"
    child = ["RR", "Rr", "Rr", "rr"]
    parent = ascend(generation - 1, index // 4)
    if parent == "Rr":
        return child[index % 4]
    else:
        return parent

def solution(queries):
    return [ascend(generation, position - 1) for generation, position in queries]