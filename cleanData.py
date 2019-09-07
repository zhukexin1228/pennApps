import csv
import pandas as pd
H1b = pd.read_csv('H-1B_Disclosure_Data_FY2019.csv')
H1b_data = H1b[["JOB_TITLE", "WORKSITE_STATE",
                "PW_WAGE_LEVEL", "PREVAILING_WAGE", "PW_UNIT_OF_PAY"]]

H1b_data = H1b_data.dropna()
H1b_data = H1b_data[H1b_data.PW_UNIT_OF_PAY == "Year"]
H1b_data = H1b[["JOB_TITLE", "WORKSITE_STATE",
                "PW_WAGE_LEVEL", "PREVAILING_WAGE"]]
H1bClean_csv = H1b_data.to_csv(
    r'/Users/kexin/Desktop/pennApps/H1bClean.csv', index=None, header=True)


apt = pd.read_csv('city_apartment_price.csv')
apt = apt[["State", "2018-08"]]
apt_csv = apt.to_csv(
    r'/Users/kexin/Desktop/pennApps/apt_price.csv', index=None, header=True)
