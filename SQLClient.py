import shutil
import mysql.connector
import pandas as pd
import random
import os
from env import SQL_HOST,SQL_USER,SQL_PASSWORD, SQL_PATH_BASE, HDFS_PATH_DS_RATINGS, HDFS_PATH_DS_MOVIES

class SQLClient:
    def __init__(self,hdfsClient):
        self.sql = mysql.connector.connect(
          host=SQL_HOST,
          user=SQL_USER,
          password=SQL_PASSWORD,
          database="movies"
        )
        self.hdfsClient=hdfsClient
    def sync(self):
        self.sync_ratings()
        self.sync_movies()

    def sync_ratings(self):
        cursor=self.sql.cursor() 
        cursor.execute("SELECT * FROM ratings")
        res= cursor.fetchall()

        data=pd.DataFrame(res, columns=['userId', 'movieId', 'rating',"timestamp"])

        name=str(random.random())[2:]

        status=os.path.isdir(SQL_PATH_BASE)
        if not status:
          os.mkdir(SQL_PATH_BASE)

        data.to_csv(f"{SQL_PATH_BASE}/{name}.csv")
        with open(f"{SQL_PATH_BASE}/{name}.csv","rb") as out:
            f=out.read()
            self.hdfsClient.write(f"{HDFS_PATH_DS_RATINGS}/{name}.csv",f)
            shutil.rmtree(SQL_PATH_BASE)
    
    def sync_movies(self):
        cursor=self.sql.cursor() 
        cursor.execute("SELECT * FROM movies")
        res= cursor.fetchall()

        data=pd.DataFrame(res, columns=['movieId', 'title', 'genres'])

        name=str(random.random())[2:]

        status=os.path.isdir(SQL_PATH_BASE)
        if not status:
          os.mkdir(SQL_PATH_BASE)

        data.to_csv(f"{SQL_PATH_BASE}/{name}.csv")
        with open(f"{SQL_PATH_BASE}/{name}.csv","rb") as out:
            f=out.read()
            self.hdfsClient.write(f"{HDFS_PATH_DS_MOVIES}/{name}.csv",f)
            shutil.rmtree(SQL_PATH_BASE)
