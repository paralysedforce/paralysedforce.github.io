from flask import Flask, render_template, request, url_for
import os
import pdb
from distance import edit_distance
from pitch_track import track

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = os.path.join(

@app.route('/', methods='GET')
@app.route('/index.html', methods=['GET'])
def index():
    return render_template('transmit.html', data='unknown')

@app.route('/upload_key', methods='POST')
def upload_file():
    f = requests.files['file']
    if f:
        filename = 'key.wav'
        f.save(os.path.join

if __name__ == '__main__':
	app.run()
