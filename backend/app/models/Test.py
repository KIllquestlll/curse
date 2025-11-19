from sqlalchemy import Column,Integer,String,ForeignKey
from sqlalchemy.orm import relationship
from database.database import Base


class Test(Base):
    __tablename__ = 'tests'


    id = Column(Integer,primary_key=True,index=True)
    title = Column(String,nullable=False)
    group_id = Column(Integer,ForeignKey('groups.id'))


    questions = relationship('Question',back_populates='test',cascade='all,delete',passive_deletes=True)

    