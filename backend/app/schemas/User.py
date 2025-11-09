from pydantic import BaseModel,EmailStr
from enum import Enum


class UserCreate(BaseModel):

    first_name:str
    last_name:str
    group:str
    password:str

class UserOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    group: str
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
    