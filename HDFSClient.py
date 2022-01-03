from hdfs import InsecureClient
from env import HDFS_PATH_DS_RATINGS,HDFS_PATH_DS_MOVIES

class HDFSClient:
    def __init__(self,host,port):
        self.client= InsecureClient(f"http://{host}:{port}")

    def write(self,path,data):
        print(data)
        self.client.write(path,data=data)

    def clean_ds_csv(self):
        self.client.delete(HDFS_PATH_DS_MOVIES,recursive=True)
        self.client.makedirs(HDFS_PATH_DS_MOVIES)
        self.client.delete(HDFS_PATH_DS_RATINGS,recursive=True)
        self.client.makedirs(HDFS_PATH_DS_RATINGS)
        
