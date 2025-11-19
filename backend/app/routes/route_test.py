from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session,joinedload
from database.database import get_db
from typing import List
from service.tests import *
from models.Test import Test
from models.Users import Group
from schemas.Test import *



router_test = APIRouter(prefix='/tests',tags=['tests'])


@router_test.post('/api/test')
def create_test_route(test:TestCreate,db:Session = Depends(get_db)):
    new_test = create_test(db,test)
    return {'status':'ok','test_id':new_test.id}


@router_test.get('/api/tests/all',response_model=List[TestRead])
def show_all_tests(db:Session = Depends(get_db)):
   tests =get_all_tests(db)
   return tests


@router_test.delete('/api/tests/delete/{test_id}')
def delete_test_route(test_id:int,db:Session = Depends(get_db)):
     
     success = delete_test_id(db,test_id)

     if not success:
         raise HTTPException(status_code=404,detail='Test not found')
     
     return {'status':'ok','message':f'Test {test_id} has been deleted'}



@router_test.get('/api/tests/summary',response_model=List[TestSummary])
def get_all_tests(db:Session = Depends(get_db)):

    results = db.query(Test,Group).join(Group,Test.group_id == Group.id).all()
    summary = [
        TestSummary(test_title=test.title,group_name=group.name)
        for test,group in results
    ]
    return summary



@router_test.get("/api/tests/{test_id}", response_model=TestRead)
def get_test_by_id(test_id: int, db: Session = Depends(get_db)):
    test = get_test(db, test_id)
    if not test:
        raise HTTPException(status_code=404, detail="Test not found")
    return test