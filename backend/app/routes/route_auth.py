from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from models.Users import Users
from core.dependencies import get_current_user
from schemas.User import *
from database.database import SessionLocal
from service.auth import create_user, authenticate_user
from core.security import create_access_token


route_auth = APIRouter(prefix='/users', tags=['users'])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@route_auth.post('/api/register', response_model=LoginResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):
    new_user = create_user(
        db=db,
        first_name=user.first_name,
        last_name=user.last_name,
        group_id=user.group_id,
        password=user.password
    )

    if not new_user:
        raise HTTPException(status_code=400, detail='User already exist')

    
    new_user = db.query(Users).options(joinedload(Users.group)).filter(Users.id == new_user.id).first()

    token = create_access_token(data={'sub': str(new_user.id)})
    user_out = UserOut.from_orm(new_user)

    return LoginResponse(
        message=f"User {new_user.first_name} registered",
        token=token,
        user=user_out
    )


@route_auth.post('/api/login', response_model=LoginResponse)
def login(user: UserLogin, db: Session = Depends(get_db)):
    authenticated_user = authenticate_user(
        db=db,
        first_name=user.first_name,
        last_name=user.last_name,
        password=user.password
    )

    if not authenticated_user:
        raise HTTPException(status_code=401, detail='Invalid credentials')

   
    authenticated_user = db.query(Users).options(joinedload(Users.group)).filter(Users.id == authenticated_user.id).first()

    token = create_access_token(data={'sub': str(authenticated_user.id)})
    user_out = UserOut.from_orm(authenticated_user)
    return LoginResponse(
        message=authenticated_user.first_name,
        token=token,
        user=user_out
    )

@route_auth.delete('/api/delete/{user_id}')
def delete_user_by_id(user_id:int,db:Session = Depends(get_db)):
    user = db.query(Users).filter(Users.id == user_id).first()

    if not user: raise HTTPException(status_code=404,detail='User not found')

    db.delete(user)
    db.commit()

    return {'status':'ok',
            'message':f'{user} has been deleted'}


@route_auth.get('/api/me', response_model=UserOut)
def read_users_me(current_user: Users = Depends(get_current_user)):
    return current_user


@route_auth.get('/api/users', response_model=list[UserOut])
def get_all_users(db: Session = Depends(get_db)):
    users = db.query(Users).options(joinedload(Users.group)).all()
    return users


@route_auth.patch('/api/users/{user_id}/role')
def update_user_role(user_id:int,role_update:UserUpdateRole,
                     db:Session = Depends(get_db),current_user:Users = Depends(get_current_user)):
    
    if current_user.role != 'admin':
        raise HTTPException(status_code=403,detail='Not authorized')
    
    user = db.query(Users).filter(Users.id == user_id).first()

    if not user:
        raise HTTPException(status_code=404,detail="User not found")
    
    user.role = role_update.role
    print("Полученный user_id:", user_id, type(user_id))
    db.commit()
    db.refresh(user)

    return {'id':user.id,'role':user.role}
    
