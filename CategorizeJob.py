import pandas as pd
from difflib import SequenceMatcher


def similar(a, b):
    return SequenceMatcher(None, a.lower(), b.lower()).ratio()

data = pd.read_csv('H1bClean.csv')

job_options = ['Accountant', 'Analyst', 'Architect', 'Assistant Professor', 'Associate', 'Consultant', 'Manager', 'Physical Therapist', 'Postdoctoral Fellow', 'Project Manager', 'Research Associate', 'Software Engineer/Developer', 'Technical Lead']
drop_index = []
for index, job_title in enumerate(data['JOB_TITLE']):
	similarity_level = []
	for curr_job_option in job_options:
		similarity_level.append(similar(curr_job_option, job_title))

	
	max_level = max(similarity_level)
	max_option_index = similarity_level.index(max_level)
	most_related_job = job_options[max_option_index]
	if max_level < 0.5:
		drop_index.append(index)
	
	# print(index, job_title, most_related_job, max_level)
	data.loc[index, 'JOB_TITLE'] = most_related_job
data = data.drop(drop_index)
data.to_csv('newH1bClean.csv')



