from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker,declarative_base

DATABASE_URL = 'sqlite:///./db.db'

engine = create_engine(DATABASE_URL,connect_args={'check_same_thread':True})

SessionLocal = sessionmaker(autocommit=False,autoflush=False,bind=engine)

Base = declarative_base()
