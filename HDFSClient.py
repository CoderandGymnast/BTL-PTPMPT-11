from hdfs import InsecureClient
from env import * 
from urllib.parse import urlparse

import urllib
import base64
import os

class HDFSClient:
    def __init__(self,host,port):
        self.client= InsecureClient(f"http://{host}:{port}")

    def write(self,path,data):
        print(data)
        self.client.write(path,data=data)

    def init(self):
        self.client.makedirs(HDFS_PATH_DS_RATINGS)
        self.client.makedirs(HDFS_PATH_DS_MOVIES)
        self.client.makedirs(HDFS_PATH_IMAGES)

    def clean_ds_csv(self):
        self.client.delete(HDFS_PATH_DS_MOVIES,recursive=True)
        self.client.makedirs(HDFS_PATH_DS_MOVIES)
        self.client.delete(HDFS_PATH_DS_RATINGS,recursive=True)
        self.client.makedirs(HDFS_PATH_DS_RATINGS)

    def get_name(self,url):
        a = urlparse(url)
        name=os.path.basename(a.path)  
        return name

    def load_bytes_from_url(self,url):
        contents = urllib.request.urlopen(url).read()
        data = base64.b64encode(contents)
        return data

    def save_image(self,url):
        data = self.load_bytes_from_url(url)
        name=self.get_name(url) 
        self.write(f"{HDFS_PATH_IMAGES}/{name}",data=data)
        return name
    
    def save_video(self,url):
        data = self.load_bytes_from_url(url)
        name=self.get_name(url) 
        self.write(f"{HDFS_PATH_VIDEOS}/{name}",data=data)
