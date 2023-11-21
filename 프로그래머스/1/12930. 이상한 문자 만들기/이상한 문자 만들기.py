# 문자열 s는 "한 개 이상"의 단어로 구성되어 있습니다. <- 문자열 사이의 공백이 하나가 아님에 유의!
def solution(s):
    s = list(s)
    cnt = 0 # variable to count word index
    for i in range(len(s)):
        if s[i] == ' ':
            cnt = 0 # initialize cnt when meet space
        else:       # odd                       even
            s[i] = s[i].lower() if cnt % 2 else s[i].upper()
            cnt += 1
    return ''.join(s)