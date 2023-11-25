# 완전탐색(Brute-force)
def solution(answers):
    person1 = [1, 2, 3, 4, 5]
    person2 = [2, 1, 2, 3, 2, 4, 2, 5]
    person3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5]
    grade = [0, 0, 0]
    for i, answer in enumerate(answers):
        if answer == person1[i % len(person1)]:
            grade[0] += 1
        if answer == person2[i % len(person2)]:
            grade[1] += 1
        if answer == person3[i % len(person3)]:
            grade[2] += 1
    return [i + 1 for i, g in enumerate(grade) if g == max(grade)]