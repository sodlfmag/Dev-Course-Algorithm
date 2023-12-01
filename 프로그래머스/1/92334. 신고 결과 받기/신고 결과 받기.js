/*
 * 동일한 유저에 대한 신고 횟수는 1회로 처리함에 유의
 * 신고 처리 메일 수를 반환해야 하기 때문에 {신고자 id : 신고대상 id}가 아니라 반대로 저장해야 계산하기 쉬움
 */
function solution(id_list, report, k) {
    const reporter_map = new Map(); // 신고대상 id : 신고자 id list
    const result = new Map();   // 받은 메일 횟수
    id_list.forEach(id => {
        reporter_map.set(id, []);
        result.set(id, 0);
    });
    // 신고 내용 정리
    new Set(report).forEach(r => {
        let [reporter, reported] = r.split(' ');
        reporter_map.set(reported, [...reporter_map.get(reported), reporter]);
    });
    // 정지된 아이디 정리 & 메일 횟수 세기
    reporter_map.forEach((reporters, reported) => {
        if (reporters.length >= k) {    // 정지된 아이디
            reporter_map.get(reported).forEach(reporter => result.set(reporter, result.get(reporter) + 1));
        }
    });
    return Array.from(result.values());
}