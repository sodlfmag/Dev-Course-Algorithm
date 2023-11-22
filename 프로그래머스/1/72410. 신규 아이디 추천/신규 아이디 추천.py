# Use Regular Expression
import re
def solution(new_id):
    new_id = new_id.lower()                     # step 1
    new_id = re.sub('[^-\._a-z0-9]', '', new_id)# step 2
    new_id = re.sub('\.{2,}', '.', new_id)      # step 3
    new_id = re.sub('^\.|\.$', '', new_id)      # step 4
    new_id = 'a' if not new_id else new_id[:15] # step 5
    new_id = re.sub('\.$', '', new_id)          # step 6
    return new_id.ljust(3, new_id[-1])          # step 7