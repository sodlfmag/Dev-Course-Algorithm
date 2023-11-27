function solution(t, p) {
    let temp = ''
    let cnt = 0
    for(let i=0;i<=t.length - p.length; i++){
        temp = t.slice(i, i+p.length)
        if(Number(temp) <= Number(p))
            cnt += 1
    }
    return cnt
}