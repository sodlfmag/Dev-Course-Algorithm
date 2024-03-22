from collections import deque


def solution(menu, order, k):
    order = deque(order)
    cafe = deque([])
    drinks = deque([])
    max_customers = 0

    while order:
        o = order.popleft()
        cafe.append(o)
        drinks.append(menu[o])

        max_customers = max(max_customers, len(cafe))

        t = k
        while drinks and t:
            if drinks[0] <= t:
                d = drinks.popleft()
                cafe.popleft()
                t -= d
            else:
                drinks[0] -= t
                break

    return max_customers
