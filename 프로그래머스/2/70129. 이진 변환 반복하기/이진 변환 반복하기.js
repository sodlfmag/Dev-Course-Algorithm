function solution(s) {
    let [num, bin_convert, zero_removed] = [0, 0, 0];
    while (s !== '1') {
        num = s.split('').reduce((cnt, v) => v === '1' ? cnt + 1 : cnt, 0);
        zero_removed += s.length - num;
        bin_convert ++;
        s = num.toString(2);
    }
    return [bin_convert, zero_removed];
}