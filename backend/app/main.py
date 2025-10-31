from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import Base, engine, get_db
from models import User, Test, Question, Result
from schemas import UserCreate, TestCreate, QuestionCreate, TestOut
from auth import hash_password, verify_password, create_access_token

Base.metadata.create_all(bind=engine)

app = FastAPI()

# Регистрация
@app.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email занят")
    hashed = hash_password(user.password)
    new_user = User(email=user.email, password=hashed, role=user.role)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"msg": "Пользователь создан"}

# Создание теста (только учитель)
@app.post("/tests")
def create_test(test: TestCreate, teacher_id: int, db: Session = Depends(get_db)):
    new_test = Test(title=test.title, teacher_id=teacher_id)
    db.add(new_test)
    db.commit()
    db.refresh(new_test)
    return new_test

# Добавление вопроса
@app.post("/questions")
def add_question(question: QuestionCreate, db: Session = Depends(get_db)):
    new_q = Question(text=question.text, correct_answer=question.correct_answer, test_id=question.test_id)
    db.add(new_q)
    db.commit()
    db.refresh(new_q)
    return new_q

# Получение всех тестов
@app.get("/tests", response_model=list[TestOut])
def get_tests(db: Session = Depends(get_db)):
    return db.query(Test).all()