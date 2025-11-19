from pydantic import BaseModel
from typing import List


class AnswerCreate(BaseModel):
    text:str
    is_correct:bool


class QuestionCreate(BaseModel):
    text:str
    answers:List[AnswerCreate]

class TestCreate(BaseModel):
    title:str
    group_id:int
    questions:List[QuestionCreate]

class TestSummary(BaseModel):
    test_title:str
    group_name:str

    model_config = {'from_attributes':True}

class AnswerRead(BaseModel):
    text: str
    is_correct: bool

    model_config = {
        "from_attributes": True
    }

class QuestionRead(BaseModel):
    text: str
    answers: List[AnswerRead]

    model_config = {
        "from_attributes": True
    }

class TestRead(BaseModel):
    id: int
    title: str
    group_id: int
    questions: List[QuestionRead]

    model_config = {
        "from_attributes": True
    }