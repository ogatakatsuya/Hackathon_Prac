from flask import Flask, render_template, request
import requests

app = Flask(__name__)

LOGIN_URL = "http://localhost:5001/login"
INFO_URL = "http://localhost:5001/info"

def authenticate(id, password):
    login_data = {
        "id": id,
        "password": password,
    }
    response = requests.post(LOGIN_URL, json=login_data)

    if response.status_code == 200:
        return response.json()["access_token"]
    else:
        pass

@app.route("/", methods=["GET", "POST"])
def shwo_login():
    if request.method == "POST":
        id = request.form.get("id")
        password = request.form.get("password")
        
        access_token = authenticate(id, password)
        
        if access_token:
            headers = {"Authorization": f"Bearer {access_token}"}
            response = requests.get(INFO_URL, headers=headers)
                        
            if response.status_code == 200:
                user_info = response.json()
                return render_template('index.html', user=user_info)
            else:
                return '<h1 style="color: red;">Error：アクセストークン処理に失敗しました</h1>', 401
        else:
            return '<h1 style="color: red;">Error：認証サービスの認証に失敗しました</h1>', 401
    return render_template("login.html")
