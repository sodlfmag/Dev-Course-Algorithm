# 경우의 수 문제
def solution(clothes):
    answer = 1
    cloth_type = {}
    for cloth, c_type in clothes:
        cloth_type[c_type] = cloth_type.get(c_type, 0) + 1
        
    for c_type in cloth_type:
        answer *= (cloth_type[c_type] + 1)  # 의상을 선택하지 않는 경우(1) 추가

    return answer - 1   # 아무것도 착용하지 않는 경우(1)를 빼줌