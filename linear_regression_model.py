import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
import pickle
import json


dataset = pd.read_csv('newH1bClean.csv')
dataset[dataset.columns[3:]] = dataset[dataset.columns[3:]].replace('[\$,]', '', regex=True).astype(float)

title_avg_df = dataset.groupby('TITLE').mean().reset_index()
title_avg_dict = title_avg_df.set_index('TITLE').T.to_dict('record')[0]

state_avg_df = dataset.groupby('STATE').mean().reset_index()
state_avg_dict = state_avg_df.set_index('STATE').T.to_dict('record')[0]

level_avg_df = dataset.groupby('LEVEL').mean().reset_index()
level_avg_dict = level_avg_df.set_index('LEVEL').T.to_dict('record')[0]


features = dataset.iloc[:, :-1].values.tolist()
wage = dataset.iloc[:, -1].values

#for feature in features:
features = [tuple(x) for x in features]

featureToAllSalary = dict()
for index, x in enumerate(features):
	if x not in featureToAllSalary:
		featureToAllSalary.update({x:[wage[index]]})
	else:
		curr_wages = featureToAllSalary.get(x)
		curr_wages.append(wage[index])
		featureToAllSalary.update({x:curr_wages})

featureToAvgSalary = dict()
for feature in featureToAllSalary:
	curr_wages = featureToAllSalary[feature]
	featureToAvgSalary.update({feature:sum(curr_wages) / len(curr_wages)})

job_info = []
label = []
for feature in featureToAvgSalary:
	job_info.append(feature)
	label.append(featureToAvgSalary[feature])
input_df = pd.DataFrame(list(job_info), columns=["TITLE",'STATE','LEVEL'])
input_df = input_df.replace({"TITLE": title_avg_dict})
input_df = input_df.replace({"LEVEL": level_avg_dict})
input_df = input_df.replace({"STATE": state_avg_dict})


input_lst = input_df.iloc[:, :].values.tolist()
linearRegressor = LinearRegression()
linearRegressor.fit(input_lst, label)


pickle.dump(linearRegressor, open('finalized_model.sav', 'wb'))

json_dump = json.dumps(title_avg_dict)
f = open("title_avg_dict.json","w")
f.write(json_dump)
f.close()

json_dump = json.dumps(level_avg_dict)
f = open("level_avg_dict.json","w")
f.write(json_dump)
f.close()

json_dump = json.dumps(state_avg_dict)
f = open("state_avg_dict.json","w")
f.write(json_dump)
f.close()

