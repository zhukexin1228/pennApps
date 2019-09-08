import collections
import pandas as pd
import math

f = open('apt_price.csv')
states = collections.defaultdict(list)
i = 0
for line in f:
    if i == 0:
        i += 1
        continue
    lst = line.split(',')
    states[lst[0]].append(float(lst[1]))
    i += 1
f.close()

info = {}
for key, val in states.items():
    if key not in info:
        info[key] = {}
    info[key]["max"] = max(val)
    info[key]["min"] = min(val)
    info[key]["avg"] = sum(val) / len(val)

state = "CA"
wage = 1000000
print(math.floor(10 - info[state]['avg'] / wage * 10))
