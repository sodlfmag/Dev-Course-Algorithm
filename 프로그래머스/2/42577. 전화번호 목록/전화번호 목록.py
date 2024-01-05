"""
    phone_book 길이가 100만개이므로  O(nlogn) 미만 (가급적 O(n) 정도로)
    naive하게 다 비교하면 시간 초과
    정렬하면 앞의 값이 뒤의 값과 비슷 -> 접두사일 확률 높음: O(nlogn)
    (solution2는 문제의 카테고리가 해시여서 해시로 푼 풀이인데 O(n^2)인데도 전화번호 길이가 최대 20이라 성공하는 것 같다.)
"""
def solution(phone_book):
    phone_book.sort()
    for p1, p2 in zip(phone_book, phone_book[1:]):
        if p2[:len(p1)] == p1:
            return False
    return True

def solution2(phone_book):
    phones = dict.fromkeys(phone_book, 0)
    
    for phone_number in phone_book:
        prefix = ''
        for number in phone_number:
            prefix += number
            if prefix in phones and prefix != phone_number:
                return False
    return True