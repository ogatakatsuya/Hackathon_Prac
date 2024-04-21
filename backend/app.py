from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
import os
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from models import db,User,Task
from flask_login import LoginManager
from flask_login import login_user, logout_user, current_user, login_required
from flask_cors import CORS


app = Flask(__name__)
CORS(app, supports_credentials=True)

# データベースの設定
app.config['SECRET_KEY'] = os.urandom(24)
base_dir = os.path.dirname(__file__)
database = 'sqlite:///' + os.path.join(base_dir, 'data.sqlite')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///my_database.db'
app.config['SQLALCHEMY_DATABASE_URI'] = database
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["JWT_SECRET_KEY"] = os.environ.get('SECRET_KEY', 'default-secret-key')

db.init_app(app)
migrate = Migrate(app, db)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"
jwt = JWTManager(app)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/')
def hello():
    return "Hello World from Flask!"

@app.route("/login", methods=["POST"])
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


@app.route("/register", methods=["POST"])
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

@app.route("/logout",methods=["GET"])
def logout():
    logout_user()
    return jsonify({"msg":"ログアウトしました"})

@app.route("/task", methods=["POST"])
@jwt_required()
def add_tasks():
    currentUser = get_jwt_identity()["id"]
    task = request.json.get("task", None)
    memo = request.json.get("memo", None)
    date = request.json.get("date", None)
    
    new_task = Task(task=task, memo=memo, date=date ,user_id=currentUser)
    db.session.add(new_task)
    db.session.commit()
    
    newTask ={
        "task": task,
        "memo": memo,
        "date": date
    }
    return jsonify({"message":"タスク登録が完了しました","new_task":newTask})

@app.route("/task",methods=["GET"])
@jwt_required()
def get_tasks():
    currenUser = get_jwt_identity()["id"]
    tasks = Task.query.filter_by(user_id = currenUser).all()
    serialized_tasks = []
    
    for task in tasks:
        serialized_tasks.append({
            "id": task.id,
            "task": task.task,
            "memo": task.memo,
            "date": task.date,
            "user_id": task.user_id
        })
    
    return jsonify(serialized_tasks)

@app.route("/task/<int:task_id>", methods=["DELETE"])
@jwt_required()
def delete_task(task_id):
    currentUser = get_jwt_identity()["id"]
    task = Task.query.filter_by(user_id=currentUser,id=task_id).first_or_404()
    db.session.delete(task)
    db.session.commit()
    
    return jsonify({"message":"content deleted successfully!"})

if __name__ == '__main__':
    app.run()
