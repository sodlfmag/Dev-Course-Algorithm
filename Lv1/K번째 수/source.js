function solution(array, commands) {
    const arr = new Array()
    const result = new Array()
    
    for(let s = 0; s<commands.length; s++){
        let temp = new Array()
        temp = array.slice(commands[s][0]-1, commands[s][1])
        temp.sort(function(a, b)  {
            return a - b;
        });
        result.push(temp[commands[s][2]-1])
    }
    return result
}