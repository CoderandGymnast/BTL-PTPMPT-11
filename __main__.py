from flask import Flask
from flask import request
from model import Model

app = Flask(__name__)

model= None

@app.route('/get_recommendations', methods=['GET', 'POST'])
def get_recommendations():
    user_id=request.args.get("user_id")
    num_movies=request.args.get("num_movies")
    global model
    if not model:
        model = Model() # TODO: move this logic out of this function.

    res=model.get_recs(user_id,num_movies)
    return f"{res}" 

@app.route('/upload', methods=['GET', 'POST'])
def upload():
    f = request.files['file']
    f.save(f.filename)
    return ""
       



if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True)
