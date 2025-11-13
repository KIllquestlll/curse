from pydantic import BaseModel

class GroupBase(BaseModel):
    id:int
    name:str


    class Config:
        orm_mode = True
        