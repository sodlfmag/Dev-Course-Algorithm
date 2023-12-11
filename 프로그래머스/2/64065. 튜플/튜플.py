# s의 길이는 최대 100만이므로 시간 복잡도는 O(nlogn) 미만 (가급적 O(n) 정도로)
def solution(s):
    answer = {}
    s = sorted(s[2:-2].split("},{"), key=len)   # O(nlogn)
    for tuples in s:
        elements = tuples.split(',')
        for element in elements:
            number = int(element)
            if number not in answer:    # O(1)
                answer[number] = 1  # 값은 아무거나
                
    return list(answer)