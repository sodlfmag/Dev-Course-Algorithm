// 문자열 s는 "한 개 이상"의 단어로 구성되어 있습니다. <- 문자열 사이의 공백이 하나가 아님에 유의!
function solution(s) {
    let cnt = 0; // variable to count word index
    return [...s].map((k) => {
        if (k === ' ') {
            cnt = 0;    // initialize cnt when meet space
            return k;
        } else {    //            odd               even
            return cnt++ % 2 ? k.toLowerCase() : k.toUpperCase();
        }
    }).join('');
}