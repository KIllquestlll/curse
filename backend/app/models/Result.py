from sqlalchemy import Column,String,Integer,ForeignKey,DateTime
from sqlalchemy.orm import relationship
from database import Base
import datetime

class Result(Base):
    __tablename__ = "results"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    test_id = Column(Integer, ForeignKey("tests.id"))
    score = Column(Integer)
    date = Column(DateTime, default=datetime.datetime.utcnow)
    
    user = relationship("User", back_populates="results")