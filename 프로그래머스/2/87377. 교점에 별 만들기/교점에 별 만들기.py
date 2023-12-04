def solution(line):
    pos = []
    # initialize for comparison
    x_max = y_max = -float('inf')
    x_min = y_min = float('inf')
    
    for i, l1 in enumerate(line):
        A1, B1, C1 = l1
        for l2 in line[i+1:]:
            A2, B2, C2 = l2
            if A1 * B2 == A2 * B1:  # parallel or same
                continue
            # get intersection point
            x = (B1 * C2 - B2 * C1) / (A1 * B2 - A2 * B1)
            y = (A2 * C1 - A1 * C2) / (A1 * B2 - A2 * B1)
            # integer point condition check
            if x.is_integer() and y.is_integer():
                x, y = int(x), int(y)
                # duplicate check and add to list
                if [x, y] not in pos:
                    pos.append([x, y])
                    # update min, max position
                    x_max, y_max = max(x_max, x), max(y_max, y)
                    x_min, y_min = min(x_min, x), min(y_min, y)
    # make coordinate
    coord = [['.'] * (x_max - x_min + 1) for _ in range(y_max - y_min + 1)]
    # mark star
    for star_x, star_y in pos:
        coord[y_max - star_y][star_x - x_min] = "*"
    return list(map(''.join, coord))