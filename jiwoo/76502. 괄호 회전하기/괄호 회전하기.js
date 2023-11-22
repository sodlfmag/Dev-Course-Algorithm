function solution(s) {
    let answer = 0;
    

    for (let i = 0; i < s.length; i++){
        let stack = [];
        let idx = i;
        while (1) {
            if (stack.length &&
                    (stack[stack.length - 1] == '(' && s[idx] == ')') ||
                   (stack[stack.length - 1] == '{' && s[idx] == '}') ||
                   (stack[stack.length - 1] == '[' && s[idx] == ']')) {
                    stack.pop();
            }
            else
                stack.push(s[idx]);

            // move next idx
            idx = idx === s.length - 1 ? 0 : idx + 1;
            if (idx === i)
                break;
        }
        answer += stack.length === 0 ? 1 : 0;
    }

    
    return answer;
}