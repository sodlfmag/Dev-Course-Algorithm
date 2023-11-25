// 완전탐색(Brute-force)
function solution(answers) {
    const person1 = [1, 2, 3, 4, 5];
    const person2 = [2, 1, 2, 3, 2, 4, 2, 5];
    const person3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];
    let grade = [0, 0, 0];
    let result = [];
    answers.forEach((answer, i) => {
        if (answer === person1[i % person1.length]) {
            grade[0]++;
        }
        if (answer === person2[i % person2.length]) {
            grade[1]++;
        }
        if (answer === person3[i % person3.length]) {
            grade[2]++;
        }
    })
    grade.forEach((g, i) => {
        if (g === Math.max(...grade)) {
            result.push(i + 1);
        }
    })
    return result;
}