function solution(line) {
    const pos = [];
    // initialize for comparison
    let x_max = y_max = -Infinity;
    let x_min = y_min = Infinity;
    
    line.forEach((l1, i) => {
        const [A1, B1, C1] = l1;
        line.slice(i+1).forEach(l2 => {
            const [A2, B2, C2] = l2;
            if (A1 * B2 === A2 * B1) return;  // parallel or same
            // get intersection point
            let x = (B1 * C2 - B2 * C1) / (A1 * B2 - A2 * B1);
            let y = (A2 * C1 - A1 * C2) / (A1 * B2 - A2 * B1);
            // integer point condition check
            if (Number.isInteger(x) && Number.isInteger(y)) {
                [x, y] = [parseInt(x), parseInt(y)];
                // duplicate check and add to list
                if (!pos.some(p => p[0] === x && p[1] === y)) {    // pos.includes([x, y])로는 확인 안됨 ex) [1, 2] === [1, 2] : false
                    pos.push([x, y]);
                    // update min, max position
                    x_max = Math.max(x_max, x); y_max = Math.max(y_max, y);
                    x_min = Math.min(x_min, x); y_min = Math.min(y_min, y);
                }
            }
        });
    });
    const coord = Array(y_max - y_min + 1).fill().map(() => Array(x_max - x_min + 1).fill('.'));    // make coordinate
    pos.forEach(([star_x, star_y]) => coord[y_max - star_y][star_x - x_min] = "*"); // mark star
    return coord.map((row) => row.join(''));
}