// Using eval()
function solution(expression) {
    const answer = [];
    const operators = [['+', '-', '*'], ['+', '*', '-'], ['-', '+', '*'], ['-', '*', '+'], ['*', '+', '-'], ['*', '-', '+']];
    operators.forEach(([op1, op2, _]) => {
        const wrapped = expression.split(op1).map(exp => `(${exp.split(op2).map(e => `(${e})`).join(op2)})`).join(op1);
        answer.push(Math.abs(eval(wrapped)));
    });
    return Math.max(...answer);
}