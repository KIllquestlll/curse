from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship
from database.database import Base
from passlib.hash import bcrypt

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, unique=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String, nullable=False)
    role = Column(String, nullable=False)

    def verify_password(self, password: str):
        return bcrypt.verify(password, self.hashed_password)