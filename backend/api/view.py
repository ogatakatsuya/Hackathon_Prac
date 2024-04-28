from flask import Flask, jsonify, request, Blueprint
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
import os
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from models import db,User,Task
from flask_login import LoginManager
from flask_login import login_user, logout_user, current_user, login_required
from flask_cors import CORS
import os
from dotenv import load_dotenv
import google.generativeai as genai

api_bp = Blueprint('api', __name__, url_prefix='/api')

@api_bp.route("/", methods=["GET"])
def generate_response():
    # 質問の形式を指定
    question = "Please tell me one famous sentence which cheers up people's life ,and person who made it.\
                Sentence should be 15 words . Answer-Template is (the saying)-(person name)"
    # OpenAI APIキーを設定
    # .envファイルの読み込み
    load_dotenv()
    
    # API-KEYの設定
    GOOGLE_API_KEY=os.getenv('GOOGLE_API_KEY')
    genai.configure(api_key=GOOGLE_API_KEY)
    # OpenAI GPT-3に質問を送信してレスポンスを取得
    gemini_pro = genai.GenerativeModel("gemini-pro")
    response = gemini_pro.generate_content(question)
    
    return jsonify({"response": response.text})