from flask import Flask
from flask import request
from model import Model
from HDFSClient import HDFSClient 
from env import HDFS_HOST,HDFS_PORT
from SQLClient import SQLClient


app = Flask(__name__)

model= None
hdfsClient = HDFSClient(HDFS_HOST,HDFS_PORT)
sqlClient=SQLClient(hdfsClient)

@app.route('/get_recommendations', methods=['GET', 'POST'])
def get_recommendations():
    user_id=request.args.get("user_id")
    num_movies=request.args.get("num_movies")
    res=model.get_recs(user_id,num_movies)
    return f"{res}" 

@app.route('/upload', methods=['GET', 'POST'])
def upload():
    f = request.files['file']
    path=request.form["path"]
    hdfsClient.write(f"{path}/{f.filename}",f.read()) 

    return ""

@app.route('/train', methods=['GET', 'POST'])
def train():
    if not model:
        return "[ERROR]: model have not loaded"
    res=model.train() 
    return f"{res}" 

@app.route('/load', methods=['GET', 'POST'])
def load():
    global model
    if not model: # first load.
        model=Model()
    else: # reload.
        model.load_model()
    return "" 

@app.route('/sync_sql', methods=['GET', 'POST'])
def sync_sql():
    sqlClient.load_ratings()
    return "" 

if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True)
