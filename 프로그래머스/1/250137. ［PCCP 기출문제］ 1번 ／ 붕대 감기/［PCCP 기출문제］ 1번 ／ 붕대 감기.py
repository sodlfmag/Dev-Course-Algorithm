def solution(bandage, health, attacks):
    casting_time, recovery_per_sec, bonus_recovery = bandage
    character_health = health
    curr_time = 0
    for attack_time, damage in attacks:
        time_gap = attack_time - curr_time - 1
        # calculate recovery
        character_health += recovery_per_sec * time_gap
        # calculate bonus recovery
        if time_gap >= casting_time:
            character_health += bonus_recovery * (time_gap // casting_time)
        # clip max health
        if character_health > health:
            character_health = health
        # attack
        character_health -= damage
        # check if character is dead
        if character_health <= 0:
            return -1
        # update current time
        curr_time = attack_time
    return character_health