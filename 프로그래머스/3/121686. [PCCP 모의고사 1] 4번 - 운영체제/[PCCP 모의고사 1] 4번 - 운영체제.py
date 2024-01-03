"""
    프로그램들의 정렬 구조를 계속 유지해야함 -> min heap
"""
from heapq import heapify, heappush as push, heappop as pop

def push_to_waiting(tasks, waiting):
    call_time, priority, runtime = pop(tasks)
    push(waiting, (priority, call_time, runtime))
    return call_time

def solution(program):
    answer = [0] * 11

    # (priority, call_time, runtime) -> (call_time, priority, runtime)
    tasks = [(p[1], p[0], p[2]) for p in program]
    heapify(tasks)
    waiting = []

    curr_time = 0
    while tasks or waiting:
        if not waiting:
            curr_time = push_to_waiting(tasks, waiting)
        priority, call_time, runtime = pop(waiting)
        answer[priority] += curr_time - call_time
        curr_time += runtime

        # task가 실행되는 동안 호출된 program들을 waiting heap으로 push
        while tasks and tasks[0][0] <= curr_time:
            push_to_waiting(tasks, waiting)

    answer[0] = curr_time
    return answer