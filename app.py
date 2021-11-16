""" Flask application that runs the API and renders the html page(s) """
from flask import Flask, render_template, jsonify

######## Setting up the Flask app ########
# Spin up flask app
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/Home/')
def home():
    return render_template('Home.html')

@app.route("/Analysis/")
def analysis():
    return render_template('Analysis.html')

@app.route('/Team/')
def team():
    return render_template('Team.html')

######## Running the Flask App ########
# You need this - this allows you to actually run the app
if __name__ == '__main__':
    app.run(debug=True)