from flask import Flask
from flask import request
from model import Model
from HDFSClient import HDFSClient 
from env import HDFS_HOST,HDFS_PORT,HDFS_PATH_DS_CSV
from SQLClient import SQLClient
import random

from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['WTF_CSRF_METHODS'] = [] 
model= None
hdfsClient = HDFSClient(HDFS_HOST,HDFS_PORT)
sqlClient=SQLClient(hdfsClient)

@app.route('/get_recs', methods=['GET', 'POST'])
@cross_origin()
def get_recs():
    user_id=request.args.get("user_id")
    num_movies=request.args.get("num_movies")
    res=model.get_recs(user_id,num_movies)
    return f"{res}" 

@app.route('/upload', methods=['GET', 'POST'])
@cross_origin()
def upload():
    f = request.files['file']
    ds_type=request.form["type"]
    if not ((ds_type=="movies") or (ds_type=="ratings")):
        return "[ERROR]: invalid dataset type"
    path=f"{HDFS_PATH_DS_CSV}/{ds_type}"
    filename=str(random.random())[2:]
    hdfsClient.write(f"{path}/{filename}.csv",f.read()) 

    return ""

@app.route('/train', methods=['GET', 'POST'])
@cross_origin()
def train():
    if not model:
        return "[ERROR]: model have not loaded"
    res=model.train() 
    return f"{res}" 

@app.route('/init', methods=['GET', 'POST'])
@cross_origin()
def init():
    global model
    if not model: # first load.
        model=Model()
        hdfsClient.init()
    else: # reload.
        return "[WARNING]: system already inited"
    return "" 

@app.route('/sync_sql', methods=['GET', 'POST'])
@cross_origin()
def sync_sql():
    sqlClient.sync_ratings()
    sqlClient.sync_movies()
    return "" 

@app.route('/clean_ds_csv', methods=['GET', 'POST'])
@cross_origin()
def clean_ds_csv():
    hdfsClient.clean_ds_csv() 
    return "" 

@app.route('/save_image', methods=['GET', 'POST'])
@cross_origin()
def save_image():
    url=request.args.get("url")
    name=hdfsClient.save_image(url)
    return name 

@app.route('/download_ds_csv', methods=['GET', 'POST'])
@cross_origin()
def download_ds_csv():
    hdfsClient.download_ds_csv()
    return ""
    
if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True)
