from sqlalchemy.orm import Session
from models.Test import Test
from models.Question import Question
from models.Answer import  Answer
from schemas.Test import TestCreate


def create_test(db:Session,data:TestCreate):

    new_test = Test(
        title=data.title,
        group_id=data.group_id
    )


    db.add(new_test)
    db.commit()
    db.refresh(new_test)


    for question in data.questions:

        q = Question(
            text=question.text,
            test_id=new_test.id
        )

        db.add(q)
        db.commit()
        db.refresh(q)

    
    for ans in question.answer:

        a = Answer(
            text=ans.text,
            is_correct=ans.is_correct,
            question_id=q.id
        )

        db.add(a)
    db.commit()
    return new_test


def get_all_tests(db:Session):
    return db.query(Test).all()

