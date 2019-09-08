
from socket import *
import pickle
import json
import collections
import pandas as pd
import math
import asyncio
import websockets


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


async def echo(websocket, path):
    async for message in websocket:
        data = await websocket.recv()

        loaded_model = pickle.load(open('finalized_model.sav', 'rb'))
        title_avg_dict_file = open('title_avg_dict.json', 'r')
        title_avg_dict = json.load(title_avg_dict_file)
        level_avg_dict_file = open('level_avg_dict.json', 'r')
        level_avg_dict = json.load(level_avg_dict_file)
        state_avg_dict_file = open('state_avg_dict.json', 'r')
        state_avg_dict = json.load(state_avg_dict_file)

        requests = json.load(data)
        jobTitle = requests["jobtitle"]
        state = requests["location"]
        level = requests["level"]

        xTest = [[title_avg_dict[jobTitle],
                  level_avg_dict[level], state_avg_dict[state]]]
        yPrediction = loaded_model.predict(xTest)

        res["predictWage"] = yPrediction[0]
        res["max"] = info[state]['max']
        res["min"] = info[state]['min']
        res['avg'] = info[state]['avg']
        res["index"] = getIndex(yPrediction[0], state)
        resJson = json.dumps(res)
        await websocket.send(res)


# s = socket(AF_INET, SOCK_STREAM)
# s.setsockopt(SOL_SOCKET, SO_REUSEADDR, 1)
# s.bind(('localhost', port))
# s.listen(1)


while True:

    print("data", data)

    # conn.sendAll(res)
    start_server = websockets.serve(echo, "localhost", 5000)

    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()
