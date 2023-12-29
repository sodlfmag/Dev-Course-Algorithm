"""
    * bit 연산 & masking 사용

        언어  직군  경력 소울 푸드
       [][][] [][][] [][][] [][][]
     11 10[9] 8 7[6] 5 4[3] 2 1 0
    
    * mask랑 & 연산을 하면 같을 때 0이 나옴
"""
from collections import defaultdict
from bisect import bisect_left

def create_bit_key(table, *keys):
    return (table[keys[0]] << 9) + (table[keys[1]] << 6) + (table[keys[2]] << 3) + table[keys[3]]

def solution(info, query):
    field = {
        "cpp": 0b001,
        "java": 0b010,
        "python": 0b100,

        "backend": 0b001,
        "frontend": 0b010,

        "junior": 0b001,
        "senior": 0b010,

        "chicken": 0b001,
        "pizza": 0b010
    }
    mask = {
        "cpp": 0b110,
        "java": 0b101,
        "python": 0b011,

        "backend": 0b110,
        "frontend": 0b101,

        "junior": 0b110,
        "senior": 0b101,

        "chicken": 0b110,
        "pizza": 0b101,

        "-": 0b000
    }
    applicant = defaultdict(list)
    answer = []

    for i in info:
        [*rest, score] = i.split()
        applicant[create_bit_key(field, *rest)].append(int(score))
    for a in applicant: # bisect 사용 전에 정렬
        applicant[a].sort()
    for q in query:
        [*rest, score] = q.split()
        query_key = create_bit_key(mask, *list(filter(lambda x: x != "and", rest)))
        answer.append(sum([len(scores) - bisect_left(scores, int(score)) for key, scores in applicant.items() if query_key & key == 0]))
    return answer