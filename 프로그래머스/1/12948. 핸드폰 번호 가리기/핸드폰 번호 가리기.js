function solution(phone_number) {
    return [...phone_number].map((k, v) => v < phone_number.length - 4 ? '*' : k).join('');
    return phone_number.replace(/\d(?=\d{4})/g, '*'); // use positive lookahead
}