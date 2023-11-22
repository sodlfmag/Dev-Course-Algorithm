import re
def solution(phone_number):
    return (len(phone_number) - 4) * '*' + phone_number[-4:]
    return re.sub('\d(?=\d{4})', '*', phone_number) # use positive lookahead