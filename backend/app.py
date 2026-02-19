from flask import Flask, jsonify
from flask_cors import CORS
import sys
import os

# Add automation folder to Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from automation.bot import run_bot

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return jsonify({"message": "AI Web Automation Agent Running"})


@app.route("/start")
def start_automation():
    try:
        logs = run_bot()
        return jsonify({"status": "success", "logs": logs})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})



if __name__ == "__main__":
    app.run(debug=True)
