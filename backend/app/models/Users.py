from sqlalchemy import Column,String,Integer,ForeignKey
from sqlalchemy.orm import relationship
from database import Base



class User(Base):
    __tablename__ = 'users'

    name = Column(String,nullable=False,unique=True)
    id = Column(Integer,primary_key=True,index=True)
    password = Column(String,unique=True,nullable=False)
    role = Column(String,nullable=False)

    result = relationship('Result',back_populates='user')
