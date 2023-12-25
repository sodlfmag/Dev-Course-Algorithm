def solution(citations):
    # 정렬을 하면 자기 자신보다 왼쪽은 작은 숫자, 오른쪽은 큰 숫자이므로 인용 개수를 세지 않아도 됨
    citations.sort()
    for i, citation in enumerate(citations):
        if citation >= len(citations) - i:
            return len(citations) - i
    return 0