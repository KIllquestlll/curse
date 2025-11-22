from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session,joinedload
from database.database import get_db
from core.dependencies import get_current_user
from typing import List
from service.tests import *
from models.Test import Test
from models.Users import Group,Users
from models.TestResult import TestResult
from schemas.Test import *
from schemas.TestResult import *
import json



router_test = APIRouter(prefix='/tests',tags=['tests'])


@router_test.post('/api/test')
def create_test_route(test:TestCreate,db:Session = Depends(get_db)):
    new_test = create_test(db,test)
    return {'status':'ok','test_id':new_test.id}


@router_test.get('/api/tests/all',response_model=List[TestRead])
def show_all_tests(db:Session = Depends(get_db)):
   tests =get_all_tests(db)
   return tests


@router_test.get('/api/tests/summary',response_model=List[TestSummary])
def get_all_tests(db:Session = Depends(get_db)):

    results = db.query(Test,Group).join(Group,Test.group_id == Group.id).all()
    summary = [
        TestSummary(id=test.id,test_title=test.title,group_name=group.name)
        for test,group in results
    ]
    return summary



@router_test.get('/api/tests/{test_id}', response_model=TestRead)
def get_test_by_id(test_id: int, db: Session = Depends(get_db)):
    test = (
        db.query(Test)
        .options(joinedload(Test.questions).joinedload(Question.answers))
        .filter(Test.id == test_id)
        .first()
    )
    if not test:
        raise HTTPException(status_code=404, detail="Test not found")
    return test


@router_test.post('/api/tests/results')
def save_results(result: TestResultCreate, db: Session = Depends(get_db), current_user: Users = Depends(get_current_user)):
    
    existing_result = db.query(TestResult).filter(
        TestResult.user_id == current_user.id,
        TestResult.test_id == result.test_id
    ).first()

    if existing_result:
        
        existing_result.user_answers = json.dumps(result.user_answers)
        existing_result.score = result.score
        db.commit()
        db.refresh(existing_result)
        return {'status': 'ok', 'id': existing_result.id, 'message': 'Результат обновлён'}
    else:
        
        new_result = TestResult(
            user_id=current_user.id,
            test_id=result.test_id,
            user_answers=json.dumps(result.user_answers),
            score=result.score
        )
        db.add(new_result)
        db.commit()
        db.refresh(new_result)
        return {'status': 'ok', 'id': new_result.id, 'message': 'Результат сохранён'}


@router_test.get('/api/tests/mytest/result')
def get_my_tests_with_results(
    db: Session = Depends(get_db),
    current_user: Users = Depends(get_current_user)
):
    #
    user_test_ids = db.query(TestResult.test_id).filter(TestResult.user_id == current_user.id).distinct()
    tests = db.query(Test).filter(Test.id.in_(user_test_ids)).all()

    resp = []
    for test in tests:
        results = db.query(TestResult).filter(TestResult.test_id == test.id).all()
        formatted_results = []
        for r in results:
            user = db.query(Users).filter(Users.id == r.user_id).first()
            formatted_results.append({
                "id": r.id,
                "user_id": user.id,
                "full_name": f"{user.first_name} {user.last_name}",
                "group": user.group.name if user.group else "Нет группы",
                "score": r.score,
                "total_questions": db.query(Question).filter(Question.test_id == test.id).count()
            })

        resp.append({
            "test_id": test.id,
            "title": test.title,
            "results": formatted_results
        })

    return {"tests": resp}