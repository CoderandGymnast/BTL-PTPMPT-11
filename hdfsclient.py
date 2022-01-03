from hdfs import InsecureClient

class HDFSClient:
    def __init__(self,host,port):
        self.client= InsecureClient(f"http://{host}:{port}")

    def write(self,path,data):
        print(data)
        self.client.write(path,data=data)

