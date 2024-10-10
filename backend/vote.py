from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_pymongo import PyMongo
from bson.objectid import ObjectId

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/tower_of_god"  # Change this to your MongoDB connection string
mongo = PyMongo(app)
CORS(app, origin=["http://localhost:3000"])

# Initialize votes collection
votes_collection = mongo.db.votes

# Route to vote for manhwa or anime
@app.route('/vote', methods=['POST'])
def vote():
    data = request.json
    version = data.get('version')

    if version not in ['manhwa', 'anime']:
        return jsonify({"error": "Invalid version"}), 400

    # Increment vote count
    votes_collection.update_one(
        {'version': version},
        {'$inc': {'count': 1}},
        upsert=True
    )

    return jsonify({"message": "Vote recorded"}), 200

# Route to get voting results
@app.route('/results', methods=['GET'])
def results():
    results = {}
    manhwa_vote = votes_collection.find_one({'version': 'manhwa'})
    anime_vote = votes_collection.find_one({'version': 'anime'})

    results['manhwa'] = manhwa_vote['count'] if manhwa_vote else 0
    results['anime'] = anime_vote['count'] if anime_vote else 0

    return jsonify(results)

if __name__ == "__main__":
    app.run(debug=True, port=5001)
