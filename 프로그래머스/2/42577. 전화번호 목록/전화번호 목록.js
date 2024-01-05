// phone_book 길이가 100만개이므로  O(nlogn) 미만 (가급적 O(n) 정도로)
function solution(phone_book) {
    phone_book.sort();
    let [p1, ...rest] = phone_book;
    for (let p2 of rest) {
        if (p2.slice(0, p1.length) === p1) return false;
        p1 = p2;
    }
    return true;
}