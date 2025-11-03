from fastapi import FastAPI,HTTPException,Depends
from fastapi.security import *
from fastapi.middleware.cors import CORSMiddleware
from service import get_db,get_user_by_email
from sqlalchemy.orm import Session
from schemas.User import UserCreate
from database.database import Base,engine
from models.Users import User


app = FastAPI()


@app.post('/api/users')
async def create_user(user: UserCreate,db:Session = Depends(get_db)):
    db_user = get_user_by_email(user.email,db)

    if db_user:
        raise HTTPException(status_code=500,detail='Email already')
    
    return  create_user(user,db)
    


def init_db():
    Base.metadata.create_all(bind=engine)

    

if __name__ == "__main__":
    init_db()

