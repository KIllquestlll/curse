from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session
from database.database import get_db
from models.Users import Group
from schemas.Group import GroupBase


router_group = APIRouter(prefix='/groups',tags=['groups'])


@router_group.get('/api/',response_model=list[GroupBase])
def get_groups(db:Session = Depends(get_db)):
    return db.query(Group).all()
