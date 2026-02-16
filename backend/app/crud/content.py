from sqlalchemy.orm import Session
from app.models.content import Content

def create_content(db: Session, content):
    db_content = Content(**content.dict())
    db.add(db_content)
    db.commit()
    db.refresh(db_content)
    return db_content
