import pickle
import json

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
