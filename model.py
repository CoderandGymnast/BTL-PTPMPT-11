from pyspark.ml.recommendation import ALS,ALSModel
from pyspark.ml.evaluation import RegressionEvaluator
from pyspark.sql import SparkSession
from pyspark.sql.functions import col
from env import SPARK_URL,HDFS_URL_BASE
import os
import pyspark.sql.functions as sf


class Model:
    def __init__(self):
        self.ss= SparkSession.builder\
        .appName("Movie Recommender 000")\
        .master(SPARK_URL)\
        .getOrCreate()

    def get_recs(self,user_id,num_movies):
        user_recs= self.movies.limit(int(num_movies)).select("movieId").withColumn("userId", sf.lit(user_id))

        user_recs=user_recs.\
            withColumn('userId', col('userId').cast('integer')).\
            withColumn('movieId', col('movieId').cast('integer'))
        user_recs= self.model.transform(user_recs)
        user_recs=user_recs.orderBy('prediction', ascending=False).select("movieId")
        res=list(user_recs.select("movieId").toPandas()["movieId"])
        return res

    def load_model(self):
        self.model=ALSModel.load("model")

    def load_movies(self):
        self.movies=self.ss.read.csv(f"{HDFS_URL_BASE}/movies/*.csv", header=True)
        self.movies=self.movies.dropDuplicates()
        print(f"movie count: {self.movies.count()}")
        self.movies.\
            withColumn('movieId', col('movieId').cast('integer')).\
            drop('title').\
            drop('genres')

    def load_ratings(self):
        self.ratings=self.ss.read.csv(f"{HDFS_URL_BASE}/ratings/*.csv", header=True)
        self.ratings=self.ratings.dropDuplicates()
        self.ratings = self.ratings.\
            withColumn('userId', col('userId').cast('integer')).\
            withColumn('movieId', col('movieId').cast('integer')).\
            withColumn('rating', col('rating').cast('float')).\
            drop('timestamp')

    def train(self):
        # reload data:
        self.load_movies()
        self.load_ratings()

        # splits: 
        (training, testing)= self.ratings.randomSplit([0.8, 0.2])
        uc=self.ratings.select("userId").distinct().count()
        

        tc=training.count()
        tec=testing.count()
        return f"training: {tc} -testing: {tec} - user: {uc}"
        als = ALS(rank=9,regParam=0.15,maxIter=3,userCol="userId", itemCol="movieId", ratingCol="rating", coldStartStrategy="drop")
        self.model = als.fit(training)
        self.model.write().overwrite().save("model")
        predictions = self.model.transform(testing)
        evaluator = RegressionEvaluator(metricName="rmse", labelCol="rating",
                                predictionCol="prediction")
        rmse = evaluator.evaluate(predictions)
        return rmse
