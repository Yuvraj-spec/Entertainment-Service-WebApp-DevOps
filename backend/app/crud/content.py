from sqlalchemy.orm import Session
from app.models.content import Content
from app.schemas.content import ContentCreate


def create_content(db: Session, content: ContentCreate):
    db_content = Content(
        title=content.title,
        description=content.description,
        content_type=content.content_type,
    )
    db.add(db_content)
    db.commit()
    db.refresh(db_content)
    return db_content


def search_content(db: Session, q: str | None = None, content_type: str | None = None):
    query = db.query(Content)

    if q:
        query = query.filter(Content.title.ilike(f"%{q}%"))

    if content_type:
        query = query.filter(Content.content_type == content_type)

    return query.order_by(Content.id.desc()).all()