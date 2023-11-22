# Use Regular Expression
import re
def solution(new_id):
    new_id = new_id.lower()                     # step 1
    new_id = re.sub('[^-\._a-z0-9]', '', new_id)# step 2
    new_id = re.sub('\.{2,}', '.', new_id)      # step 3
    new_id = re.sub('^\.|\.$', '', new_id)      # step 4
    if not new_id:                              # step 5
        new_id = 'a'
    if len(new_id) >= 16:                       # step 6
        new_id = new_id[:15]
        if new_id[-1] == '.':
            new_id = new_id[:-1]
    if len(new_id) <= 2:                        # step 7
        new_id += new_id[-1] * (3 - len(new_id))
    return new_id