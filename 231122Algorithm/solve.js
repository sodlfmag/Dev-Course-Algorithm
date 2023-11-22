function solution(phone_book) {
    phone_book.sort(); // 전화번호를 길이 순으로 정렬

    for (let i = 0; i < phone_book.length - 1; i++) {
        const preWord = phone_book[i + 1].slice(0, phone_book[i].length); // 접두사이므로 비교하려는 글자의 길이까지 앞에서 잘라준다.
        if (phone_book[i] === preWord) return false; // 두 전화번호가 같을 경우 접두사이므로 false를 반환한다.
    }

    return true; // 접두사가 없으면 true를 반환한다.
}