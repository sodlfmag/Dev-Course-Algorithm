"""
    without using eval()
"""
from itertools import permutations
import re

def solution(expression):
    answer = 0
    tokens = re.split(r'([-+*])', expression)
    for ops in permutations(['+', '-', '*']):
        priority = {op:p for p, op in enumerate(ops)}
        print(priority)
        # infix notation -> postfix notation
        postfix = []    # postfix notation result
        op_stack = []   # stack for operator
        for token in tokens:
            if token.isdigit():
                postfix.append(token)
            else:       # operator
                if not op_stack:    # empty stack
                    op_stack.append(token)
                else:               # append operators from high priority to low priority
                    while op_stack:
                        if priority[token] <= priority[op_stack[-1]]:
                            postfix.append(op_stack.pop())
                        else:
                            break
                    op_stack.append(token)
            print(op_stack)
        while op_stack:
            postfix.append(op_stack.pop())
        
        # calculate
        num_stack = []  # LIFO
        for token in postfix:
            if token.isdigit():
                num_stack.append(token)
            else:   # operator
                num2 = num_stack.pop()
                num1 = num_stack.pop()
                num_stack.append(str(eval(''.join([num1, token, num2]))))
        answer = max(answer, abs(int(num_stack.pop())))
    return answer

"""
    Using eval()
"""
from itertools import permutations

def solution(expression):
    answer = []
    for (op1, op2, _) in permutations(['+', '-', '*']):
        wrapped = op1.join([f"({op2.join([f'({e})' for e in exp.split(op2)])})" for exp in expression.split(op1)])
        answer.append(abs(eval(wrapped)))
    return max(answer)