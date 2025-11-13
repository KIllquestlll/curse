from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models.Users import *
from routes.route_auth import *
from routes.GroupList import *
from database.database import engine
from sqlalchemy.orm import Session
from sqlalchemy import text
import uvicorn


app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(route_auth)
app.include_router(router_group)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

if __name__ == '__main__':
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)