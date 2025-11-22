from pydantic import BaseModel,EmailStr
from typing import Optional
from enum import Enum


class UserCreate(BaseModel):

    first_name:str
    last_name:str
    group_id:int
    password:str

    model_config = {
        "from_attributes": True
    }

class GroupOut(BaseModel):
    id: int
    name: str

    model_config = {
        "from_attributes": True
    }


class UserOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    group: Optional[GroupOut] = None
    role: str | None = None

    model_config = {
        'from_attributes':True
    }



class UserLogin(BaseModel):
    first_name:str
    last_name:str
    password:str
    

class LoginResponse(BaseModel):
    message:str
    token:str
    user:UserOut


class RoleEnum(str,Enum):
    student = 'student'
    teacher = 'teacher'
    admin = 'admin'

class UserUpdateRole(BaseModel):
    role:str
    