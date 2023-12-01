# 동일한 유저에 대한 신고 횟수는 1회로 처리함에 유의
# 신고 처리 메일 수를 반환해야 하기 때문에 {신고자 id : 신고대상 id}가 아니라 반대로 저장해야 계산하기 쉬움
def solution(id_list, report, k):
    reporter_dict = {id:[] for id in id_list}   # 신고대상 id : 신고자 id list
    result = {id:0 for id in id_list}           # 받은 메일 횟수
    # 신고 내용 정리
    for r in set(report):   # 중복 제거
        reporter, reported = r.split()
        reporter_dict[reported].append(reporter)
    # 정지된 아이디 정리 & 메일 횟수 세기
    banned_id = [reported for reported, reporters in reporter_dict.items() if len(reporters) >= k]
    for b_id in banned_id:
        for reporter in reporter_dict[b_id]:
            result[reporter] += 1
    return list(result.values())