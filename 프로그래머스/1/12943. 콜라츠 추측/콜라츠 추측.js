// Use Recursion (Or use for loop for 500 times)
function collatz(num, cnt) {
    // Base case, Termination case
    if (num === 1) {
        return cnt;
    }
    if (cnt === 500) {
        return -1;
    }
    // Process
    if (num % 2 == 0) { // even
        return collatz(num/2, cnt + 1);
    } else {            // odd
        return collatz(num * 3 + 1, cnt + 1)
    }
}

function solution(num) {
    return collatz(num, 0);
}