def solution(emergency):
    e_dict = {e:i+1 for i, e in enumerate(sorted(emergency, reverse=True))}
    return [e_dict[e] for e in emergency]