import mysql.connector
import pandas as pd
import random
import os
from env import SQL_HOST,SQL_USER,SQL_PASSWORD, SQL_PATH_BASE, HDFS_PATH_DS000_RATINGS

class SQLClient:
    def __init__(self,hdfsClient):
        self.sql = mysql.connector.connect(
          host=SQL_HOST,
          user=SQL_USER,
          password=SQL_PASSWORD,
          database="movies"
        )
        self.hdfsClient=hdfsClient


    def load_ratings(self):
        cursor=self.sql.cursor() 
        cursor.execute("SELECT * FROM ratings")
        res= cursor.fetchall()

        data=pd.DataFrame(res, columns=['user_id', 'movie_id', 'rating'])

        name=str(random.random())[2:]

        status=os.path.isdir("tmp")
        if not status:
          os.mkdir(SQL_PATH_BASE)

        data.to_csv(f"{SQL_PATH_BASE}/{name}.csv")
        with open(f"{SQL_PATH_BASE}/{name}.csv","rb") as out:
            f=out.read()
            self.hdfsClient.write(f"{HDFS_PATH_DS000_RATINGS}/{name}.csv",f)
