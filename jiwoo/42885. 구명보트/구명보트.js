// 최대 2명 탑승 가능
// 구명보트 최소 개수

function solution(people, limit) {
    let boatCnt = 0
    let beginIdx = 0;
    let endIdx = people.length - 1;

    people.sort((a, b) => a - b);
    while (beginIdx <= endIdx) {
        if (people[endIdx] + people[beginIdx] <= limit)
            beginIdx++;
        endIdx--;
        boatCnt++;
    }
    return boatCnt;
}
