def solution(s):
    bin_convert, zero_removed = 0, 0
    while s != '1':
        num = s.count('1')
        zero_removed += len(s) - num
        bin_convert += 1
        s = bin(num)[2:]    # 0b~ 형태이므로 슬라이싱으로 숫자만 잘라줌
    return [bin_convert, zero_removed]