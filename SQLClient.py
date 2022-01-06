import shutil
import mysql.connector
import pandas as pd
import random
import os
from env import *


class SQLClient:
    def __init__(self,hdfsClient):
        self.hdfsClient=hdfsClient

    def connect(self):
        self.sql = mysql.connector.connect(
          host=SQL_HOST,
          user=SQL_USER,
          password=SQL_PASSWORD,
          database="movies"
        )

    def close(self):
        self.sql.close()


    def sync(self):
        self.connect()
        self.hdfsClient.clean_ds_sql()
        os.mkdir(SQL_PATH_BASE)
        self.sync_movies() 
        self.sync_ratings()
        shutil.rmtree(SQL_PATH_BASE)

    def sync_ratings(self):
        cursor=self.sql.cursor() 
        cursor.execute("SELECT * FROM ratings")
        res= cursor.fetchall()
        cursor.close()
        data=pd.DataFrame(res, columns=['rating', 'timestamp', 'userId',"movieId"])
        pd.set_option("display.max_rows", None, "display.max_columns", None)
        name=str(random.random())[2:]

        data.to_csv(f"{SQL_PATH_BASE}/{name}.csv")
        with open(f"{SQL_PATH_BASE}/{name}.csv","rb") as out:
            f=out.read()
            self.hdfsClient.write(f"{HDFS_PATH_SQL_RATINGS}/{name}.csv",f)
    
    def sync_movies(self):
        cursor=self.sql.cursor() 
        cursor.execute("SELECT * FROM movies")
        res= cursor.fetchall()
        cursor.close()

        data=pd.DataFrame(res, columns=['title', 'genres', 'movieId'])

        name=str(random.random())[2:]


        data.to_csv(f"{SQL_PATH_BASE}/{name}.csv")
        with open(f"{SQL_PATH_BASE}/{name}.csv","rb") as out:
            f=out.read()
            self.hdfsClient.write(f"{HDFS_PATH_SQL_MOVIES}/{name}.csv",f)

