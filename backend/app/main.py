from fastapi import FastAPI
from models.Users import *
from routes.route_auth import *
from database.database import engine
from sqlalchemy.orm import Session
import uvicorn


app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(route_auth)


if __name__ == '__main__':
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)