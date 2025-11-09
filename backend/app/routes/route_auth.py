from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session
from models.Users import Users
from core.dependencies import get_current_user
from schemas.User import *
from database.database import SessionLocal
from service.auth import create_user,authenticate_user
from core.security import create_access_token


route_auth = APIRouter(prefix='/users',tags=['users'])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@route_auth.post('/api/register',response_model=UserOut)
def register(user:UserCreate,db:Session = Depends(get_db)):

    new_user = create_user(
        db=db,
        first_name=user.first_name,
        last_name=user.last_name,
        group=user.group,
        password=user.password
    )
    
    if not new_user:
        raise HTTPException(status_code=400,detail='User already exist')
    
    return new_user


@route_auth.post('/api/login',response_model=LoginResponse)
def login(user:UserLogin,db: Session = Depends(get_db)):

    authenticated_user = authenticate_user(
        db=db,
        first_name=user.first_name,
        last_name=user.last_name,
        password=user.password
    )

    if not authenticated_user:
        raise HTTPException(status_code=401,detail='Invalid credentials')
    
    user_out = UserOut.from_orm(authenticated_user)
    token = create_access_token(data={'sub':str(authenticated_user.id)})
    return LoginResponse(
        message=authenticated_user.first_name,
        token=token,
        user=user_out
    )

@route_auth.get('/api/me', response_model=UserOut)
def read_users_me(current_user: Users = Depends(get_current_user)):
    return current_user