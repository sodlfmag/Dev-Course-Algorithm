"""
    * Key Idea
        - Unicode code mapping function (ord, chr)
            - Don't know the related functions -> create a dictionary
        - calculate shifted position (# of alphabets = 26)
"""
def solution(s, n):
    s = list(s)
    for i in range(len(s)):
        if s[i] == ' ':
            continue
        base = ord('A') if s[i].isupper() else ord('a')
        s[i] = chr((ord(s[i]) + n - base) % 26 + base)
    return ''.join(s)