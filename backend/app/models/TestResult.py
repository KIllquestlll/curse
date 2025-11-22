from sqlalchemy import Column,String,Integer,ForeignKey,DateTime
from sqlalchemy.orm import relationship
from database.database import Base


class TestResult(Base):
    __tablename__ = 'test_result'


    id = Column(Integer,primary_key=True,index=True)
    test_id = Column(Integer,ForeignKey('tests.id'))
    user_id = Column(Integer,ForeignKey('users.id'))
    user_answers = Column(String)
    score = Column(Integer)


    test = relationship('Test',back_populates='results')

    