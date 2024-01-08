/*
 * record 길이가 최대 10만이므로 O(nlogn) 이하
 * -> uid는 고유하므로 {uid: nickname}으로 저장 & 나중에 nickname 넣어주기
 */
function solution(record) {
    const nickname = {};
    const answer = [];
    record.forEach(r => {
        [action, uid, nickName] = r.split(' ');
        switch (action) {
            case "Enter":
                nickname[uid] = nickName;
                answer.push([uid, "님이 들어왔습니다."]);
                break;
            case "Leave":
                answer.push([uid, "님이 나갔습니다."]);
                break;
            case "Change":
                nickname[uid] = nickName;
                break;
        }
    })
    return answer.map(([uid, message]) => `${nickname[uid]}${message}`);
}