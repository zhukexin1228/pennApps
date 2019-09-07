import pandas as pd
apt_df = pd.read_csv('apt_price.csv')
avgNum = apt_df.groupby('State').mean()
minPrice = apt_df.groupby('State').min()
print(avgNum)
