// 단순 구현 O(n)
function solution(input_string) {
    const answer = new Map();   // alphabet : is_loner(true/false)
    let prev = '';
    input_string.split('').forEach(alphabet => {
        if (answer.has(alphabet) && alphabet !== prev) answer.set(alphabet, true);
        else if (!answer.has(alphabet)) answer.set(alphabet, false);
        prev = alphabet;
    });
    return [...answer.keys()].filter(k => answer.get(k) === true).sort().join('') || 'N';
}