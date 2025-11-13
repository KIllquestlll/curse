from fastapi import Depends,HTTPException,status
from sqlalchemy.orm import Session
from models.Users import *
import bcrypt

def hash_password(password:str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'),bcrypt.gensalt()).decode('utf-8')

def create_user(db:Session, first_name:str,last_name:str,group_id:int,password:str):

    existing_user = db.query(Users).filter(
        Users.first_name == first_name,
        Users.last_name == last_name,
        Users.group_id == group_id
    ).first()


    group = db.query(Group).filter(Group.id == group_id).first()
    if not group:
        raise HTTPException(status_code=400, detail="Указанная группа не найдена")
    
    if existing_user:
        return None
    
    user = Users(
        first_name=first_name,
        last_name = last_name,
        group_id = group_id,
        hashed_password = hash_password(password)
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def authenticate_user(db:Session, first_name:str,last_name:str,password:str):
    user = db.query(Users).filter(
        Users.first_name == first_name,
        Users.last_name == last_name,
    ).first()

    if not user:
        return None
    
    if bcrypt.checkpw(password.encode('utf-8'),user.hashed_password.encode('utf-8')):
        return user

