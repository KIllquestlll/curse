from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session
from database.database import get_db
from typing import List
from service.tests import *
from schemas.Test import *



router_test = APIRouter(prefix='/tests',tags=['tests'])


@router_test.post('/api/test')
def create_test_route(test:TestCreate,db:Session = Depends(get_db)):
    new_test = create_test(db,test)
    return {'status':'ok','test_id':new_test.id}


@router_test.get('/api/tests',response_model=List[TestRead])
def show_all_tests(db:Session = Depends(get_db)):
   tests =get_all_tests(db)
   return tests