"""
    Make dictionary
"""
# from itertools import product

# def solution(word):
#     dictionary = [''.join(p) for p in product(['', 'A', 'E', 'I', 'O', 'U'], repeat = 5)]
#     dictionary = sorted(list(set(dictionary)))
#     return dictionary.index(word)

"""
    Use Recursion
"""
def dict_maker(word, length, dictionary):
    if length == 6: return
    if word != '': dictionary.append(word)
    for alphabet in ['A', 'E', 'I', 'O', 'U']:
        dict_maker(''.join([word, alphabet]), length + 1, dictionary)

def solution(word):
    dictionary = []
    dict_maker('', 0, dictionary)
    return dictionary.index(word) + 1