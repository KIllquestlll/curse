from pydantic import BaseModel,EmailStr

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

    