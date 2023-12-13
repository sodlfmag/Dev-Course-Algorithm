# sliding window
def solution(s):
    min_comp_len = len(s)
    for width in range(1, len(s) // 2 + 1):  # 1개부터 문자열 절반 단위까지 가능
        prev, cnt, comp_len = None, 1, 0
        '''
            * 이전 값과 현재 값을 비교해야 하므로 len(s)에 1을 더해서 일부러 index의 범위를 초과시켜 한번 더 동작하도록 함
            * Note: Python에서 Slicing의 경우, 명시한 인덱스가 Sequence의 범위를 초과해도 에러가 발생하지 않는다!
        '''
        for i in range(0, len(s) + 1, width):
            window = s[i : i + width]
            if prev == window:
                cnt += 1
            else:
                comp_len += len(window)
                if cnt > 1: comp_len += len(str(cnt))
                cnt = 1
                prev = window
        min_comp_len = min(min_comp_len, comp_len)
    return min_comp_len