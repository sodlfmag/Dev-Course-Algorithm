// Use Regular Expression
function solution(new_id) {
    new_id = new_id.toLowerCase()       // step 1
        .replace(/[^-\._a-z0-9]/g, '')  // step 2
        .replace(/\.{2,}/g, '.')        // step 3
        .replace(/^\.|\.$/g, '');       // step 4
    if (!new_id) {                      // step 5
        new_id = 'a';
    }
    if (new_id.length >= 16) {          // step 6
        new_id = new_id.substring(0, 15);
        if (new_id[new_id.length - 1] === '.') {
            new_id = new_id.substring(0, new_id.length - 1);
        }
    }
    if (new_id.length <= 2) {           // step 7
        new_id += new_id[new_id.length - 1].repeat(3 - new_id.length);
    }
    return new_id;
}