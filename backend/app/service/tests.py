from sqlalchemy.orm import Session,joinedload
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

    
        for ans in question.answers:

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


def delete_test_id(db:Session,test_id:int):

    test = db.query(Test).filter(Test.id == test_id).first()

    if not test:
        return False
    
    db.delete(test)
    db.commit()
    
    return True


def get_test(db: Session, test_id: int):
    return (
        db.query(Test)
        .options(
            joinedload(Test.questions).joinedload(Question.answers)
        )
        .filter(Test.id == test_id)
        .first()
    )

