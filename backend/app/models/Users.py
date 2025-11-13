from sqlalchemy import Column, String, Integer,ForeignKey
from sqlalchemy.orm import relationship
from database.database import Base


class Users(Base):
    __tablename__ = 'users'

    id = Column(Integer,primary_key=True,index=True)
    first_name = Column(String,index=True)
    last_name = Column(String,index=True)
    role = Column(String,default='student')
    hashed_password = Column(String)


    group_id = Column(Integer,ForeignKey('groups.id'),nullable=True)
    group = relationship('Group', back_populates='users')


class Group(Base):
    __tablename__ = 'groups'

    id = Column(Integer,primary_key=True,index=True)
    name = Column(String, unique=True,index=True)

    users = relationship('Users',back_populates='group')
