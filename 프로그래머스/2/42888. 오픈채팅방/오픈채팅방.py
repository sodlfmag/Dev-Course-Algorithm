"""
    record 길이가 최대 10만이므로 O(nlogn) 이하
    -> uid는 고유하므로 {uid: nickname}으로 저장 & 나중에 nickname 넣어주기
"""
def solution(record):
    nickname = {}
    answer = []
    for r in record:
        r = r.split()
        if r[0] == "Enter":
            nickname[r[1]] = r[2]
            answer.append([r[1], "님이 들어왔습니다."])
        elif r[0] == "Leave":
            answer.append([r[1], "님이 나갔습니다."])
        elif r[0] == "Change":
            nickname[r[1]] = r[2]
    return [''.join([nickname[uid], message]) for uid, message in answer]