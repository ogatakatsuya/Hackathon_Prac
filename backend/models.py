from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.orm import relationship

db = SQLAlchemy()

# ユーザーモデルの定義
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    
    task = relationship("Task", back_populates = "user")
    
    def __init__(self, user_id, password):
        self.user_id = user_id
        self.password = password
        
class Task(db.Model):
    __tablename__ = 'tasks'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    task = db.Column(db.String(100), nullable=False)
    memo = db.Column(db.Text(200), nullable=True)
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', name="fk_tasks_users"), nullable=True)
    user = relationship("User", back_populates = "task")