from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity

app = Flask(__name__)

app.config["JWT_SECRET_KEY"] = "secret-key"
jwt = JWTManager(app)

users = {
    "user1": {
        "password": "pass1",
        'name': '田中　太郎',
        'email': 'microtarou@example.com',
        'phone': '080-1234-5678'
    },
    "user2": {
        "password": "pass2",
        'name': '佐藤　次郎',
        'email': 'servicejirou@example.com',
        'phone': '080-9876-5432'
    },
}

@app.route("/login", methods=["POST"])
def login():
    user_id = request.json.get("id", None)
    password = request.json.get("password", None)

    if user_id not in users or users[user_id]["password"] != password:
        return jsonify({"error": "認証失敗：無効な資格情報です"}), 401

    access_token = create_access_token(identity=users[user_id])
    return jsonify(access_token=access_token)

@app.route("/info", methods=["GET"])
@jwt_required()
def git_info(): 
    current_user = get_jwt_identity()
    print(current_user)
    return jsonify(current_user)

if __name__ == '__main__':
    app.run()
