from sqlalchemy import Column,Integer,String,ForeignKey
from sqlalchemy.orm import relationship
from database.database import Base


class Question(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, index=True)
    test_id = Column(Integer, ForeignKey("tests.id"))
    text = Column(String, nullable=False)

    test = relationship("Test", back_populates="questions")
    answers = relationship("Answer", back_populates="question", cascade="all, delete")