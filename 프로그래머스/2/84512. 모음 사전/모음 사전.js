/**
 * Use Recursion
 */
const dict_maker = (word, len, dict) => {
    if (len === 6) return;
    if (word !== '') dict.push(word);
    ['A', 'E', 'I', 'O', 'U'].forEach(alphabet => dict_maker(word.concat(alphabet), len + 1, dict));
}

function solution(word) {
    const dictionary = [];
    dict_maker('', 0, dictionary)
    return dictionary.indexOf(word) + 1;
}