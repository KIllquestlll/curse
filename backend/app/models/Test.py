from sqlalchemy import Column,String,Integer,ForeignKey
from sqlalchemy.orm import relationship
from database import Base


class Tests(Base):
    __tablename__ = 'tests'

    id = Column(Integer,primary_key=True,index=True)
    title = Column(String,nullable=False)
    teacher_id = Column(Integer,ForeignKey('users.id'))

    questions = relationship('Question',back_populates='test')