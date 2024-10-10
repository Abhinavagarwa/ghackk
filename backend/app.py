from flask import Flask, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
from config import Config
from bson.objectid import ObjectId 

app = Flask(__name__)
app.config.from_object(Config)
mongo = PyMongo(app)
CORS(app, origin=["http://localhost:3000"])

webtoon_collection = mongo.db.webtoon

@app.route('/webtoon', methods=['GET'])
def giveData():
    webtoons = webtoon_collection.find()
    result = []
    for webtoon in webtoons:
        result.append({
            '_id': str(webtoon['_id']),
            'title': webtoon['title'],
            'description': webtoon['description'],
            'image_url': webtoon['image_url']
        })
    return jsonify(result)

if __name__=="__main__":
    app.run(debug=True)