// Use Regular Expression
function solution(new_id) {
    new_id = new_id
        .toLowerCase()                                  // step 1
        .replace(/[^-\.\w]/g, '')                       // step 2 (\w = [a-zA-Z0-9_])
        .replace(/\.{2,}/g, '.')                        // step 3
        .replace(/^\.|\.$/g, '')                        // step 4
        .replace(/^$/, 'a')                             // step 5
        .slice(0, 15).replace(/\.$/g, '');              // step 6
    return new_id.padEnd(3, new_id[new_id.length - 1]); // step 7
}