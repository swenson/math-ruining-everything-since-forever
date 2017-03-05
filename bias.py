import random
def pick_num():
  r = random.random()
  num = random.randint(0, 10000) / 100.0
  if r < 0.1:
    return -num
  return num
l = list(pick_num() for _ in range(100000))
original_sum = sum(l)
rounded_sum = sum(round(x) for x in l)
bias = rounded_sum / float(len(l)) - original_sum / float(len(l))
print(bias)
