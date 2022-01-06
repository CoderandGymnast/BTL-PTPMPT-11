HDFS_HOST="nn"
HDFS_PORT="9870"

HDFS_URL_BASE=f"hdfs://{HDFS_HOST}:9001/ds/csv"

SPARK_HOST="mn"
SPARK_PORT="7000"
SPARK_URL=f"spark://{SPARK_HOST}:{SPARK_PORT}"


HDFS_PATH_DS="/ds"
HDFS_PATH_DS_CSV=f"{HDFS_PATH_DS}/csv"
HDFS_PATH_DS_RATINGS=f"{HDFS_PATH_DS}/csv/ratings"
HDFS_PATH_DS_MOVIES=f"{HDFS_PATH_DS}/csv/movies"
HDFS_PATH_SQL_RATINGS=f"{HDFS_PATH_DS}/sql/ratings"
HDFS_PATH_SQL_MOVIES=f"{HDFS_PATH_DS}/sql/movies"
HDFS_PATH_IMAGES=f"{HDFS_PATH_DS}/images"
HDFS_PATH_VIDEOS=f"{HDFS_PATH_DS}/videos"

SQL_PATH_BASE="tmp" # NOTE: store data from SQL server temperarily"
SQL_HOST="sql" # TODO: change this to the sql host of the website.
SQL_USER="hungvs"
SQL_PASSWORD="12345678"
SQL_DATABASE="movies"


