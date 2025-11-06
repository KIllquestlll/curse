from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship
from database.database import Base


class Users(Base):
    __tablename__ = 'users'

    id = Column(Integer,primary_key=True,index=True)
    first_name = Column(String,index=True)
    last_name = Column(String,index=True)
    group = Column(String)
    hashed_password = Column(String)