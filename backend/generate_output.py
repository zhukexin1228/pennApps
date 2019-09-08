

from socket import *
import pickle
import json
import collections
import pandas as pd
import math

loaded_model = pickle.load(open('finalized_model.sav', 'rb'))
title_avg_dict_file = open('title_avg_dict.json', 'r')
title_avg_dict = json.load(title_avg_dict_file)
level_avg_dict_file = open('level_avg_dict.json', 'r')
level_avg_dict = json.load(level_avg_dict_file)
state_avg_dict_file = open('state_avg_dict.json', 'r')
state_avg_dict = json.load(state_avg_dict_file)

xTest = [[title_avg_dict["Analyst"], level_avg_dict["Level II"], state_avg_dict["CA"]]]
yPrediction = loaded_model.predict(xTest)
print(yPrediction[0])

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


def getIndex(wage, state):
    return math.floor(10 - info[state]['avg'] / wage * 10)

state = "CA"

res = {}
res["predictWage"] = yPrediction[0]
res["max"] = info[state]['max']
res["min"] = info[state]['min']
res['avg'] = info[state]['avg']
res["index"] = getIndex(yPrediction[0], state)
resJson = json.dumps(res)
print(resJson)
