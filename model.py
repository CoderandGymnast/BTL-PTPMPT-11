from pyspark.ml.recommendation import ALSModel
from pyspark.sql import SparkSession
from pyspark.sql.functions import col
import pyspark.sql.functions as sf

URL_SPARK_MASTER="spark://192.168.56.101:7000"
PATH_BASE="hdfs://nn:9001/ds"
PATH_MOVIELENS=f"{PATH_BASE}/csv/MovieLens000"
PATH_SQL=f"{PATH_BASE}/sql"

class Model:
    def __init__(self):
        self.ss= SparkSession.builder\
        .appName("Movie Recommender 000")\
        .master(URL_SPARK_MASTER)\
        .getOrCreate()

        self.model=ALSModel.load("model")

        self.movies=self.ss.read.csv(f"{PATH_MOVIELENS}/movies.csv", header=True)
        self.movies.\
            withColumn('movieId', col('movieId').cast('integer')).\
            drop('title').\
            drop('genres')



    def get_recs(self,user_id,num_movies):
        user_recs= self.movies.limit(int(num_movies)).select("movieId").withColumn("userId", sf.lit(user_id))

        user_recs=user_recs.\
            withColumn('userId', col('userId').cast('integer')).\
            withColumn('movieId', col('movieId').cast('integer'))
        user_recs= self.model.transform(user_recs)
        user_recs=user_recs.orderBy('prediction', ascending=False).select("movieId")
        res=list(user_recs.select("movieId").toPandas()["movieId"])
        return res

