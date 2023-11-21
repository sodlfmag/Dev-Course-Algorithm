"""
    * Radix Conversion example (base 10 -> base 3)
    
        3 | 45
           ————         ↑
        3 | 15  ··· 0   |
           ————         |
        3 |  5  ··· 0   |
           ————         |
             1  ··· 2   |
             ___________|
             
        => 45(10) = 1200(3)
"""
def solution(n):
    return int(radixConvFlip(n, 3), 3)

def radixConvFlip(num, radix):
    if num == 0:
        return '0'
    converted = []
    while num:
        num, r = divmod(num, radix)
        converted.append(str(r))    # append remainder
    return ''.join(converted)