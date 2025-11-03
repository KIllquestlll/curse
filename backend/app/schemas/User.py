from pydantic import BaseModel,EmailStr


class _UserBase(BaseModel):
    email:str


class UserCreate(_UserBase):
    hashed_password:str

    class Config:
        orm_mode = True


class User(_UserBase):
    id:int

    class Config:
        orm_mode = True