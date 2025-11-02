from pydantic import BaseModel
from typing import List

class UserCreate(BaseModel):
    name:str
    password: str
    role: str

class TestCreate(BaseModel):
    title: str

class QuestionCreate(BaseModel):
    text: str
    correct_answer: str
    test_id: int

class TestOut(BaseModel):
    id: int
    title: str

    class Config:
        orm_mode = True