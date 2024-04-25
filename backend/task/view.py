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

task_bp = Blueprint('task', __name__, url_prefix='/task')

@task_bp.route("/", methods=["POST"])
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

@task_bp.route("/",methods=["GET"])
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

@task_bp.route("/<string:date>",methods=["GET"])
@jwt_required()
def get_day_task(date):
    currenUser = get_jwt_identity()["id"]
    tasks = Task.query.filter_by(user_id = currenUser, date=date).all()
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

@task_bp.route("/<int:task_id>", methods=["DELETE"])
@jwt_required()
def delete_task(task_id):
    currentUser = get_jwt_identity()["id"]
    task = Task.query.filter_by(user_id=currentUser,id=task_id).first_or_404()
    db.session.delete(task)
    db.session.commit()
    
    return jsonify({"message":"content deleted successfully!"})

@task_bp.route("/<int:task_id>", methods=["PUT"])
@jwt_required
def update(task_id):
    currentUser = get_jwt_identity()["id"]
    target_data = Task.query.filter_by(id=task_id, user_id=currentUser).first_or_404()
    task = request.json.get("task", None)
    memo = request.json.get("memo", None)
    date = request.json.get("date", None)
    
    target_data.task = task
    target_data.memo = memo
    target_data.date = date
    db.session.commit()