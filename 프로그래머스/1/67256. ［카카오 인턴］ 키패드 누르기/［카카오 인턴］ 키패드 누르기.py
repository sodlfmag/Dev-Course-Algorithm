# 문제대로 구현
def solution(numbers, hand):
    '''
        keypad = [[1, 2, 3],
                  [4, 5, 6],
                  [7, 8, 9],
                  ['*', 0, '#']]
    '''
    pos = {'L' : [3, 0], 'R' :[3, 2]} # 시작 위치 (왼손 : *, 오른손 : #)
    def distance(taret, pos):
        return abs(target[0] - pos[0]) + abs(target[1] - pos[1])
    answer = []
    for n in numbers:
        press = 'L'
        target = [3, 1] if n == 0 else list(divmod(n - 1, 3))
        if target[1] == 0: pass
        elif target[1] == 2: press = 'R'
        else:
            l_dist, r_dist = distance(target, pos['L']), distance(target, pos['R'])
            if l_dist > r_dist or l_dist == r_dist and hand == "right":
                press = 'R'
        answer.append(press)
        pos[press] = target
    return ''.join(answer)