from pydantic import BaseModel
from typing import Dict,List


class TestResultCreate(BaseModel):
    test_id:int
    user_answers:dict
    score:int


class TestResultOut(BaseModel):
    id:int
    user_id:int
    test_id:int
    answers:dict


    class Config:
        orm_node = True