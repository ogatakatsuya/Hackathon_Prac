from flask import Flask, jsonify, request,Blueprint
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
import os
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from models import db,User,Task
from flask_login import LoginManager
from flask_login import login_user, logout_user, current_user, login_required
from flask_cors import CORS

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

@auth_bp.route("/login", methods=["POST"])
def login():
    user_id = request.json.get("id", None)
    password = request.json.get("password", None)

    # データベースからユーザーを取得して認証
    user = User.query.filter_by(user_id=user_id).first()
    
    if user is not None and user.check_password(password):
        login_user(user)
        print(f"current_user:{current_user.id}")
        access_token = create_access_token(identity={"id": user.id, "user_id": user.user_id})
        return jsonify(access_token=access_token)
    
    else:    
        return jsonify({"error": "認証失敗：無効な資格情報です"}), 401

    # アクセストークンの作成


@auth_bp.route("/register", methods=["POST"])
def register():
    user_id = request.json.get("id", None)
    password = request.json.get("password", None)

    # 入力値の確認
    if not user_id or not password:
        return jsonify({"error": "ユーザーIDまたはパスワードが入力されていません"}), 400
    
    existing_user = User.query.filter_by(user_id=user_id).first()
    
    if existing_user:
        return jsonify({"error": "ユーザーIDは既に使用されています"}), 400

    # 新しいユーザーの作成とデータベースへの保存
    
    new_user = User(user_id=user_id)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "ユーザー登録が完了しました"}), 201

@auth_bp.route("/logout",methods=["GET"])
def logout():
    logout_user()
    return jsonify({"msg":"ログアウトしました"})