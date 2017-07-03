#~ current_number = 1
#~ while current_number <= 5:
	#~ print(current_number)
	#~ current_number += 1
	
#~ d = {
	#~ 'Adam': 95,
	#~ 'Lisa': 85,
	#~ 'Bart': 59
#~ }

#~ str = input('请输入分数：')
#~ print(d[str])

#~ for (key, value) in d.items():
    #~ print(key, value)
    
    
from random import randint
import timeit

data = [randint(-10, 10) for _ in range(10)]
print(data)

print(filter(lambda x: x >= 0, data))
print([x for x in data if x < 0])

timeit [x for x in data if x < 0]
