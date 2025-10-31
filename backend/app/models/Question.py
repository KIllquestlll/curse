from sqlalchemy import Column,Integer,String,ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Question(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String, nullable=False)
    correct_answer = Column(String, nullable=False)
    test_id = Column(Integer, ForeignKey("tests.id"))
    
    test = relationship("Test", back_populates="questions")