from database.database import Base, engine, SessionLocal
from sqlalchemy.orm import Session
from models.Users import User
from schemas.User import UserCreate
from passlib.hash import bcrypt


def create_database():
    Base.metadata.create_all(bind=engine)


def get_db() -> Session:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_user_by_email(email: str, db: Session):
    return db.query(User).filter(User.email == email).first()


def create_user(user: UserCreate, db: Session):
    user_obj = User(email=user.email, hashed_password=bcrypt.hash(user.hashed_password))
    db.add(user_obj)
    db.commit()
    db.refresh(user_obj)
    return user_obj